import { getImageUrl } from "../imgUrlFetch";
import { IProductsId } from "./productId";

interface IProducts {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  productOptions?: IProductsId[];
}

export const getProductsImage = async () => {
  const mockProducts: IProducts[] = [
    {
      id: 1,
      name: "Coffee cup",
      imageUrl: "",
      price: 10000,
      productOptions: [
        {
          id: 1,
          name: "bundle of 100",
          price: 1000,
          stock: 5,
          created_at: new Date("2022-12-01T22:00:00.999Z"),
          updated_at: new Date("2021-12-01T22:00:00.999Z"),
        },
        {
          id: 2,
          name: "bundle of 200",
          price: 2000,
          stock: 5,
          created_at: new Date("2022-11-01T22:00:00.999Z"),
          updated_at: new Date("2021-11-01T22:00:00.999Z"),
        },
        {
          id: 3,
          name: "bundle of 10",
          price: 8000,
          stock: 50,
          created_at: new Date("2022-10-01T22:00:00.999Z"),
          updated_at: new Date("2021-10-01T22:00:00.999Z"),
        },
      ],
    },
    {
      id: 2,
      name: "Coffee cup paper holder",
      imageUrl: "",
      price: 2500,
      productOptions: [
        {
          id: 1,
          name: "bundle of 1000",
          price: 100,
          stock: 20,
          created_at: new Date("2022-12-01T22:00:00.999Z"),
          updated_at: new Date("2021-12-01T22:00:00.999Z"),
        },
        {
          id: 2,
          name: "bundle of 2000",
          price: 500,
          stock: 30,
          created_at: new Date("2022-11-01T22:00:00.999Z"),
          updated_at: new Date("2021-11-01T22:00:00.999Z"),
        },
      ],
    },
  ];

  const promises = mockProducts.map(async (data) => {
    const image = await getImageUrl();
    data.imageUrl = image;
    return data;
  });

  const results = await Promise.all(promises);
  return results;
};
