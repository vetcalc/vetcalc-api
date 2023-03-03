import app from "app.js";
import request from "supertest";

describe("/drugs", () => {
    test("GET /drugs", async () => {
        const response = await request(app)
	    .get("/drugs");
	expect(response.status).toEqual(200);
    });

    test("GET /drugs/:id", async () => {
	const response = await request(app)
	    .get("/drugs/1");
	expect(response.status).toEqual(200);
    });

    test("unauthenticated POST /drugs", async () => {
	const response = await request(app)
	    .post("/drugs")
	    .set("Content-Type", "application/json");
	expect(response.status).toEqual(511);
    });

});
