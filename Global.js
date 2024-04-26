const posRef = {
    goBack: [1180, 24, 60, 14], // 返回按钮
    blank: [300, 200, 600, 300],

    skip: [39, 20, 1225, 653],

    menu: [1221, 19, 31, 29],
    menu_close: [1222, 21, 31, 25],
    collectionPage: [1098, 121, 19, 27],
    collectionPage_login: [752, 610, 109, 23],
};
const Player = {
    profession: "archer", //职业
    level: 0,
    equipment: {
        weapon: "green", //武器
        chestplate: "green", //胸甲
        pant: "white", //裤子
        boots: "green", //鞋子
    },
    pushMainStory: true, //是否推进主线任务
    isInMainStory: true, //是否正在进行主线任务
};

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
    if (images.findImage(captureScreen(), actor, { region: [6, 4, 78, 79] }))
    {
        actor.recycle();
        return true;
    } else
    {
        actor.recycle();
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
const imgRef = {};
const Init = function ()
{
    imgRef.skip = ReadImg("skip");
    imgRef.haltMode = ReadImg("CN_haltMode");
    imgRef.back = ReadImg("back");
    imgRef.confirm = ReadImg("CN_confirm");
    imgRef.version = ReadImg("version");
};

Init();
log("Global.js 加载完成");
module.exports = {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    GenerateRandomPos,
    RandomClick,
    RandomPress,
    GoBack,
    CharacterIdentity,
    GetLocalTime,
};
