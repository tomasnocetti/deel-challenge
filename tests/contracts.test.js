const request = require("supertest");
const app = require("../src/app");

const BASE_PATH = "/contracts";

const CONTRACT_STATUS = {
  TERMINATED: "terminated",
  IN_PROGRESS: "in_progress",
  NEW: "new",
};

describe(`GET ${BASE_PATH}/:id`, () => {
  it("Should return a contract if the user.id is ClientId", async () => {
    const contractId = 1;
    const profileId = 1;

    const res = await request(app).get(`${BASE_PATH}/${contractId}`).set({
      profile_id: profileId,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(contractId);
    expect(res.body.ClientId).toBe(profileId);
  });
  it("Should return a contract if the user.id is ContractorId", async () => {
    const contractId = 1;
    const profileId = 5;

    const res = await request(app).get(`${BASE_PATH}/${contractId}`).set({
      profile_id: profileId,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(contractId);
    expect(res.body.ContractorId).toBe(profileId);
  });

  it("Should return 404 if the profile doesn't match the Contract Profile Id", async () => {
    const contractId = 1;
    const profileId = 2;

    const res = await request(app).get(`${BASE_PATH}/${contractId}`).set({
      profile_id: profileId,
    });
    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({});
  });
  it("Should return 401 if there's no profile_id", async () => {
    const contractId = 1;

    const res = await request(app).get(`${BASE_PATH}/${contractId}`);

    expect(res.statusCode).toBe(401);
  });
});

describe(`GET ${BASE_PATH}`, () => {
  it("Should return all non terminated contracts for a user with contracts as Client", async () => {
    const profileId = 1;

    const res = await request(app).get(`${BASE_PATH}`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(200);
    const contracts = res.body;
    expect(contracts.length).toBeGreaterThan(0);

    contracts.forEach((contract) => {
      expect(contract.ClientId).toBe(profileId);
      expect(contract.status).toBe(CONTRACT_STATUS.IN_PROGRESS);
    });
  });

  it("Should return all non terminated contracts for a user with contracts as Contractor", async () => {
    const profileId = 6;

    const res = await request(app).get(`${BASE_PATH}`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(200);
    const contracts = res.body;
    expect(contracts.length).toBeGreaterThan(0);

    contracts.forEach((contract) => {
      expect(contract.ContractorId).toBe(profileId);
      expect(contract.status).toBe(CONTRACT_STATUS.IN_PROGRESS);
    });
  });

  it("Should return no contracts for a user with no contracts", async () => {
    const profileId = 9;

    const res = await request(app).get(`${BASE_PATH}`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(0);
  });
  it("Should return 401 if there's no profile_id", async () => {
    const res = await request(app).get(`${BASE_PATH}`);

    expect(res.statusCode).toBe(401);
  });
});
