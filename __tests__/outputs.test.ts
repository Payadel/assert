import * as core from '@actions/core';
import { IOutput, setOutputs } from '../src/outputs';

jest.mock('@actions/core');

describe('setOutputs', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should set all outputs', () => {
    const data: IOutput = {
      success: true,
      messages: [],
      messagesStr: 'message'
    };

    jest.spyOn(core, 'setOutput');

    setOutputs(data);

    for (const key of Object.keys(data)) {
      // @ts-expect-error the `data[key]` can any type
      expect(core.setOutput).toHaveBeenCalledWith(key, data[key]);
    }
  });
});
