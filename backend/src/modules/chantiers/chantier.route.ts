import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { chantiersController } from "./chantier.module";

const router = Router();

router.use(authMiddleware);

router.get("/", chantiersController.getAll.bind(chantiersController));
router.get("/:id", chantiersController.getById.bind(chantiersController));
router.post("/", chantiersController.create.bind(chantiersController));
router.put("/:id", chantiersController.update.bind(chantiersController));
router.delete("/:id", chantiersController.delete.bind(chantiersController));

export default router;
