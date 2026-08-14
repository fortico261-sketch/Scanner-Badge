import { Router } from "express";
import { CongeController } from "./conge.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

const congeController = new CongeController();

router.use(authMiddleware);

router.get("/", congeController.getAll.bind(congeController));
router.get("/employe/:employeId", congeController.getByEmployeId.bind(congeController));
router.get("/:id", congeController.getById.bind(congeController));
router.post("/",congeController.create.bind(congeController));
router.put("/:id",congeController.update.bind(congeController));
router.delete("/:id",congeController.delete.bind(congeController));


export default router;