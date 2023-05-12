export interface IMockedUser {
  name: string;
  is_seller: boolean;
  description: string;
  id: string;
  email: string;
  password: string;
}

export interface IMockedPoster {
  brand: string;
  model: string;
  year: string;
  fuel_type: string;
  kilometers: number;
  color: string;
  fipe_price: number;
  price: number;
  description: string;
  is_published: boolean;
  createdAt: string;
  images: IMockerImage[];
  user: IMockedUser;
  comments: IMockedComment[];
}

interface IMockerImage {
  url: string;
}

export interface IMockedComment {
  content: string;
  createdAt: string;
  user: {
    name: string;
  };
}
