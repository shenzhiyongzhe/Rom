"ui";
const UI = require("./UI.js");
UI();


const {
    posRef,
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
        equip: 32,
        props: 64
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
        props: 3
    },
    menu: {
        collection: 216,
        signIn: 1,
        email: 1
    }
};


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

        game_config.ui.gameMode == "mainStory" && MainStoryFlow();
        Sleep();
        DeathCheck() && DeathFlow();
        Sleep();
        TimeChecker("abilityPoint") && AbilityPointCheck(shot) && AbilityPointsFlow();
        Sleep();
        MissionCheck(shot) && MissionFlow();
        Sleep();
        TimeChecker("equip") && BackPackCheck(shot) && WearEquipment();
        Sleep();
        TimeChecker("props") && BackPackCheck(shot) && UseProps();
        Sleep();
        MenuCheck(shot) && MenuFlow();
        Sleep();
        game_config.gameMode == "mainStory" && MainStoryFlow();
        Sleep();
        ExceptionCatch();
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
        <button id="menuBtn" w="10" h="10" bg="#00ff00"></button>
    </frame>
);
floaty_window.setPosition(0, 80);
let isRuning = true;
floaty_window.menuBtn.click(function ()
{
    let color = floaty_window.menuBtn.attr("bg");
    if (color == "#00ff00")
    {
        floaty_window.menuBtn.attr("bg", "#ff0000");
        isRuning = false;
    }
    else
    {
        floaty_window.menuBtn.attr("bg", "#00ff00");
        isRuning = true;
    }
    PauseScripte();
});
function PauseScripte()
{
    let pauseThread = threads.start(function ()
    {
        while (isRuning)
        {
            Sleep(1000);
        }
        console.log("脚本暂停");
    }
    );
}

const Main = function (data)
{
    let data = JSON.parse(data);
    console.log(`脚本启动时间：${GetLocalTime()}`);
    RWFile('ui', data);
    game_config.ui = data;
    console.log(`游戏配置：${game_config.ui.isBeginner}`);
    game_config.ui.isBeginner == true && BeginnerFlow();
    game_config.ui.gameMode == "instance" && EnterInstanceZones();
    threads.start(function ()
    {
        setInterval(() => Check(), 2000);
    }
    );
};
// Main();