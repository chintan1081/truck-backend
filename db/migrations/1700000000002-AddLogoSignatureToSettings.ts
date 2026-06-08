import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLogoSignatureToSettings1700000000002 implements MigrationInterface {
  name = "AddLogoSignatureToSettings1700000000002";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_settings" ADD COLUMN IF NOT EXISTS "companyGst" varchar`);
    await queryRunner.query(`ALTER TABLE "app_settings" ADD COLUMN IF NOT EXISTS "companyLogo" text`);
    await queryRunner.query(`ALTER TABLE "app_settings" ADD COLUMN IF NOT EXISTS "companySignature" text`);
    await queryRunner.query(`ALTER TABLE "app_settings" ADD COLUMN IF NOT EXISTS "bankDetails" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_settings" DROP COLUMN IF EXISTS "bankDetails"`);
    await queryRunner.query(`ALTER TABLE "app_settings" DROP COLUMN IF EXISTS "companySignature"`);
    await queryRunner.query(`ALTER TABLE "app_settings" DROP COLUMN IF EXISTS "companyLogo"`);
    await queryRunner.query(`ALTER TABLE "app_settings" DROP COLUMN IF EXISTS "companyGst"`);
  }
}
