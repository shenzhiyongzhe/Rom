
const StartExecution = () => ui.start.click(function ()
{
    console.log("开始");

    MainThread();

});
const StopExecution = () => ui.stop.click(function ()
{
    console.log("结束");
    // threads.shutDownAll();
    // engines.stopAll();
    engines.stopAllAndToast();
    // java.lang.System.exit(0);

});
module.exports = {
    StartExecution,
    StopExecution
};