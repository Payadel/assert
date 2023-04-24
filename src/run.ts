import * as core from "@actions/core";

import {getInputs} from "./Inputs";
import {controller} from "./controller";

const run = () => getInputs()
    .then(controller)
    .then(outputs => {
        core.setOutput("success", outputs.success);
        core.setOutput("messages", outputs.messages);

        if (!outputs.success)
            core.setFailed("")
    })
    .then(() => core.info("Operation completed successfully."))
    .catch(error => {
        core.error("Operation failed.")
        if (error instanceof Error)
            core.setFailed(error.message);
        else
            core.setFailed(error)
    });

export default run;
