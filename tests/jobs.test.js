const request = require("supertest");
const { seed } = require("../scripts/seedDb");
const app = require("../src/app");

const BASE_PATH = "/jobs";

beforeAll(async () => {
  await seed();
});

describe(`GET ${BASE_PATH}/unpaid`, () => {
  it("Should return 401 if there's no profile_id", async () => {
    const res = await request(app).get(`${BASE_PATH}/unpaid`);

    expect(res.statusCode).toBe(401);
  });
  it("Should return all unpaid jobs for a given Profile with unpaid jobs as Client", async () => {
    const profileId = 1;
    const res = await request(app).get(`${BASE_PATH}/unpaid`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(200);
    const jobs = res.body;
    expect(jobs.length).toBeGreaterThan(0);

    jobs.forEach((contract) => {
      expect(contract?.Contract.ClientId).toBe(profileId);
      expect(contract.paid).not.toBe(true);
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
      expect(contract?.Contract.ContractorId).toBe(profileId);
      expect(contract.paid).not.toBe(true);
    });
  });
  it("Should return no jobs for a given Profile with no unpaid Jobs", async () => {
    const profileId = 8;
    const res = await request(app).get(`${BASE_PATH}/unpaid`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(200);
    const jobs = res.body;
    expect(jobs.length).toBe(0);
  });
});

describe(`POST ${BASE_PATH}/:job_id/pay`, () => {
  it("Should return 401 if there's no profile_id", async () => {
    const res = await request(app).get(`${BASE_PATH}/:job_id/pay`);

    expect(res.statusCode).toBe(401);
  });
  it("Should return 201 if there's a valid ClientId with an unpaid Job and money on the balance", async () => {
    const jobId = 2;
    const profileId = 1;
    const res = await request(app).post(`${BASE_PATH}/${jobId}/pay`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(201);

    const resUnpaid = await request(app).get(`${BASE_PATH}/unpaid`).set({
      profile_id: profileId,
    });
    const jobs = resUnpaid.body;

    const paidJob = jobs.find((el) => {
      return el.id === jobId;
    });

    expect(paidJob).toBe(undefined);
  });
  it("Should return 404 if the job has already been paid ", async () => {
    const jobId = 2;
    const profileId = 1;
    const res = await request(app).post(`${BASE_PATH}/${jobId}/pay`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(404);
  });
  it("Should return 400 if the client doesn't have enough money in the balance", async () => {
    const jobId = 5;
    const profileId = 4;
    const res = await request(app).post(`${BASE_PATH}/${jobId}/pay`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("BALANCE_LOW");
  });
  it("Should return 404 if the Contractor triggers pay", async () => {
    const jobId = 5;
    const profileId = 7;
    const res = await request(app).post(`${BASE_PATH}/${jobId}/pay`).set({
      profile_id: profileId,
    });

    expect(res.statusCode).toBe(404);
  });
});
