import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingSettingsColumns1700000000004 implements MigrationInterface {
  name = "AddMissingSettingsColumns1700000000004";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_settings" ADD COLUMN IF NOT EXISTS "companyGst" varchar`);
    await queryRunner.query(`ALTER TABLE "app_settings" ADD COLUMN IF NOT EXISTS "bankDetails" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_settings" DROP COLUMN IF EXISTS "bankDetails"`);
    await queryRunner.query(`ALTER TABLE "app_settings" DROP COLUMN IF EXISTS "companyGst"`);
  }
}
