import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableSettingsFields1700000000003 implements MigrationInterface {
  name = "NullableSettingsFields1700000000003";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_settings" ALTER COLUMN "companyName" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "app_settings" ALTER COLUMN "companyEmail" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "app_settings" ALTER COLUMN "companyContact" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "app_settings" ALTER COLUMN "companyWhatsapp" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "app_settings" ALTER COLUMN "companyAddress" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "app_settings" SET "companyName" = '' WHERE "companyName" IS NULL`);
    await queryRunner.query(`ALTER TABLE "app_settings" ALTER COLUMN "companyName" SET NOT NULL`);
    await queryRunner.query(`UPDATE "app_settings" SET "companyEmail" = '' WHERE "companyEmail" IS NULL`);
    await queryRunner.query(`ALTER TABLE "app_settings" ALTER COLUMN "companyEmail" SET NOT NULL`);
    await queryRunner.query(`UPDATE "app_settings" SET "companyContact" = '' WHERE "companyContact" IS NULL`);
    await queryRunner.query(`ALTER TABLE "app_settings" ALTER COLUMN "companyContact" SET NOT NULL`);
    await queryRunner.query(`UPDATE "app_settings" SET "companyWhatsapp" = '' WHERE "companyWhatsapp" IS NULL`);
    await queryRunner.query(`ALTER TABLE "app_settings" ALTER COLUMN "companyWhatsapp" SET NOT NULL`);
    await queryRunner.query(`UPDATE "app_settings" SET "companyAddress" = '' WHERE "companyAddress" IS NULL`);
    await queryRunner.query(`ALTER TABLE "app_settings" ALTER COLUMN "companyAddress" SET NOT NULL`);
  }
}
