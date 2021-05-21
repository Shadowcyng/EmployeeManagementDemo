module.exports = {
	MONGODB_URL:
		process.env.MONGODB_URL ||
		'mongodb://satyam:Shadowcyng%40123@cluster0-shard-00-02.sdwe0.mongodb.net:27017,cluster0-shard-00-00.sdwe0.mongodb.net:27017,cluster0-shard-00-01.sdwe0.mongodb.net:27017/employee?authSource=admin&replicaSet=atlas-si9pmo-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true',
	JWT_SECRET: process.env.JWT_SECRET || 'somethingsrcret',
};
