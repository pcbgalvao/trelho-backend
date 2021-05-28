
app
.route("/list")
.get((req, res) => res.send({ data: listMethods.list() }))
.post((req, res) =>
  res.send({ data: listMethods.listCreate(listName, description) })
)
.delete((req, res) => res.send({ data: listMethods.listCreate(listId) }))
.put((req, res) =>
  res.send({ data: listMethods.listCreate(listId, newName, newDescription) })
);
