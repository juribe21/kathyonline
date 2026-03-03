export type Pedido = {
  id: number;
  clientId: number;
  puntoEntregaId: number;
  fechaEntrega: string;
  productoId: number;
  categoriaId: number;
  cantidad: number;
  subTotal: number;
  transactionId: number;
};
