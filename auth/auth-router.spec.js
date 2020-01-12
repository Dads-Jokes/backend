const server = require("../api/server");
const db = require("../database/dbConfig");
const request = require("supertest");

describe("register user", () => {
  it("should register user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "CodyCaro", password: "password" });

    expect(res.status).toBe(201);
  });

  it("should return a json object", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "CodyCaro", password: "password" });

    expect(res.type).toBe("application/json");
  });

  beforeEach(async () => {
    await db("users").truncate();
  });
});

describe("log in", () => {
  it("should find the user upon login", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "CodyCaro", password: "password" });

    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "CodyCaro", password: "password" });

    expect(res.status).toBe(200);
  });

  it("should return a token to user", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "CodyCaro", password: "password" });

    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "CodyCaro", password: "password" });

    expect(res.body.token).toBeDefined();
  });

  beforeEach(async () => {
    await db("users").truncate();
  });
});
