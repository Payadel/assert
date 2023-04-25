export const assertEquals = (expected: any, actual: any) =>
    new Promise<string>((resolve, reject) => {
        if (expected === actual)
            return resolve(
                `✅ The expected (${expected}) is EQUAL to actual (${actual})`
            );

        return reject(
            `❌ The expected (${expected}) is NOT EQUAL to actual (${actual})`
        );
    });

export const assertNotEquals = (expected: any, actual: any) =>
    new Promise<string>((resolve, reject) => {
        if (expected !== actual)
            return resolve(
                `✅ The expected (${expected}) is NOT EQUAL to actual (${actual})`
            );

        return reject(
            `❌ The expected (${expected}) is EQUAL to actual (${actual})`
        );
    });

function isTrue(input: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        switch (typeof input) {
            case "boolean":
                return resolve(input);
            case "string":
                return resolve(Boolean(input));
            case "number":
                return resolve(input === 0);
            default:
                if (input === null) return resolve(false);
                return reject(
                    `❌ The input type '${typeof input}' is not supported. Supported types: string, boolean and number.`
                );
        }
    });
}

export const assertTrue = (input: any) =>
    new Promise<string>((resolve, reject) =>
        isTrue(input)
            .then(is =>
                is
                    ? resolve(`✅ '${input}' is TRUE`)
                    : reject(`❌ '${input}' is NOT TRUE`)
            )
            .catch(reject)
    );

export const assertFalse = (input: any) =>
    new Promise<string>((resolve, reject) =>
        isTrue(input)
            .then(is =>
                is
                    ? reject(`❌ '${input}' is NOT FALSE`)
                    : resolve(`✅ '${input}' is FALSE`)
            )
            .catch(reject)
    );

function isIn(
    member: any,
    container: any,
    caseSensitive: boolean
): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        if (typeof member !== "string")
            return reject(`❌ Expected get string but got '${typeof member}'`);
        if (typeof container !== "string")
            return reject(
                `❌ Expected get string but got '${typeof container}'`
            );

        const memberStr = caseSensitive ? member : member.toLowerCase();
        const containerStr = caseSensitive
            ? container
            : container.toLowerCase();

        if (containerStr.includes(memberStr)) return resolve(true);
        return resolve(false);
    });
}

export const assertIn = (member: any, container: any, caseSensitive: boolean) =>
    new Promise<string>((resolve, reject) =>
        isIn(member, container, caseSensitive)
            .then(is =>
                is
                    ? resolve(
                          `✅ '${member}' is IN '${container}' with case ${
                              caseSensitive ? "sensitive" : "insensitive"
                          } check.`
                      )
                    : reject(
                          `❌ '${member}' is NOT IN '${container}' with case ${
                              caseSensitive ? "sensitive" : "insensitive"
                          } check.`
                      )
            )
            .catch(reject)
    );

export const assertNotIn = (
    member: any,
    container: any,
    caseSensitive: boolean
) =>
    new Promise<string>((resolve, reject) =>
        isIn(member, container, caseSensitive)
            .then(is =>
                is
                    ? reject(
                          `❌ '${member}' is IN '${container}' with case ${
                              caseSensitive ? "sensitive" : "insensitive"
                          } check.`
                      )
                    : resolve(
                          `✅ '${member}' is NOT IN '${container}' with case ${
                              caseSensitive ? "sensitive" : "insensitive"
                          } check.`
                      )
            )
            .catch(reject)
    );

export const assertGreater = (target: any, greater_than: any) =>
    new Promise<string>((resolve, reject) => {
        if (typeof target !== "number") {
            reject(`❌ Expected get number but got '${typeof target}'`);
            return;
        }
        if (typeof greater_than !== "number") {
            reject(`❌ Expected get number but got '${typeof greater_than}'`);
            return;
        }

        if (target > greater_than)
            return resolve(`✅ ${target} is GREATER THAN ${greater_than}`);
        return reject(`❌ ${target} is NOT GREATER THAN ${greater_than}`);
    });

export const assertGreaterEqual = (target: any, greater_than: any) =>
    new Promise<string>((resolve, reject) => {
        if (typeof target !== "number") {
            reject(`❌ Expected get number but got '${typeof target}'`);
            return;
        }
        if (typeof greater_than !== "number") {
            reject(`❌ Expected get number but got '${typeof greater_than}'`);
            return;
        }

        if (target >= greater_than)
            return resolve(
                `✅ ${target} is GREATER THAN or EQUAL ${greater_than}`
            );
        return reject(
            `❌ ${target} is NOT GREATER THAN or EQUAL ${greater_than}`
        );
    });

export const assertLess = (target: any, less_than: any) =>
    new Promise<string>((resolve, reject) => {
        if (typeof target !== "number") {
            reject(`❌ Expected get number but got '${typeof target}'`);
            return;
        }
        if (typeof less_than !== "number") {
            reject(`❌ Expected get number but got '${typeof less_than}'`);
            return;
        }

        if (target < less_than)
            return resolve(`✅ ${target} is LESS THAN ${less_than}`);
        return reject(`❌ ${target} is NOT LESS THAN ${less_than}`);
    });

export const assertLessEqual = (target: any, less_than: any) =>
    new Promise<string>((resolve, reject) => {
        if (typeof target !== "number") {
            reject(`❌ Expected get number but got '${typeof target}'`);
            return;
        }
        if (typeof less_than !== "number") {
            reject(`❌ Expected get number but got '${typeof less_than}'`);
            return;
        }

        if (target <= less_than)
            return resolve(`✅ ${target} is LESS THAN or EQUAL ${less_than}`);
        return reject(`❌ ${target} is NOT LESS THAN or EQUAL ${less_than}`);
    });

export const assertRegex = (text: any, regex: any) =>
    new Promise<string>((resolve, reject) => {
        if (typeof text !== "string")
            return reject(`❌ Expected get string but got ${typeof text}`);

        // check if the input is already a regular expression object
        if (!(regex instanceof RegExp)) {
            // if it is not, create a new regular expression object using the input string
            regex = new RegExp(regex);
        }

        if (regex.test(text))
            return resolve(`✅ '${text}' is MATCH with '${regex}'`);
        return reject(`❌ '${text}' is NOT MATCH with '${regex}'`);
    });
