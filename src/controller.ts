import { IInputs } from "./Inputs";
import * as core from "@actions/core";
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
} from "./asserts";

export interface IRunOutput {
  success: boolean;
  messages: string;
}

export const controller = async (inputs: IInputs): Promise<IRunOutput> => {
  let messages: string = "";
  let hasError: boolean = false;

  for (const item of inputs.inputsYaml) {
    core.debug(`Type: ${item.type}`);

    let result: IResult;
    switch (item.type.toLowerCase()) {
      case "equals":
        result = await tryFunction(() =>
          assertEquals(item.expected, item.actual)
        );
        break;
      case "not-equals":
        result = await tryFunction(() =>
          assertNotEquals(item.expected, item.actual)
        );
        break;
      case "true":
        result = await tryFunction(() => assertTrue(item.input));
        break;
      case "false":
        result = await tryFunction(() => assertFalse(item.input));
        break;
      case "in":
        result = await tryFunction(() =>
          assertIn(item.member, item.container, item.case_sensitive)
        );
        break;
      case "not-in":
        result = await tryFunction(() =>
          assertNotIn(item.member, item.container, item.case_sensitive)
        );
        break;
      case "greater":
        result = await tryFunction(() =>
          assertGreater(item.target, item.greater_than)
        );
        break;
      case "greater-equal":
        result = await tryFunction(() =>
          assertGreaterEqual(item.target, item.greater_equal)
        );
        break;
      case "less":
        result = await tryFunction(() =>
          assertLess(item.target, item.less_than)
        );
        break;
      case "less-equal":
        result = await tryFunction(() =>
          assertLessEqual(item.target, item.less_equal)
        );
        break;
      case "regex":
        result = await tryFunction(() => assertRegex(item.text, item.regex));
        break;
      default:
        result = {
          success: false,
          messages: `❌ The type '${item.type}' is not supported.`,
        };
        break;
    }

    if (result.success) {
      if (inputs.verbose) messages += `${item.name}: ${result.messages}\n`;
    } else {
      messages += `${item.name}: ${result.messages}\n`;
      if (inputs.failFast)
        return {
          success: false,
          messages: messages,
        };
      hasError = true;
    }
  }

  return {
    success: !hasError,
    messages: messages,
  };
};

interface IResult {
  success: boolean;
  messages: string;
}

async function tryFunction(func: () => Promise<string>): Promise<IResult> {
  try {
    let message = await func();
    return {
      success: true,
      messages: message,
    };
  } catch (e: any) {
    return {
      success: false,
      messages: e.toString(),
    };
  }
}
