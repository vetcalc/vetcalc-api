import app from "app.js";
import request from "supertest";

describe("/units", () => {
    test("GET /units", async () => {
        const response = await request(app)
	    .get("/units");
	expect(response.status).toEqual(200);
    });

    test("GET /units/:id", async () => {
	const response = await request(app)
	    .get("/units/1");
	expect(response.status).toEqual(200);
    });

    test("unauthenticated POST /units", async () => {
	const response = await request(app)
	    .post("/units")
	    .set("Content-Type", "application/json");
	expect(response.status).toEqual(511);
    });

});
