import { IInputs } from '../src/inputs';
import { controller, IControllerOutput } from '../src/controller';

describe('run', () => {
  it('should run all input assertions and return a result object with success status and messages', () => {
    const inputs: IInputs = {
      inputsYaml: [
        { type: 'equals', name: 'Test1.1', expected: 5, actual: 5 },
        { type: 'equals', name: 'Test1.2', expected: 5, actual: 10 },

        {
          type: 'not-equals',
          name: 'Test2.1',
          expected: 'hello',
          actual: 'world'
        },
        {
          type: 'not-equals',
          name: 'Test2.2',
          expected: 'hello',
          actual: 'hello'
        },

        { type: 'true', name: 'Test3.1', input: true },
        { type: 'true', name: 'Test3.2', input: 'true' },
        { type: 'true', name: 'Test3.3', input: '' },
        { type: 'true', name: 'Test3.4', input: null },
        { type: 'true', name: 'Test3.5', input: false },

        { type: 'false', name: 'Test4.1', input: true },
        { type: 'false', name: 'Test4.2', input: 'true' },
        { type: 'false', name: 'Test4.3', input: '' },
        { type: 'false', name: 'Test4.4', input: null },
        { type: 'false', name: 'Test4.5', input: false },

        {
          type: 'IN',
          name: 'Test5.1',
          member: 'message',
          container: 'this is a message',
          case_sensitive: true
        },
        {
          type: 'in',
          name: 'Test5.2',
          member: 'Message',
          container: 'this is a message',
          case_sensitive: true
        },

        {
          type: 'not-in',
          name: 'Test6.1',
          member: 'hello',
          container: 'this is a message',
          case_sensitive: false
        },
        {
          type: 'not-in',
          name: 'Test6.2',
          member: 'Message',
          container: 'this is a message',
          case_sensitive: true
        },
        {
          type: 'not-in',
          name: 'Test6.3',
          member: 'Message',
          container: 'this is a message',
          case_sensitive: false
        },

        {
          type: 'greater',
          name: 'Test7.1',
          target: 10,
          greater_than: 5
        },
        {
          type: 'greater',
          name: 'Test7.2',
          target: 10,
          greater_than: 10
        },

        {
          type: 'Greater-Equal',
          name: 'Test8.1',
          target: 7,
          greater_equal: 7
        },
        {
          type: 'greater-equal',
          name: 'Test8.2',
          target: 10,
          greater_equal: 7
        },

        { type: 'less', name: 'Test9.1', target: 3, less_than: 5 },
        { type: 'less', name: 'Test9.2', target: 10, less_than: 5 },

        {
          type: 'less-equal',
          name: 'Test10.1',
          target: 2,
          less_equal: 2
        },
        {
          type: 'less-equal',
          name: 'Test10.2',
          target: 10,
          less_equal: 2
        },
        {
          type: 'less-equal',
          name: 'Test10.3',
          target: 0,
          less_equal: 2
        },

        {
          type: 'regex',
          name: 'Test11.1',
          text: 'Hello, World!',
          regex: /hello/i
        },
        {
          type: 'regex',
          name: 'Test11.2',
          text: 'Hello, World!',
          regex: /message/i
        },

        {
          type: 'unsupported',
          name: 'Test12',
          expected: 'something',
          actual: 'something'
        }
      ],
      verbose: true,
      failFast: false
    };

    const result = controller(inputs);

    assert(
      result,
      false,
      17,
      14,
      'Test1.1: ✅ The expected (5) is EQUAL to actual (5)\n' +
        'Test1.2: ❌ The expected (5) is NOT EQUAL to actual (10)\n' +
        'Test2.1: ✅ The expected (hello) is NOT EQUAL to actual (world)\n' +
        'Test2.2: ❌ The expected (hello) is EQUAL to actual (hello)\n' +
        "Test3.1: ✅ 'true' is TRUE\n" +
        "Test3.2: ✅ 'true' is TRUE\n" +
        "Test3.3: ❌ '' is NOT TRUE\n" +
        "Test3.4: ❌ 'null' is NOT TRUE\n" +
        "Test3.5: ❌ 'false' is NOT TRUE\n" +
        "Test4.1: ❌ 'true' is NOT FALSE\n" +
        "Test4.2: ❌ 'true' is NOT FALSE\n" +
        "Test4.3: ✅ '' is FALSE\n" +
        "Test4.4: ✅ 'null' is FALSE\n" +
        "Test4.5: ✅ 'false' is FALSE\n" +
        "Test5.1: ✅ 'message' is IN 'this is a message' with case sensitive check.\n" +
        "Test5.2: ❌ 'Message' is NOT IN 'this is a message' with case sensitive check.\n" +
        "Test6.1: ✅ 'hello' is NOT IN 'this is a message' with case insensitive check.\n" +
        "Test6.2: ✅ 'Message' is NOT IN 'this is a message' with case sensitive check.\n" +
        "Test6.3: ❌ 'Message' is IN 'this is a message' with case insensitive check.\n" +
        'Test7.1: ✅ 10 is GREATER THAN 5\n' +
        'Test7.2: ❌ 10 is NOT GREATER THAN 10\n' +
        'Test8.1: ✅ 7 is GREATER THAN or EQUAL to 7\n' +
        'Test8.2: ✅ 10 is GREATER THAN or EQUAL to 7\n' +
        'Test9.1: ✅ 3 is LESS THAN 5\n' +
        'Test9.2: ❌ 10 is NOT LESS THAN 5\n' +
        'Test10.1: ✅ 2 is LESS THAN or EQUAL to 2\n' +
        'Test10.2: ❌ 10 is NOT LESS THAN or EQUAL to 2\n' +
        'Test10.3: ✅ 0 is LESS THAN or EQUAL to 2\n' +
        "Test11.1: ✅ 'Hello, World!' MATCHES '/hello/i'\n" +
        "Test11.2: ❌ 'Hello, World!' does NOT MATCH '/message/i'\n" +
        "Test12: ❌ The type 'unsupported' is not supported.\n"
    );
  });

  it('set fail fast true. should break with first error.', () => {
    const inputs: IInputs = {
      inputsYaml: [
        { type: 'true', name: 'Test1.1', input: true },
        { type: 'true', name: 'Test1.2', input: 'true' },
        { type: 'true', name: 'Test1.3', input: '' },
        { type: 'true', name: 'Test1.4', input: null },
        { type: 'true', name: 'Test1.5', input: false },
        { type: 'false', name: 'Test2.1', input: true },
        { type: 'false', name: 'Test2.2', input: 'true' },
        { type: 'false', name: 'Test2.3', input: '' },
        { type: 'false', name: 'Test2.4', input: null },
        { type: 'false', name: 'Test2.5', input: false }
      ],
      verbose: true,
      failFast: true
    };

    const result = controller(inputs);

    assert(
      result,
      false,
      2,
      1,
      "Test1.1: ✅ 'true' is TRUE\n" +
        "Test1.2: ✅ 'true' is TRUE\n" +
        "Test1.3: ❌ '' is NOT TRUE\n"
    );
  });

  it('all asserts are valid', () => {
    const inputs: IInputs = {
      inputsYaml: [
        { type: 'true', name: 'Test1.1', input: true },
        { type: 'true', name: 'Test1.2', input: 'true' },
        { type: 'false', name: 'Test2.1', input: '' },
        { type: 'false', name: 'Test2.2', input: null },
        { type: 'false', name: 'Test2.3', input: false }
      ],
      verbose: true,
      failFast: true
    };

    const result = controller(inputs);

    assert(
      result,
      true,
      5,
      0,
      "Test1.1: ✅ 'true' is TRUE\n" +
        "Test1.2: ✅ 'true' is TRUE\n" +
        "Test2.1: ✅ '' is FALSE\n" +
        "Test2.2: ✅ 'null' is FALSE\n" +
        "Test2.3: ✅ 'false' is FALSE\n"
    );
  });
});

function assert(
  result: IControllerOutput,
  expectedSuccess: boolean,
  expectedSuccessMessages: number,
  expectedFailureMessages: number,
  expectedMessageStr: string
): void {
  expect(result.success).toBe(expectedSuccess);

  expect(result.messages.length).toBe(
    expectedSuccessMessages + expectedFailureMessages
  );

  expect(
    result.messages.filter(message => message.type === 'error').length
  ).toBe(expectedFailureMessages);
  expect(
    result.messages.filter(message => message.type === 'success').length
  ).toBe(expectedSuccessMessages);

  expect(result.messagesStr).toBe(expectedMessageStr);

  const splitMessages = expectedMessageStr.trim().split('\n');
  for (let i = 0; i < splitMessages.length; i++) {
    const success = splitMessages[i].includes('✅');
    expect(result.messages[i].type).toBe(success ? 'success' : 'error');
    expect(result.messages[i].message).toBe(splitMessages[i]);
  }
}
