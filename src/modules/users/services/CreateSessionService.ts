import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

/**
  O server não guarda sessao, entao atraves desse service
  o user envia email e senha recebe um token e assim certificam,os
  que ele não acessará rotas q nao é permitido o acesso
 */
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

//verifica o user e se estiver okay vai responder com o token de acesso
class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect Email or Password.', 401);
    }

    //comparar senha o 1 é senha vinda do body da req e o 2 é a senha hash vinda do banco
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect Email or Password.', 401);
    }

    /*
payload - oq vamos devolver pro user
secret pra criar o token
obj com configs pro token tempo de experiao e etc
 */
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    //vamos retornar um obj com o user e o token
    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
