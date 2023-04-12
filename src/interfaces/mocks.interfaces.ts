export interface IMockedUser {
  name: string;
  is_seller: boolean;
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
}

interface IMockerImage {
  url: string;
}
