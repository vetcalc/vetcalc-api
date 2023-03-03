import app from "app.js";
import request from "supertest";

describe("/concentrations", () => {
    test("GET /concentrations", async () => {
        const response = await request(app)
	    .get("/concentrations");
	expect(response.status).toEqual(200);
    });

    test("GET /concentrations/:id", async () => {
	const response = await request(app)
	    .get("/concentrations/1");
	expect(response.status).toEqual(200);
    });

    test("unauthenticated POST /concentrations", async () => {
	const response = await request(app)
	    .post("/concentrations/1")
	    .set("Content-Type", "application/json");
	expect(response.status).toEqual(511);
    });

});
