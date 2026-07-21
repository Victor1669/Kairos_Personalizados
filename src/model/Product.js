import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Product",
  tableName: "products",

  columns: {
    id: { primary: true, type: "int", generated: true },
    nome: { type: "varchar" },
    code: { type: "varchar", unique: true },
    color: { type: "simple-array", nullable: false },
    size: { type: "simple-array", nullable: false },
    price: { type: "decimal", precision: 10, scale: 2 },
    description: { type: "varchar" },
    status: {
      type: "enum",
      enum: ["ativo", "inativo"],
      default: "ativo",
    },
  },

  relations: {
    images: {
      type: "one-to-many",
      target: "ProductImg",
      inverseSide: "product",
    },

    reviews: {
      type: "one-to-many",
      target: "Review",
      inverseSide: "product",
    },
  },
});
