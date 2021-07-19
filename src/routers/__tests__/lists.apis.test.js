const request = require("supertest");
const app = require("../../app"); //reference to you app.js file

describe("Tests on Lists", () => {

  let newList = {
    name: "Name.001",
  };

  it("create a list", async () => {
    const response = await request(app).post("/lists/create").send(newList);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toMatch(newList.name);
    newList = { ...newList, ...response.body };
  });

  it("list of all lists", async () => {
    const response = await request(app).get("/lists");
    expect(response.statusCode).toBe(200);

  });

  it("rename a list name", async () => {
    const response = await request(app).put(
      `/lists/rename/${newList._id}/neName.002`
    );
    expect(response.statusCode).toBe(200);
  });

  it("delete a list", async () => {
    const response = await request(app).delete(`/lists/delete/${newList._id}`);
    expect(response.statusCode).toBe(200);
  });
});
