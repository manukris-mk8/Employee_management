import {Request, Router, NextFunction, Response} from "express";
import AuthService from "../services/auth.service";
import HttpException from "../exceptions/httpExceptions";

export class AuthController {
    constructor(private authService: AuthService, private router: Router) {
        router.post('/login',this.login.bind(this))
    }

    async login (req : Request,res: Response,next: NextFunction) {
        try {
            const {email,password} = req.body;
            if(!email || !password) {
                throw new HttpException (400,"Email and password is required");
            }
            const data = await this.authService.login(email,password)
            res.status(200).send(data)
            
        } catch (error) {
            next(error);
        }
    }
}