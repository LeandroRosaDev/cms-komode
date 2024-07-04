export type User = {
  id?: string;
  nome?: string;
  username?: string;
};

export type Conta = {
  autorizado: boolean;
  nome: any;
};

export type IUserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
};

export type Produto = {
  id: string;
  nome: string;
  nome_long: string;
  preco: string;
  cor: string;
  categoria?: string;
  produto_cod?: string;
  link_1?: string;
  link_2?: string;
  descricao?: string;
  altura?: string;
  largura?: string;
  profundidade_aberto?: string;
  profundidade_fechado?: string;
  assento?: string;
  encosto?: string;
  braco?: string;
  estrutura: string;
  revestimento?: string;
  estoque?: number;
  usuario_id?: string;
  img?: File[];
  situacao?: string;
  sub_categoria?: string;
  disponibilidade?: string;
  preco_parcelado?: string;
  preco_original?: string;
  fotos: { src: string }[];
};
export type PageParams = {
  params: {
    produto: string;
    categorias: string;
    subcategorias: string;
    clientes: string;
    reclamacoes: string;
  };
};
