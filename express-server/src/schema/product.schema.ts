import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      message: "Title is required",
    }),
    description: string({
      message: "Description is required",
    }).min(120, "Description should be at least 120 characters long"),
    price: number({
      message: "Price is required",
    }),
    image: string({
      message: "Image is required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      message: "productId is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
