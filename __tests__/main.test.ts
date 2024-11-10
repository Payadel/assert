import * as core from '@actions/core';
import run from '../src/main';
import { IOutput } from '../src/outputs';
import { mockGetInput, mockSetOutput } from './mocks.utility';

describe('run', () => {
  it('should get valid inputs, assert them and complete successfully with success result', () => {
    jest.spyOn(core, 'getInput').mockImplementation((name: string) =>
      mockGetInput(name, [
        {
          name: 'inputs',
          givenValue: `
      - name: Test1
        type: equals
        expected: 5
        actual: 5
      - name: Test2
        type: not-equals
        expected: hello
        actual: world
    `
        },
        {
          name: 'verbose',
          givenValue: true
        }
      ])
    );

    const output: IOutput = {
      success: true,
      messagesStr: '',
      messages: []
    };
    jest
      .spyOn(core, 'setOutput')
      .mockImplementation((name: string, value: any) =>
        mockSetOutput(name, value, output)
      );
    const infoMock = jest.spyOn(core, 'info');

    run();

    expect(output.success).toBe(true);
    expect(Object.keys(output).length).toBe(3);

    expect(output.messages.length).toBe(2);
    expect(output.messagesStr).toBe(
      'Test1: ✅ The expected (5) is EQUAL to actual (5)\n' +
        'Test2: ✅ The expected (hello) is NOT EQUAL to actual (world)\n'
    );

    expect(infoMock).toHaveBeenCalledWith(
      'Test1: ✅ The expected (5) is EQUAL to actual (5)\nTest2: ✅ The expected (hello) is NOT EQUAL to actual (world)\n'
    );
  });

  it('should get valid inputs, assert them and complete successfully with fail result', () => {
    jest.spyOn(core, 'getInput').mockImplementation((name: string) =>
      mockGetInput(name, [
        {
          name: 'inputs',
          givenValue: `
      - name: Test1
        type: equals
        expected: 5
        actual: 5
      - name: Test2
        type: not-equals
        expected: hello
        actual: hello
    `
        },
        {
          name: 'verbose',
          givenValue: true
        }
      ])
    );

    const infoMock = jest.spyOn(core, 'info');

    run();

    expect(infoMock).toHaveBeenCalledWith(
      `Test1: ✅ The expected (5) is EQUAL to actual (5)\nTest2: ❌ The expected (hello) is EQUAL to actual (hello)\n`
    );
  });

  it('should get invalid inputs and show errors', () => {
    jest.spyOn(core, 'getInput').mockImplementation((name: string) =>
      mockGetInput(name, [
        {
          name: 'inputs',
          givenValue: `
      - name: Test1
        type: equals
        expected: 5
        actual: 5
      - name: Test2
        expected: hello
        actual: hello
    `
        },
        {
          name: 'verbose',
          givenValue: true
        }
      ])
    );

    const errorMock = jest.spyOn(core, 'error');
    const setFailedMock = jest.spyOn(core, 'setFailed');

    run();

    expect(errorMock).toHaveBeenCalledWith(`Operation failed.`);
    expect(setFailedMock).toHaveBeenCalledWith(
      `The 'type' parameter is required.\nItem:\n\t{"name":"Test2","expected":"hello","actual":"hello"}`
    );
  });
});
