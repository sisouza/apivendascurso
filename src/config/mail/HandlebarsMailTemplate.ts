import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  file: string;
  vars: ITemplateVariable;
}
export default class handlebarsMailTemplate {
  //metodo que vai fzr o parser ou seja juntar as variaveis definidas e enviar junto com o template html
  public async parse({ file, vars }: IParseMailTemplate): Promise<string> {
    //lendo o arquivo de template
    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' })

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(vars);
  }
}
