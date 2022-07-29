import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";
import { youtubeLinkRegex } from "../../src/schemas/recommendationsSchemas";
import RandExp from "randexp";

export class RecommendationFactory {
  LinkGenerator: RandExp;

  constructor() {
    this.LinkGenerator = new RandExp(youtubeLinkRegex);
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  newMockRecommendation({
    wrongLink = false,
    score = this.randomInt(1, 10),
  } = {}) {
    let name = faker.internet.userName();
    let youtubeLink = this.LinkGenerator.gen();

    if (wrongLink) youtubeLink = faker.random.alpha();

    return {
      name,
      youtubeLink,
      id: +faker.random.numeric(2),
      score,
    };
  }

  async registerNewRecommendation() {
    const { name, youtubeLink } = this.newMockRecommendation();
    const { id } = await prisma.recommendation.create({
      data: { name, youtubeLink },
    });
    return { id, name, youtubeLink };
  }

  generateNMocks(n: number) {
    return Array(n).map(() => this.newMockRecommendation());
  }
}
