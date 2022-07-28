import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { RecommendationFactory } from "../factories/recommentation.factory";

describe("recomendations services unit tests", () => {
  const factory = new RecommendationFactory();

  describe("insert", () => {
    it("should throw conflict error if name is already registered", async () => {
      const mockRecommendation = factory.newMockRecommendation();

      jest
        .spyOn(recommendationRepository, "findByName")
        .mockResolvedValueOnce(mockRecommendation);

      try {
        await recommendationService.insert(mockRecommendation);
        fail();
      } catch (err) {
        expect(err.type).toBe("conflict");
      }
    });

    it("should go through if nothing is wrong", async () => {
      jest
        .spyOn(recommendationRepository, "findByName")
        .mockImplementation(() => undefined);

      jest
        .spyOn(recommendationRepository, "create")
        .mockImplementation(() => undefined);

      await recommendationService.insert(factory.newMockRecommendation());
    });
  });

  describe("upvote", () => {
    it("should throw not found error if id is not found", async () => {
      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(undefined);

      const { id } = factory.newMockRecommendation();
      try {
        await recommendationService.upvote(id);
        fail();
      } catch (err) {
        expect(err.type).toBe("not_found");
      }
    });

    it("should go through if nothing is wrong", async () => {
      const mockRecommendation = factory.newMockRecommendation();
      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(mockRecommendation);

      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockImplementation(() => undefined);

      await recommendationService.upvote(mockRecommendation.id);
    });
  });

  describe("downvote", () => {
    it("should throw not found error if id is not found", async () => {
      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(undefined);

      const { id } = factory.newMockRecommendation();
      try {
        await recommendationService.downvote(id);
        fail();
      } catch (err) {
        expect(err.type).toBe("not_found");
      }
    });

    it("should go through if nothing is wrong", async () => {
      const mockRecommendation = factory.newMockRecommendation();
      jest
        .spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce(mockRecommendation);

      jest
        .spyOn(recommendationRepository, "updateScore")
        .mockResolvedValueOnce(mockRecommendation);

      jest
        .spyOn(recommendationRepository, "remove")
        .mockImplementationOnce(async () => {});

      await recommendationService.downvote(mockRecommendation.id);
    });
  });

  describe("getRandom", () => {
    it("should throw not found error if there are no recommendations", async () => {
      jest
        .spyOn(recommendationRepository, "findAll")
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);

      try {
        await recommendationService.getRandom();
        fail();
      } catch (err) {
        expect(err.type).toBe("not_found");
      }
    });

    it("should return same object if there is only one recommendation", async () => {
      const mockRecommendation = factory.newMockRecommendation();
      jest
        .spyOn(recommendationRepository, "findAll")
        .mockResolvedValueOnce([mockRecommendation]);

      const recommendation = await recommendationService.getRandom();
      expect(recommendation).toEqual(mockRecommendation);
    });

    it("should return random object in array of recommendations", async () => {
      const mockRecommendations = factory.generateNMocks(
        factory.randomNumber(1)
      );
      jest
        .spyOn(recommendationRepository, "findAll")
        .mockResolvedValueOnce(mockRecommendations);

      const recommendation = await recommendationService.getRandom();
      expect(mockRecommendations).toContain(recommendation);
    });
  });

  describe("get", () => {
    it("should call recommendationRepository.findAll", async () => {
      jest
        .spyOn(recommendationRepository, "findAll")
        .mockImplementationOnce(async () => []);

      const recommendation = await recommendationService.getRandom();
      expect(mockRecommendations).toContain(recommendation);
    });
  });
});
