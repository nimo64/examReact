const request = require("supertest");
const { app } = require("../server");
const mongoose = require("mongoose");
const config = require("../config");
const mockingoose = require("mockingoose");
const articleModel = require("../api/articles/articles.model");
const jwt = require("jsonwebtoken");

describe("tester API users", () => {
    let token;
    const USER_ID = "fake";

    const MOCK_DATA = [
      {
        state: "ana",
        createdBy: "nfegeg@gmail.com",
      },
    ];
    const MOCK_DATA_CREATED = {
        state: "test",
        createdBy: "test@test.net",
    };

    const MOCK_DATA_ACTUAL = new articleModel ({
        state: "test2",
        createdBy: "test2@test.net",
    });

    const MOCK_DATA_UPDATED = {
        state: "test3",
        createdBy: "test3@test.net",
    };
  
    beforeEach(() => {
      token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
      // mongoose.Query.prototype.find = jest.fn().mockResolvedValue(MOCK_DATA);
      mockingoose(articleModel).toReturn(MOCK_DATA, "find");
      mockingoose(articleModel).toReturn(MOCK_DATA_CREATED, "save");
    });
  
  
    test("[Articles] Create article", async () => {
      const res = await request(app)
        .post("/api/articles")
        .send(MOCK_DATA_CREATED)
        .set("x-access-token", token);
      expect(res.status).toBe(201);
      expect(res.body.state).toBe(MOCK_DATA_CREATED.state);
    });

    test("[Articles] Update article", async () => {
        const res = await request(app)
          .put(`/api/articles/${MOCK_DATA_ACTUAL}`)
          .send(MOCK_DATA_UPDATED)
          .set("x-access-token", token);
        expect(res.status).toBe(200);
        expect(res.body.state).toBe(MOCK_DATA_UPDATED.state);
      });

      test("[Articles] Delete article", async () => {
        const res = await request(app)
          .delete(`/api/articles/${MOCK_DATA_ACTUAL}`)
          .set("x-access-token", token);
        expect(res.statusCode).toBe(204);

      });

  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  });

