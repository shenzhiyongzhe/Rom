const Sleep = (min, max) =>
{
    min = min || 1000;
    max = max || 2000;
    sleep(random(min, max));
};
const RandomPress = ([startX, startY, w, h]) =>
{
    const time = random(16, 512);
    const x = Math.round(Math.random() * w + startX);
    const y = Math.round(Math.random() * h + startY);
    press(x, y, time);
    Sleep();
};
const ReadImg = (name) => images.read(`./img/${name}.png`);
const GoBack = () => RandomPress([1149, 10, 125, 52]);
const PressBlank = () => RandomPress([270, 96, 647, 502]);
const PressMenu = () => RandomPress([1226, 19, 24, 27]);
const PressBackpack = () => RandomPress([1094, 24, 22, 27]);
let game_config = {
    "player": {
        "deathtime": 0,
        "level": 1,
        "profession": "archer",
        "equipment": {
            "weapon": { "color": "white", "level": 0 },
            "chestplate": { "color": "white", "level": 0 },
            "pants": { "color": "white", "level": 0 },
            "boots": { "color": "white", "level": 0 }
        }
    },
    "ui": {
        "isBeginner": false,
        "gameMode": "mainStory"
    },
    "setting": {

        "isFirstPropsLogin": false,
        "time": "2024-05-09T12:00:00.000Z"
    }
};
function RWFile(type, obj)
{
    let file = files.read("./game_config.json");
    let data = JSON.parse(file);
    if (type == null || obj == null)
    {
        return data;
    }
    else if (type == "player")
    {
        data.player = obj;
    }
    else if (type == "ui")
    {
        data.ui = obj;
    }
    else if (type == "setting")
    {
        data.setting = obj;
    }

    try
    {
        files.write("./game_config.json", JSON.stringify(data));
    } catch (e)
    {
        log(e);
    }
}
game_config = RWFile();
game_config.setting.time = new Date().getTime();



const CharacterIdentity = function ()
{
    const actor = ReadImg("archer");
    const isArcher = images.findImage(captureScreen(), actor, { region: [6, 4, 78, 79] });
    actor.recycle();
    const player = game_config.player;
    if (isArcher)
    {
        player.profession = "archer";
        RWFile("player", player);
        return true;
    } else
    {
        player.profession = "wizard";
        RWFile("player", player);
        return false;
    }
};

function GetLocalTime()
{
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hours = date.getHours() - 1;
    let minutes = date.getMinutes();
    return `${month}月${day}日${hours}:${minutes}`;
};
// setInterval(() =>
// {
//     game_config.setting.time = GetLocalTime();
// }, 1000);

log("Global.js 加载完成");
module.exports = {
    game_config,
    Sleep,
    RandomPress,
    PressBlank,
    PressMenu,
    PressBackpack,
    RWFile,
    ReadImg,
    GoBack,
    CharacterIdentity,
    GetLocalTime,
};
