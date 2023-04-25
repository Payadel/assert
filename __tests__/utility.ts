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

export function mockGetBooleanInput(
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

export function mockGetInput(
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

export function mockSetOutput(
    name: string,
    value: any,
    output: { [key: string]: any }
) {
    output[name] = value;
}

export function mockInfo(message: string, output: { info: string }) {
    output.info += `${message}\n`;
}

export function mockError(message: string | Error, output: { error: string }) {
    if (message instanceof Error) output.error += `${message.message}\n`;
    else output.error += `${message}\n`;
}

export function mockSetFailed(
    message: string | Error,
    output: { failed: string }
) {
    if (message instanceof Error) output.failed += `${message.message}\n`;
    else output.failed += `${message}\n`;
}
