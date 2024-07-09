
let game_config = {
    "player": {
        "deathtime": 0,
        "level": 1,
        "profession": "archer",
        "equipment": {
            "weapon": { "color": "white", "level": 0 },
            "helmet": { "color": "white", "level": 0 },
            "underwear": { "color": "white", "level": 0 },
            "chestplate": { "color": "white", "level": 0 },
            "plate": { "color": "white", "level": 0 },
            "brachialArmor": { "color": "white", "level": 0 },
            "pants": { "color": "white", "level": 0 },
            "boots": { "color": "white", "level": 0 },
            "glyph": { "color": "white", "level": 0 }
        },
        "trade": {
            "total": 0,
            "lastTime": "",
            "settlement": 0,
            "todaySettlementTimes": 0
        }
    },
    "ui": {
        "gameMode": "mainStory",
        "isBeginner": false,
        "isRandomServer": false,
        "instanceQueue": [],
    },
    "setting": {
        "date": 0,
        "hasDailyBuy": false,
        "hasFinishedDelegate": false
    }
};
const jsonFile = "/sdcard/Rom/game_config.json";
function RWFile(type, obj)
{
    const isCreate = files.createWithDirs(jsonFile);
    if (isCreate)
    {
        files.write(jsonFile, JSON.stringify(game_config));
    }
    let data = JSON.parse(files.read(jsonFile));
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
        files.write(jsonFile, JSON.stringify(data));
    } catch (e)
    {
        log(e);
    }
}
game_config = RWFile();



function GetLocalTime()
{
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hours = date.getHours() - 1;
    let minutes = date.getMinutes();
    return `${month}月${day}日${hours}:${minutes}`;
};

log("Global.js 加载完成");
module.exports = {
    game_config,
    RWFile,
    GetLocalTime,
};
