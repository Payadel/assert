import * as core from '@actions/core';
import {
  getBooleanInputOrDefault,
  getInputOrDefault,
  getNumberInputOrDefault
} from '../src/utility';
import { mockGetInput } from './mocks.utility';

describe('getInputOrDefault', () => {
  jest.mock('@actions/core');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return input data', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(
          name,
          [{ name: 'test', givenValue: 'test-value' }],
          options
        )
      );

    const input = getInputOrDefault('test', 'default');

    expect(input).toBe('test-value');
  });

  it('should return default value', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(name, [{ name: 'test', givenValue: '' }], options)
      );

    const input = getInputOrDefault('test', 'default');

    expect(input).toBe('default');
  });
});

describe('getBooleanInputOrDefault', () => {
  jest.mock('@actions/core');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return default value', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(name, [{ name: 'test', givenValue: '' }], options)
      );

    const input = getBooleanInputOrDefault('test', true);

    expect(input).toBe(true);
  });

  it('should return true', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(
          name,
          [
            {
              name: 'test1',
              givenValue: 'true'
            },
            {
              name: 'test2',
              givenValue: 'TruE'
            }
          ],
          options
        )
      );

    let input = getBooleanInputOrDefault('test1', false);
    expect(input).toBe(true);

    input = getBooleanInputOrDefault('test2', false);
    expect(input).toBe(true);
  });

  it('should return false', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(
          name,
          [
            {
              name: 'test1',
              givenValue: 'false'
            },
            {
              name: 'test2',
              givenValue: 'FalSe'
            }
          ],
          options
        )
      );

    let input = getBooleanInputOrDefault('test1', true);
    expect(input).toBe(false);

    input = getBooleanInputOrDefault('test2', true);
    expect(input).toBe(false);
  });

  it('give invalid input. expect throw error', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(
          name,
          [
            {
              name: 'test1',
              givenValue: 'false'
            },
            {
              name: 'test2',
              givenValue: 'invalid'
            }
          ],
          options
        )
      );

    expect(() => getBooleanInputOrDefault('test2', true)).toThrow(
      "The value of 'test2' is not valid. It must be either true or false but got 'invalid'."
    );
  });
});

describe('getNumberInputOrDefault', () => {
  jest.mock('@actions/core');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return default value', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(name, [{ name: 'test', givenValue: '' }], options)
      );

    const expected = 10;
    const input = getNumberInputOrDefault('test', expected);

    expect(input).toBe(expected);
  });

  it('should return given value', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(
          name,
          [
            {
              name: 'test',
              givenValue: '   10   '
            }
          ],
          options
        )
      );

    const input = getNumberInputOrDefault('test');
    expect(input).toBe(10);
  });

  it('give invalid input. expect throw error', () => {
    jest
      .spyOn(core, 'getInput')
      .mockImplementation((name: string, options?: core.InputOptions) =>
        mockGetInput(
          name,
          [
            {
              name: 'test',
              givenValue: 'abc'
            }
          ],
          options
        )
      );

    expect(() => getNumberInputOrDefault('test', 10)).toThrow(
      `Can not convert 'abc' to number.`
    );
  });
});
