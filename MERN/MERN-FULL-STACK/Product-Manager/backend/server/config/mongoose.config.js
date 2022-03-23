const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Successfully established a connection"))
    .catch(err => console.log("Unable to establish a connection"))
