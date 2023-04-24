import { IInputs } from "../src/Inputs";
import { controller } from "../src/controller";

describe("run", () => {
  it("should run all input assertions and return a result object with success status and messages", async () => {
    const inputs: IInputs = {
      inputsYaml: [
        { type: "equals", name: "Test1.1", expected: 5, actual: 5 },
        { type: "equals", name: "Test1.2", expected: 5, actual: 10 },

        {
          type: "not-equals",
          name: "Test2.1",
          expected: "hello",
          actual: "world",
        },
        {
          type: "not-equals",
          name: "Test2.2",
          expected: "hello",
          actual: "hello",
        },

        { type: "true", name: "Test3.1", input: true },
        { type: "true", name: "Test3.2", input: "true" },
        { type: "true", name: "Test3.3", input: "" },
        { type: "true", name: "Test3.4", input: null },
        { type: "true", name: "Test3.5", input: false },

        { type: "false", name: "Test4.1", input: true },
        { type: "false", name: "Test4.2", input: "true" },
        { type: "false", name: "Test4.3", input: "" },
        { type: "false", name: "Test4.4", input: null },
        { type: "false", name: "Test4.5", input: false },

        {
          type: "IN",
          name: "Test5.1",
          member: "message",
          container: "this is a message",
          case_sensitive: true,
        },
        {
          type: "in",
          name: "Test5.2",
          member: "Message",
          container: "this is a message",
          case_sensitive: true,
        },

        {
          type: "not-in",
          name: "Test6.1",
          member: "hello",
          container: "this is a message",
          case_sensitive: false,
        },
        {
          type: "not-in",
          name: "Test6.2",
          member: "Message",
          container: "this is a message",
          case_sensitive: true,
        },
        {
          type: "not-in",
          name: "Test6.3",
          member: "Message",
          container: "this is a message",
          case_sensitive: false,
        },

        { type: "greater", name: "Test7.1", target: 10, greater_than: 5 },
        { type: "greater", name: "Test7.2", target: 10, greater_than: 10 },

        { type: "Greater-Equal", name: "Test8.1", target: 7, greater_equal: 7 },
        {
          type: "greater-equal",
          name: "Test8.2",
          target: 10,
          greater_equal: 7,
        },

        { type: "less", name: "Test9.1", target: 3, less_than: 5 },
        { type: "less", name: "Test9.2", target: 10, less_than: 5 },

        { type: "less-equal", name: "Test10.1", target: 2, less_equal: 2 },
        { type: "less-equal", name: "Test10.2", target: 10, less_equal: 2 },
        { type: "less-equal", name: "Test10.3", target: 0, less_equal: 2 },

        {
          type: "regex",
          name: "Test11.1",
          text: "Hello, World!",
          regex: /hello/i,
        },
        {
          type: "regex",
          name: "Test11.2",
          text: "Hello, World!",
          regex: /message/i,
        },

        {
          type: "unsupported",
          name: "Test12",
          expected: "something",
          actual: "something",
        },
      ],
      verbose: true,
      failFast: false,
    };

    const result = await controller(inputs);

    expect(result.success).toBe(false);
    expect(result.messages).toContain(
      "Test1.1: ✅ The expected (5) is EQUAL to actual (5)"
    );
    expect(result.messages).toContain(
      "Test1.2: ❌ The expected (5) is NOT EQUAL to actual (10)"
    );
    expect(result.messages).toContain(
      "Test2.1: ✅ The expected (hello) is NOT EQUAL to actual (world)"
    );
    expect(result.messages).toContain(
      "Test2.2: ❌ The expected (hello) is EQUAL to actual (hello)"
    );
    expect(result.messages).toContain("Test3.1: ✅ 'true' is TRUE");
    expect(result.messages).toContain("Test3.2: ✅ 'true' is TRUE");
    expect(result.messages).toContain("Test3.3: ❌ '' is NOT TRUE");
    expect(result.messages).toContain("Test3.4: ❌ 'null' is NOT TRUE");
    expect(result.messages).toContain("Test3.5: ❌ 'false' is NOT TRUE");
    expect(result.messages).toContain("Test4.1: ❌ 'true' is NOT FALSE");
    expect(result.messages).toContain("Test4.2: ❌ 'true' is NOT FALSE");
    expect(result.messages).toContain("Test4.3: ✅ '' is FALSE");
    expect(result.messages).toContain("Test4.4: ✅ 'null' is FALSE");
    expect(result.messages).toContain("Test4.5: ✅ 'false' is FALSE");
    expect(result.messages).toContain(
      "Test5.1: ✅ 'message' is IN 'this is a message' with case sensitive check."
    );
    expect(result.messages).toContain(
      "Test5.2: ❌ 'Message' is NOT IN 'this is a message' with case sensitive check."
    );
    expect(result.messages).toContain(
      "Test6.1: ✅ 'hello' is NOT IN 'this is a message' with case insensitive check."
    );
    expect(result.messages).toContain(
      "Test6.2: ✅ 'Message' is NOT IN 'this is a message' with case sensitive check."
    );
    expect(result.messages).toContain(
      "Test6.3: ❌ 'Message' is IN 'this is a message' with case insensitive check."
    );
    expect(result.messages).toContain("Test7.1: ✅ 10 is GREATER THAN 5");
    expect(result.messages).toContain("Test7.2: ❌ 10 is NOT GREATER THAN 10");
    expect(result.messages).toContain(
      "Test8.1: ✅ 7 is GREATER THAN or EQUAL 7"
    );
    expect(result.messages).toContain(
      "Test8.2: ✅ 10 is GREATER THAN or EQUAL 7"
    );
    expect(result.messages).toContain("Test9.1: ✅ 3 is LESS THAN 5");
    expect(result.messages).toContain("Test9.2: ❌ 10 is NOT LESS THAN 5");
    expect(result.messages).toContain("Test10.1: ✅ 2 is LESS THAN or EQUAL 2");
    expect(result.messages).toContain(
      "Test10.2: ❌ 10 is NOT LESS THAN or EQUAL 2"
    );
    expect(result.messages).toContain("Test10.3: ✅ 0 is LESS THAN or EQUAL 2");
    expect(result.messages).toContain(
      "Test11.1: ✅ 'Hello, World!' is MATCH with '/hello/i'"
    );
    expect(result.messages).toContain(
      "Test11.2: ❌ 'Hello, World!' is NOT MATCH with '/message/i'"
    );
    expect(result.messages).toContain(
      "Test12: ❌ The type 'unsupported' is not supported."
    );
  });

  it("verbose off. should only return error messages", async () => {
    const inputs: IInputs = {
      inputsYaml: [
        { type: "true", name: "Test1.1", input: true },
        { type: "true", name: "Test1.2", input: "true" },
        { type: "true", name: "Test1.3", input: "" },
        { type: "true", name: "Test1.4", input: null },
        { type: "true", name: "Test1.5", input: false },
        { type: "false", name: "Test2.1", input: true },
        { type: "false", name: "Test2.2", input: "true" },
        { type: "false", name: "Test2.3", input: "" },
        { type: "false", name: "Test2.4", input: null },
        { type: "false", name: "Test2.5", input: false },
      ],
      verbose: false,
      failFast: false,
    };

    const result = await controller(inputs);

    expect(result.success).toBe(false);
    expect(result.messages).toBe(
      "Test1.3: ❌ '' is NOT TRUE\n" +
        "Test1.4: ❌ 'null' is NOT TRUE\n" +
        "Test1.5: ❌ 'false' is NOT TRUE\n" +
        "Test2.1: ❌ 'true' is NOT FALSE\n" +
        "Test2.2: ❌ 'true' is NOT FALSE\n"
    );
  });

  it("set fail fast true. should break with first error.", async () => {
    const inputs: IInputs = {
      inputsYaml: [
        { type: "true", name: "Test1.1", input: true },
        { type: "true", name: "Test1.2", input: "true" },
        { type: "true", name: "Test1.3", input: "" },
        { type: "true", name: "Test1.4", input: null },
        { type: "true", name: "Test1.5", input: false },
        { type: "false", name: "Test2.1", input: true },
        { type: "false", name: "Test2.2", input: "true" },
        { type: "false", name: "Test2.3", input: "" },
        { type: "false", name: "Test2.4", input: null },
        { type: "false", name: "Test2.5", input: false },
      ],
      verbose: true,
      failFast: true,
    };

    const result = await controller(inputs);

    expect(result.success).toBe(false);
    expect(result.messages).toBe(
      "Test1.1: ✅ 'true' is TRUE\n" +
        "Test1.2: ✅ 'true' is TRUE\n" +
        "Test1.3: ❌ '' is NOT TRUE\n"
    );
  });

  it("all asserts are valid", async () => {
    const inputs: IInputs = {
      inputsYaml: [
        { type: "true", name: "Test1.1", input: true },
        { type: "true", name: "Test1.2", input: "true" },
        { type: "false", name: "Test2.1", input: "" },
        { type: "false", name: "Test2.2", input: null },
        { type: "false", name: "Test2.3", input: false },
      ],
      verbose: true,
      failFast: true,
    };

    const result = await controller(inputs);

    expect(result.success).toBe(true);
    expect(result.messages).toBe(
      "Test1.1: ✅ 'true' is TRUE\n" +
        "Test1.2: ✅ 'true' is TRUE\n" +
        "Test2.1: ✅ '' is FALSE\n" +
        "Test2.2: ✅ 'null' is FALSE\n" +
        "Test2.3: ✅ 'false' is FALSE\n"
    );
  });
});
