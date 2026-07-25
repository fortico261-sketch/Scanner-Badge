import { Router } from "express"
import { ChantierController } from "./chantier.controller"
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

const controller = new ChantierController();

router.use(authMiddleware);

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/",controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;