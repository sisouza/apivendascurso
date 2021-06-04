import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = await userTokensRepository.generate(user.id);

    console.log(token);

    //ethereal for email fake with token
    await EtherealMail.sendMail({
      to: email,
      body: `Reset Password test:${token?.token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
