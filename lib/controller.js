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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const core = __importStar(require("@actions/core"));
const asserts_1 = require("./asserts");
const controller = (inputs) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = [];
    let messagesStr = "";
    let hasError = false;
    for (const item of inputs.inputsYaml) {
        core.debug(`Type: ${item.type}`);
        let result;
        switch (item.type.toLowerCase()) {
            case "equals":
                result = yield tryFunction(() => (0, asserts_1.assertEquals)(item.expected, item.actual));
                break;
            case "not-equals":
                result = yield tryFunction(() => (0, asserts_1.assertNotEquals)(item.expected, item.actual));
                break;
            case "true":
                result = yield tryFunction(() => (0, asserts_1.assertTrue)(item.input));
                break;
            case "false":
                result = yield tryFunction(() => (0, asserts_1.assertFalse)(item.input));
                break;
            case "in":
                result = yield tryFunction(() => (0, asserts_1.assertIn)(item.member, item.container, item.case_sensitive));
                break;
            case "not-in":
                result = yield tryFunction(() => (0, asserts_1.assertNotIn)(item.member, item.container, item.case_sensitive));
                break;
            case "greater":
                result = yield tryFunction(() => (0, asserts_1.assertGreater)(item.target, item.greater_than));
                break;
            case "greater-equal":
                result = yield tryFunction(() => (0, asserts_1.assertGreaterEqual)(item.target, item.greater_equal));
                break;
            case "less":
                result = yield tryFunction(() => (0, asserts_1.assertLess)(item.target, item.less_than));
                break;
            case "less-equal":
                result = yield tryFunction(() => (0, asserts_1.assertLessEqual)(item.target, item.less_equal));
                break;
            case "regex":
                result = yield tryFunction(() => (0, asserts_1.assertRegex)(item.text, item.regex));
                break;
            default:
                result = {
                    success: false,
                    messages: `❌ The type '${item.type}' is not supported.`,
                };
                break;
        }
        const message = `${item.name}: ${result.messages}`;
        messages.push({
            type: result.success ? "success" : "error",
            message,
        });
        messagesStr += `${message}\n`;
        if (!result.success) {
            hasError = true;
            if (inputs.failFast)
                return {
                    success: false,
                    messages,
                    messagesStr,
                };
        }
    }
    return {
        success: !hasError,
        messages,
        messagesStr,
    };
});
exports.controller = controller;
function tryFunction(func) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = yield func();
            return {
                success: true,
                messages: message,
            };
        }
        catch (e) {
            return {
                success: false,
                messages: e instanceof Error ? e.message : e.toString(),
            };
        }
    });
}
//# sourceMappingURL=controller.js.map