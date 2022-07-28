import { prisma } from "../database.js";

const clearDatabase = async () => {
  if (process.env.NODE_ENV == "test") {
    await prisma.recommendation.deleteMany();
  }
};

export default {
  clearDatabase,
};
