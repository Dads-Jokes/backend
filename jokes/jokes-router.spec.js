const server = require("../api/server");
const db = require("../database/dbConfig");
const request = require("supertest");

let testToken = "";
let userId;

describe("Get all jokes", () => {
  beforeEach(async () => {
    await db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
    await request(server)
      .post("/api/auth/register")
      .send({ username: "CodyCaro", password: "password" });

    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "CodyCaro", password: "password" });

    testToken = res.body.token;
    userId = res.body.user_id;
  });

  it("should return jokes", async () => {
    const res = await request(server)
      .get("/api/jokes")
      .set("authorization", `${testToken}`);

    console.log(testToken);

    expect(res.status).toBe(201);
  });
});

describe("Wrong Token", () => {
  beforeEach(async () => {
    await db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
    await request(server)
      .post("/api/auth/register")
      .send({ username: "CodyCaro", password: "password" });

    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "CodyCaro", password: "password" });
    testToken = res.body.token;
    userId = res.body.user_id;
  });

  it("should not return jokes", async () => {
    const res = await request(server)
      .get(`/api/jokes/byuser/${userId}`)
      .set("authorization", "teststishths");

    console.log(res.status.message);

    expect(res.status).toBe(401);
  });
});
