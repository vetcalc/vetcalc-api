import app from "app.js";
import request from "supertest";

describe("/delivery", () => {
    test("GET /delivery", async () => {
        const response = await request(app)
	    .get("/delivery");
	expect(response.status).toEqual(200);
    });

    test("GET /delivery/:id", async () => {
	const response = await request(app)
	    .get("/delivery/1");
	expect(response.status).toEqual(200);
    });

    test("unauthenticated POST /delivery", async () => {
	const response = await request(app)
	    .post("/delivery/1")
	    .set("Content-Type", "application/json");
	expect(response.status).toEqual(511);
    });

});
