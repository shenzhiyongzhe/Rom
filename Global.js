const posRef = {
    goBack: [1180, 24, 60, 14], // 返回按钮
    blank: [300, 200, 600, 300],

    skip: [39, 20, 1225, 653],

    menu: [1221, 19, 31, 29],
    menu_close: [1222, 21, 31, 25],
    backPack: [1090, 20, 25, 15],
    collectionPage: [1098, 121, 19, 27],
    collectionPage_login: [752, 610, 109, 23],
};
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

        "isFirstPropsLogin": false
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
//《《《------------------------------------简化封装------------------------------------------》》》
/**
 * @description 读取图片
 * @param {*} name 
 * @returns img
 */
// const ReadImg = (name) => images.read(`/sdcard/脚本/Rom/img/${name}.png`);
const ReadImg = (name) => images.read(`./img/${name}.png`);

const Click = ({ x, y }) => click(x, y);
const Press = ({ x, y }, time) =>
{
    time = time || random(100, 500);
    press(x, y, time);
};
const Sleep = (min, max) =>
{
    min = min || 1000;
    max = max || 2000;
    sleep(random(min, max));
};
const GenerateRandomPos = function GenerateRandomPos([startX, startY, w, h])
{
    const x = Math.round(Math.random() * w + startX);
    const y = Math.round(Math.random() * h + startY);
    return { x, y };
};
const RandomClick = (area) => Click(GenerateRandomPos(area));
const RandomPress = (area, time) =>
{
    time = time || random(20, 500);
    Press(GenerateRandomPos(area), time);
};
const GoBack = () => RandomPress(posRef.goBack, random(20, 300));

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

const GetLocalTime = () =>
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
    posRef,
    game_config,
    RWFile,
    ReadImg,
    Sleep,
    GenerateRandomPos,
    RandomClick,
    RandomPress,
    GoBack,
    CharacterIdentity,
    GetLocalTime,
};
