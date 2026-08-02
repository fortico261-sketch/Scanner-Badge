"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const chantier_route_1 = __importDefault(require("./modules/chantiers/chantier.route"));
const employe_route_1 = __importDefault(require("./modules/employes/employe.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const grofencing_route_1 = __importDefault(require("./modules/geofencing/grofencing.route"));
const badge_route_1 = __importDefault(require("./modules/badge/badge.route"));
const swaggerDocument = yamljs_1.default.load("./swagger.yaml");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use("/auth", auth_route_1.default);
app.use("/chantiers", chantier_route_1.default);
app.use("/employes", employe_route_1.default);
app.use("/geofencing", grofencing_route_1.default);
app.use("/badges", badge_route_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map