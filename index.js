const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const employeeRoute = require('./Routes/employeeRoute');
app.use(cors());
app.use(bodyParser());
const mongodburl = config.MONGODB_URL;
mongoose
	.connect(mongodburl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((res) => console.log('DB connected'))
	.catch((error) => console.log(error));
app.get('/', (req, res) => {
	res.send('Hello buddy, Apke father aaye hai');
});

app.use('/user/', userRoute);
app.use('/employee/', employeeRoute);

app.listen(5000, () => {
	console.log(`server is listening to 5000`);
});
