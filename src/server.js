const app =  require ('./app');
const { API_PORT } = require("./constants");

const PORT = process.env.PORT || API_PORT;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} port`);
});

module.express