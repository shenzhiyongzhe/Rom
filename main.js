"ui";
const UI = require("./UI.js");
UI();

const { game_config, RWFile, } = require("./RomConfig.js");

const { Exception, MakeSureInGame } = require("./Exception.js");

const { Sleep } = require("./Utils.js");

console.setGlobalLogConfig({
    "file": "/sdcard/Rom/rom-log.txt",
    "filePattern": "%d{dd日}%m%n"
});

const floaty_window = floaty.window(
    <frame gravity="center" id="switch" w="42" h="20" bg="#ffffff" alpha="1">
        <text id="monthlyIncome" textColor="#f44336">000</text>
    </frame>

);

floaty_window.setPosition(10, 650);

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
        Update();
    }
});

const Start = (data) =>
{
    data = JSON.parse(data);
    RWFile('ui', data);
    game_config.ui = data;
};
const Update = () =>
{
    return threads.start(function ()
    {
        console.log("/****** start main task ******/");
        MakeSureInGame();
        Sleep();
        console.log("gameMode: " + game_config.ui.gameMode);
        setInterval(() =>
        {
            Exception();
        }, 5000);
    });
};


const Main = function (data)
{
    Start(data);

    Update();

};
