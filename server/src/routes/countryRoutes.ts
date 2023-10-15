import express from "express";
import * as countryController from "../controllers/countryController";

const router = express.Router();

router.get("/countries", countryController.getCountries);
router.get("/simulationData/:country", countryController.getSimulationData);
router.delete("/:country/purchases/:id", countryController.deletePurchase);
router.post("/:country/purchases", countryController.addPurchase);

export default router;
