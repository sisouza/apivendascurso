import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

//verifica se o token existe e pega um user existente
export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      password,
      token,
    });

    return res.status(204).json();
  }
}
