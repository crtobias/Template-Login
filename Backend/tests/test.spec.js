import app from "../src/app";
import request from "supertest";
import jwt from "jsonwebtoken";

//test para probar ruta que no sirve para nada solo testear
describe("GET   /users/test", () => {
  test("should respond whit a 200 status code", async () => {
    const response = await request(app).get("/users/test").send();
    expect(response.statusCode).toBe(200);
  });
});

// pongo para testear el id 1 pero podria poner algun id default
describe("GET /users/getUser/1", () => {
  test("should retrieve a user by id and respond with 200 status code", async () => {
    const response = await request(app).get("/users/getUser/1").send();
    expect(response.statusCode).toBe(200);
  });
});

//Testing /verify-email
describe("GET /verify-email", () => {
  test("Testing status 200 Verify-email Endpoint", async () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get(`/users/verify-email?token=${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Correo electrónico verificado con éxito."
    );
  });
});

//Testing /verify  (email por body) POST
describe("POST /users/verify", () => {
  test("should verify user email and respond with 200 status code", async () => {
    const requestBody = {
      email: "tgonzalezarriola@gmail.com",
    };

    const response = await request(app).post("/users/verify").send(requestBody);

    expect(response.statusCode).toBe(200);
  });
});

//Testing /login  (email , password , name por body) POST

describe("POST /users/login", () => {
  test("should login user and respond with 200 status code", async () => {
    const requestBody = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    const response = await request(app).post("/users/login").send(requestBody);

    expect(response.statusCode).toBe(200);
  });
});

//Testing /send-email-password  (newPassword y email por body) POST

describe("POST /users/send-email-password", () => {
  test("should send email to reset password and respond with 200 status code", async () => {
    const requestBody = {
      email: "test@example.com",
      newPassword: "newpassword123",
    };

    const response = await request(app)
      .post("/users/send-email-password")
      .send(requestBody);

    expect(response.statusCode).toBe(200);
  });
});
