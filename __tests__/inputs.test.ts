import { getInputs, IInputs } from "../src/Inputs";
import * as core from "@actions/core";

const yamlInput = `
      - name: Test1
        type: equals
        expected: 5
        actual: 5
      - name: Test2
        type: not-equals
        expected: hello
        actual: world
    `;

function mockGetBooleanInput(
  name: string,
  failFast: boolean | any,
  verbose: boolean | any,
  default_value: boolean = false
) {
  switch (name) {
    case "fail-fast":
      return failFast;
    case "verbose":
      return verbose;
    default:
      return default_value;
  }
}

function mockGetInput(
  name: string,
  inputs: string,
  default_value: string = ""
) {
  switch (name) {
    case "inputs":
      return inputs;
    default:
      return default_value;
  }
}

describe("getInputs", () => {
  it("should parse YAML input and return IInputs", async () => {
    jest
      .spyOn(core, "getInput")
      .mockImplementation((name: string) => mockGetInput(name, yamlInput));
    jest
      .spyOn(core, "getBooleanInput")
      .mockImplementation((name: string) =>
        mockGetBooleanInput(name, true, true)
      );

    const expectedInputs: IInputs = {
      inputsYaml: [
        { type: "equals", name: "Test1", expected: 5, actual: 5 },
        {
          type: "not-equals",
          name: "Test2",
          expected: "hello",
          actual: "world",
        },
      ],
      failFast: true,
      verbose: true,
    };
    const inputs = await getInputs();
    expect(inputs).toEqual(expectedInputs);
  });

  it("give invalid inputs. should throw an error", async () => {
    jest
      .spyOn(core, "getInput")
      .mockImplementation((name: string) => mockGetInput(name, ""));
    await expect(getInputs()).rejects.toThrowError(
      "The inputs parameter is required and must be valid yaml."
    );

    jest
      .spyOn(core, "getInput")
      .mockImplementation((name: string) => mockGetInput(name, "   "));
    await expect(getInputs()).rejects.toThrowError(
      "The inputs parameter is required and must be valid yaml."
    );
  });

  it("give invalid yaml. should throw an error", async () => {
    jest
      .spyOn(core, "getInput")
      .mockImplementation((name: string) =>
        mockGetInput(name, "This is an invalid yaml")
      );
    await expect(getInputs()).rejects.toThrowError(
      "The 'name' parameter is required and must be a string."
    );

    jest.spyOn(core, "getInput").mockImplementation((name: string) =>
      mockGetInput(
        name,
        `
      - name: Test1
        type: equals
      - name: Test2
        expected: hello
        actual: world
    `
      )
    );
    await expect(getInputs()).rejects.toThrowError(
      "The 'type' parameter is required and must be a string."
    );
  });
});
