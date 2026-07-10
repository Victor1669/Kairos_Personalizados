/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddReviewTable1783637876199 {
  name = "AddReviewTable1783637876199";

  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE \`reviews\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`stars\` INT NOT NULL,
                \`description\` TEXT NULL,
                \`user_id\` INT NOT NULL,
                \`product_id\` INT NOT NULL,

                PRIMARY KEY (\`id\`),

                CONSTRAINT \`FK_reviews_user\`
                    FOREIGN KEY (\`user_id\`)
                    REFERENCES \`users\`(\`id\`)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,

                CONSTRAINT \`FK_reviews_product\`
                    FOREIGN KEY (\`product_id\`)
                    REFERENCES \`products\`(\`id\`)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            ) ENGINE=InnoDB;
        `);
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE \`reviews\`;
        `);
  }
};
