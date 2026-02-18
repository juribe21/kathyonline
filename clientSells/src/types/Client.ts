export type Client = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  telefono: string;
  gender: number;
  dateOfBirth: string;
  created: string;
  lastActive: string;
  description?: string;
  city: string;
  country: string;
  imageUrl?: string;
};

export type EditableClient = {
  clientIdToUpdate: string;
  name: string;
  lastName: string;
  email: string;
  telefono: string;
  description?: string;
  isAdmin: boolean;
};
