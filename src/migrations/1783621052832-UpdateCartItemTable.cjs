module.exports = class UpdateCartItemTable1783621052832 {
  name = "UpdateCartItemTable1783621052832";

  async up(queryRunner) {
    // Remove as foreign keys
    await queryRunner.query(`
      ALTER TABLE \`cart_items\`
      DROP FOREIGN KEY \`FK_edd714311619a5ad09525045838\`
    `);

    await queryRunner.query(`
      ALTER TABLE \`cart_items\`
      DROP FOREIGN KEY \`FK_72679d98b31c737937b8932ebe6\`
    `);

    // Cria índices simples para as FKs
    await queryRunner.query(`
      CREATE INDEX \`IDX_cart_items_cartId\`
      ON \`cart_items\` (\`cartId\`)
    `);

    await queryRunner.query(`
      CREATE INDEX \`IDX_cart_items_productId\`
      ON \`cart_items\` (\`productId\`)
    `);

    // Agora pode remover o índice antigo
    await queryRunner.query(`
      DROP INDEX \`uk_cart_product_variant\`
      ON \`cart_items\`
    `);

    // Remove a coluna
    await queryRunner.query(`
      ALTER TABLE \`cart_items\`
      DROP COLUMN \`art_url\`
    `);

    // Cria o novo índice único
    await queryRunner.query(`
      CREATE UNIQUE INDEX \`uk_cart_product_variant\`
      ON \`cart_items\`
      (\`cartId\`, \`productId\`, \`color\`, \`size\`)
    `);

    // Recria as FKs
    await queryRunner.query(`
      ALTER TABLE \`cart_items\`
      ADD CONSTRAINT \`FK_edd714311619a5ad09525045838\`
      FOREIGN KEY (\`cartId\`)
      REFERENCES \`carts\`(\`id\`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE \`cart_items\`
      ADD CONSTRAINT \`FK_72679d98b31c737937b8932ebe6\`
      FOREIGN KEY (\`productId\`)
      REFERENCES \`products\`(\`id\`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
    `);
  }

  async down(queryRunner) {}
};
