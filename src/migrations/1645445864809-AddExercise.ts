import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExercise1645445864809 implements MigrationInterface {
  public name: string = 'AddExercise1645445864809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Exercise" ("id" character varying(36) NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL, "user_id" character varying(36) NOT NULL, CONSTRAINT "PK_5897c562f3162fc527c0013f9f5" PRIMARY KEY ("id"))`,
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
  }
}
