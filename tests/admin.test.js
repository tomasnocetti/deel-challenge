const request = require("supertest");
const { seed } = require("../scripts/seedDb");
const app = require("../src/app");

const BASE_PATH = "/admin";

beforeAll(async () => {
  await seed();
});

describe(`GET ${BASE_PATH}/best-profession`, () => {
  it("Should return the profession for the given time period", async () => {
    const end = "2023-01-03";
    const start = "2020-01-03";

    const res = await request(app).get(
      `${BASE_PATH}/best-profession?start=${start}&end=${end}`
    );

    const response = res.body;
    expect(res.statusCode).toBe(200);
    expect(response.earnings).toBe(2020);
    expect(response.profession).toBe("Programmer");
  });
  it("Should return the profession for the given date", async () => {
    const end = "2020-08-14";
    const start = "2020-08-14";

    const res = await request(app).get(
      `${BASE_PATH}/best-profession?start=${start}&end=${end}`
    );

    const response = res.body;
    expect(res.statusCode).toBe(200);
    expect(response.earnings).toBe(121);
    expect(response.profession).toBe("Programmer");
  });

  it("Should give 400 if start date is not valid", async () => {
    const end = "2020-08-14";
    const start = "2020-18-14";

    const res = await request(app).get(
      `${BASE_PATH}/best-profession?start=${start}&end=${end}`
    );

    const response = res.body;
    expect(res.statusCode).toBe(400);
  });
  it("Should give 400 if end date is not valid", async () => {
    const end = "2020-18-14";
    const start = "2020-10-14";

    const res = await request(app).get(
      `${BASE_PATH}/best-profession?start=${start}&end=${end}`
    );

    const response = res.body;
    expect(res.statusCode).toBe(400);
  });
  it("Should give 400 if end date or start date is not present", async () => {
    const end = "";
    const start = "";

    const res = await request(app).get(
      `${BASE_PATH}/best-profession?start=${start}&end=${end}`
    );

    const response = res.body;
    expect(res.statusCode).toBe(400);
  });
  it("Should give no results for a time period with no results", async () => {
    const end = "2022-10-14";
    const start = "2023-10-14";

    const res = await request(app).get(
      `${BASE_PATH}/best-profession?start=${start}&end=${end}`
    );

    const response = res.body;
    expect(res.statusCode).toBe(200);
    expect(response.profession).toBe(undefined);
  });
});

describe(`GET ${BASE_PATH}/best-clients`, () => {
  it("Should return the best two clients for the given time period", async () => {
    const end = "2023-01-03";
    const start = "2020-01-03";

    const res = await request(app).get(
      `${BASE_PATH}/best-clients?start=${start}&end=${end}`
    );

    const response = res.body;

    expect(res.statusCode).toBe(200);
    expect(response.length).toBe(2);
    expect(response[0]).toMatchObject({
      id: 4,
      fullName: "Ash Kethcum",
      paid: 2020,
    });
    expect(response[1]).toMatchObject({
      id: 2,
      fullName: "Mr Robot",
      paid: 442,
    });
  });
  it("Should return one client for the given time period", async () => {
    const end = "2023-01-03";
    const start = "2020-01-03";
    const limit = 1;
    const res = await request(app).get(
      `${BASE_PATH}/best-clients?start=${start}&end=${end}&limit=${limit}`
    );

    const response = res.body;

    expect(res.statusCode).toBe(200);
    expect(response.length).toBe(1);
    expect(response[0]).toMatchObject({
      id: 4,
      fullName: "Ash Kethcum",
      paid: 2020,
    });
  });

  it("Should return three client for the given time period", async () => {
    const end = "2020-08-15";
    const start = "2020-08-15";
    const limit = 5;
    const res = await request(app).get(
      `${BASE_PATH}/best-clients?start=${start}&end=${end}&limit=${limit}`
    );

    const response = res.body;

    expect(res.statusCode).toBe(200);
    expect(response.length).toBe(3);
    expect(response[1]).toMatchObject({
      id: 1,
      fullName: "Harry Potter",
      paid: 221,
    });
  });

  it("Should give 400 if start date is not valid", async () => {
    const end = "2020-08-14";
    const start = "2020-18-14";

    const res = await request(app).get(
      `${BASE_PATH}/best-clients?start=${start}&end=${end}`
    );

    const response = res.body;
    expect(res.statusCode).toBe(400);
  });
  it("Should give 400 if end date is not valid", async () => {
    const end = "2020-18-14";
    const start = "2020-10-14";

    const res = await request(app).get(
      `${BASE_PATH}/best-clients?start=${start}&end=${end}`
    );

    const response = res.body;
    expect(res.statusCode).toBe(400);
  });

  it("Should give 400 if end date or start date is not present", async () => {
    const end = "";
    const start = "";

    const res = await request(app).get(
      `${BASE_PATH}/best-clients?start=${start}&end=${end}`
    );

    const response = res.body;
    expect(res.statusCode).toBe(400);
  });

  it("Should give no results for a time period with no results", async () => {
    const end = "2022-10-14";
    const start = "2023-10-14";

    const res = await request(app).get(
      `${BASE_PATH}/best-clients?start=${start}&end=${end}`
    );

    const response = res.body;
    expect(res.statusCode).toBe(200);
    expect(response.length).toBe(0);
  });
});
