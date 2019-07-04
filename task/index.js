"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const runscopeRequirements = "https://gist.githubusercontent.com/ThiagoBarradas/c7c5e83f089108fdd3fad9f165f5aaa0/raw/c005c96fb4be5ff56ab6d458cf774338e7191838/runscope-requirements";
const runscopeAppPython = "https://gist.githubusercontent.com/ThiagoBarradas/bc845ca918be6002a707819806c548fe/raw/05a06efd9bc505a6cd9d0acbb009711c30f1e581/runscope-app.py";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get inputs
            var triggerUrl = tl.getInput('triggerUrl', true);
            var accessToken = tl.getInput('accessToken', true);
            // install tools
            yield tl.exec('sudo', ["apt", "install", "python", "-y"]);
            yield tl.exec('sudo', ["apt", "install", "python-pip", "-y"]);
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
//# sourceMappingURL=index.js.map