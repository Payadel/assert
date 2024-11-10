import * as core from '@actions/core'

export interface IOutput {
  success: boolean;
  messagesStr: string;
  messages: any[];
}

export function setOutputs(data: IOutput): void {
  for (const key of Object.keys(data)) {
    // @ts-expect-error the `data[key]` can be any type
    core.setOutput(key, data[key])
  }
}
