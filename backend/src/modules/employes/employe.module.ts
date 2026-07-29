import { EmployeRepository } from "./employe.repository";
import { EmployeService } from "./employe.service";
import { EmployeController } from "./employe.controller";
import { chantiersService } from "../chantiers/chantier.module";

export const employeRepository = new EmployeRepository();
export const employeService = new EmployeService(employeRepository, chantiersService);
export const employeController = new EmployeController(employeService);
