class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  /* a mensagem que vai ser enviada atraves do construtor
   é atribuida ao atributo message
   ou seja Se for enviado um valor vai usar oq foi enviado
   senao vai enviar esse padrao*/
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
