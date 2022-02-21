import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1645438651778 implements MigrationInterface {
  public name: string = 'AddUser1645438651778';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "User" ("id" character varying(36) NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_99f220333df04d5f74f6db26c0" ON "User" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_99f220333df04d5f74f6db26c0"`,
    );
    await queryRunner.query(`DROP TABLE "User"`);
  }
}
