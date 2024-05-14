
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
            app.launch("com.kakaogames.rom");
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

    ui.web.jsBridge.registerHandler("WebToAndroid", (data, callBack) =>
    {
        StartScript(data);
        setTimeout(() =>
        {
            //回调web
            callBack("successful");
        }, 1000);
    });

    // setInterval(() =>
    // {
    //     console.log("UI:game_config.setting.time:" + game_config.setting.time);
    //     ui.web.jsBridge.callHandler('AndroidToWeb', JSON.stringify(game_config), (data) =>
    //     {
    //         console.log("web callback:" + data);
    //     });
    // }, 1000);


};
module.exports = UI;
// UI();