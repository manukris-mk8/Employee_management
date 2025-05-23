"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeInEmployeeAddressEntity21747989260368 = void 0;
class ChangeInEmployeeAddressEntity21747989260368 {
    constructor() {
        this.name = 'ChangeInEmployeeAddressEntity21747989260368';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" date NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP NOT NULL`);
        });
    }
}
exports.ChangeInEmployeeAddressEntity21747989260368 = ChangeInEmployeeAddressEntity21747989260368;
//# sourceMappingURL=1747989260368-change-in-employee-address-entity2.js.map