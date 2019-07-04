import * as tl from 'azure-pipelines-task-lib/task';

const runscopeRequirements: string = "https://gist.githubusercontent.com/ThiagoBarradas/c7c5e83f089108fdd3fad9f165f5aaa0/raw/c005c96fb4be5ff56ab6d458cf774338e7191838/runscope-requirements";
const runscopeAppPython: string  = "https://gist.githubusercontent.com/ThiagoBarradas/bc845ca918be6002a707819806c548fe/raw/05a06efd9bc505a6cd9d0acbb009711c30f1e581/runscope-app.py";

async function run() {
    try {
        // get inputs
        var triggerUrl: string = tl.getInput('triggerUrl', true);
        var accessToken: string = tl.getInput('accessToken', true);

        // install tools
        await tl.exec('sudo', ["apt", "install", "python", "-y"]);
        await tl.exec('sudo', ["apt", "install", "python-pip", "-y"]);
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
