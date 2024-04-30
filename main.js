"ui";
const UI = require("./UI.js");
UI();


const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
    GetLocalTime,
} = require("./Global.js");


const {
    DeathCheck,
    AbilityPointCheck,
    MissionCheck,
    MenuCheck,
    BackPackCheck,
} = require("./Check.js");

const AbilityPointsFlow = require("./AbilityPoints.js");

const MainStoryFlow = require("./MainStory.js");
const MissionFlow = require("./Mission.js");
const MenuFlow = require("./Menu.js");
const { BackPackFlow } = require("./BackPack.js");
const DeathFlow = require("./Death.js");
const ExceptionCatch = require("./Exception.js");

const TimeRegister = {
    backPackTimer: 3,
    collectionChecker: 150,
};
let TimerRecorder = {
    backPackTimer: 1,
    collectionChecker: 150,
};

const TimerChecker = function (item)
{
    if (TimerRecorder[item] <= 0)
    {
        TimerRecorder[item] = TimeRegister[item];
        return true;
    }
    else
    {
        TimerRecorder[item]--;
        return false;
    }
};
const Check = function ()
{
    try
    {
        let shot = images.captureScreen();
        MainStoryFlow();
        Sleep();
        DeathCheck(shot) && DeathFlow();
        Sleep();
        AbilityPointCheck(shot) && AbilityPointsFlow();
        Sleep();
        MissionCheck(shot) && MissionFlow();
        Sleep();
        TimerChecker("backPackTimer") && BackPackCheck(shot) && BackPackFlow();
        Sleep();
        TimerChecker("collectionChecker") && MenuCheck(shot) && MenuFlow();
        Sleep();
        ExceptionCatch();
    } catch (e)
    {
        console.error(e);
        alert("出现错误~", `${e}`);
        java.lang.System.exit(0);
    }

    // toast("Checking.....");
};

console.setGlobalLogConfig({
    "file": "/sdcard/脚本/log/rom-log.txt",
    "filePattern": "%d{dd日}%m%n"
});

const w = floaty.window(
    <frame gravity="center" bg="#fd4b4f">
        <text id="text">R</text>
    </frame >
);
w.setPosition(0, 80);


const Main = function ()
{
    threads.start(function ()
    {
        setInterval(() => Check(), 2000);
    }
    );
};
// Main();