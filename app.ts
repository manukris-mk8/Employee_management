import express, { Request, Response } from "express";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./loggerMiddleware";
import { processTimeMiddleware } from "./processTimeMiddleware";
import datasource from "./data-source";

const {Client} = require('pg');

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.use("/employee", employeeRouter);

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

