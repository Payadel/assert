"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertRegex = exports.assertLessEqual = exports.assertLess = exports.assertGreaterEqual = exports.assertGreater = exports.assertNotIn = exports.assertIn = exports.assertFalse = exports.assertTrue = exports.assertNotEquals = exports.assertEquals = void 0;
const assertEquals = (expected, actual) => new Promise((resolve, reject) => {
    if (expected === actual)
        return resolve(`✅ The expected (${expected}) is EQUAL to actual (${actual})`);
    return reject(new Error(`❌ The expected (${expected}) is NOT EQUAL to actual (${actual})`));
});
exports.assertEquals = assertEquals;
const assertNotEquals = (expected, actual) => new Promise((resolve, reject) => {
    if (expected !== actual)
        return resolve(`✅ The expected (${expected}) is NOT EQUAL to actual (${actual})`);
    return reject(new Error(`❌ The expected (${expected}) is EQUAL to actual (${actual})`));
});
exports.assertNotEquals = assertNotEquals;
function isTrue(input) {
    return new Promise((resolve, reject) => {
        switch (typeof input) {
            case "boolean":
                return resolve(input);
            case "string":
                return resolve(Boolean(input));
            case "number":
                return resolve(input === 0);
            default:
                if (input === null)
                    return resolve(false);
                return reject(new Error(`❌ The input type '${typeof input}' is not supported. Supported types: string, boolean and number.`));
        }
    });
}
const assertTrue = (input) => new Promise((resolve, reject) => isTrue(input)
    .then(is => is
    ? resolve(`✅ '${input}' is TRUE`)
    : reject(new Error(`❌ '${input}' is NOT TRUE`)))
    .catch(reject));
exports.assertTrue = assertTrue;
const assertFalse = (input) => new Promise((resolve, reject) => isTrue(input)
    .then(is => is
    ? reject(new Error(`❌ '${input}' is NOT FALSE`))
    : resolve(`✅ '${input}' is FALSE`))
    .catch(reject));
exports.assertFalse = assertFalse;
function isIn(member, container, caseSensitive) {
    return new Promise((resolve, reject) => {
        if (typeof member !== "string")
            return reject(new Error(`❌ Expected get string but got '${typeof member}'`));
        if (typeof container !== "string")
            return reject(new Error(`❌ Expected get string but got '${typeof container}'`));
        const memberStr = caseSensitive ? member : member.toLowerCase();
        const containerStr = caseSensitive
            ? container
            : container.toLowerCase();
        if (containerStr.includes(memberStr))
            return resolve(true);
        return resolve(false);
    });
}
const assertIn = (member, container, caseSensitive) => new Promise((resolve, reject) => isIn(member, container, caseSensitive)
    .then(is => is
    ? resolve(`✅ '${member}' is IN '${container}' with case ${caseSensitive ? "sensitive" : "insensitive"} check.`)
    : reject(new Error(`❌ '${member}' is NOT IN '${container}' with case ${caseSensitive ? "sensitive" : "insensitive"} check.`)))
    .catch(reject));
exports.assertIn = assertIn;
const assertNotIn = (member, container, caseSensitive) => new Promise((resolve, reject) => isIn(member, container, caseSensitive)
    .then(is => is
    ? reject(new Error(`❌ '${member}' is IN '${container}' with case ${caseSensitive ? "sensitive" : "insensitive"} check.`))
    : resolve(`✅ '${member}' is NOT IN '${container}' with case ${caseSensitive ? "sensitive" : "insensitive"} check.`))
    .catch(reject));
exports.assertNotIn = assertNotIn;
const assertGreater = (target, greater_than) => new Promise((resolve, reject) => {
    if (typeof target !== "number") {
        reject(new Error(`❌ Expected get number but got '${typeof target}'`));
        return;
    }
    if (typeof greater_than !== "number") {
        reject(new Error(`❌ Expected get number but got '${typeof greater_than}'`));
        return;
    }
    if (target > greater_than)
        return resolve(`✅ ${target} is GREATER THAN ${greater_than}`);
    return reject(new Error(`❌ ${target} is NOT GREATER THAN ${greater_than}`));
});
exports.assertGreater = assertGreater;
const assertGreaterEqual = (target, greater_than) => new Promise((resolve, reject) => {
    if (typeof target !== "number") {
        reject(new Error(`❌ Expected get number but got '${typeof target}'`));
        return;
    }
    if (typeof greater_than !== "number") {
        reject(new Error(`❌ Expected get number but got '${typeof greater_than}'`));
        return;
    }
    if (target >= greater_than)
        return resolve(`✅ ${target} is GREATER THAN or EQUAL ${greater_than}`);
    return reject(new Error(`❌ ${target} is NOT GREATER THAN or EQUAL ${greater_than}`));
});
exports.assertGreaterEqual = assertGreaterEqual;
const assertLess = (target, less_than) => new Promise((resolve, reject) => {
    if (typeof target !== "number") {
        reject(new Error(`❌ Expected get number but got '${typeof target}'`));
        return;
    }
    if (typeof less_than !== "number") {
        reject(new Error(`❌ Expected get number but got '${typeof less_than}'`));
        return;
    }
    if (target < less_than)
        return resolve(`✅ ${target} is LESS THAN ${less_than}`);
    return reject(new Error(`❌ ${target} is NOT LESS THAN ${less_than}`));
});
exports.assertLess = assertLess;
const assertLessEqual = (target, less_than) => new Promise((resolve, reject) => {
    if (typeof target !== "number") {
        reject(new Error(`❌ Expected get number but got '${typeof target}'`));
        return;
    }
    if (typeof less_than !== "number") {
        reject(new Error(`❌ Expected get number but got '${typeof less_than}'`));
        return;
    }
    if (target <= less_than)
        return resolve(`✅ ${target} is LESS THAN or EQUAL ${less_than}`);
    return reject(new Error(`❌ ${target} is NOT LESS THAN or EQUAL ${less_than}`));
});
exports.assertLessEqual = assertLessEqual;
const assertRegex = (text, regex) => new Promise((resolve, reject) => {
    if (typeof text !== "string")
        return reject(new Error(`❌ Expected get string but got ${typeof text}`));
    if (!(regex instanceof RegExp) && typeof regex !== "string")
        return reject(new Error(`❌ Expected get regex but got ${typeof regex}`));
    // check if the input is already a regular expression object
    if (!(regex instanceof RegExp)) {
        // if it is not, create a new regular expression object using the input string
        regex = new RegExp(regex);
    }
    if (regex.test(text))
        return resolve(`✅ '${text}' is MATCH with '${regex}'`);
    return reject(new Error(`❌ '${text}' is NOT MATCH with '${regex}'`));
});
exports.assertRegex = assertRegex;
//# sourceMappingURL=asserts.js.map