import * as core from '@actions/core';
import { getInputs } from './inputs';
import { controller } from './controller';
import { setOutputs } from './outputs';

export default function run(): void {
  try {
    mainProcess();
    core.debug('Operation completed successfully.');
  } catch (error: any) {
    // Fail the workflow run if an error occurs
    core.error('Operation failed.');
    core.setFailed(error instanceof Error ? error.message : error.toString());
  }
}

function mainProcess(): void {
  const inputs = getInputs();

  const outputs = controller(inputs);

  setOutputs({
    success: outputs.success,
    messagesStr: outputs.messagesStr,
    messages: outputs.messages
  });

  if (inputs.verbose) core.info(outputs.messagesStr);

  if (!outputs.success) {
    core.setFailed(
      outputs.messages
        .filter(message => message.type === 'error')
        .map(message => message.message)
        .join('\n')
    );
  }
}
