const server = require("../api/server");
const db = require("../database/dbConfig");
const request = require("supertest");

describe("register user", () => {
  beforeEach(async () => {
    await db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
  });

  it("should register user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "testUser",
        password: "password",
        email: "test@test.com"
      });

    expect(res.status).toBe(201);
  });

  it("should return a json object", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "testUser",
        password: "password",
        email: "test@test.com"
      });

    expect(res.type).toBe("application/json");
  });
});

describe("log in", () => {
  beforeEach(async () => {
    await db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
  });
  it("should find the user upon login", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({
        username: "testUser",
        password: "password",
        email: "test@test.com"
      });

    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "testUser", password: "password" });

    expect(res.status).toBe(200);
  });

  it("should return a token to user", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({
        username: "testUser",
        password: "password",
        email: "test@test.com"
      });

    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "testUser", password: "password" });

    console.log(res.body);
    expect(res.body.token).toBeDefined();
  });
});
