export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
}
