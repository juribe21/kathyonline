export type Photo = {
  id: number;
  url: string;
  publicId?: string;
  clientId: string;
};

export type NewProductPhoto = {
  id: number;
  url: string;
  publicId?: string;
  productId: string;
};
