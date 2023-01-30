const request = require("supertest");
const app = require("../src/app");

const BASE_PATH = "/contracts";

describe(`GET ${BASE_PATH}/:id`, () => {
  it("Should return a contract if the user is valid", async () => {
    const contractId = 1;
    const clientId = 1;

    const res = await request(app).get(`${BASE_PATH}/${contractId}`).set({
      profile_id: 1,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.id === contractId);
    expect(res.body.ClientId === clientId);
  });
});
