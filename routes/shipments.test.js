const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("invalid when productId is less than 1000.", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.status).toEqual(400);
  })

  test("invalid when name does not have a first and last name.", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.status).toEqual(400);
  });

  test ("invalid when address is not in the correct format." , async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test",
      zip: "12345-6789",
    });

    expect(resp.status).toEqual(400);
  });

  test ("invalid when zip code is not in the correct format.", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345",
    });

    expect(resp.status).toEqual(400);
  });
});
