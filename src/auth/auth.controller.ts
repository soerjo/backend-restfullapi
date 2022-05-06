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
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator';
import { PageOptionDto, QueryGetDto, SearchQueryDto } from 'src/common/dto';
import { RefreshJwtGuard } from 'src/common/guard';
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
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.handleCrate(createAuthDto);
  }

  @Post('/login')
  loginLocal(@Body() loginDto: LoginDto) {
    return this.authService.handleLogin(loginDto);
  }

  @Get('/logout')
  logout(@GetUser() user?: PayloadJwtDto) {
    return this.authService.handleLogout(user);
  }

  @Get('/refresh-token')
  @UseGuards(RefreshJwtGuard)
  getRefreshToken(@GetUser() user: PayloadJwtDto) {
    return this.authService.getAccessToken(user);
  }

  @Get('/users')
  getAllUser(@Query() query: QueryGetDto) {
    return this.authService.handleGetUsers(
      query as PageOptionDto,
      query as SearchQueryDto,
    );
  }

  @Get('/users/:id')
  getUser(@Param('id') id: string) {
    return this.authService.handleGetUser(id);
  }

  @Put('/user/:id')
  updateUser(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.handleUpdateUser(id, updateAuthDto);
  }

  @Get('/mail/recover/')
  forgotPassword(@Query('email') email: string) {
    return this.authService.handleForgotPassword(email);
  }

  @Post('/recover')
  recoverUser(@Query('hash') hash: string) {
    return this.authService.handleRecoverUser(hash);
  }

  @Put('/recover/:hash')
  recoverPassword(
    @Param('hash') hash: string,
    @Body() recoverPasswordDto: RecoverPasswordDto,
  ) {
    return this.authService.hanldeRecoverPassword(hash, recoverPasswordDto);
  }

  @Delete('/user/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.handleRemove(id);
  }
}
