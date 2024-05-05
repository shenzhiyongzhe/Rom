"ui";
const UI = require("./UI.js");
UI();


const {
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
const { WearEquipment, UseProps, DecomposeProps } = require("./BackPack.js");
const DeathFlow = require("./Death.js");
const ExceptionCatch = require("./Exception.js");
const BeginnerFlow = require("./BeginnerTutorial.js");

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
    abilityPoint: 10,
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

const game_config = {
    player: {},
    ui: {},
    setting: { isBeginner: true, gameMode: "mainStory" }
};

function Init()
{
    const storage = storages.create("game_config");
    const hasInit = storage.get("game_config");
    if (hasInit == null)
    {
        storage.put("game_config", JSON.stringify(game_config));
    }
    else
    {
        game_config = JSON.parse(hasInit);
    }
    Sleep();
}
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
        game_config.setting.gameMode == "mainStory" && MainStoryFlow();
        Sleep();
        DeathCheck(shot) && DeathFlow();
        Sleep();
        TimeChecker("ableAbilityPoint") && AbilityPointCheck(shot) && AbilityPointsFlow();
        Sleep();
        MissionCheck(shot) && MissionFlow();
        Sleep();
        TimeChecker("equip") && BackPackCheck(shot) && WearEquipment();
        Sleep();
        TimeChecker("props") && BackPackCheck(shot) && UseProps();
        Sleep();
        MenuCheck(shot) && MenuFlow();
        Sleep();
        ExceptionCatch();
    } catch (e)
    {
        console.error(e);
        alert("出现错误~", `${e}`);
        java.lang.System.exit(0);
    }
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
    Init();
    game_config.setting.isBeginner && BeginnerFlow();
    threads.start(function ()
    {
        setInterval(() => Check(), 2000);
    }
    );
};
// Main();