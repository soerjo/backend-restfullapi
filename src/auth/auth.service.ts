import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/type';
import { Repository } from 'typeorm';
import {
  CreateAuthDto,
  LoginDto,
  PayloadJwtDto,
  RecoverPasswordDto,
  ResponseCreatedUser,
  UpdateAuthDto,
} from './dto';
import { User } from './entities/user.entity';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CacheEntity } from './entities/cache.entity';
import { ResponseDto } from 'src/module/jemaat/dto';
import { RecoverUser } from './entities/recover-user.entity';

const link = `localhost:3000`;

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User, 'MYSQL_DB')
    private readonly userRepo: Repository<User>,
    @InjectRepository(RecoverUser, 'MYSQL_DB')
    private readonly recoverUserRepo: Repository<RecoverUser>,
    @InjectRepository(CacheEntity, 'MYSQL_DB')
    private readonly cacheRepo: Repository<CacheEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(createAuthDto: CreateAuthDto, user?: PayloadJwtDto) {
    const checkEmail = await this.getUserByMail(createAuthDto.email);
    if (checkEmail)
      throw new BadRequestException(
        `email: ${createAuthDto.email} has already registed!`,
      );

    const newUser = this.userRepo.create(createAuthDto);
    newUser.role = [Role.JEMAAT];
    newUser.password = hashSync(createAuthDto.password, genSaltSync());
    if (user) newUser.createdBy = user.username;
    newUser.createdBy = Role.ADMIN;

    const savedUser = await this.userRepo.save(newUser);

    return new ResponseDto({
      status: 201,
      message: `user ${createAuthDto.username} success created!`,
      data: new ResponseCreatedUser(savedUser),
    });
  }

  async getUserByMail(email: string) {
    return await this.userRepo.findOne({ email });
  }

  async loginLocal(loginDto: LoginDto) {
    const getUser = await this.userRepo.findOne({ email: loginDto.email });
    if (!getUser)
      throw new ForbiddenException(
        `user with email: ${loginDto.email} is not found`,
      );

    const comparePassword = compareSync(loginDto.password, getUser.password);
    if (!comparePassword) throw new ForbiddenException(`password is false`);

    const payload = new PayloadJwtDto({
      userid: getUser.id,
      username: getUser.username,
      role: getUser.role,
    });

    return new ResponseDto({
      data: await this.generateJwt(payload),
      message: 'success login',
    });
  }

  async generateJwt(payload: PayloadJwtDto) {
    this.logger.log({ ...payload });
    const access_token: string = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get('KEY_ACCESS_TOKEN'),
        expiresIn: '3h',
      },
    );
    const refresh_token: string = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get('KEY_REFRESH_TOKEN'),
        expiresIn: '1d',
      },
    );

    await this.saveCache(payload);
    return { access_token, refresh_token };
  }

  async findCache(userid: string) {
    return await this.cacheRepo.findOne({ userid });
  }

  async saveCache(payload: PayloadJwtDto) {
    await this.cacheRepo.save(payload);
  }

  async removeCache(payload: PayloadJwtDto) {
    const getCache = await this.findCache(payload.userid);
    if (!getCache) return false;

    await this.cacheRepo.remove(getCache);
    return true;
  }

  async getAccessToken(payload: PayloadJwtDto) {
    return new ResponseDto({
      data: await this.generateJwt(payload),
      message: 'success get token',
    });
  }

  async getAllUser() {
    const users = await this.userRepo.find();
    return new ResponseDto({
      data: users,
    });
  }

  async update(id: string, updateAuthDto: UpdateAuthDto, user?: PayloadJwtDto) {
    const getUser = await this.userRepo.findOne({ id });
    if (!getUser) throw new BadRequestException(`user id: ${id} is not found`);

    const createUser = this.userRepo.create({
      ...getUser,
      ...updateAuthDto,
    });

    if (user) createUser.updatedBy = user.username;
    createUser.updatedBy = Role.ADMIN;
    const updateUser = await this.userRepo.save(createUser);

    return new ResponseDto({
      status: 201,
      message: `user ${getUser.username} success updated!`,
      data: new ResponseCreatedUser(updateUser),
    });
  }

  async handleForgotPassword(email: string) {
    const checkEmail = await this.getUserByMail(email);
    if (!checkEmail)
      throw new BadRequestException(`user email: ${email} is not found`);

    //send nodemailer to user email direct to updateuser url
    //jwt must be in the query url in email link.

    const hashing = hashSync(email, genSaltSync());
    await this.recoverUserRepo.save({ userid: checkEmail.id, hash: hashing });

    return new ResponseDto({
      message: `hit the link to do recover`,
      data: {
        link: `link: ${link}/auth/recover?hash=${hashing}`,
        hash: hashing,
      },
    });
  }

  async recoverUser(hash: string) {
    const checkRequestRecover = await this.recoverUserRepo.findOne({ hash });
    if (!checkRequestRecover) throw new ForbiddenException();

    const getUser = await this.userRepo.findOne({
      id: checkRequestRecover.userid,
    });

    return new ResponseDto({
      message: `Put method to link: ${link}/auth/recover/${hash}`,
      data: {
        link: `${link}/auth/recover/${hash}`,
        user_data: new ResponseCreatedUser(getUser),
      },
    });
  }

  async recoverPassword(hash: string, recoverPasswordDto: RecoverPasswordDto) {
    const checkRequestRecover = await this.recoverUserRepo.findOne({ hash });
    if (!checkRequestRecover) throw new ForbiddenException();

    const getUser = await this.userRepo.findOne({
      id: checkRequestRecover.userid,
    });

    const updateUser = await this.userRepo.save({
      ...getUser,
      password: hashSync(recoverPasswordDto.password, genSaltSync()),
      updatedBy: getUser.username,
    });

    return new ResponseDto({
      status: 201,
      message: `user ${getUser.username} success updated!`,
      data: new ResponseCreatedUser(updateUser),
    });
  }

  async remove(id: string) {
    const checkRequestRecover = await this.userRepo.findOne({ id });
    if (!checkRequestRecover)
      throw new BadRequestException(`user id: ${id} is not found`);
    await this.userRepo.remove(checkRequestRecover);

    return new ResponseDto({
      message: `user ${checkRequestRecover.username} success removed!`,
    });
  }

  async logout(payload?: PayloadJwtDto) {
    const getCache = await this.cacheRepo.findOne({ userid: payload?.userid });
    if (!getCache) throw new ForbiddenException();
    await this.cacheRepo.remove(getCache);
    return new ResponseDto();
  }
}
