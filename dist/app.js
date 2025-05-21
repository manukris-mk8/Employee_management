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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_router_1 = __importDefault(require("./employee_router"));
const loggerMiddleware_1 = __importDefault(require("./loggerMiddleware"));
const processTimeMiddleware_1 = require("./processTimeMiddleware");
const data_source_1 = __importDefault(require("./data-source"));
const { Client } = require('pg');
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(loggerMiddleware_1.default);
server.use(processTimeMiddleware_1.processTimeMiddleware);
server.use("/employee", employee_router_1.default);
server.get("/", (req, res) => {
    res.status(200).send("Hello world");
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.default.initialize();
        console.log('connected');
    }
    catch (_a) {
        console.log('Failed to connect to DB');
        process.exit(1);
    }
    server.listen(3000, () => {
        console.log("server listening to 3000");
    });
}))();
//# sourceMappingURL=app.js.map