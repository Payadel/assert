import * as core from "@actions/core";
// @ts-ignore
import {
    mockError,
    mockGetBooleanInput,
    mockGetInput,
    mockInfo,
    mockSetFailed,
    mockSetOutput,
    validInputYaml,
} from "./utility";
import run from "../src/run";

describe("run", () => {
    it("should get valid inputs, assert them and complete successfully with success result", async () => {
        jest.spyOn(core, "getInput").mockImplementation((name: string) =>
            mockGetInput(
                name,
                `
      - name: Test1
        type: equals
        expected: 5
        actual: 5
      - name: Test2
        type: not-equals
        expected: hello
        actual: world
    `
            )
        );
        jest.spyOn(core, "getBooleanInput").mockImplementation((name: string) =>
            mockGetBooleanInput(name, true, true)
        );
        const output = {
            info: "",
        };
        jest.spyOn(core, "setOutput").mockImplementation(
            (name: string, value: any) => mockSetOutput(name, value, output)
        );
        jest.spyOn(core, "info").mockImplementation((message: string) =>
            mockInfo(message, output)
        );

        await run();

        expect(output["success"]).toBe(true);
        expect(Object.keys(output).length).toBe(4);

        const messages = JSON.parse(output["messages"]);
        expect(messages.length).toBe(2);
        expect(output["messagesStr"]).toBe(
            "Test1: ✅ The expected (5) is EQUAL to actual (5)\n" +
                "Test2: ✅ The expected (hello) is NOT EQUAL to actual (world)\n"
        );

        expect(output["info"]).toBe(
            "Test1: ✅ The expected (5) is EQUAL to actual (5)\n" +
                "Test2: ✅ The expected (hello) is NOT EQUAL to actual (world)\n" +
                "\n" +
                "Operation completed successfully.\n"
        );
    });

    it("should get valid inputs, assert them and complete successfully with fail result", async () => {
        jest.spyOn(core, "getInput").mockImplementation((name: string) =>
            mockGetInput(
                name,
                `
      - name: Test1
        type: equals
        expected: 5
        actual: 5
      - name: Test2
        type: not-equals
        expected: hello
        actual: hello
    `
            )
        );
        jest.spyOn(core, "getBooleanInput").mockImplementation((name: string) =>
            mockGetBooleanInput(name, true, true)
        );
        const output = {
            info: "",
            failed: "",
        };
        jest.spyOn(core, "setOutput").mockImplementation(
            (name: string, value: any) => mockSetOutput(name, value, output)
        );
        jest.spyOn(core, "info").mockImplementation((message: string) =>
            mockInfo(message, output)
        );
        jest.spyOn(core, "setFailed").mockImplementation(
            (message: string | Error) => mockSetFailed(message, output)
        );

        await run();

        expect(output["success"]).toBe(false);
        expect(Object.keys(output).length).toBe(5);

        const messages = JSON.parse(output["messages"]);
        expect(messages.length).toBe(2);

        expect(output["messagesStr"]).toBe(
            "Test1: ✅ The expected (5) is EQUAL to actual (5)\n" +
                "Test2: ❌ The expected (hello) is EQUAL to actual (hello)\n"
        );
        expect(output["info"]).toBe(
            "Test1: ✅ The expected (5) is EQUAL to actual (5)\n" +
                "Test2: ❌ The expected (hello) is EQUAL to actual (hello)\n" +
                "\n" +
                "Operation completed successfully.\n"
        );
        expect(output["failed"]).toBe(
            "Test2: ❌ The expected (hello) is EQUAL to actual (hello)\n"
        );
    });

    it("should get invalid inputs and show errors", async () => {
        jest.spyOn(core, "getInput").mockImplementation((name: string) =>
            mockGetInput(
                name,
                `
      - name: Test1
        type: equals
        expected: 5
        actual: 5
      - name: Test2
        expected: hello
        actual: hello
    `
            )
        );
        jest.spyOn(core, "getBooleanInput").mockImplementation((name: string) =>
            mockGetBooleanInput(name, true, true)
        );
        const output = {
            failed: "",
            error: "",
        };
        jest.spyOn(core, "error").mockImplementation(
            (message: string | Error) => mockError(message, output)
        );
        jest.spyOn(core, "setFailed").mockImplementation(
            (message: string | Error) => mockSetFailed(message, output)
        );

        await run();

        expect(Object.keys(output).length).toBe(2);
        expect(output["failed"]).toBe(
            `The 'type' parameter is required.\nItem:\n\t{"name":"Test2","expected":"hello","actual":"hello"}\n`
        );
        expect(output["error"]).toBe("Operation failed.\n");
    });
});
