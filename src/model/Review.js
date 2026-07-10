import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Review",
  tableName: "reviews",

  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
    },

    stars: {
      type: "int",
    },

    description: {
      type: "text",
      nullable: true,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id",
      },
      inverseSide: "reviews",
      nullable: false,
      onDelete: "CASCADE",
    },

    product: {
      type: "many-to-one",
      target: "Product",
      joinColumn: {
        name: "product_id",
      },
      inverseSide: "reviews",
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});
