import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.route";
import chantiersRoutes from "./modules/chantiers/chantier.route";
import employeRoutes from "./modules/employes/employe.route";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import geoRoute from "./modules/geofencing/grofencing.route";
import badgeRoute from "./modules/badge/badge.route";
import pointageRoutes from "./modules/pointages/pointage.route"
import congeRoutes from  "./modules/conges/conges.route"

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", authRoutes);
app.use("/chantiers", chantiersRoutes);
app.use("/employes", employeRoutes);
app.use("/geofencing", geoRoute);
app.use("/badges", badgeRoute);
app.use("/pointages", pointageRoutes);
app.use("/conges", congeRoutes )
app.get("/test", (req, res) => {
    res.json({ message: "API fonctionne" });
});

export default app;