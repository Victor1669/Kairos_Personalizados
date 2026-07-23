/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class UpdateCartTable1784834468276 {
  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
      ALTER TABLE carts
      MODIFY COLUMN status
      ENUM('ativo', 'finalizado')
      NOT NULL
      DEFAULT 'ativo';
    `);
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(`
      ALTER TABLE carts
      MODIFY COLUMN status
      ENUM('ativo', 'finalizado', 'abandonado')
      NOT NULL
      DEFAULT 'ativo';
    `);
  }
};
