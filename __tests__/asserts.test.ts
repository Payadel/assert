// Test case
import {
    assertEquals,
    assertFalse,
    assertGreater,
    assertGreaterEqual,
    assertIn,
    assertLess,
    assertLessEqual,
    assertNotEquals,
    assertNotIn,
    assertRegex,
    assertTrue,
} from "../src/asserts";

describe("assertEquals", () => {
    it("should return a resolved promise with a success message when expected and actual are equal", async () => {
        // Arrange
        const expected = 5;
        const actual = 5;

        // Act
        const result = await assertEquals(expected, actual);

        // Assert
        expect(result).toBe(
            `✅ The expected (${expected}) is EQUAL to actual (${actual})`
        );
    });

    it("should return a rejected promise with an error message when expected and actual are not equal", async () => {
        // Arrange
        const expected = 5;
        const actual = 10;

        // Act
        await expect(assertEquals(expected, actual)).rejects.toThrowError(
            `❌ The expected (${expected}) is NOT EQUAL to actual (${actual})`
        );
    });
});

// Test case
describe("assertNotEquals", () => {
    it("should return a resolved promise with a success message when expected and actual are not equal", async () => {
        // Arrange
        const expected = 5;
        const actual = "5";

        // Act
        const result = await assertNotEquals(expected, actual);

        // Assert
        expect(result).toBe(
            `✅ The expected (${expected}) is NOT EQUAL to actual (${actual})`
        );
    });

    it("should return a rejected promise with an error message when expected and actual are equal", async () => {
        // Arrange
        const expected = 5;
        const actual = 5;

        // Act
        await expect(assertNotEquals(expected, actual)).rejects.toThrowError(
            `❌ The expected (${expected}) is EQUAL to actual (${actual})`
        );
    });
});

// Test cases for assertTrue function
describe("assertTrue", () => {
    it("should return a resolved promise with a success message when the input is a non-empty string", async () => {
        // Arrange
        const input = "Hello World";

        // Act
        const result = await assertTrue(input);

        // Assert
        expect(result).toBe(`✅ '${input}' is TRUE`);
    });

    it("should return a resolved promise with a success message when the input is true", async () => {
        // Arrange
        const input = true;

        // Act
        const result = await assertTrue(input);

        // Assert
        expect(result).toBe(`✅ '${input}' is TRUE`);
    });

    it("should return a resolved promise with a success message when the input is 0", async () => {
        // Arrange
        const input = 0;

        // Act
        const result = await assertTrue(input);

        // Assert
        expect(result).toBe(`✅ '${input}' is TRUE`);
    });

    it("should return a rejected promise with an error message when the input is an empty string", async () => {
        // Arrange
        const input = "";

        // Act
        await expect(assertTrue(input)).rejects.toThrowError(
            `❌ '${input}' is NOT TRUE`
        );
    });

    it("should return a rejected promise with an error message when the input is false", async () => {
        let input: boolean | string = false;
        await expect(assertTrue(input)).rejects.toThrowError(
            `❌ '${input}' is NOT TRUE`
        );

        input = "false";
        await expect(assertTrue(input)).rejects.toThrowError(
            `❌ '${input}' is NOT TRUE`
        );

        input = "null";
        await expect(assertTrue(input)).rejects.toThrowError(
            `❌ '${input}' is NOT TRUE`
        );

        input = "undefined";
        await expect(assertTrue(input)).rejects.toThrowError(
            `❌ '${input}' is NOT TRUE`
        );
    });

    it("should return a rejected promise with an error message when the input is null", async () => {
        // Arrange
        const input = null;

        // Act
        await expect(assertTrue(input)).rejects.toThrowError(
            `❌ 'null' is NOT TRUE`
        );
    });

    it("should return a rejected promise with an error message when the input is unsupported", async () => {
        // Arrange
        const input = undefined;

        // Act
        await expect(assertTrue(input)).rejects.toThrowError(
            `❌ The input type '${typeof input}' is not supported. Supported types: string, boolean and number.`
        );
    });
});

// Test cases for assertFalse function
describe("assertFalse", () => {
    it("should return a resolved promise with a success message when the input is an empty string", async () => {
        // Arrange
        const input = "";

        // Act
        const result = await assertFalse(input);

        // Assert
        expect(result).toBe(`✅ '${input}' is FALSE`);
    });

    it("should return a resolved promise with a success message when the input is null", async () => {
        // Arrange
        const input = null;

        // Act
        const result = await assertFalse(input);

        // Assert
        expect(result).toBe(`✅ '${input}' is FALSE`);
    });

    it("should return a resolved promise with a success message when the input is false", async () => {
        let input: boolean | string = false;
        await expect(assertFalse(input)).resolves.toBe(
            `✅ '${input}' is FALSE`
        );

        input = "false";
        await expect(assertFalse(input)).resolves.toBe(
            `✅ '${input}' is FALSE`
        );

        input = "null";
        await expect(assertFalse(input)).resolves.toBe(
            `✅ '${input}' is FALSE`
        );

        input = "undefined";
        await expect(assertFalse(input)).resolves.toBe(
            `✅ '${input}' is FALSE`
        );
    });

    it("should return a resolved promise with a success message when the input is not 0", async () => {
        // Arrange
        const input = 1;

        // Act
        const result = await assertFalse(input);

        // Assert
        expect(result).toBe(`✅ '${input}' is FALSE`);
    });

    it("should return a rejected promise with an error message when the input is a non-empty string", async () => {
        // Arrange
        const input = "Hello World";

        // Act
        await expect(assertFalse(input)).rejects.toThrowError(
            `❌ '${input}' is NOT FALSE`
        );
    });

    it("should return a rejected promise with an error message when the input is unsupported", async () => {
        // Arrange
        const input = undefined;

        // Act
        await expect(assertFalse(input)).rejects.toThrowError(
            `❌ The input type '${typeof input}' is not supported. Supported types: string, boolean and number.`
        );
    });
});

test("assertIn: string is in container", async () => {
    const member = "apple";
    const container = "I like to eat apples and bananas.";
    const caseSensitive = false;
    const expected = `✅ '${member}' is IN '${container}' with case ${
        caseSensitive ? "sensitive" : "insensitive"
    } check.`;

    const result = await assertIn(member, container, caseSensitive);
    expect(result).toBe(expected);
});

test("assertIn: string is in container", async () => {
    const member = "Apple";
    const container = "I like to eat Apples and bananas.";
    const caseSensitive = true;
    const expected = `✅ '${member}' is IN '${container}' with case ${
        caseSensitive ? "sensitive" : "insensitive"
    } check.`;

    const result = await assertIn(member, container, caseSensitive);
    expect(result).toBe(expected);
});

test("assertIn: string is not in container", async () => {
    const member = "pear";
    const container = "I like to eat apples and bananas.";
    const caseSensitive = false;
    const expected = `❌ '${member}' is NOT IN '${container}' with case ${
        caseSensitive ? "sensitive" : "insensitive"
    } check.`;

    await expect(
        assertIn(member, container, caseSensitive)
    ).rejects.toThrowError(expected);
});

test("assertIn: string is not in container", async () => {
    const member = "Apples";
    const container = "I like to eat apples and bananas.";
    const caseSensitive = true;
    const expected = `❌ '${member}' is NOT IN '${container}' with case ${
        caseSensitive ? "sensitive" : "insensitive"
    } check.`;

    await expect(
        assertIn(member, container, caseSensitive)
    ).rejects.toThrowError(expected);
});

test("assertIn: invalid member type", async () => {
    const member = 5;
    const container = "I like to eat apples and bananas.";
    const caseSensitive = true;
    const expected = `❌ Expected get string but got 'number'`;

    await expect(
        assertIn(member, container, caseSensitive)
    ).rejects.toThrowError(expected);
});

test("assertIn: invalid container type", async () => {
    const member = "5";
    const container = 5;
    const caseSensitive = true;
    const expected = `❌ Expected get string but got 'number'`;

    await expect(
        assertIn(member, container, caseSensitive)
    ).rejects.toThrowError(expected);
});

describe("assertNotIn", () => {
    test("string is not in container with case insensitive check", async () => {
        const member = "pear";
        const container = "I like to eat apples and bananas.";
        const caseSensitive = false;
        const expected = `✅ '${member}' is NOT IN '${container}' with case ${
            caseSensitive ? "sensitive" : "insensitive"
        } check.`;

        const result = await assertNotIn(member, container, caseSensitive);
        expect(result).toBe(expected);
    });

    test("string is in container with case insensitive check", async () => {
        const member = "APPLE";
        const container = "I like to eat apples and bananas.";
        const caseSensitive = false;
        const expected = `❌ '${member}' is IN '${container}' with case ${
            caseSensitive ? "sensitive" : "insensitive"
        } check.`;

        await expect(
            assertNotIn(member, container, caseSensitive)
        ).rejects.toThrowError(expected);
    });

    test("string is in container with case insensitive check", async () => {
        const member = "apple";
        const container = "I like to eat apples and bananas.";
        const caseSensitive = true;
        const expected = `❌ '${member}' is IN '${container}' with case ${
            caseSensitive ? "sensitive" : "insensitive"
        } check.`;

        await expect(
            assertNotIn(member, container, caseSensitive)
        ).rejects.toThrowError(expected);
    });

    test("invalid member type", async () => {
        const member = 5;
        const container = "I like to eat apples and bananas.";
        const caseSensitive = true;
        const expected = `❌ Expected get string but got 'number'`;

        await expect(
            assertNotIn(member, container, caseSensitive)
        ).rejects.toThrowError(expected);
    });

    test("invalid container type", async () => {
        const member = "5";
        const container = 5;
        const caseSensitive = true;
        const expected = `❌ Expected get string but got 'number'`;

        await expect(
            assertNotIn(member, container, caseSensitive)
        ).rejects.toThrowError(expected);
    });
});

describe("assertGreater", () => {
    it("should resolve if target is greater than greater_than", async () => {
        const result = await assertGreater(5, 2);
        expect(result).toBe("✅ 5 is GREATER THAN 2");
    });

    it("should reject if target is not greater than greater_than", async () => {
        await expect(assertGreater(2, 5)).rejects.toThrowError(
            "❌ 2 is NOT GREATER THAN 5"
        );
    });

    it("should reject if target is not a number", async () => {
        await expect(assertGreater("abc", 2)).rejects.toThrowError(
            "❌ Expected get number but got 'string'"
        );
    });

    it("should reject if greater_than is not a number", async () => {
        await expect(assertGreater(5, "abc")).rejects.toThrowError(
            "❌ Expected get number but got 'string'"
        );
    });
});

describe("assertGreaterEqual", () => {
    test("should resolve if target is greater than or equal to greater_than", async () => {
        const result = await assertGreaterEqual(5, 5);
        expect(result).toBe("✅ 5 is GREATER THAN or EQUAL 5");
    });

    test("should reject if target is less than greater_than", async () => {
        await expect(assertGreaterEqual(3, 5)).rejects.toThrowError(
            "❌ 3 is NOT GREATER THAN or EQUAL 5"
        );
    });

    test("should reject if target is not a number", async () => {
        await expect(assertGreaterEqual("foo", 5)).rejects.toThrowError(
            "❌ Expected get number but got 'string'"
        );
    });

    test("should reject if greater_than is not a number", async () => {
        await expect(assertGreaterEqual(5, "foo")).rejects.toThrowError(
            "❌ Expected get number but got 'string'"
        );
    });
});

describe("assertLess", () => {
    it("should return a resolved promise when the target is less than the given number", async () => {
        const result = await assertLess(2, 5);
        expect(result).toBe("✅ 2 is LESS THAN 5");
    });

    it("should return a rejected promise when the target is greater than or equal to the given number", async () => {
        await expect(assertLess(10, 5)).rejects.toThrowError(
            "❌ 10 is NOT LESS THAN 5"
        );

        await expect(assertLess(5, 5)).rejects.toThrowError(
            "❌ 5 is NOT LESS THAN 5"
        );
    });

    it("should return a rejected promise when the target or the less_than parameter are not numbers", async () => {
        await expect(assertLess("5", 5)).rejects.toThrowError(
            "❌ Expected get number but got 'string'"
        );

        await expect(assertLess(5, "5")).rejects.toThrowError(
            "❌ Expected get number but got 'string'"
        );
    });
});

describe("assertLessEqual", () => {
    it("should return a resolved promise when the target is less than or equal to the given number", async () => {
        const result = await assertLessEqual(2, 5);
        expect(result).toBe("✅ 2 is LESS THAN or EQUAL 5");
        const result2 = await assertLessEqual(5, 5);
        expect(result2).toBe("✅ 5 is LESS THAN or EQUAL 5");
    });

    it("should return a rejected promise when the target is greater than the given number", async () => {
        await expect(assertLessEqual(10, 5)).rejects.toThrowError(
            "❌ 10 is NOT LESS THAN or EQUAL 5"
        );
    });

    it("should return a rejected promise when the target or the less_than parameter are not numbers", async () => {
        await expect(assertLessEqual("10", 5)).rejects.toThrowError(
            "❌ Expected get number but got 'string'"
        );

        await expect(assertLessEqual(10, "5")).rejects.toThrowError(
            "❌ Expected get number but got 'string'"
        );
    });
});

describe("assertRegex", () => {
    it("should resolve with a message when the text matches the regular expression", async () => {
        const text = "Hello, World!";

        let result = await assertRegex(text, /world/i);
        expect(result).toBe("✅ 'Hello, World!' is MATCH with '/world/i'");

        result = await assertRegex(text, "World");
        expect(result).toBe("✅ 'Hello, World!' is MATCH with '/World/'");
    });

    it("should reject with a message when the text does not match the regular expression", async () => {
        const text = "Goodbye, World!";
        const regex = /hello/i; // case-insensitive regex

        await expect(assertRegex(text, regex)).rejects.toThrowError(
            "❌ 'Goodbye, World!' is NOT MATCH with '/hello/i'"
        );
    });

    it("should reject with a message when the regex input is not a string or RegExp object", async () => {
        const text = "Hello, World!";
        const regex = {}; // invalid regex input

        await expect(assertRegex(text, regex)).rejects.toThrowError(
            "❌ Expected get regex but got object"
        );
    });

    it("should reject with a message when the text input is not a string", async () => {
        const text = 123; // invalid text input
        const regex = /hello/i; // case-insensitive regex

        await expect(assertRegex(text, regex)).rejects.toThrowError(
            "❌ Expected get string but got number"
        );
    });
});
