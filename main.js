"ui";
const UI = require("./UI.js");
UI();


const {
    game_config,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
    GetLocalTime,
    RWFile,
} = require("./Global.js");


const {
    AbilityPointCheck,
    MissionCheck,
    MenuCheck,
    BackPackCheck,
} = require("./Check.js");

const AbilityPointsFlow = require("./AbilityPoints.js");

const MainStoryFlow = require("./MainStory.js");
const MissionFlow = require("./Mission.js");
const MenuFlow = require("./Menu.js");
const { WearEquipment, UseProps, DecomposeProps } = require("./BackPack.js");
const { DeathFlow, DeathCheck } = require("./Death.js");
const ExceptionCatch = require("./Exception.js");
const BeginnerFlow = require("./Beginner.js");
const EnterInstanceZones = require("./Menu/InstanceZones.js");

const TimeRegister = {
    abilityPoint: 10,
    backPack: {
        equip: 16,
        props: 32,
        decompose: 100
    },
    menu: {
        collection: 216,
        signIn: 432,
        email: 432
    }

};

let TimeRecorder = {
    abilityPoint: 2,
    backPack: {
        equip: 3,
        props: 3,
        decompose: 100
    },
    menu: {
        collection: 216,
        signIn: 1,
        email: 1
    }
};

let gameMode;
function TimeChecker(item)
{
    for (let key in TimeRecorder)
    {
        if (key == item)
        {
            if (TimeRecorder[key] <= 0)
            {
                TimeRecorder[key] = TimeRegister[key];
                return true;
            }
            else
            {
                TimeRecorder[key]--;
                return false;
            }
        }
        else
        {
            for (let subKey in TimeRecorder[key])
            {
                if (subKey == item)
                {
                    if (TimeRecorder[key][subKey] <= 0)
                    {
                        TimeRecorder[key][subKey] = TimeRegister[key][subKey];
                        return true;
                    }
                    else
                    {
                        TimeRecorder[key][subKey]--;
                        return false;
                    }
                }
            }
        }
    }
}

const Check = function ()
{
    try
    {
        let shot = images.captureScreen();
        DeathCheck() && DeathFlow();
        Sleep();
        TimeChecker("abilityPoint") && AbilityPointCheck(shot) && AbilityPointsFlow();
        Sleep();
        MissionCheck(shot) && MissionFlow();
        Sleep();
        if (gameMode == "mainStory")
        {
            TimeChecker("equip") && BackPackCheck(shot) && WearEquipment();
            Sleep();
            TimeChecker("props") && BackPackCheck(shot) && UseProps();
            Sleep();
            MenuCheck(shot) && MenuFlow();
            Sleep();
        }
        else if (gameMode == "instance")
        {
            TimeChecker("decompose") && DecomposeProps();
            Sleep();
        }
        ExceptionCatch();
        Sleep();
        log("Check flow");
    } catch (e)
    {
        console.error(e);
        alert("出现错误~", `${e}`);
        java.lang.System.exit(0);
        // engines.stopAllAndToast();
    }
};

console.setGlobalLogConfig({
    "file": "/sdcard/脚本/log/rom-log.txt",
    "filePattern": "%d{dd日}%m%n"
});

const floaty_window = floaty.window(
    <frame gravity="center">
        <button id="menuBtn" w="15" h="15" bg="#90dbdb"></button>
    </frame>
);

floaty_window.setPosition(0, 60);
let isRunning = true;
floaty_window.menuBtn.click(function ()
{
    let color = floaty_window.menuBtn.attr("bg");
    if (color == "#90dbdb")
    {
        floaty_window.menuBtn.attr("bg", "#ff0000");
        isRunning = false;
    }
    else
    {
        floaty_window.menuBtn.attr("bg", "#90dbdb");
        isRunning = true;
    }
});

let startTime = new Date().getTime();
let normalZone;
let specialZone;
function zoneCheck()
{
    for (let i = 0; i < specialZone.length; i++)
    {
        if (specialZone[i].checked == true)
        {
            let isTimeUp = (new Date().getTime() - startTime) / 3600000 - specialZone[i].time;
            log("time passed: " + isTimeUp);
            if (isTimeUp >= 0)
            {
                console.log("进入特殊副本, 第" + (i + 1) + "个");
                return true;
            }
            else return false;
        }
    }
    for (let i = 0; i < normalZone.length; i++)
    {
        if (normalZone[i].checked == true)
        {
            let isTimeUp = (new Date().getTime() - startTime) / 3600000 - normalZone[i].time;
            log("time passed: " + isTimeUp);
            if (isTimeUp >= 0)
            {
                console.log("进入普通副本，第" + (i + 1) + "个");
                return true;
            }
            else return false;
        }
    }
    return false;

}

const Main = function (data)
{
    let data = JSON.parse(data);
    console.log(`脚本启动时间：${GetLocalTime()} \n ${data.normalZone}`);
    RWFile('ui', data);
    game_config.ui = data;
    game_config.ui.isBeginner == true && BeginnerFlow();
    normalZone = data.normalZone;
    specialZone = data.specialZone;
    gameMode = game_config.ui.gameMode;
    threads.start(function ()
    {
        Check();
        Sleep(10000, 2000);
        game_config.ui.gameMode == "instance" && EnterInstanceZones();
        setInterval(() =>
        {
            if (isRunning == true)
            {
                Check();

                if (gameMode == "mainStory")
                {
                    MainStoryFlow();
                }
                else if (gameMode == "instance")
                {
                    log("副本检查");
                    zoneCheck() && EnterInstanceZones();
                    let autoBattle = images.findMultiColors(captureScreen(), "#5d3518", [[40, 0, "#643a18"], [48, 0, "#5b3719"], [30, -20, "#4e2f19"], [30, 21, "#523118"]], { region: [1139, 517, 81, 87], threshold: 12 });
                    if (autoBattle == null)
                    {
                        RandomPress([1161, 549, 35, 29]);
                    }
                }
            }
            else
            {
                console.log("脚本已暂停运行");
            }

        }, 4000);
    }
    );
};
// Main();