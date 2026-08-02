"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChantierController = void 0;
const chantier_service_1 = require("./chantier.service");
class ChantierController {
    constructor() {
        this.service = new chantier_service_1.ChantiersService();
    }
    async getAll(req, res) {
        try {
            const chantiers = await this.service.getAll();
            res.status(200).json(chantiers);
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur lors de la recuperation des chantiers', error });
        }
    }
    async getById(req, res) {
        try {
            const id = req.params.id;
            const chantier = await this.service.getById(id);
            if (!chantier) {
                return res.status(404).json({ message: 'chantier introuvable' });
            }
            res.status(200).json(chantier);
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error });
        }
    }
    async create(req, res) {
        try {
            const data = req.body;
            const chantier = await this.service.create(data);
            res.status(201).json(chantier);
        }
        catch (error) {
            res.status(500).json({ message: 'Impossible de creer le chantier', error });
        }
    }
    async update(req, res) {
        try {
            const chantier = await this.service.update(req.params.id, req.body);
            res.status(200).json(chantier);
        }
        catch (error) {
            res.status(500).json({ message: 'Impossible de mettre a jour le chantier', error });
        }
    }
    async delete(req, res) {
        try {
            await this.service.delete(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ message: 'Impossible de supprimer le chantier', error });
        }
    }
}
exports.ChantierController = ChantierController;
//# sourceMappingURL=chantier.controller.js.map