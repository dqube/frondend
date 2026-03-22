export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  variantId: string;
  product?: {
    name: string;
    imageUrl: string;
    slug: string;
  };
  variant?: {
    name: string;
    unit: string;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
