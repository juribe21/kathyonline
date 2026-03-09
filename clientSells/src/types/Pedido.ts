export type Pedido = {
  id: number;
  clientId: string;
  puntoEntregaId: number;
  fechaPedido: string;
  productoId: string;
  categoriaId: string;
  cantidad: number;
  subTotal: number;
  transactionId?: string;
  status: number;
};

export type addPedido = {
  id: number;
  clientId: string;
  puntoEntregaId: number;
  fechaPedido: string;
  productoId: string;
  categoriaId: string;
  cantidad: number;
  subTotal: number;
  transactionId?: string;
  status: number;
};

export type pedidoCarrito = {
  id: number;
  status: number;
  nombreCliente: string;
  nombreProducto: string;
  cantidad: string;
  subTotal: string;
  fechaPedido: string;
  fechaCompra: string;
};

export type pedidoCarritoUpdate = {
  id: number;
  status: number;
  cantidad: string;
  subTotal: string;
 
};
