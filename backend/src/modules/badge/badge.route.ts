import { Router } from "express"
import { BadgeController } from "./badge.controller"

const router = Router();

const controller = new BadgeController();

router.post("/associate", controller.asociate);
router.get("/:uid/employe", controller.findEmploye);

export default router;