import { PointagesRepository } from "./pointage.repository";
import { PointagesService } from "./pointage.service";
import { PointageController } from "./pointage.controller";
import { employeService } from "../employes/employe.module";

export const pointagesRepository = new PointagesRepository();
export const pointagesService = new PointagesService(pointagesRepository, employeService);
export const pointagesController = new PointageController(pointagesService);
