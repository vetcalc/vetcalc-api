import app from "app.js";
import request from "supertest";

describe("/delivery", () => {
    test("GET /delivery", async () => {
        const response = await request(app)
	    .get("/delivery");
	expect(response.status).toEqual(200);
    });

    test("unauthenticated POST /delivery", async () => {
	const response = await request(app)
	    .post("/delivery")
	    .set("Content-Type", "application/json");
	expect(response.status).toEqual(511);
    });

});
