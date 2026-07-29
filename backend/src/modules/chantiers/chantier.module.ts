import { ChantierController } from "./chantier.controller";
import { ChantiersRepository } from "./chantier.repository";
import { ChantiersService } from "./chantier.service";

export const chantiersRepository = new ChantiersRepository();
export const chantiersService = new ChantiersService(chantiersRepository);
export const chantiersController = new ChantierController(chantiersService);
