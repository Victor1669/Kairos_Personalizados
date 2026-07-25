/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class UpdateUserTable1785000639833 {
  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN recovery_code VARCHAR(255) NULL,
      ADD COLUMN recovery_code_expiration DATETIME NULL
    `);
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN recovery_code,
      DROP COLUMN recovery_code_expiration
    `);
  }
};
