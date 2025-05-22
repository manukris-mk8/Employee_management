import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPasswordInEmployee1747887945371 implements MigrationInterface {
    name = 'AddedPasswordInEmployee1747887945371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
