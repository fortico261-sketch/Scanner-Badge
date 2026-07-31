import express from "express"
import authRoutes from "./modules/auth/auth.route"
import chantiersRoutes from "./modules/chantiers/chantier.route"
import employeRoutes from "./modules/employes/employe.route"
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"
import geoRoute from "./modules/geofencing/grofencing.route"
import badgeRoute from "./modules/badge/badge.route"

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();


app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/auth", authRoutes);
app.use("/chantiers", chantiersRoutes);
app.use("/employe", employeRoutes)
app.use("/geofencing",geoRoute )
app.use("/badges", badgeRoute)

export default app;