"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const datasource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'training',
    username: 'postgres',
    password: 'postgres',
    extra: { max: 5, min: 2 },
    synchronize: false,
    logging: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    entities: ['dist/entities/*.js'],
    migrations: ["dist/db/migrations/*.js"]
});
exports.default = datasource;
//# sourceMappingURL=data-source.js.map