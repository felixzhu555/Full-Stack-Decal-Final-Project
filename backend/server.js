const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://raywan:car1234567@cluster0.4n88j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

const groupsRouter = require('./routes/groups');
const usersRouter = require('./routes/user');
const authRouter = require('./middleware/auth');

app.use('/auth', authRouter);
app.use('/groups', groupsRouter);
app.use('/user', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});