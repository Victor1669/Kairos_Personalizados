import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Order",
  tableName: "orders",

  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
    },

    status: {
      type: "enum",
      enum: [
        "aguardando_pagamento",
        "pago",
        "em_producao",
        "enviado",
        "entregue",
        "cancelado",
      ],
      default: "aguardando_pagamento",
    },

    total_price: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    tracking_code: {
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
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id",
      },
      nullable: false,
      onDelete: "CASCADE",
    },

    address: {
      type: "many-to-one",
      target: "Endereco",
      joinColumn: {
        name: "address_id",
      },
      nullable: false,
      onDelete: "RESTRICT",
    },

    items: {
      type: "one-to-many",
      target: "OrderItem",
      inverseSide: "order",
      cascade: true,
    },
  },
});
