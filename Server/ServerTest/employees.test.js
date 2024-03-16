import { app } from "server";
import supertest from "supertest";
import { test, beforeAll, describe, expect, afterAll } from "vitest";

export const serverTest = supertest(app);
export let token = "";

// THIS IS TEST VERSION FOR LOCAL DATABASE !

const userEmail = process.env.TEST_USER_EMAIL;
const userPassword = process.env.TEST_USER_PASSWORD;

beforeAll(async () => {
  await serverTest
    .post("/login")
    .send({
      email: userEmail,
      password: userPassword,
    })
    .expect(200)
    .expect(async function (res) {
      if (!res.body.token) throw new Error("validation faild, token missing");
      token = res.body.token;
    });

  afterAll(async () => {
    token = "";
  });
});

describe("test the employees path", () => {
  test("/employees/", async () => {
    const response = await serverTest
      .get("/employees")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });

  test("GET employees/singleEmployer/51", async () => {
    const response = await serverTest
      .get("/employees/singleEmployer/51")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });

  test("GET employees/timeManagment/47", async () => {
    const response = await serverTest
      .get("/employees/timeManagment/47")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });

  test("GET employees/appointmentRange/47", async () => {
    const response = await serverTest
      .get("/employees/appointmentRange/47")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });

  test("GET employees/serviceStatistic/47", async () => {
    const response = await serverTest
      .get("/employees/serviceStatistic/47")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });

  test("GET employees/appointmentsByHourRange/47", async () => {
    const response = await serverTest
      .get("/employees/appointmentsByHourRange/47")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });

  test("GET employees/appointmentByDay/47", async () => {
    const response = await serverTest
      .get("/employees/appointmentByDay/47")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });

  test("GET employees/appointmentsTotal/47", async () => {
    const response = await serverTest
      .get("/employees/appointmentsTotal/47")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });
  test("GET employees/totalMoneyAppService", async () => {
    const response = await serverTest
      .get("/employees/totalMoneyAppService")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });

  test("GET employees/dataByService", async () => {
    const response = await serverTest
      .get("/employees/dataByService")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });

  test("GET employees/serviceByMonth", async () => {
    const response = await serverTest
      .get("/employees/serviceByMonth")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
  });

  //  I need to add PUT Delete and POST end points
});
