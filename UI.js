"ui";



let isRunning = false;
function StartScript(data)
{
    if (isRunning == true)
    {
        console.log("结束");
        java.lang.System.exit(0);
        // engines.stopAllAndToast();
        // exit();
    }
    else if (isRunning == false)
    {
        threads.start(function ()
        {
            isRunning = true;
            auto();
            images.requestScreenCapture(true);
            Main(data);

        }
        );
    }
}


const UI = () =>
{
    ui.layout(`
    <vertical>
        <webview id="web" h="*"/>
    </vertical>`);

    ui.web.loadUrl("file://" + files.path("./UI/ui.html"));

    ui.web.jsBridge.registerHandler("StartScript", (data, callBack) =>
    {
        toastLog("拿到html页面数据,脚本开始运行..." + data);
        StartScript(data);
        setTimeout(() =>
        {
            //回调web
            callBack("successful");
        }, 1000);
    });




};
module.exports = UI;
// UI();