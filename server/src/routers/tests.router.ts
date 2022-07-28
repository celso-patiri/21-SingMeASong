import { Router } from "express";
import testsService from "../services/tests.service.js";

const testRouter = Router();

testRouter.post("/reset-database", testsService.clearDatabase);

export default testRouter;
