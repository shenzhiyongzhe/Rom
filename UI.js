// "ui";
// const UIConfig = files.open("./UIConfig.json", "rw");

let isRunning = false;
function StartScript()
{
    toastLog("脚本开始运行...");
    if (isRunning == true)
    {
        console.log("结束");
        java.lang.System.exit(0);
    }
    else if (isRunning == false)
    {
        threads.start(function ()
        {
            isRunning = true;
            auto();
            images.requestScreenCapture(true);
            Main();

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
        StartScript();
        setTimeout(() =>
        {
            //回调web
            callBack("successful");
        }, 1000);
    });


    // ui.switch.click(() =>
    // {
    //     if (isRunning == true)
    //     {
    //         console.log("结束");
    //         // threads.shutDownAll();
    //         // engines.stopAll();
    //         // engines.stopAllAndToast();
    //         java.lang.System.exit(0);
    //     }
    //     else if (isRunning == false)
    //     {
    //         toastLog("脚本开始运行...");
    //         threads.start(function ()
    //         {
    //             isRunning = true;
    //             auto();
    //             images.requestScreenCapture(true);

    //             ui.switch.attr("bg", "#a5a7a6");
    //             ui.switch.setText("正在运行中...");
    //             Main();

    //         }
    //         );
    //     }
    // });


    // ui.missionType.setOnCheckedChangeListener((group, checkedId) => 
    // {
    //     let checkedRadio = $ui.missionType.findViewById(checkedId);
    //     switch (checkedRadio)
    //     {
    //         case $ui.mainStory:
    //             UIConfig.missionType = "mainStory";
    //             break;
    //         case $ui.sideStory:
    //             UIConfig.missionType = "sideStory";
    //             break;
    //         case $ui.instanceZone:
    //             UIConfig.missionType = "instanceZone";
    //             break;
    //         default:
    //             toastLog("没有任何单选框被勾选");
    //             break;
    //     }
    //     log("UIConfig.missionType: " + UIConfig.missionType);
    // }
    // );
    // ui.tutorialSwitch.on("check", function (checked)
    // {
    //     if (checked)
    //     {
    //         UIConfig.tutorial = true;
    //         console.log("开启新手教程");
    //     } else
    //     {
    //         UIConfig.tutorial = false;
    //         console.log("关闭新手教程");
    //     }
    // });
};
module.exports = UI;
// UI();