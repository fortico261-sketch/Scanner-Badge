"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chantier_controller_1 = require("./chantier.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new chantier_controller_1.ChantierController();
router.use(auth_middleware_1.authMiddleware);
router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
exports.default = router;
//# sourceMappingURL=chantier.route.js.map