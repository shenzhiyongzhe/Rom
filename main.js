"ui";
ui.layout(
    <vertical bg="#ff0000">
        <button id="start" text="开始" textSize="20sp" />
        <button id="stop" text="结束" />
    </vertical>
);

const { StartExecution, StopExecution } = require("./UI.js");
StartExecution();
StopExecution();

const Sleep = (min, max) =>
{
    min = min || 1000;
    max = max || 2000;
    sleep(random(min, max));
};

const {
    DeathCheck,
    AbilityPointCheck,
    MissionCheck,
    MenuCheck,
    BackPackCheck,
} = require("./Check.js");

const DeathFlow = require("./Death.js");
const MissionFlow = require("./Mission.js");
const AbilityFlow = require("./AbilityPoints.js");
const MenuFlow = require("./Menu.js");
const ExceptionCatch = require("./Exception.js");
const MainStory = require("./MainStory.js");
const BackPackFlow = require("./BackPack.js");

const Check = function ()
{
    let shot = captureScreen();
    //主线检查
    MainStory();
    Sleep(200, 1000);
    //死亡检查
    DeathCheck(shot) && DeathFlow();
    //任务检查
    MissionCheck(shot) && MissionFlow();

    // 技能点检查
    AbilityPointCheck(shot) && AbilityFlow();
    Sleep(500, 1000);
    //背包小红点检查 打开宝箱
    BackPackCheck(shot) && BackPackFlow();
    // 菜单检查
    MenuCheck(shot) && MenuFlow();
    Sleep(100, 2000);

    // 异常检查
    ExceptionCatch();
};

const MainThread = () =>
    threads.start(function ()
    {
        auto();
        auto.waitFor();
        requestScreenCapture(true);
        while (true)
        {
            console.time("Elapsed Time");
            Check();
            sleep(2000);
            console.timeEnd("Elapsed Time");
        }
    });





