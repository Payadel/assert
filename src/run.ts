import * as core from "@actions/core";

import {getInputs} from "./Inputs";
import {controller} from "./controller";

const run = () =>
    getInputs()
        .then(inputs => controller(inputs)
            .then(outputs => {
                core.setOutput("success", outputs.success);
                core.setOutput("messages", outputs.messages);
                core.setOutput("messagesStr", outputs.messagesStr);

                if (inputs.verbose)
                    core.info(outputs.messagesStr)

                if (!outputs.success) {
                    core.setFailed(outputs.messages.filter(message => message.type === 'error').map(message => message.message).join('\n'))
                }
            }))
        .then(() => core.info("Operation completed successfully."))
        .catch(error => {
            core.error("Operation failed.")
            if (error instanceof Error)
                core.setFailed(error.message);
            /* istanbul ignore next */
            else
                core.setFailed(error)
        });

export default run;
