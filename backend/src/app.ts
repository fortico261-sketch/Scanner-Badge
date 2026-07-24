import express from "express";
import authRoutes from "./modules/auth/auth.route";
import chantiersRoutes from "./modules/chantiers/chantier.route";
import employeRoutes from "./modules/employes/employe.route"

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chantiers", chantiersRoutes);
app.use("/employe", employeRoutes)

export default app;