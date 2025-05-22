import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserRoleInEmployee1747902876771 implements MigrationInterface {
    name = 'AddedUserRoleInEmployee1747902876771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."employee_role_enum" AS ENUM('UI', 'UX', 'DEVELOPER', 'HR')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" "public"."employee_role_enum" NOT NULL DEFAULT 'DEVELOPER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."employee_role_enum"`);
    }

}
