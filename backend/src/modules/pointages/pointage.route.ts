import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { pointagesController } from "./pointage.module";

const router = Router();

router.use(authMiddleware);

router.get("/", pointagesController.getAll.bind(pointagesController));
router.get("/:id", pointagesController.getById.bind(pointagesController));

export default router;
