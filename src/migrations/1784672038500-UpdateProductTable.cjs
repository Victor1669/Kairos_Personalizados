/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class UpdateProductTable1784672038500 {
  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
      ALTER TABLE products
      ADD COLUMN status ENUM('ativo', 'inativo')
      NOT NULL
      DEFAULT 'ativo'
    `);
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(`
      ALTER TABLE products
      DROP COLUMN status
    `);
  }
};
