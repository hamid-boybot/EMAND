import { UserInformationDTO } from './../user/dto/user-information.dto';
import { Controller, Post, Body, Get, UseGuards, Put, Param, Req, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from '../user/dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SignInDTO } from '../user/dto/sign-in.dto';
import { getUser } from '../common/decorators/get-user.decorator';
import { UpdateUserDTO } from '../user/dto/update-user.dto';
import { ResetPasswordDTO } from '../user/dto/reset-password.dto';
import { RequestPasswordResetDTO } from '../user/dto/request-password-reset.dto';
import { ActivateAccountDTO } from '../user/dto/activate-account.dto';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() authCredentialsDTO: AuthCredentialsDTO) {
    return this.authService.signUp(authCredentialsDTO);
  }

  @Post('/signin')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }

  @Put('/update')
  @UseGuards(AuthGuard('jwt'))
  updateUser(@Body() updateUserDTO: UpdateUserDTO, @getUser() user) {
    return this.authService.updateUser(updateUserDTO, user);
  }

  @Get('/user-information')
  @UseGuards(AuthGuard('jwt'))
  userInformation(@Query() userInformationDTO: UserInformationDTO, @getUser() user) {
    return this.authService.userInformation(userInformationDTO, user);
  }

  @Post('activate-account')
  activateAccount(@Body() activateAccountDTO: ActivateAccountDTO) {
    return this.authService.activateAccount(activateAccountDTO);
  }

  @UseGuards(AuthGuard('facebook-token'))
  @Get('facebook')
  async getTokenAfterFacebookSignIn(@Req() req) {
    console.log(req.user);
  }

  @Post('reset-password-request')
  resetPasswordRequest(@Body() requestPasswordResetDTO: RequestPasswordResetDTO) {
    return this.authService.resetPasswordRequest(requestPasswordResetDTO);
  }

  @Post('reset-password')
  @ApiQuery({ name: 'passwordResetToken' })
  resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO, @Query('passwordResetToken') passwordResetToken) {
    return this.authService.resestPassword(resetPasswordDTO, passwordResetToken);
  }
}
