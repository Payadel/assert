import * as core from "@actions/core";

import { getInputs } from "./inputs";
import { controller } from "./controller";

const run = (): Promise<void> =>
    getInputs()
        .then(inputs =>
            controller(inputs).then(outputs => {
                core.setOutput("success", outputs.success);
                core.setOutput("messages", JSON.stringify(outputs.messages));
                core.setOutput("messagesStr", outputs.messagesStr);

                if (inputs.verbose) core.info(outputs.messagesStr);

                if (!outputs.success) {
                    core.setFailed(
                        outputs.messages
                            .filter(message => message.type === "error")
                            .map(message => message.message)
                            .join("\n")
                    );
                }
            })
        )
        .then(() => core.info("Operation completed successfully."))
        .catch(error => {
            core.error("Operation failed.");
            core.setFailed(
                error instanceof Error ? error.message : error.toString()
            );
        });

export default run;
