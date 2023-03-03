import app from "app.js";
import request from "supertest";

describe("/animals", () => {
    test("GET /animals", async () => {
        const response = await request(app)
	    .get("/animals");
	expect(response.status).toEqual(200);
    });

    test("GET /animals/:id", async () => {
	const response = await request(app)
	    .get("/animals/1");
	expect(response.status).toEqual(200);
    });

    test("unauthenticated POST /animals", async () => {
	const response = await request(app)
	    .post("/animals")
	    .set("Content-Type", "application/json");
	expect(response.status).toEqual(511);
    });

});
