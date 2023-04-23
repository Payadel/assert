import * as core from "@actions/core";
import * as github from "@actions/github";
import { wait } from "./wait";
// import * as exec from "@actions/exec";

async function run(): Promise<void> {
  try {
    const nameToGreet: string = core.getInput("who-to-greet");
    const ms: string = core.getInput("milliseconds");

    core.debug(new Date().toTimeString());
    core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    await wait(parseInt(ms, 10));
    core.debug(new Date().toTimeString());

    const hello_message = `Hello ${nameToGreet}!`;
    core.info(hello_message);
    core.setOutput("hello-message", hello_message);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    core.info(`The event payload: ${payload}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

// async function execBashCommand(command: string): Promise<exec.ExecOutput> {
//   return exec.getExecOutput(`/bin/bash -c "${command}"`);
// }

run();
