import { Router } from "express";
import recommendationRouter from "./recommendationRouter.js";
import testRouter from "./tests.router.js";

const appRouter = Router();

appRouter.use("/recommendations", recommendationRouter);

if (process.env.NODE_ENV == "test") appRouter.use(testRouter);

export default appRouter;
