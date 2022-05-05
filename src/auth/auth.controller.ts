import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Logger,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RefreshJwtGuard } from 'src/common/guard';
import { Role } from 'src/common/type';
import { AuthService } from './auth.service';
import { LoginDto, PayloadJwtDto, RecoverPasswordDto } from './dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Roles(Role.PUBLIC)
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/login')
  @Roles(Role.PUBLIC)
  loginLocal(@Body() loginDto: LoginDto) {
    this.logger.log({ ...loginDto });
    return this.authService.loginLocal(loginDto);
  }

  @ApiBearerAuth()
  @Get('/logout')
  logout(@GetUser() user?: PayloadJwtDto) {
    this.logger.log(user);
    return this.authService.logout(user);
  }

  @ApiBearerAuth()
  @Get('/refresh-token')
  @Roles(Role.PUBLIC)
  @UseGuards(RefreshJwtGuard)
  getRefreshToken(@GetUser() user: PayloadJwtDto) {
    return this.authService.getAccessToken(user);
  }

  @ApiBearerAuth()
  @Get('/users')
  @Roles(Role.ADMIN)
  getAllUser() {
    return this.authService.getAllUser();
  }

  @Get('/mail/recover/')
  @Roles(Role.PUBLIC)
  forgotPassword(@Query('email') email: string) {
    return this.authService.handleForgotPassword(email);
  }

  @Post('/recover')
  @Roles(Role.PUBLIC)
  recoverUser(@Query('hash') hash: string) {
    return this.authService.recoverUser(hash);
  }

  @Put('/recover/:hash')
  @Roles(Role.PUBLIC)
  recoverPassword(
    @Param('hash') hash: string,
    @Body() recoverPasswordDto: RecoverPasswordDto,
  ) {
    return this.authService.recoverPassword(hash, recoverPasswordDto);
  }

  @ApiBearerAuth()
  @Put('/user/:id')
  @Roles(Role.ADMIN)
  updateUser(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @ApiBearerAuth()
  @Delete('/user/:id')
  @Roles(Role.ADMIN)
  deleteUser(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
