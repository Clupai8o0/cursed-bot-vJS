const dbo = require("./mongodb.js");
const resp = require("../functions/response.js");

const findPlayer = (id) => {
	if (!id) return resp(false, "You did not provide any id parameter");

	const dbConnect = dbo.getDb();
	return new Promise((resolve, reject) => {
		dbConnect.collection("players").findOne({ id }, (err, player) => {
			if (err) {
				reject(resp(false, "Error while trying to find player", err));
			}
			if (player === null) {
				resolve(resp(true, "No user found", null));
			}
			resolve(resp(true, "Player found", player));
		});
	});
}

const findPlayerName = (name) => {
	const dbConnect = dbo.getDb();
	
	return new Promise((resolve, reject) => {
		dbConnect.collection("players").findOne({ name: name.toLowerCase() }, (err, player) => {
			if (err) {
				reject(resp(false, "Error while trying to find player", err))
			}
			if (player === null) {
				resolve(resp(true, "No user found", null));
			}
			resolve(resp(true, "Player found", player));
		})
	})
}

const createPlayer = (player) => {
	const dbConnect = dbo.getDb();

	return new Promise((resolve, reject) => {
		dbConnect.collection("players").insertOne(player, (err, result) => {
			if (err) {
				reject(resp(false, "Error while trying to add player", err));
			}
			resolve(resp(true, "Player created", result));
		});
	});
}

module.exports = { findPlayerName, createPlayer, findPlayer };
