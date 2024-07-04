"ui";
const UI = require("./UI.js");
UI();

const { game_config, RWFile, } = require("./RomConfig.js");
const { Sleep, GoBack, ReadImg, HasMenu } = require("./Utils.js");
const { BeginnerFlow } = require("./Player.js");
const { UnifyScreen, Exception, FirstOpenGameCheck } = require("./Exception.js");
const { EnterInstanceZones } = require("./Instance.js");
const { Daily, CheckDelegate } = require("./Daily.js");
const { MainStory } = require("./MainStory.js");

console.setGlobalLogConfig({
    "file": "/sdcard/Rom/rom-log.txt",
    "filePattern": "%d{dd日}%m%n"
});

const floaty_window = floaty.window(
    <frame gravity="center" id="switch" w="42" h="20" bg="#ffffff" alpha="1">
        <text id="settlement" textColor="#f44336">000</text>
    </frame>

);

floaty_window.setPosition(10, 650);

let delegateTimer = 0;
let instanceTimer = 719;
const StartMainTask = () =>
{
    return threads.start(function ()
    {
        const hasMenu = HasMenu();
        if (!hasMenu)
        {
            Sleep(60000, 180000);
            Exception();
        }
        Sleep();
        Daily();

        console.log("/****** start main task ******/");
        console.log("gameMode: " + game_config.ui.gameMode);

        setInterval(() =>
        {
            Exception();

            if (game_config.ui.gameMode == "mainStory")
            {
                MainStory();
            }
            else if (game_config.ui.gameMode == "instance")
            {
                instanceTimer++;
                if (instanceTimer > 720)
                {
                    EnterInstanceZones();
                    instanceTimer = 0;
                }
            }
            else if (game_config.ui.gameMode == "delegate")
            {
                delegateTimer++;
                if (delegateTimer > 360)
                {
                    console.log("检查委托进度及领取奖励");
                    CheckDelegate();
                    delegateTimer = 0;
                }
            }
        }, 10000);
    });
};
floaty_window.switch.click(function ()
{
    let alpha = floaty_window.switch.attr("alpha");
    if (alpha == "1")
    {
        floaty_window.switch.attr("alpha", "0.5");
        threads.shutDownAll();
        console.log("main thread is stoped ");
    }
    else
    {
        floaty_window.switch.attr("alpha", "1");
        StartMainTask();
    }
});



const Main = function (data)
{
    data = JSON.parse(data);
    RWFile('ui', data);
    game_config.ui = data;

    game_config.ui.isBeginner == true && BeginnerFlow(data.isRandomServer);

    // **** 修改配置 **** 仅临时使用 //
    // const setting = game_config.setting;
    // setting.autoGrocery = false;
    // RWFile('setting', setting);

    Sleep(3000, 4000);
    FirstOpenGameCheck();
    for (let i = 0; i < 5; i++)
    {
        Exception();
        Sleep(3000, 5000);
        let isInGame = UnifyScreen();
        if (isInGame) break;
    }
    StartMainTask();
};
// Main();