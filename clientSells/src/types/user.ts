export type User = {
  id: string;
  name: string;
  email: string;
  token: string;
  imageUrl?: string;
  userTypeId: number;
};

export type LoginUser = {
  email: string;
  displayName: string;
};

export type RegisterCreds = {
  email: string;
  name: string;
  password: string;
};
