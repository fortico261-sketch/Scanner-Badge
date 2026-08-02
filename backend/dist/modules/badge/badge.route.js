"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const badge_controller_1 = require("./badge.controller");
const router = (0, express_1.Router)();
const controller = new badge_controller_1.BadgeController();
router.post("/associate", controller.asociate);
router.get("/:uid/employe", controller.findEmploye);
exports.default = router;
//# sourceMappingURL=badge.route.js.map