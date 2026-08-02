"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geofencing_controller_1 = require("./geofencing.controller");
const router = (0, express_1.Router)();
const controller = new geofencing_controller_1.GeofencingController();
router.post("/check", controller.check);
exports.default = router;
//# sourceMappingURL=grofencing.route.js.map