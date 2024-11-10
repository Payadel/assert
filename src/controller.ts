import { IInputs } from './inputs'
import * as core from '@actions/core'
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
} from './asserts'

export interface IMessage {
  type: 'error' | 'success'
  message: string
}

export interface IControllerOutput {
  success: boolean
  messages: IMessage[]
  messagesStr: string
}

export function controller(inputs: IInputs): IControllerOutput {
  const messages: IMessage[] = []
  let messagesStr = ''
  let hasError = false

  for (const item of inputs.inputsYaml) {
    core.debug(`Type: ${item.type}`)

    let result: IResult
    switch (item.type.toLowerCase()) {
      case 'equals':
        result = tryFunction(() => assertEquals(item.expected, item.actual))
        break
      case 'not-equals':
        result = tryFunction(() => assertNotEquals(item.expected, item.actual))
        break
      case 'true':
        result = tryFunction(() => assertTrue(item.input))
        break
      case 'false':
        result = tryFunction(() => assertFalse(item.input))
        break
      case 'in':
        result = tryFunction(() =>
          assertIn(item.member, item.container, item.case_sensitive)
        )
        break
      case 'not-in':
        result = tryFunction(() =>
          assertNotIn(item.member, item.container, item.case_sensitive)
        )
        break
      case 'greater':
        result = tryFunction(() =>
          assertGreater(item.target, item.greater_than)
        )
        break
      case 'greater-equal':
        result = tryFunction(() =>
          assertGreaterEqual(item.target, item.greater_equal)
        )
        break
      case 'less':
        result = tryFunction(() => assertLess(item.target, item.less_than))
        break
      case 'less-equal':
        result = tryFunction(() =>
          assertLessEqual(item.target, item.less_equal)
        )
        break
      case 'regex':
        result = tryFunction(() => assertRegex(item.text, item.regex))
        break
      default:
        result = {
          success: false,
          messages: `❌ The type '${item.type}' is not supported.`
        }
        break
    }

    const message = `${item.name}: ${result.messages}`
    messages.push({
      type: result.success ? 'success' : 'error',
      message
    })
    messagesStr += `${message}\n`

    if (!result.success) {
      hasError = true
      if (inputs.failFast)
        return {
          success: false,
          messages: messages,
          messagesStr: messagesStr
        }
    }
  }

  return {
    success: !hasError,
    messages,
    messagesStr
  }
}

interface IResult {
  success: boolean
  messages: string
}

function tryFunction(func: () => string): IResult {
  try {
    const message = func()
    return {
      success: true,
      messages: message
    }
  } catch (e: any) {
    return {
      success: false,
      messages: e instanceof Error ? e.message : e.toString()
    }
  }
}
