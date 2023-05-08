"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputs = void 0;
const core = __importStar(require("@actions/core"));
const yaml = __importStar(require("js-yaml"));
const getInputs = () => new Promise(resolve => {
    const inputs = getInputOrDefault("inputs");
    if (!inputs || inputs.trim() === "")
        throw new Error("The inputs parameter is required and must be valid yaml.");
    const parsedYaml = yaml.load(inputs);
    ensureYamlValid(parsedYaml);
    const failFast = core.getBooleanInput("fail-fast");
    const verbose = core.getBooleanInput("verbose");
    return resolve({
        inputsYaml: parsedYaml,
        failFast,
        verbose,
    });
});
exports.getInputs = getInputs;
function getInputOrDefault(name, default_value = null) {
    const input = core.getInput(name);
    if (!input || input === "")
        return default_value;
    return input;
}
function ensureYamlValid(parsedYaml) {
    for (const item of parsedYaml) {
        if (!item.name)
            throw new Error(`The 'name' parameter is required.\nItem:${item}`);
        if (!item.type)
            throw new Error(`The 'type' parameter is required.\nItem:${item}`);
    }
}
//# sourceMappingURL=inputs.js.map