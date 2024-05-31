"ui";
const UI = require("./UI.js");
UI();


const { game_config, RWFile, PressMenu, Sleep, GoBack } = require("./Global.js");

const Check = require("./Check.js");
const BeginnerFlow = require("./Beginner.js");
const { UnifyScreen, Exception } = require("./Exception.js");
const { EnterInstanceZones } = require("./Instance.js");

console.setGlobalLogConfig({
    "file": "/sdcard/Rom/rom-log.txt",
    "filePattern": "%d{dd日}%m%n"
});
const bird = "file://img/bird.png";
const floaty_window = floaty.window(
    <frame gravity="center">
        <frame gravity="center">
            <img id="switch" src="{{bird}}" w="24" h="24" alpha="1" />
        </frame>
    </frame>
);

floaty_window.setPosition(0, 60);
let mainThread;
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
        mainThread = threads.start(function ()
        {
            setInterval(() =>
            {
                Check(game_config.ui.gameMode);
            }, 4000);
            console.log("start new main thread");
        }
        );
    }
});


const Main = function (data)
{
    let data = JSON.parse(data);
    RWFile('ui', data);
    game_config.ui = data;

    console.log("start main;  data:  " + game_config.ui.gameMode);
    game_config.ui.isBeginner == true && BeginnerFlow(data.isRandomServer);
    const gameMode = game_config.ui.gameMode;
    Sleep(3000, 4000);
    for (let i = 0; i < 5; i++)
    {
        UnifyScreen();
        Exception();
    }

    Sleep(3000, 5000);
    if (gameMode == "instance") EnterInstanceZones();
    mainThread = threads.start(function ()
    {
        setInterval(() =>
        {
            Check(gameMode);
        }, 4000);
    }
    );
};
// Main();