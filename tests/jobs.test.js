const request = require("supertest");
const app = require("../src/app");

const BASE_PATH = "/jobs";

describe(`GET ${BASE_PATH}`, () => {
  it("Should return 200", async () => {
    const profileId = 1;
    const res = await request(app).get(`${BASE_PATH}`).set({
      profile_id: profileId,
    });
    expect(res.statusCode).toBe(200);
  });
});
