// ESTE ARQUIVO DEVERÁ SER EXCLUÍDO APÓS A FINALIZAÇÃO DA HOME PAGE, E AS INTERFACES SEREM ATUALIZADAS EM SEUS RESPECTIVOS ARQUIVOS DE ACORDO.

export interface IUserDemoProps {
  name: string;
  is_seller: boolean;
}
export interface INavProps {
  user: IUserDemoProps | null;
}
