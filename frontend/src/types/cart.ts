export type CartItem = {
  id: number;
  quantity: number;
  productId: number;
  product: {
    name: string;
    image: string;
    price: number;
  };
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type Cart = {
  cartItems: CartItem[];
  paymentMethod: string;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
