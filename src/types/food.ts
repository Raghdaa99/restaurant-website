export interface Food {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  prepTime?: string;
  calories?: string;
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