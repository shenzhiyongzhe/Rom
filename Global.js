const posRef = {
    mainStory: [980, 90, 200, 30],
    skillPoint: [14, 14, 50, 44],
    skillConfirm: [230, 510, 120, 20],
    skillClose: [335, 70, 30, 12],
    skillPoint_swift: [312, 282, 25, 20],
    skillPoint_wisedom: [312, 341, 24, 19],
    deathConfirm: [570, 515, 130, 20],
    grocery: [70, 270, 100, 30],
    potion: [160, 220, 200, 40],
    potionMax: [820, 365, 40, 20],
    potionConfirm: [685, 520, 65, 25],
    goBack: [1180, 24, 60, 14], // 返回按钮
    rewards: [1150, 10, 33, 28],
    achievement: [420, 95, 80, 15],
    getAwards: [1145, 160, 100, 15], //任务成就奖励
    blank: [300, 200, 600, 300],
    signIn: [960, 468, 20, 32],
    signInAwards: [1050, 570, 150, 30],
    characterSignIn: [210, 100, 100, 15],
    signIn_kate: [386, 100, 88, 21],
    email: [1025, 475, 25, 10], //邮件图标
    email_account: [44, 101, 71, 23], //邮件账号页
    email_character: [170, 99, 58, 30], //邮件角色页
    emailAward: [1070, 660, 160, 25], //邮件领取按钮
    skip: [39, 20, 1225, 653],
    missionFinish: [263, 209, 796, 323],

    menu: [1221, 19, 31, 29],
    menu_close: [1222, 21, 31, 25],
    collectionPage: [1098, 121, 19, 27],
    collectionPage_login: [752, 610, 109, 23],
    dutyIcon: [1166, 198, 17, 32],
    duty_adventurer: [278, 89, 104, 13],
    duty_close: [1108, 62, 43, 25],
    craft_icon: [953, 200, 33, 31], //制造
    craft_button: [1062, 657, 175, 36], //制作按钮
    craft_equipmentPage: [31, 97, 96, 35],
    craft_bow: [22, 257, 134, 42], //弓
    craft_staff: [28, 314, 129, 31], // 法杖
    craft_defensePage: [16, 470, 142, 44],
    craft_defense_chestplate: [30, 373, 112, 35], //胸甲
    instanceIcon: [958, 286, 27, 31], //副本
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
//加载图片函数
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
const imgRef = {};
const Init = function ()
{
    imgRef.death = ReadImg("CN_characterDeath");
    imgRef.grocery = ReadImg("grocery");
    imgRef.skip = ReadImg("skip");
    imgRef.missionFinish = ReadImg("CN_missionFinish");
    imgRef.mainStoryTitle = ReadImg("mainStoryTxt");
    imgRef.inMission = ReadImg("inMission");
    imgRef.haltMode = ReadImg("CN_haltMode");
    imgRef.back = ReadImg("back");
    imgRef.confirm = ReadImg("CN_confirm");
    imgRef.revive = ReadImg("CN_revive");
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
};
