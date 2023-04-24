import { getInputs, IInputs } from "../src/Inputs";
import * as core from "@actions/core";
// @ts-ignore
import {mockGetBooleanInput, mockGetInput, validInputYaml} from "./utility";

describe("getInputs", () => {
  it("should parse YAML input and return IInputs", async () => {
    jest
      .spyOn(core, "getInput")
      .mockImplementation((name: string) => mockGetInput(name, validInputYaml));
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
