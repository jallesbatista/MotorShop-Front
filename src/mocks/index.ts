import { IMockedPoster, IMockedUser } from "@/interfaces/mocks.interfaces";

export const mockedUser: IMockedUser = {
  name: "Kenzinho Academilson",
  is_seller: true,
  description: "Um carinha legal",
};
export const mockedPosterUser: IMockedUser = {
  name: "Lojas KA",
  is_seller: true,
  description: "Loja que te deixa de queixo caído com seus produtos",
};

export const mockedPoster: IMockedPoster = {
  user: mockedPosterUser,
  brand: "Citroên",
  model: "Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200",
  year: "2022",
  fuel_type: "Flex",
  kilometers: 20700,
  color: "vermelho",
  fipe_price: 95700.0,
  price: 90000.0,
  description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo veritatis reiciendis
  cumque alias obcaecati. Placeat ea inventore minima earum, reiciendis provident
  consequatur laborum soluta exercitationem est voluptas possimus maiores
  necessitatibus?`,
  is_published: false,
  createdAt: new Date().toISOString(),
  images: [
    {
      url: "https://img.lovepik.com/free-png/20210926/lovepik-a-car-png-image_401434180_wh1200.png",
    },
    {
      url: "https://img.lovepik.com/free-png/20211209/lovepik-a-car-png-image_401434179_wh1200.png",
    },
    {
      url: "https://img.lovepik.com/free-png/20210926/lovepik-a-car-png-image_401434180_wh1200.png",
    },
    {
      url: "https://img.lovepik.com/free-png/20211209/lovepik-a-car-png-image_401434179_wh1200.png",
    },
  ],
};

export const mockedPosterList: IMockedPoster[] = [
  mockedPoster,
  mockedPoster,
  mockedPoster,
  mockedPoster,
];
