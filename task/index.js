"use strict";
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
const tl = require("azure-pipelines-task-lib/task");
const runscopeRequirements = "https://gist.githubusercontent.com/ThiagoBarradas/c7c5e83f089108fdd3fad9f165f5aaa0/raw";
const runscopeAppPython = "https://gist.githubusercontent.com/ThiagoBarradas/bc845ca918be6002a707819806c548fe/raw";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get inputs
            var triggerUrl = tl.getInput('triggerUrl', true);
            var accessToken = tl.getInput('accessToken', true);
            // install tools
            yield tl.exec('pip', ["install", "-r", runscopeRequirements]);
            yield tl.exec('wget', ["-O", "app.py", runscopeAppPython]);
            // execute integration tests
            yield tl.exec('python', ["app.py", triggerUrl, accessToken]);
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
