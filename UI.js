// "ui";
// const UIConfig = files.open("./UIConfig.json", "rw");

let isRunning = false;

const UIConfig = {
    "missionType": "mainStory",
    "tutorial": false
};

const UI = () =>
{
    ui.layout(
        <vertical bg="#CEE5F2" >
            <horizontal>
                <text text="是否开启新手教程:" textColor="black" marginTop="6" />
                <Switch id="tutorialSwitch" checked="false" />
            </horizontal>

            <horizontal bg="#f2f2f2" padding="10">
                <text text="模式:" textColor="black" marginTop="6" />
                <radiogroup id="missionType" orientation="horizontal" >
                    <radio id="mainStory" text="主线" />
                    <radio id="sideStory" text="委托" marginLeft="30" />
                    <radio id="instanceZone" text="副本" marginLeft="30" />
                </radiogroup>
            </horizontal>
            <button id="switch" text="开始" textSize="20sp" bg="#96c996" radius="10" />
        </vertical>
    );




    ui.switch.click(() =>
    {
        if (isRunning == true)
        {
            console.log("结束");
            // threads.shutDownAll();
            // engines.stopAll();
            // engines.stopAllAndToast();
            java.lang.System.exit(0);
        }
        else if (isRunning == false)
        {
            toastLog("脚本开始运行...");
            threads.start(function ()
            {
                isRunning = true;
                auto();
                images.requestScreenCapture(true);

                ui.switch.attr("bg", "#a5a7a6");
                ui.switch.setText("正在运行中...");
                Main();

            }
            );
        }
    });


    ui.missionType.setOnCheckedChangeListener((group, checkedId) => 
    {
        let checkedRadio = $ui.missionType.findViewById(checkedId);
        switch (checkedRadio)
        {
            case $ui.mainStory:
                UIConfig.missionType = "mainStory";
                break;
            case $ui.sideStory:
                UIConfig.missionType = "sideStory";
                break;
            case $ui.instanceZone:
                UIConfig.missionType = "instanceZone";
                break;
            default:
                toastLog("没有任何单选框被勾选");
                break;
        }
        log("UIConfig.missionType: " + UIConfig.missionType);
    }
    );
    ui.tutorialSwitch.on("check", function (checked)
    {
        if (checked)
        {
            UIConfig.tutorial = true;
            console.log("开启新手教程");
        } else
        {
            UIConfig.tutorial = false;
            console.log("关闭新手教程");
        }
    });
};
module.exports = UI;
// UI();