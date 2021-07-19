const request = require("supertest");
const app = require("../../app"); //reference to you app.js file

describe("Tests on Cards", () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000)); // avoid jest open handle error
  });

  let newList = {
    name: "for card testings",
  };
  let cardToBeDeleted = {
    title: "...to be deleted",
    desc: "desctobedeleted",
  };
  let cardToBeRenamed = {
    title: "...to be renamed",
    desc: "desctoberenamed",
  };

  it("create a list to updated with cards", async () => {
    const response = await request(app).post("/lists/create").send(newList);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toMatch(newList.name);
    newList = response.body;
    cardToBeDeleted.fk_idlist = newList._id;
    cardToBeRenamed.fk_idlist = newList._id;
  });

  it("create a card to be deleted", async () => {
    const response = await request(app)
      .post("/cards/create")
      .send(cardToBeDeleted);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toMatch(cardToBeDeleted.title);
    cardToBeDeleted = response.body;
  });

  it("create a card to be renamed", async () => {
    const response = await request(app)
      .post("/cards/create")
      .send(cardToBeRenamed);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toMatch(cardToBeRenamed.title);
    cardToBeRenamed = response.body;
  });

  it("list all cards", async () => {
    const response = await request(app).get("/cards/list");
    expect(response.statusCode).toEqual(200);
  });

  it("Rename a card title", async (done) => {
    const responseRename = await request(app).put(
      `/cards/rename/${cardToBeRenamed._id}/title/changedtitle`
    );
    expect(responseRename.statusCode).toBe(200);
    done();
  });

  it("Delete a card", async (done) => {
    const responseDelete = await request(app).delete(
      `/cards/delete/${cardToBeDeleted._id}`
    );
    expect(responseDelete.statusCode).toBe(200);
    done();
    //test if card  exists
  });
});
