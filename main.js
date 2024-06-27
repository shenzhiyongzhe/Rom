"ui";
const UI = require("./UI.js");
UI();

const { game_config, RWFile, } = require("./RomConfig.js");
const { Sleep, GoBack, ReadImg } = require("./Utils.js");
const { BeginnerFlow } = require("./Player.js");
const { UnifyScreen, Exception, FirstOpenGameCheck } = require("./Exception.js");
const { EnterInstanceZones } = require("./Instance.js");

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

let gameMode;

const StartMainTask = () =>
{
    return threads.start(function ()
    {
        const menu_icon = ReadImg('icon/menu_icon');
        if (!images.findImage(images.captureScreen(), menu_icon, { region: [1216, 9, 45, 46] }))
        {
            Sleep(60000, 180000);
        }
        menu_icon.recycle();
        Sleep();
        if (gameMode == "instance") EnterInstanceZones();

        setInterval(() =>
        {
            Exception();

            if (gameMode == "mainStory")
            {
                MainStory();
            }
        }, 10000);
        console.log("start new main thread");
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

    console.log("start main;  data:  " + game_config.ui.gameMode);
    game_config.ui.isBeginner == true && BeginnerFlow(data.isRandomServer);
    gameMode = game_config.ui.gameMode;
    Sleep(3000, 4000);
    FirstOpenGameCheck();
    for (let i = 0; i < 5; i++)
    {
        Sleep(3000, 5000);
        UnifyScreen();
        Exception();
    }
    StartMainTask();
};
// Main();