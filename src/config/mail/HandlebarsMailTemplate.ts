import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  template: string;
  vars: ITemplateVariable;
}
export default class handlebarsMailTemplate {
  //metodo que vai fzr o parser ou seja juntar as variaveis definidas e enviar junto com o template html
  public async parse({ template, vars }: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(vars);
  }
}
