import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEntities1645446114152 implements MigrationInterface {
  public name: string = 'AddEntities1645446114152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "User" ("id" uuid NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_99f220333df04d5f74f6db26c0" ON "User" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "Exercise" ("id" uuid NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_5897c562f3162fc527c0013f9f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Exercise" ADD CONSTRAINT "FK_5bdb2b30fea4152bf039320cd7d" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Exercise" DROP CONSTRAINT "FK_5bdb2b30fea4152bf039320cd7d"`,
    );
    await queryRunner.query(`DROP TABLE "Exercise"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_99f220333df04d5f74f6db26c0"`,
    );
    await queryRunner.query(`DROP TABLE "User"`);
  }
}
