"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employe_controller_1 = require("./employe.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const employeController = new employe_controller_1.EmployeController();
router.use(auth_middleware_1.authMiddleware);
router.get("/", employeController.getAll.bind(employeController));
router.get("/:id", employeController.getById.bind(employeController));
router.post("/", employeController.create.bind(employeController));
router.put("/:id", employeController.update.bind(employeController));
router.delete("/:id", employeController.delete.bind(employeController));
exports.default = router;
//# sourceMappingURL=employe.route.js.map