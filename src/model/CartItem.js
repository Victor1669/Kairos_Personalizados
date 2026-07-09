import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "CartItem",
  tableName: "cart_items",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    quantity: {
      type: "int",
      default: 1,
    },

    unit_price: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    color: {
      type: "varchar",
      nullable: true,
    },

    size: {
      type: "varchar",
      nullable: true,
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

  uniques: [
    {
      name: "uk_cart_product_variant",
      columns: ["cart", "product", "color", "size"],
    },
  ],

  relations: {
    cart: {
      type: "many-to-one",
      target: "Cart",
      joinColumn: true,
      inverseSide: "items",
    },

    product: {
      type: "many-to-one",
      target: "Product",
      joinColumn: true,
    },
  },
});
