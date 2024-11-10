import { getInputs, IInputs } from '../src/inputs';
import * as core from '@actions/core';
import { mockGetInput, validInputYaml } from './mocks.utility';

describe('getInputs', () => {
  it('should parse YAML input and return IInputs', () => {
    jest.spyOn(core, 'getInput').mockImplementation((name: string) =>
      mockGetInput(name, [
        {
          name: 'inputs',
          givenValue: validInputYaml
        },
        {
          name: 'verbose',
          givenValue: true
        },
        {
          name: 'fail-fast',
          givenValue: true
        }
      ])
    );

    const expectedInputs: IInputs = {
      inputsYaml: [
        { type: 'equals', name: 'Test1', expected: 5, actual: 5 },
        {
          type: 'not-equals',
          name: 'Test2',
          expected: 'hello',
          actual: 'world'
        }
      ],
      failFast: true,
      verbose: true
    };
    const inputs = getInputs();
    expect(inputs).toEqual(expectedInputs);
  });

  it('give invalid inputs. should throw an error', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string) => mockGetInput(name, []));
    expect(() => getInputs()).toThrow('parsedYaml is not iterable');

    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string) =>
        mockGetInput(name, [{ name: 'inputs', givenValue: '    ' }])
      );
    expect(() => getInputs()).toThrow('parsedYaml is not iterable');
  });

  it('give invalid yaml. should throw an error', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string) =>
        mockGetInput(name, [
          { name: 'inputs', givenValue: ' This is an invalid yaml   ' }
        ])
      );
    expect(() => getInputs()).toThrow(
      `The 'name' parameter is required.\nItem:\n\t`
    );

    jest.spyOn(core, 'getInput').mockImplementation((name: string) =>
      mockGetInput(name, [
        {
          name: 'inputs',
          givenValue: `
      - name: Test1
        type: equals
      - name: Test2
        expected: hello
        actual: world
    `
        }
      ])
    );
    expect(() => getInputs()).toThrow(
      `The 'type' parameter is required.\nItem:\n\t{"name":"Test2","expected":"hello","actual":"world"}`
    );
  });
});
