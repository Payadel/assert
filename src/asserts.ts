export function assertEquals(expected: any, actual: any): string {
  if (expected === actual) {
    return `✅ The expected (${expected}) is EQUAL to actual (${actual})`
  } else {
    throw new Error(
      `❌ The expected (${expected}) is NOT EQUAL to actual (${actual})`
    )
  }
}

export function assertNotEquals(expected: any, actual: any): string {
  if (expected !== actual) {
    return `✅ The expected (${expected}) is NOT EQUAL to actual (${actual})`
  } else {
    throw new Error(
      `❌ The expected (${expected}) is EQUAL to actual (${actual})`
    )
  }
}

export function isTrue(input: any): boolean {
  switch (typeof input) {
    case 'boolean':
      return input
    case 'string':
      input = input.toLowerCase()
      if (input === 'true') return true
      if (input === 'false' || input === 'null' || input === 'undefined')
        return false
      return Boolean(input)
    case 'number':
      return input === 0
    default:
      if (input === null) return false
      throw new Error(
        `❌ The input type '${typeof input}' is not supported. Supported types: string, boolean, and number.`
      )
  }
}

export function assertTrue(input: any): string {
  if (isTrue(input)) {
    return `✅ '${input}' is TRUE`
  } else {
    throw new Error(`❌ '${input}' is NOT TRUE`)
  }
}

export function assertFalse(input: any): string {
  if (!isTrue(input)) {
    return `✅ '${input}' is FALSE`
  } else {
    throw new Error(`❌ '${input}' is NOT FALSE`)
  }
}

export function isIn(
  member: any,
  container: any,
  caseSensitive: boolean
): boolean {
  if (typeof member !== 'string') {
    throw new Error(`❌ Expected to get a string but got '${typeof member}'`)
  }
  if (typeof container !== 'string') {
    throw new Error(`❌ Expected to get a string but got '${typeof container}'`)
  }

  const memberStr = caseSensitive ? member : member.toLowerCase()
  const containerStr = caseSensitive ? container : container.toLowerCase()

  return containerStr.includes(memberStr)
}

export function assertIn(
  member: any,
  container: any,
  caseSensitive: boolean
): string {
  if (isIn(member, container, caseSensitive)) {
    return `✅ '${member}' is IN '${container}' with case ${
      caseSensitive ? 'sensitive' : 'insensitive'
    } check.`
  } else {
    throw new Error(
      `❌ '${member}' is NOT IN '${container}' with case ${
        caseSensitive ? 'sensitive' : 'insensitive'
      } check.`
    )
  }
}

export function assertNotIn(
  member: any,
  container: any,
  caseSensitive: boolean
): string {
  if (!isIn(member, container, caseSensitive)) {
    return `✅ '${member}' is NOT IN '${container}' with case ${
      caseSensitive ? 'sensitive' : 'insensitive'
    } check.`
  } else {
    throw new Error(
      `❌ '${member}' is IN '${container}' with case ${
        caseSensitive ? 'sensitive' : 'insensitive'
      } check.`
    )
  }
}

export function assertGreater(target: any, greater_than: any): string {
  if (typeof target !== 'number') {
    throw new Error(`❌ Expected to get a number but got '${typeof target}'`)
  }
  if (typeof greater_than !== 'number') {
    throw new Error(
      `❌ Expected to get a number but got '${typeof greater_than}'`
    )
  }

  if (target > greater_than) {
    return `✅ ${target} is GREATER THAN ${greater_than}`
  } else {
    throw new Error(`❌ ${target} is NOT GREATER THAN ${greater_than}`)
  }
}

export function assertGreaterEqual(target: any, greater_than: any): string {
  if (typeof target !== 'number') {
    throw new Error(`❌ Expected to get a number but got '${typeof target}'`)
  }
  if (typeof greater_than !== 'number') {
    throw new Error(
      `❌ Expected to get a number but got '${typeof greater_than}'`
    )
  }

  if (target >= greater_than) {
    return `✅ ${target} is GREATER THAN or EQUAL to ${greater_than}`
  } else {
    throw new Error(
      `❌ ${target} is NOT GREATER THAN or EQUAL to ${greater_than}`
    )
  }
}

export function assertLess(target: any, less_than: any): string {
  if (typeof target !== 'number') {
    throw new Error(`❌ Expected to get a number but got '${typeof target}'`)
  }
  if (typeof less_than !== 'number') {
    throw new Error(`❌ Expected to get a number but got '${typeof less_than}'`)
  }

  if (target < less_than) {
    return `✅ ${target} is LESS THAN ${less_than}`
  } else {
    throw new Error(`❌ ${target} is NOT LESS THAN ${less_than}`)
  }
}

export function assertLessEqual(target: any, less_than: any): string {
  if (typeof target !== 'number') {
    throw new Error(`❌ Expected to get a number but got '${typeof target}'`)
  }
  if (typeof less_than !== 'number') {
    throw new Error(`❌ Expected to get a number but got '${typeof less_than}'`)
  }

  if (target <= less_than) {
    return `✅ ${target} is LESS THAN or EQUAL to ${less_than}`
  } else {
    throw new Error(`❌ ${target} is NOT LESS THAN or EQUAL to ${less_than}`)
  }
}

export function assertRegex(text: any, regex: any): string {
  if (typeof text !== 'string') {
    throw new Error(`❌ Expected to get string but got '${typeof text}'`)
  }
  if (!(regex instanceof RegExp) && typeof regex !== 'string') {
    throw new Error(`❌ Expected to get regex but got '${typeof regex}'`)
  }

  // check if the input is already a regular expression object
  if (!(regex instanceof RegExp)) {
    // if it is not, create a new regular expression object using the input string
    regex = new RegExp(regex)
  }

  if (regex.test(text)) {
    return `✅ '${text}' MATCHES '${regex}'`
  } else {
    throw new Error(`❌ '${text}' does NOT MATCH '${regex}'`)
  }
}
