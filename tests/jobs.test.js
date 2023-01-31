const request = require("supertest");
const app = require("../src/app");

const BASE_PATH = "/jobs";

describe(`GET ${BASE_PATH}/unpaid`, () => {
  it("Should return all unpaid jobs for a given Profile with unpaid jobs as Client", async () => {
    const profileId = 1;
    const res = await request(app).get(`${BASE_PATH}/unpaid`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(200);
    const jobs = res.body;
    expect(jobs.length).toBeGreaterThan(0);

    jobs.forEach((contract) => {
      // expect(contract.ContractorId).toBe(profileId);
      expect(contract.paid).toBe(false);
    });
  });
  it("Should return all unpaid jobs for a given Profile with unpaid jobs as Contractor", async () => {
    const profileId = 6;
    const res = await request(app).get(`${BASE_PATH}/unpaid`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(200);
    const jobs = res.body;
    expect(jobs.length).toBeGreaterThan(0);

    jobs.forEach((contract) => {
      // expect(contract.ContractorId).toBe(profileId);
      expect(contract.paid).toBe(false);
    });
  });
  it("Should return no jobs for a given Profile with no unpaid Jobs", async () => {
    const profileId = 2;
    const res = await request(app).get(`${BASE_PATH}/unpaid`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(200);
    const jobs = res.body;
    expect(jobs.length).toBe(0);
  });
});
