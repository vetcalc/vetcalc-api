import app from "app.js";
import request from "supertest";

describe("/dosages", () => {
    test("GET /dosages", async () => {
        const response = await request(app)
	    .get("/dosages");
	expect(response.status).toEqual(200);
    });

    test("GET /dosages/:id", async () => {
	const response = await request(app)
	    .get("/dosages/1");
	expect(response.status).toEqual(200);
    });

    test("unauthenticated POST /dosages", async () => {
	const response = await request(app)
	    .post("/dosages")
	    .set("Content-Type", "application/json");
	expect(response.status).toEqual(511);
    });

});
