import { UserInformationDTO, ProfileType } from './dto/user-information.dto';
import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { SignInDTO } from './dto/sign-in.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { BadGatewayException, UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async updateUser(updateUserDTO: UpdateUserDTO, user): Promise<User> {
    const { first_name, last_name, age, imgUrl, sexe, about } = updateUserDTO;
    const updateUser = await this.findOne({ id_user: user.id_user });
    if (!updateUser) {
      throw new UnauthorizedException('You cannot update these user informations');
    }
    updateUser.first_name = first_name;
    updateUser.last_name = last_name;
    updateUser.age = age;
    updateUser.sexe = sexe;
    updateUser.imgUrl = imgUrl;
    updateUser.about = about;

    await updateUser.save();
    return updateUser;
  }

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
    const { first_name, last_name, username, password, mail, imgUrl, age, sexe, phone_number, user_type, activated, about } = authCredentialsDTO;

    const user = this.create();

    user.salt = await bcrypt.genSalt();
    user.first_name = first_name;
    user.last_name = last_name;
    user.username = username;
    user.password = await bcrypt.hash(password, user.salt);
    user.mail = mail;
    user.age = age;
    user.sexe = sexe;
    user.phone_number = phone_number;
    user.user_type = user_type;
    user.activated = activated;
    user.activation_code = Math.floor(Math.random() * Math.floor(99999));

    user.about = about;
    user.imgUrl = imgUrl;
    //! user_checked doit etre mis à false par default puis activé par un admin
    user.user_checked = true;
    user.credit_card_entered = false;
    user.password_reset_token = '';
    //a geolocaliser plus tard
    user.country = 'FR';
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }

    //! il ne faut rien retourner mais pour l'instant je laisse pour voir la reponse du serveur
    return user;
  }

  async validatePassword(signInDTO: SignInDTO) {
    const { username, password } = signInDTO;
    const user = await this.findOne({ where: [{ username: username }, { mail: username }] });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
