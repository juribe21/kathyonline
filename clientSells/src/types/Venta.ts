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

export type VentaDto = {
  id: number;
  nombreClient: string;
  puntoentrega: string;
  productos: string;
  fechaEntrega: string;
  total: string;
  status: boolean;
};
