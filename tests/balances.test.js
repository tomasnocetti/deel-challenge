const request = require("supertest");
const { seed } = require("../scripts/seedDb");
const app = require("../src/app");

const BASE_PATH = "/balances";

beforeAll(async () => {
  await seed();
});

xdescribe(`GET ${BASE_PATH}/:user_id`, () => {
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

describe(`POST ${BASE_PATH}/deposit/:userId`, () => {
  it("Should add 100 to balance", async () => {
    const profileId = 1;
    const balanceToAdd = 100;
    const prevBalanceRes = await request(app).get(`${BASE_PATH}/1`).set({
      profile_id: profileId,
    });

    const prevBalance = prevBalanceRes.body.balance;

    const res = await request(app)
      .post(`${BASE_PATH}/deposit/${profileId}`)
      .send({ amount: balanceToAdd })
      .set({
        profile_id: profileId,
      });

    expect(res.status).toBe(201);

    const aftBalanceRes = await request(app).get(`${BASE_PATH}/1`).set({
      profile_id: profileId,
    });
    const aftBalance = aftBalanceRes.body.balance;

    expect(aftBalance).toBe(prevBalance + balanceToAdd);
  });

  it("Should add another 100 to balance", async () => {
    const profileId = 1;
    const balanceToAdd = 100;
    const prevBalanceRes = await request(app).get(`${BASE_PATH}/1`).set({
      profile_id: profileId,
    });

    const prevBalance = prevBalanceRes.body.balance;

    const res = await request(app)
      .post(`${BASE_PATH}/deposit/${profileId}`)
      .send({ amount: balanceToAdd })
      .set({
        profile_id: profileId,
      });

    expect(res.status).toBe(201);

    const aftBalanceRes = await request(app).get(`${BASE_PATH}/1`).set({
      profile_id: profileId,
    });
    const aftBalance = aftBalanceRes.body.balance;

    expect(aftBalance).toBe(prevBalance + balanceToAdd);
  });
  it("Shouldn't allow to add 131 because its more than 25% of client's unpaid jobs", async () => {
    const profileId = 1;
    const balanceToAdd = 131;

    const res = await request(app)
      .post(`${BASE_PATH}/deposit/${profileId}`)
      .send({ amount: balanceToAdd })
      .set({
        profile_id: profileId,
      });

    expect(res.status).toBe(400);
  });
  it("Show throw 400 if balance amount is not valid number", async () => {
    const profileId = 1;
    const balanceToAdd = "asda";

    const res = await request(app)
      .post(`${BASE_PATH}/deposit/${profileId}`)
      .send({ amount: balanceToAdd })
      .set({
        profile_id: profileId,
      });

    expect(res.status).toBe(400);
  });
  it("Show throw 400 if balance amount is negative", async () => {
    const profileId = 1;
    const balanceToAdd = -1;

    const res = await request(app)
      .post(`${BASE_PATH}/deposit/${profileId}`)
      .send({ amount: balanceToAdd })
      .set({
        profile_id: profileId,
      });

    expect(res.status).toBe(400);
  });
});
