import express, { Request, Response } from "express";
import employeeRouter from "./routes/employee.route";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { processTimeMiddleware } from "./middlewares/processTimeMiddleware";
import datasource from "./db/data-source";
import { errorHandlineMiddleware } from "./middlewares/errorHandlingMiddleware";

const {Client} = require('pg');

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.use("/employee", employeeRouter);

server.use(errorHandlineMiddleware)


server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

(async () => {
  try{
    await datasource.initialize();
    console.log('connected');
  }
  catch {
    console.log('Failed to connect to DB');
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("server listening to 3000");
  });

})();

