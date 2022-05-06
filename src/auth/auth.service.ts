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
  ReturnUser,
  UpdateAuthDto,
} from './dto';
import { User } from './entities/user.entity';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CacheEntity } from './entities/cache.entity';
import { RecoverUser } from './entities/recover-user.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionDto,
  ResponseDto,
  SearchQueryDto,
} from 'src/common/dto';
import { keyofUser } from './type/keyofuser.interface';

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

  async handleCrate(createAuthDto: CreateAuthDto) {
    if (await this.checkEmail(createAuthDto.email))
      throw new BadRequestException(
        `email: ${createAuthDto.email} has already registed!`,
      );

    const savedUser = await this.userRepo.save({
      ...createAuthDto,
      password: hashSync(createAuthDto.password, genSaltSync()),
      role: [Role.JEMAAT],
      createdBy: Role.ADMIN,
    });

    return new ResponseDto({
      status: 201,
      message: `success created!`,
      data: new ReturnUser(savedUser),
    });
  }

  async handleLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const validateUser = await this.validateUser(email, password);
    const generateJwt = await this.generateJwt(validateUser);

    return new ResponseDto({
      message: 'success login',
      data: { ...generateJwt, user: validateUser },
    });
  }

  async handleRemove(id: string) {
    const getUser = await this.userRepo.findOne({ id });
    if (!getUser) throw new BadRequestException(`user id: ${id} is not found`);
    await this.userRepo.remove(getUser);

    return new ResponseDto({
      message: `user ${getUser.username} removed!`,
    });
  }

  async handleLogout(payload: PayloadJwtDto) {
    const getCache = await this.cacheRepo.findOne({ userid: payload.userid });
    if (!getCache) throw new ForbiddenException();
    await this.cacheRepo.remove(getCache);
  }

  async validateUser(email: string, password: string) {
    const getUser = await this.userRepo.findOne({ email: email });
    if (!getUser)
      throw new ForbiddenException(`user with email: ${email} is not found`);

    const comparePassword = compareSync(password, getUser.password);
    if (!comparePassword) throw new ForbiddenException(`password is false`);

    return {
      role: getUser.role,
      username: getUser.username,
      userid: getUser.id,
    };
  }

  async checkEmail(email: string): Promise<boolean> {
    const getEmail = await this.userRepo.findOne({ email });

    return getEmail ? true : false;
  }

  async generateJwt(payload: PayloadJwtDto) {
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

    await this.cacheRepo.save(payload);

    return { access_token, refresh_token };
  }

  async getAccessToken(payload: PayloadJwtDto) {
    const generateJwt = await this.generateJwt(payload);

    return new ResponseDto({
      data: generateJwt,
      message: 'success get token',
    });
  }

  async handleGetUsers(
    pageOptions: PageOptionDto,
    searchQuery: SearchQueryDto,
  ) {
    const { order, skip, take } = pageOptions;
    const { orderBy, search, word } = searchQuery;

    const queryBuilder = this.userRepo.createQueryBuilder('user');
    queryBuilder.skip(skip).take(take);

    if (keyofUser.some((val) => val === orderBy))
      queryBuilder.orderBy(`user.${orderBy}`, order);

    if (keyofUser.some((val) => val === search) && word)
      queryBuilder.where(`user.${search} LIKE :s`, { s: `%${word}%` });

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptions });
    const data = new PageDto(entities, pageMetaDto);

    return new ResponseDto({ data });
  }

  async handleGetUser(id: string) {
    const users = await this.userRepo.findOne(id);

    return new ResponseDto({ data: users });
  }

  async handleUpdateUser(id: string, updateAuthDto: UpdateAuthDto) {
    const getUser = await this.userRepo.findOne({ id });
    if (!getUser) throw new BadRequestException(`user id: ${id} is not found`);

    const updateUser = await this.userRepo.save({
      ...getUser,
      ...updateAuthDto,
    });

    return new ResponseDto({
      status: 201,
      message: `success updated!`,
      data: new ReturnUser(updateUser),
    });
  }

  async handleForgotPassword(email: string) {
    if (await this.checkEmail(email))
      throw new BadRequestException(`user email: ${email} is not found`);

    //send nodemailer to user email direct to updateuser url
    //jwt must be in the query url in email link.

    const hash = hashSync(email, genSaltSync());
    await this.recoverUserRepo.save({ email, hash });

    return new ResponseDto({
      message: `hit the link to do recover`,
      data: {
        link: `link: ${link}/auth/recover?hash=${hash}`,
        hash: hash,
      },
    });
  }

  async handleRecoverUser(hash: string) {
    const getRecoverUser = await this.recoverUserRepo.findOne({ hash });
    if (!getRecoverUser) throw new ForbiddenException();

    const getUser = await this.userRepo.findOne({
      email: getRecoverUser.email,
    });

    return new ResponseDto({
      message: `Put method to link: ${link}/auth/recover/${hash}`,
      data: {
        link: `${link}/auth/recover/${hash}`,
        user_data: new ReturnUser(getUser),
      },
    });
  }

  async hanldeRecoverPassword(
    hash: string,
    recoverPasswordDto: RecoverPasswordDto,
  ) {
    const getRecoverUser = await this.recoverUserRepo.findOne({ hash });
    if (!getRecoverUser) throw new ForbiddenException();

    const getUser = await this.userRepo.findOne({
      email: getRecoverUser.email,
    });

    const updateUser = await this.userRepo.save({
      ...getUser,
      password: hashSync(recoverPasswordDto.password, genSaltSync()),
      updatedBy: getUser.username,
    });

    return new ResponseDto({
      status: 201,
      message: `success updated!`,
      data: new ReturnUser(updateUser),
    });
  }
}
