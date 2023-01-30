const request = require("supertest");
const app = require("../src/app");

const BASE_PATH = "/contracts";

describe(`GET ${BASE_PATH}/:id`, () => {
  it("Should return a contract if the user is valid", async () => {
    const contractId = 1;
    const profileId = 1;

    const res = await request(app).get(`${BASE_PATH}/${contractId}`).set({
      profile_id: profileId,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.id === contractId);
    expect(res.body.ClientId === profileId);
  });

  it("Should return 404 if the profile doesn't match the Contract Profile Id", async () => {
    const contractId = 1;
    const profileId = 2;

    const res = await request(app).get(`${BASE_PATH}/${contractId}`).set({
      profile_id: profileId,
    });
    expect(res.statusCode).toBe(404);
    expect(res.body === undefined);
  });
});
