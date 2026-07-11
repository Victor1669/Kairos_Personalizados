/**
 * @typedef {import("typeorm").MigrationInterface} MigrationInterface
 * @typedef {import("typeorm").QueryRunner} QueryRunner
 */

module.exports = class AddOrderTable1783781970473 {
  name = "AddOrderTable1783781970473";

  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE \`orders\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`status\` enum(
          'aguardando_pagamento',
          'pago',
          'em_producao',
          'enviado',
          'entregue',
          'cancelado'
        ) NOT NULL DEFAULT 'aguardando_pagamento',
        \`total_price\` decimal(10,2) NOT NULL,
        \`tracking_code\` varchar(255) NULL,
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`user_id\` int NOT NULL,
        \`address_id\` int NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(`
      CREATE TABLE \`order_items\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`quantity\` int NOT NULL DEFAULT 1,
        \`unit_price\` decimal(10,2) NOT NULL,
        \`color\` varchar(255) NULL,
        \`size\` varchar(255) NULL,
        \`custom_art_url\` varchar(255) NULL,
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`order_id\` int NOT NULL,
        \`product_id\` int NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(`
      ALTER TABLE \`orders\`
      ADD CONSTRAINT \`FK_orders_user\`
      FOREIGN KEY (\`user_id\`)
      REFERENCES \`users\`(\`id\`)
      ON DELETE CASCADE
      ON UPDATE NO ACTION;
    `);

    await queryRunner.query(`
      ALTER TABLE \`orders\`
      ADD CONSTRAINT \`FK_orders_address\`
      FOREIGN KEY (\`address_id\`)
      REFERENCES \`enderecos\`(\`id\`)
      ON DELETE RESTRICT
      ON UPDATE NO ACTION;
    `);

    await queryRunner.query(`
      ALTER TABLE \`order_items\`
      ADD CONSTRAINT \`FK_order_items_order\`
      FOREIGN KEY (\`order_id\`)
      REFERENCES \`orders\`(\`id\`)
      ON DELETE CASCADE
      ON UPDATE NO ACTION;
    `);

    await queryRunner.query(`
      ALTER TABLE \`order_items\`
      ADD CONSTRAINT \`FK_order_items_product\`
      FOREIGN KEY (\`product_id\`)
      REFERENCES \`products\`(\`id\`)
      ON DELETE RESTRICT
      ON UPDATE NO ACTION;
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_order_items_product\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_order_items_order\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_orders_address\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_orders_user\``,
    );

    await queryRunner.query(`DROP TABLE \`order_items\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
  }
};
