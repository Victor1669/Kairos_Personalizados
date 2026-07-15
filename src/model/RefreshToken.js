import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "RefreshToken",
  tableName: "refresh_tokens",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    token: {
      type: "text",
    },

    expires_at: {
      type: "datetime",
    },

    revoked: {
      type: "boolean",
      default: false,
    },

    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id",
      },
      inverseSide: "refreshTokens",
      onDelete: "CASCADE",
    },
  },
});
