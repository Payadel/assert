import * as core from "@actions/core";
import * as yaml from "js-yaml";

export interface IInputs {
  inputsYaml: any[];
  failFast: boolean;
  verbose: boolean;
}

export const getInputs = () =>
  new Promise<IInputs>((resolve, _) => {
    const inputs = getInputOrDefault("inputs");
    if (!inputs || inputs.trim() === "")
      throw new Error(
        "The inputs parameter is required and must be valid yaml."
      );
    const parsedYaml = yaml.load(inputs);
    ensureYamlValid(parsedYaml);

    const failFast = core.getBooleanInput("fail-fast");
    const verbose = core.getBooleanInput("verbose");

    return resolve({
      inputsYaml: parsedYaml,
      failFast: failFast,
      verbose: verbose,
    });
  });

function getInputOrDefault(name: string, default_value: any = null) {
  let input = core.getInput(name);
  if (!input || input === "") return default_value;
  return input;
}

function ensureYamlValid(parsedYaml: any): void {
  for (const item of parsedYaml) {
    if (!item.name || typeof item.name !== "string")
      throw new Error("The 'name' parameter is required and must be a string.");
    if (!item.type || typeof item.type !== "string")
      throw new Error("The 'type' parameter is required and must be a string.");
  }
}
