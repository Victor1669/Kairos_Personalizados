import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "OrderItem",
  tableName: "order_items",

  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
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

    custom_art_url: {
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

  relations: {
    order: {
      type: "many-to-one",
      target: "Order",
      joinColumn: {
        name: "order_id",
      },
      nullable: false,
      onDelete: "CASCADE",
    },

    product: {
      type: "many-to-one",
      target: "Product",
      joinColumn: {
        name: "product_id",
      },
      nullable: false,
      onDelete: "RESTRICT",
    },
  },
});
