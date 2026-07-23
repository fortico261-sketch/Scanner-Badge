import express from "express";
import authRoutes from "./modules/auth/auth.route";
import chantiersRoutes from "./modules/chantiers/chantier.route";


const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chantiers", chantiersRoutes);


export default app;