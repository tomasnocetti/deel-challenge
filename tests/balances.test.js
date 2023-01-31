const request = require("supertest");
const { seed } = require("../scripts/seedDb");
const app = require("../src/app");

const BASE_PATH = "/balances";

beforeAll(async () => {
  await seed();
});

describe(`GET ${BASE_PATH}/:user_id`, () => {
  it("Should return the balance for a given user", async () => {
    const profileId = 1;
    const res = await request(app).get(`${BASE_PATH}/1`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(200);
    const body = res.body;
    expect(body.balance).toBeGreaterThan(0);
  });
});
