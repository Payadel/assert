import * as core from '@actions/core';

export const validInputYaml = `
      - name: Test1
        type: equals
        expected: 5
        actual: 5
      - name: Test2
        type: not-equals
        expected: hello
        actual: world
    `;

export interface IInputMock {
  name: string;
  givenValue?: string | boolean | number;
  defaultValue?: string;
}

export function mockGetInput(
  name: string,
  mockInputs: IInputMock[],
  options?: core.InputOptions
): string {
  name = name.toLowerCase();
  const targetMock = mockInputs.find(
    mockInput => mockInput.name.toLowerCase() == name
  );

  let result: any = '';
  if (targetMock) {
    result = targetMock.givenValue
      ? targetMock.givenValue
      : targetMock.defaultValue;
  }

  if (options) {
    if (options.required && !result)
      throw new Error(`Input required and not supplied: ${name}`);
    if (result && options.trimWhitespace) result = result.toString().trim();
  }

  return result;
}

export function mockSetOutput(
  name: string,
  value: any,
  output: { [key: string]: any }
): void {
  output[name] = value;
}
