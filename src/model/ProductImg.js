import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "ProductImg",
  tableName: "product_images",

  columns: {
    id: { primary: true, type: "int", generated: true },
    img_url: { type: "varchar" },
    order: { type: "int" },
  },

  relations: {
    product: {
      type: "many-to-one",
      target: "Product",
      joinColumn: true,
      inverseSide: "images",
      onDelete: "CASCADE",
    },
  },
});
