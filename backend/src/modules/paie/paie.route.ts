import { Router } from "express";
import { PaieController } from "./paie.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

const paieController = new PaieController();

router.use(authMiddleware);

router.get( "/:employeId", paieController.calculerPaie.bind(paieController) );

export default router;
