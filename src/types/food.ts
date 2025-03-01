// export interface Food {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
//   category: string;
//   prepTime?: string;
//   calories?: string;
//   rating?: number;
// }

export interface Food {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: number;
  image: string;
  category: {
    en: string;
    ar: string;
  };
  prepTime?: {
    en: string;
    ar: string;
  };
  calories?: {
    en: string;
    ar: string;
  };
  rating?: number;
}


export interface Review {
  id: number;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
  foodId: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
} 

export interface OrderInfo {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: string; // 'Processing', 'Paid', 'Pending'
  address: string;
  name: string;
  phone: string;
  city: string;
  zip: string;
  country: string;
  paymentMethod: string; // 'credit-card', 'paypal',  'cash-on-delivery'
  paymentStatus: string; // 'Success', 'Pending', 'Failed'
  createdAt: string;
}