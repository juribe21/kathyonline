export type Venta = {
  id: number;
  clientId: number;
  puntoEntregaId: number;
  fechaEntrega: string;
  total: number;
  pedidoId: number;
};

export type DetalleVenta = {
  id: number;
  ventaId: number;
  productoId: number;
  categoriaId: number;
  cantidad: number;
  subTotal: number;
};
