import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { employeController } from "./employe.module";

const router = Router();

router.use(authMiddleware);

router.get("/", employeController.getAll.bind(employeController));
router.get("/:id", employeController.getById.bind(employeController));
router.post("/", employeController.create.bind(employeController));
router.put("/:id", employeController.update.bind(employeController));
router.delete("/:id", employeController.delete.bind(employeController));

export default router;
