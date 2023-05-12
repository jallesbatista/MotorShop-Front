import { IMockedPoster, IMockedUser } from "@/interfaces/mocks.interfaces";

export const mockedUser: IMockedUser = {
  name: "joão da silva",
  is_seller: true,
  description: `Um carinha legal  com uma lojinha legal. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis repellendus
  molestiae doloremque ad blanditiis facilis quos modi a exercitationem quod. Qui quae
  suscipit laboriosam quos ducimus sequi, eaque hic facilis!`,
  id: "9d931a02-a54d-487e-b6e4-70323edecd6e",
  email: "joaosilva@email.com",
  password: "1234",
};

export const mockedUser2: IMockedUser = {
  name: "miguel carros ",
  is_seller: true,
  description: `Loja que te deixa de queixo caído com seus produtos,lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis repellendus
  molestiae doloremque ads!`,
  id: "5c35f1c8-6bd0-4c6d-96a9-a7227dec74ab",
  email: "miguelcarros@email.com",
  password: "1234",
};

export const mockedUserList = [
  mockedUser,
  mockedUser2,
  mockedUser,
  mockedUser2,
  mockedUser,
  mockedUser2,
];

export const mockedPoster: IMockedPoster = {
  user: mockedUser2,
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
  comments: [
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sequi cum atque temporibus ducimus laborum repudiandae vitae corporis amet, nesciunt alias labore, veritatis blanditiis est cumque doloremque nobis, culpa nemo?",
      createdAt: new Date().toISOString().split("T")[0],
      user: {
        name: "Flavin du Pneu",
      },
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sequi cum atque temporibus ducimus laborum repudiandae vitae corporis amet, nesciunt alias labore, veritatis blanditiis est cumque doloremque nobis, culpa nemo?",
      createdAt: new Date().toISOString().split("T")[0],
      user: {
        name: "Chaulin Matador de Porco",
      },
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sequi cum atque temporibus ducimus laborum repudiandae vitae corporis amet, nesciunt alias labore, veritatis blanditiis est cumque doloremque nobis, culpa nemo?",
      createdAt: new Date().toISOString().split("T")[0],
      user: {
        name: "Carlos Andrade",
      },
    },
  ],
};
export const mockedPoster2: IMockedPoster = {
  user: mockedUser,
  brand: "Fiat",
  model: "UNO CIAO 1.0 Fire Flex 8V 5p",
  year: "2018",
  fuel_type: "Híbrido",
  kilometers: 15000,
  color: "azul",
  fipe_price: 95700.0,
  price: 100000.0,
  description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo veritatis reiciendis
  cumque alias obcaecati. Placeat ea inventore minima earum, reiciendis provident
  consequatur laborum soluta exercitationem est voluptas possimus maiores
  necessitatibus?`,
  is_published: true,
  createdAt: new Date().toISOString(),
  images: [
    {
      url: "https://img2.icarros.com/dbimg/imgmodelo/2/269_4.png",
    },
    {
      url: "https://w7.pngwing.com/pngs/44/655/png-transparent-fiat-uno-fiat-punto-fiat-panda-fiat-automobiles-fiat-compact-car-sedan-car.png",
    },
    {
      url: "https://img2.icarros.com/dbimg/imgmodelo/2/269_4.png",
    },
    {
      url: "https://w7.pngwing.com/pngs/44/655/png-transparent-fiat-uno-fiat-punto-fiat-panda-fiat-automobiles-fiat-compact-car-sedan-car.png",
    },
  ],
  comments: [
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sequi cum atque temporibus ducimus laborum repudiandae vitae corporis amet, nesciunt alias labore, veritatis blanditiis est cumque doloremque nobis, culpa nemo?",
      createdAt: new Date("2022-05-01").toISOString().split("T")[0],
      user: {
        name: "Flavin du Pneu",
      },
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sequi cum atque temporibus ducimus laborum repudiandae vitae corporis amet, nesciunt alias labore, veritatis blanditiis est cumque doloremque nobis, culpa nemo?",
      createdAt: new Date("2023-03-29").toISOString().split("T")[0],
      user: {
        name: "Chaulin Matador de Porco",
      },
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sequi cum atque temporibus ducimus laborum repudiandae vitae corporis amet, nesciunt alias labore, veritatis blanditiis est cumque doloremque nobis, culpa nemo?",
      createdAt: new Date().toISOString().split("T")[0],
      user: {
        name: "Carlos Andrade",
      },
    },
  ],
};

export const mockedPosterList: IMockedPoster[] = [
  mockedPoster,
  mockedPoster2,
  mockedPoster,
  mockedPoster2,
  mockedPoster,
  mockedPoster2,
  mockedPoster,
  mockedPoster2,
];
