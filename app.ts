import express, { Request, Response } from "express";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { processTimeMiddleware } from "./middlewares/processTimeMiddleware";
import datasource from "./db/data-source";
import { errorHandlineMiddleware } from "./middlewares/errorHandlingMiddleware";
import departmentRouter from "./routes/department.routes";
import { authRouter } from "./routes/auth.route";
import { authMiddleware } from "./middlewares/auth.middleware";
import { LoggerService } from "./services/logger.service";

// const {Client} = require('pg');

const server = express();
const logger = LoggerService.getInstance('app()');

server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.use("/employee", authMiddleware, employeeRouter);
server.use("/department",authMiddleware, departmentRouter);
server.use("/auth",authRouter)


server.use(errorHandlineMiddleware)


server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

(async () => {
  try{
    await datasource.initialize();
    logger.info("DB connected");
  }
  catch(error) {
    logger.error(`Failed to connect to DB - ${error}`);
    process.exit(1);
  }
  server.listen(3000, () => {
    logger.info("server listening to 3000");
  });

})();

