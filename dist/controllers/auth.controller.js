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
exports.AuthController = void 0;
const httpExceptions_1 = __importDefault(require("../exceptions/httpExceptions"));
const logger_service_1 = require("../services/logger.service");
class AuthController {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.logger = logger_service_1.LoggerService.getInstance('AuthController');
        router.post('/login', this.login.bind(this));
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    this.logger.error('require email and password');
                    throw new httpExceptions_1.default(400, "Email and password is required");
                }
                const data = yield this.authService.login(email, password);
                this.logger.info('Authentication successfull');
                return res.status(200).json({ data });
            }
            catch (error) {
                this.logger.error('Authentication failed');
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map