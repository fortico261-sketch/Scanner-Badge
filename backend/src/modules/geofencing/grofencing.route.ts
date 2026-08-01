import { Router } from "express";
import { GeofencingController } from "./geofencing.controller";

const router = Router();
const controller = new GeofencingController();

router.post("/check", controller.check);

export default router;