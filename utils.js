// utils.js — ESM-compatible

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Reads data from a JSON database
 * @param {function} callback - Handler of data returned from database
 * @param {string} file - Database name
 */
export function getData(callback, file) {
	fs.readFile(path.join(__dirname, `${file}.json`), (err, d) => {
		if (err) throw err;
		callback(JSON.parse(d));
	});
}

/**
 * Writes data to a JSON database.  === WARNING: DESTRUCTIVE ===
 * @param {object} data - The full database to write back to the JSON file
 * @param {string} file - Database name
 */
export function saveData(data, file) {
	fs.writeFileSync(
		path.join(__dirname, `${file}.json`),
		JSON.stringify(data, null, "\t")
	);
}

/**
 * Counts occurrences of a value in an array
 * @param {array} arr - The array to search
 * @param {*} search - The value to search for
 * @returns {number} occurrences
 */
export function occurences(arr, search) {
	let obj = {};
	for (let i = 0; i < arr.length; i++) {
		obj[arr[i]] = (obj[arr[i]] || 0) + 1;
	}
	return obj[search] || 0;
}

/**
 * A function to trim one long string into an array of shorter strings
 * @param {string} string
 * @param {number} charmax
 * @param {string} charbreak
 * @returns {[string]}
 */
export function charSplit(string, charmax, charbreak) {
	let str = string.split(charbreak);
	let starr = [""];
	let stin = 0;
	while (str.length > 0) {
		if (
			starr[stin].length + str[0].length + charbreak.length >
			charmax
		) {
			stin++;
			starr[stin] = "";
		}
		starr[stin] += str[0] + charbreak;
		str.splice(0, 1);
	}
	return starr;
}

/**
 * A better shuffle
 * @param {array} array - The array to shuffle
 * @returns {array} array - The shuffled array
 */
export function shuffle(array) {
	let m = array.length,
		t,
		i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	let a = [];
	for (let i = 0; i < array.length; i++) {
		a[i] = array[i];
	}
	return a;
}

/**
 * Replaces all instances of search in str with replacement
 * @param {string} str
 * @param {string} search
 * @param {string} replacement
 * @returns {string}
 */
export function replaceAll(str, search, replacement) {
	return str.split(search).join(replacement);
}
