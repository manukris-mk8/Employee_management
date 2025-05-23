import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeInEmployeeAddressEntity21747989260368 implements MigrationInterface {
    name = 'ChangeInEmployeeAddressEntity21747989260368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP NOT NULL`);
    }

}
