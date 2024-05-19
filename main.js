"ui";
const UI = require("./UI.js");
UI();


const { game_config, RWFile, } = require("./Global.js");

const Check = require("./Check.js");
const { AsyncException } = require("./Exception.js");
const BeginnerFlow = require("./Beginner.js");

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


const Main = function (data)
{
    let data = JSON.parse(data);
    RWFile('ui', data);
    game_config.ui = data;

    console.log("start main;  data:  " + game_config.ui.gameMode);
    game_config.ui.isBeginner == true && BeginnerFlow(data.isRandomServer);
    const gameMode = game_config.ui.gameMode;
    threads.start(function ()
    {
        setInterval(() =>
        {
            if (isRunning == true)
            {
                Check(gameMode);

            }
            else
            {
                console.log("脚本已暂停运行");
            }

        }, 4000);
    }
    );
    threads.start(function ()
    {
        setInterval(() =>
        {
            AsyncException();
        }, 10000);
    }
    );
};
// Main();