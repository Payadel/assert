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
  assertTrue
} from '../src/asserts'

describe('assertEquals', () => {
  it('should return a resolved promise with a success message when expected and actual are equal', () => {
    // Arrange
    const expected = 5
    const actual = 5

    // Act
    const result = assertEquals(expected, actual)

    // Assert
    expect(result).toBe(
      `✅ The expected (${expected}) is EQUAL to actual (${actual})`
    )
  })

  it('should return a rejected promise with an error message when expected and actual are not equal', () => {
    // Arrange
    const expected = 5
    const actual = 10

    // Act
    expect(() => assertEquals(expected, actual)).toThrow(
      `❌ The expected (${expected}) is NOT EQUAL to actual (${actual})`
    )
  })
})

// Test case
describe('assertNotEquals', () => {
  it('should return a resolved promise with a success message when expected and actual are not equal', () => {
    // Arrange
    const expected = 5
    const actual = '5'

    // Act
    const result = assertNotEquals(expected, actual)

    // Assert
    expect(result).toBe(
      `✅ The expected (${expected}) is NOT EQUAL to actual (${actual})`
    )
  })

  it('should return a rejected promise with an error message when expected and actual are equal', () => {
    // Arrange
    const expected = 5
    const actual = 5

    // Act
    expect(() => assertNotEquals(expected, actual)).toThrow(
      `❌ The expected (${expected}) is EQUAL to actual (${actual})`
    )
  })
})

// Test cases for assertTrue function
describe('assertTrue', () => {
  it('should return a resolved promise with a success message when the input is a non-empty string', () => {
    // Arrange
    const input = 'Hello World'

    // Act
    const result = assertTrue(input)

    // Assert
    expect(result).toBe(`✅ '${input}' is TRUE`)
  })

  it('should return a resolved promise with a success message when the input is true', () => {
    // Arrange
    const input = true

    // Act
    const result = assertTrue(input)

    // Assert
    expect(result).toBe(`✅ '${input}' is TRUE`)
  })

  it('should return a resolved promise with a success message when the input is 0', () => {
    // Arrange
    const input = 0

    // Act
    const result = assertTrue(input)

    // Assert
    expect(result).toBe(`✅ '${input}' is TRUE`)
  })

  it('should return a rejected promise with an error message when the input is an empty string', () => {
    // Arrange
    const input = ''

    // Act
    expect(() => assertTrue(input)).toThrow(`❌ '${input}' is NOT TRUE`)
  })

  it('should return a rejected promise with an error message when the input is false', () => {
    let input: boolean | string = false
    expect(() => assertTrue(input)).toThrow(`❌ '${input}' is NOT TRUE`)

    input = 'false'
    expect(() => assertTrue(input)).toThrow(`❌ '${input}' is NOT TRUE`)

    input = 'null'
    expect(() => assertTrue(input)).toThrow(`❌ '${input}' is NOT TRUE`)

    input = 'undefined'
    expect(() => assertTrue(input)).toThrow(`❌ '${input}' is NOT TRUE`)
  })

  it('should return a rejected promise with an error message when the input is null', () => {
    // Arrange
    const input = null

    // Act
    expect(() => assertTrue(input)).toThrow(`❌ 'null' is NOT TRUE`)
  })

  it('should return a rejected promise with an error message when the input is unsupported', () => {
    // Arrange
    const input = undefined

    // Act
    expect(() => assertTrue(input)).toThrow(
      `❌ The input type '${typeof input}' is not supported. Supported types: string, boolean, and number.`
    )
  })
})

// Test cases for assertFalse function
describe('assertFalse', () => {
  it('should return a resolved promise with a success message when the input is an empty string', () => {
    // Arrange
    const input = ''

    // Act
    const result = assertFalse(input)

    // Assert
    expect(result).toBe(`✅ '${input}' is FALSE`)
  })

  it('should return a resolved promise with a success message when the input is null', () => {
    // Arrange
    const input = null

    // Act
    const result = assertFalse(input)

    // Assert
    expect(result).toBe(`✅ '${input}' is FALSE`)
  })

  it('should return a resolved promise with a success message when the input is false', () => {
    let input: boolean | string = false
    expect(assertFalse(input)).toBe(`✅ '${input}' is FALSE`)

    input = 'false'
    expect(assertFalse(input)).toBe(`✅ '${input}' is FALSE`)

    input = 'null'
    expect(assertFalse(input)).toBe(`✅ '${input}' is FALSE`)

    input = 'undefined'
    expect(assertFalse(input)).toBe(`✅ '${input}' is FALSE`)
  })

  it('should return a resolved promise with a success message when the input is not 0', () => {
    // Arrange
    const input = 1

    // Act
    const result = assertFalse(input)

    // Assert
    expect(result).toBe(`✅ '${input}' is FALSE`)
  })

  it('should return a rejected promise with an error message when the input is a non-empty string', () => {
    // Arrange
    const input = 'Hello World'

    // Act
    expect(() => assertFalse(input)).toThrow(`❌ '${input}' is NOT FALSE`)
  })

  it('should return a rejected promise with an error message when the input is unsupported', () => {
    // Arrange
    const input = undefined

    // Act
    expect(() => assertFalse(input)).toThrow(
      `❌ The input type '${typeof input}' is not supported. Supported types: string, boolean, and number.`
    )
  })
})

test('assertIn: string is in container', () => {
  const member = 'apple'
  const container = 'I like to eat apples and bananas.'
  const caseSensitive = false
  const expected = `✅ '${member}' is IN '${container}' with case ${
    caseSensitive ? 'sensitive' : 'insensitive'
  } check.`

  const result = assertIn(member, container, caseSensitive)
  expect(result).toBe(expected)
})

test('assertIn: string is in container', () => {
  const member = 'Apple'
  const container = 'I like to eat Apples and bananas.'
  const caseSensitive = true
  const expected = `✅ '${member}' is IN '${container}' with case ${
    caseSensitive ? 'sensitive' : 'insensitive'
  } check.`

  const result = assertIn(member, container, caseSensitive)
  expect(result).toBe(expected)
})

test('assertIn: string is not in container', () => {
  const member = 'pear'
  const container = 'I like to eat apples and bananas.'
  const caseSensitive = false
  const expected = `❌ '${member}' is NOT IN '${container}' with case ${
    caseSensitive ? 'sensitive' : 'insensitive'
  } check.`

  expect(() => assertIn(member, container, caseSensitive)).toThrow(expected)
})

test('assertIn: string is not in container', () => {
  const member = 'Apples'
  const container = 'I like to eat apples and bananas.'
  const caseSensitive = true
  const expected = `❌ '${member}' is NOT IN '${container}' with case ${
    caseSensitive ? 'sensitive' : 'insensitive'
  } check.`

  expect(() => assertIn(member, container, caseSensitive)).toThrow(expected)
})

test('assertIn: invalid member type', () => {
  const member = 5
  const container = 'I like to eat apples and bananas.'
  const caseSensitive = true
  const expected = `❌ Expected to get a string but got 'number'`

  expect(() => assertIn(member, container, caseSensitive)).toThrow(expected)
})

test('assertIn: invalid container type', () => {
  const member = '5'
  const container = 5
  const caseSensitive = true
  const expected = `❌ Expected to get a string but got 'number'`

  expect(() => assertIn(member, container, caseSensitive)).toThrow(expected)
})

describe('assertNotIn', () => {
  test('string is not in container with case insensitive check', () => {
    const member = 'pear'
    const container = 'I like to eat apples and bananas.'
    const caseSensitive = false
    const expected = `✅ '${member}' is NOT IN '${container}' with case ${
      caseSensitive ? 'sensitive' : 'insensitive'
    } check.`

    const result = assertNotIn(member, container, caseSensitive)
    expect(result).toBe(expected)
  })

  test('string is in container with case insensitive check', () => {
    const member = 'APPLE'
    const container = 'I like to eat apples and bananas.'
    const caseSensitive = false
    const expected = `❌ '${member}' is IN '${container}' with case ${
      caseSensitive ? 'sensitive' : 'insensitive'
    } check.`

    expect(() => assertNotIn(member, container, caseSensitive)).toThrow(
      expected
    )
  })

  test('string is in container with case insensitive check', () => {
    const member = 'apple'
    const container = 'I like to eat apples and bananas.'
    const caseSensitive = true
    const expected = `❌ '${member}' is IN '${container}' with case ${
      caseSensitive ? 'sensitive' : 'insensitive'
    } check.`

    expect(() => assertNotIn(member, container, caseSensitive)).toThrow(
      expected
    )
  })

  test('invalid member type', () => {
    const member = 5
    const container = 'I like to eat apples and bananas.'
    const caseSensitive = true
    const expected = `❌ Expected to get a string but got 'number'`

    expect(() => assertNotIn(member, container, caseSensitive)).toThrow(
      expected
    )
  })

  test('invalid container type', () => {
    const member = '5'
    const container = 5
    const caseSensitive = true
    const expected = `❌ Expected to get a string but got 'number'`

    expect(() => assertNotIn(member, container, caseSensitive)).toThrow(
      expected
    )
  })
})

describe('assertGreater', () => {
  it('should resolve if target is greater than greater_than', () => {
    const result = assertGreater(5, 2)
    expect(result).toBe('✅ 5 is GREATER THAN 2')
  })

  it('should reject if target is not greater than greater_than', () => {
    expect(() => assertGreater(2, 5)).toThrow('❌ 2 is NOT GREATER THAN 5')
  })

  it('should reject if target is not a number', () => {
    expect(() => assertGreater('abc', 2)).toThrow(
      '❌ Expected to get a number but got \'string\''
    )
  })

  it('should reject if greater_than is not a number', () => {
    expect(() => assertGreater(5, 'abc')).toThrow(
      '❌ Expected to get a number but got \'string\''
    )
  })
})

describe('assertGreaterEqual', () => {
  test('should resolve if target is greater than or equal to greater_than', () => {
    const result = assertGreaterEqual(5, 5)
    expect(result).toBe('✅ 5 is GREATER THAN or EQUAL to 5')
  })

  test('should reject if target is less than greater_than', () => {
    expect(() => assertGreaterEqual(3, 5)).toThrow(
      '❌ 3 is NOT GREATER THAN or EQUAL to 5'
    )
  })

  test('should reject if target is not a number', () => {
    expect(() => assertGreaterEqual('foo', 5)).toThrow(
      '❌ Expected to get a number but got \'string\''
    )
  })

  test('should reject if greater_than is not a number', () => {
    expect(() => assertGreaterEqual(5, 'foo')).toThrow(
      '❌ Expected to get a number but got \'string\''
    )
  })
})

describe('assertLess', () => {
  it('should return a resolved promise when the target is less than the given number', () => {
    const result = assertLess(2, 5)
    expect(result).toBe('✅ 2 is LESS THAN 5')
  })

  it('should return a rejected promise when the target is greater than or equal to the given number', () => {
    expect(() => assertLess(10, 5)).toThrow('❌ 10 is NOT LESS THAN 5')

    expect(() => assertLess(5, 5)).toThrow('❌ 5 is NOT LESS THAN 5')
  })

  it('should return a rejected promise when the target or the less_than parameter are not numbers', () => {
    expect(() => assertLess('5', 5)).toThrow(
      '❌ Expected to get a number but got \'string\''
    )

    expect(() => assertLess(5, '5')).toThrow(
      '❌ Expected to get a number but got \'string\''
    )
  })
})

describe('assertLessEqual', () => {
  it('should return a resolved promise when the target is less than or equal to the given number', () => {
    const result = assertLessEqual(2, 5)
    expect(result).toBe('✅ 2 is LESS THAN or EQUAL to 5')
    const result2 = assertLessEqual(5, 5)
    expect(result2).toBe('✅ 5 is LESS THAN or EQUAL to 5')
  })

  it('should return a rejected promise when the target is greater than the given number', () => {
    expect(() => assertLessEqual(10, 5)).toThrow(
      '❌ 10 is NOT LESS THAN or EQUAL to 5'
    )
  })

  it('should return a rejected promise when the target or the less_than parameter are not numbers', () => {
    expect(() => assertLessEqual('10', 5)).toThrow(
      '❌ Expected to get a number but got \'string\''
    )

    expect(() => assertLessEqual(10, '5')).toThrow(
      '❌ Expected to get a number but got \'string\''
    )
  })
})

describe('assertRegex', () => {
  it('should resolve with a message when the text matches the regular expression', () => {
    const text = 'Hello, World!'

    let result = assertRegex(text, /world/i)
    expect(result).toBe('✅ \'Hello, World!\' MATCHES \'/world/i\'')

    result = assertRegex(text, 'World')
    expect(result).toBe('✅ \'Hello, World!\' MATCHES \'/World/\'')
  })

  it('should reject with a message when the text does not match the regular expression', () => {
    const text = 'Goodbye, World!'
    const regex = /hello/i // case-insensitive regex

    expect(() => assertRegex(text, regex)).toThrow(
      '❌ \'Goodbye, World!\' does NOT MATCH \'/hello/i\''
    )
  })

  it('should reject with a message when the regex input is not a string or RegExp object', () => {
    const text = 'Hello, World!'
    const regex = {} // invalid regex input

    expect(() => assertRegex(text, regex)).toThrow(
      '❌ Expected to get regex but got \'object\''
    )
  })

  it('should reject with a message when the text input is not a string', () => {
    const text = 123 // invalid text input
    const regex = /hello/i // case-insensitive regex

    expect(() => assertRegex(text, regex)).toThrow(
      '❌ Expected to get string but got \'number\''
    )
  })
})
