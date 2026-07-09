import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Cart",
  tableName: "carts",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    status: {
      type: "enum",
      enum: ["ativo", "finalizado", "abandonado"],
      default: "ativo",
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      inverseSide: "carts",
    },
    items: {
      type: "one-to-many",
      target: "CartItem",
      inverseSide: "cart",
    },
  },
});
