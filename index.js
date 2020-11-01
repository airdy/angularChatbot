const app = require('./app');
const port = process.env.PORT || 57580;


app.listen(port, () => console.log(`Server started ${port}`));