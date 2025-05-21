import express from "express";
import Employee from "./employee.entity";
import datasource from "./data-source";

const employeeRouter = express.Router();

employeeRouter.get("/", async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const employees = await employeeRepository.find();
  res.status(200).send(employees);
});

employeeRouter.get("/:id", async(req, res) => {
  const employeeRepository = datasource.getRepository(Employee);

  const empId = Number(req.params["id"]);

  const employee = await employeeRepository.findOneBy({id:empId});

  if (!employee) {
    res.status(404).send("Employee not found");
    return;
  }
  res.status(200).send(employee);
});

employeeRouter.post("/", async(req, res) => {
  console.log(req.body);
  const employeeRepository = datasource.getRepository(Employee);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  // newEmployee.createdAt = new Date();
  // newEmployee.updatedAt = new Date();
  employeeRepository.insert(newEmployee);
  res.status(200).send(newEmployee);
});

employeeRouter.delete("/:id", async(req, res) => {
  const empId = Number(req.params["id"]);

  const employeeRepository = datasource.getRepository(Employee);
  employeeRepository.delete({id:empId});

  res.status(200).send();
});

employeeRouter.put("/:id", async(req, res) => {
  const employeeRepository = datasource.getRepository(Employee);

  const empId = Number(req.params["id"]);

  const employee = await employeeRepository.findOneBy({id:empId});
  employee.email = req.body.email || employee.email;
  employee.name = req.body.name || employee.name;;
  
  employeeRepository.save(employee);
  console.log("update employees");
  res.status(200).send(employee);
});

employeeRouter.patch("/:id", async(req, res) => {
  const employeeRepository = datasource.getRepository(Employee);

  const empId = Number(req.params["id"]);

  // const employee = await employeeRepository.findOneBy({id:empId});
  const employee = new Employee();
  employee.email = req.body.email || employee.email;
  employee.name = req.body.name || employee.name;
  
  employeeRepository.update({id:empId},employee);
  console.log("update employees");
  res.status(200).send(employee);
});

export default employeeRouter;
