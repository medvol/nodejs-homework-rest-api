const mongoose = require("mongoose");
const request = require("supertest");
const login = require("./login");
const app = require("../../app");
require("dotenv").config();
const {
  expect,
  test,
  describe,
  beforeAll,
  afterAll,
} = require("@jest/globals");

const { validationBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const { DB_HOST, PORT = 3000 } = process.env;
mongoose.set("strictQuery", true);
app.post("/api/users/login", validationBody(schemas.loginUserSchema), login);

describe("test login controller", () => {
  const server = app.listen(PORT);
  const authUser = {
    email: "ukrainians@hello.com",
    password: "123456",
  };

  beforeAll(() => {
    mongoose
      .connect(DB_HOST)
      .then(() => server)
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  });
  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
  test("return response status 200", async () => {
    require("dotenv").config();
    const response = await request(app).post("/api/users/login").send(authUser);
    expect(response.status).toBe(200);
  });

  test("return token", async () => {
    require("dotenv").config();
    const response = await request(app).post("/api/users/login").send(authUser);
    expect(response.body.token).toBeTruthy();
  });

  test("return user object with keys 'email' and 'subscription' and data type string", async () => {
    const response = await request(app).post("/api/users/login").send(authUser);
    expect(response.body.user).toStrictEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
