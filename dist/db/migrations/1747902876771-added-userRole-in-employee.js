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
exports.AddedUserRoleInEmployee1747902876771 = void 0;
class AddedUserRoleInEmployee1747902876771 {
    constructor() {
        this.name = 'AddedUserRoleInEmployee1747902876771';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."employee_role_enum" AS ENUM('UI', 'UX', 'DEVELOPER', 'HR')`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "role" "public"."employee_role_enum" NOT NULL DEFAULT 'DEVELOPER'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
            yield queryRunner.query(`DROP TYPE "public"."employee_role_enum"`);
        });
    }
}
exports.AddedUserRoleInEmployee1747902876771 = AddedUserRoleInEmployee1747902876771;
//# sourceMappingURL=1747902876771-added-userRole-in-employee.js.map