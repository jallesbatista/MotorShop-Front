import { IMockedPoster, IMockedUser } from "@/interfaces/mocks.interfaces";
import Carro1 from "../assets/carro1.png";

export const mockedUser: IMockedUser = {
  name: "Kenzinho Academilson",
  is_seller: true,
};

export const mockedPoster: IMockedPoster = {
  brand: "Citroên",
  model: "C4 CACTUS Rip Curl 1.6 16V Flex Aut.",
  year: "2022",
  fuel_type: "Flex",
  kilometers: 20700.5,
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
      url: Carro1.src,
    },
  ],
};
