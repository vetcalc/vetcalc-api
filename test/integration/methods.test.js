import app from "app.js";
import request from "supertest";

describe("/methods", () => {
    test("GET /methods", async () => {
        const response = await request(app)
	    .get("/methods");
	expect(response.status).toEqual(200);
    });

    test("GET /methods/:id", async () => {
	const response = await request(app)
	    .get("/methods/1");
	expect(response.status).toEqual(200);
    });

    test("unauthenticated POST /methods", async () => {
	const response = await request(app)
	    .post("/methods")
	    .set("Content-Type", "application/json");
	expect(response.status).toEqual(511);
    });

});
