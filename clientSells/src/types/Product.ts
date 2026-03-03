export type Product = {
  id: string;
  productName: string;
  productImageUrl: string;
  description: string;
  precio: number;
  cantidad: number;
  categoriaId: string;
};

export type addProduct = {
  id: string;
  productName: string;
  precio: number;
  cantidad: number;
  description: string;
  productImageUrl?: string;
  categoriaId: string;
};
