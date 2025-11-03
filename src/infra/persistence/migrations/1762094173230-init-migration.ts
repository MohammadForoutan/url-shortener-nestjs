import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1762094173230 implements MigrationInterface {
  name = 'InitMigration1762094173230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "verificationToken" character varying(255), "verificationTokenExpiresAt" TIMESTAMP, "isEmailVerified" boolean NOT NULL DEFAULT false, "passwordResetToken" character varying(255), "passwordResetTokenExpiresAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "urls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "originalUrl" character varying(255) NOT NULL, "shortUrl" character varying(255) NOT NULL, "isCustom" boolean NOT NULL DEFAULT false, "clickCount" integer NOT NULL DEFAULT '0', "expirationDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" uuid, CONSTRAINT "UQ_2fc4ddd0c4c69cedae3529fed81" UNIQUE ("shortUrl"), CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "urls" ADD CONSTRAINT "FK_a6ec289117b2ec1c6b2d99cafea" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "urls" DROP CONSTRAINT "FK_a6ec289117b2ec1c6b2d99cafea"`,
    );
    await queryRunner.query(`DROP TABLE "urls"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
