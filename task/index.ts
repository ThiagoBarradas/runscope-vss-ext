import * as tl from 'azure-pipelines-task-lib/task';

const runscopeRequirements: string = "https://gist.githubusercontent.com/ThiagoBarradas/c7c5e83f089108fdd3fad9f165f5aaa0/raw/c005c96fb4be5ff56ab6d458cf774338e7191838/runscope-requirements";
const runscopeAppPython: string  = "https://gist.githubusercontent.com/ThiagoBarradas/bc845ca918be6002a707819806c548fe/raw/6a6e7e4288c4b1537b2f9312d4348e7a5d26624e/runscope-app.py";

async function run() {
    try {
        // get inputs
        var triggerUrl: string = tl.getInput('triggerUrl', true);
        var accessToken: string = tl.getInput('accessToken', true);

        // install tools
        await tl.exec('pip', ["install", "-r", runscopeRequirements]);
        await tl.exec('wget', ["-O", "app.py", runscopeAppPython]);
        
        // execute integration tests
        await tl.exec('python', ["app.py", triggerUrl, accessToken]);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
