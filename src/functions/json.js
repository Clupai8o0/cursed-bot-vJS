const fs = require("fs");
const fsA = require("fs").promises;
const resp = require("./response.js");
const colors = require("colors");

const readJsonSync = (filename = "") => {
  try {
    if (!filename) throw new Error("Missing filename");
		const data = JSON.parse(fs.readFileSync(`./json/${filename}.json`));
		return resp(true, "Successfully parsed json data", data);
	} catch (err) {
		console.error(colors.red(err));
		return resp(false, "Failed while parsing data or some other issue");
	}
};

const readJsonAsync = async (filename = "") => {
	try {
    if (!filename) throw new Error("Missing filename");
		const data = JSON.parse(await fsA.readFile(`./json/${filename}.json`));
		return resp(true, "Successfully parsed json data", data);
	} catch (err) {
		console.error(colors.red(err));
		return resp(false, "Failed while parsing data or some other issue");
	}
};

const writeJsonSync = (filename="", data=null) => {
  try {
    if (!filename || !data) throw new Error("Missing paramters");
    fs.writeFileSync(`./json/${filename}.json`, JSON.stringify(data));
    return resp(true, "Successfully wrote data", `${filename}.json`);
  } catch (err) {
    console.error(colors.red(err));
    return resp(false, "Failed while trying to write json data");
  }
}
const writeJsonAsync = async (filename = "", data = null) => {
	try {
		if (!filename || !data) throw new Error("Missing paramters");
		await fsA.writeFile(`./json/${filename}.json`, JSON.stringify(data));
		return resp(true, "Successfully wrote data", `${filename}.json`);
	} catch (err) {
		console.error(colors.red(err));
		return resp(false, "Failed while trying to write json data");
	}
};

module.exports = { readJsonSync, readJsonAsync, writeJsonSync, writeJsonAsync };
