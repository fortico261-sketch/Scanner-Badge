"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pointage_controller_1 = require("./pointage.controller");
const router = (0, express_1.Router)();
const controller = new pointage_controller_1.PointageController();
router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
exports.default = router;
//# sourceMappingURL=pointage.route.js.map