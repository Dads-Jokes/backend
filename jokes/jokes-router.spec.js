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
    expect(res.status).toBe(401);
  });
});

describe("Create a Joke", () => {
  beforeEach(async () => {
    await db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
    await request(server)
      .post("/api/auth/register")
      .send({
        username: "CodyCaro",
        password: "password",
        email: "cody@cody.com"
      });

    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "CodyCaro", password: "password" });
    testToken = res.body.token;
    userId = res.body.user_id;
  });

  it("should create a joke", async () => {
    const res = await request(server)
      .post(`/api/jokes/create/${userId}`)
      .set("authorization", `${testToken}`)
      .send({
        question: "Is this a test joke?",
        answer: "Yes",
        private: "true"
      });

    expect(res.status).toBe(201);
  });
});

describe("Edit a Joke", () => {
  beforeEach(async () => {
    await db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
    await request(server)
      .post("/api/auth/register")
      .send({
        username: "CodyCaro",
        password: "password",
        email: "cody@cody.com"
      });

    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "CodyCaro", password: "password" });
    testToken = res.body.token;
    userId = res.body.user_id;
  });

  it("should create a joke", async () => {
    const res = await request(server)
      .post(`/api/jokes/create/${userId}`)
      .set("authorization", `${testToken}`)
      .send({
        question: "Is this a test joke?",
        answer: "Yes",
        private: "true"
      });

    expect(res.status).toBe(201);
  });

  it("should edit a joke", async () => {
    const res = await request(server)
      .put(`/api/jokes/edit/1`)
      .set("authorization", `${testToken}`)
      .send({
        question: "Is this a test edited joke?",
        answer: "Yes edited",
        private: "false"
      });

    expect(res.status).toBe(201);
  });
});

describe("Get Jokes by user", () => {
  beforeEach(async () => {
    await db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
    await request(server)
      .post("/api/auth/register")
      .send({
        username: "CodyCaro",
        password: "password",
        email: "test@test.com"
      });

    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "CodyCaro", password: "password" });
    testToken = res.body.token;
    userId = res.body.user_id;
  });

  it("should create a joke", async () => {
    const res = await request(server)
      .post(`/api/jokes/create/${userId}`)
      .set("authorization", `${testToken}`)
      .send({
        question: "Is this a test joke?",
        answer: "Yes",
        private: "true"
      });

    expect(res.status).toBe(201);
  });

  it("should get jokes by user", async () => {
    const res = await request(server)
      .get(`/api/jokes/byuser/${userId}`)
      .set("authorization", `${testToken}`);

    expect(res.status).toBe(201);
  });
});
