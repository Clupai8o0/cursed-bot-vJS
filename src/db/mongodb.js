const colors = require("colors");

const { MongoClient } = require("mongodb");
const connectionURL = process.env.MONGODB_URL;
const client = new MongoClient(connectionURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const databaseName = "cursed-database";
let dbConnection;

module.exports = {
	connectToServer: function (callback) {
		client.connect(function (err, db) {
			if (err || !db) return callback(err);

      dbConnection = db.db(databaseName);
      console.log(colors.cyan("Connected to database!"));

      return callback();
		});
	},
  getDb: function() {
    return dbConnection;
  }
};
