const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://abanobessam19:z78%40D4%2424gbBUZr@abelectrioncs.mr64q.mongodb.net/abElectronics")
.then(() => {
    console.log("db connected");
})
.catch(() => {
    console.log("faild to connect");
})

module.exports = mongoose;