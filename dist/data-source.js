"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const employee_entity_1 = __importDefault(require("./employee.entity"));
const datasource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'training',
    username: 'postgres',
    password: 'postgres',
    extra: { max: 5, min: 2 },
    synchronize: true,
    logging: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    entities: [employee_entity_1.default]
});
exports.default = datasource;
//# sourceMappingURL=data-source.js.map