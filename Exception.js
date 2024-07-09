
const {
    FindMultiColors, FindGreenBtn, GetNumber, Sleep, RandomPress, IsHaltMode, IsInCity, ReturnHome, WaitUntilPageBack, ReadImg, WaitUntilMenu,
    UseRandomTransformScroll, ExitHaltMode,
    HasMenu, HasCloseMenu, OpenMenu, HasPageBack, GoBack, CloseMenu,
    SwipToBottom,

} = require("./Utils.js");

const { PickUpExpOrEquipment } = require("./Player.js");
const { IncreaseCount } = require("./PeriodicallyCheck.js");
const { Daily } = require("./Daily.js");
const { game_config } = require("./RomConfig.js");

const imgList = {
    noPotion: ReadImg("exception/noPotion")
};

// ---------------- check flow ----------------
const MainUIArray = [
    ["#ff2200", [[-1, 6, "#ff2200"], [20, 4, "#ff2200"], [57, 11, "#ff2200"], [68, 10, "#ffffff"]]],
    ["#fe2200", [[0, 7, "#fe2200"], [19, -4, "#fd2300"], [19, 13, "#fe2200"], [68, 6, "#fefefc"], [114, 10, "#fefefc"]]]
];

const pinkColorList = [
    ["#87052f", [[15, -1, "#88012a"], [19, 12, "#8e022e"], [8, 15, "#8b0029"], [-1, 22, "#8b002a"]]],
    ["#760222", [[15, 0, "#7c0225"], [34, -2, "#810226"], [7, 12, "#7d0227"], [24, 14, "#870126"]]],
    ["#640421", [[13, 0, "#6a0423"], [25, 0, "#6d0322"], [8, 15, "#76011c"], [-27, 10, "#720825"]]],
    ["#85032c", [[17, -4, "#8b032e"], [15, 13, "#91012d"], [4, 16, "#990227"]]],
    ["#6c071e", [[14, -1, "#6d0727"], [27, -1, "#6f0526"], [5, 11, "#75031e"], [18, 11, "#6d0220"]]],
    ["#61021c", [[17, -4, "#640421"], [29, -3, "#690424"], [14, 10, "#670222"], [3, 15, "#6a0525"]]],
    ["#a70236", [[17, -4, "#af0136"], [35, -6, "#b60139"], [23, 3, "#b50138"], [9, 10, "#b70038"]]],
    ["#600320", [[14, -3, "#61031f"], [25, -8, "#640321"], [9, 5, "#670422"], [26, 3, "#60001b"]]]
];


const HasMainUI = () => FindMultiColors(MainUIArray, [1107, 664, 148, 49]);

const HasDeathPopup = () => FindGreenBtn([538, 533, 204, 57]);
const HasDisconnectionPopup = () => FindGreenBtn([660, 434, 178, 46]);
const HasStartGame = () => FindGreenBtn([1085, 647, 173, 46]);
const HasLongTimeNoInput = () => FindGreenBtn([551, 434, 180, 47]);

const HasAttackByOthers = () => FindMultiColors(pinkColorList, [1213, 651, 66, 67]);
const PotionCheck = () =>
{
    const hasMenu = HasMenu();
    if (!hasMenu) return false;

    const isNoPotion = images.findImage(captureScreen(), imgList.noPotion, { region: [958, 634, 52, 55] });
    if (isNoPotion)
    {
        console.log("当前药水数量为：0");
        return true;
    }
    return false;
};



const GameModeCheck = () =>
{
    const mode = game_config.ui.gameMode;
    if (mode == "mainStory")
    {
        console.log("mainStoryCheck");
    }
    else if (mode == "instance")
    {
        console.log("instanceCheck");
    }
    else if (mode == "delegate")
    {
        console.log("delegateCheck");
    }
};


// ---------------- flow --------------

const LaunchGame = () =>
{
    app.launch("com.kakaogames.rom");
    console.log("游戏启动中...");
    Sleep(30000, 60000);
    for (let i = 0; i < 60; i++)
    {
        let hasMainUI = HasMainUI();
        Sleep();
        if (hasMainUI) return;
    }
};

const RestartGame = () =>
{
    const appName = "com.kakaogames.rom";
    app.openAppSetting(appName);
    text(app.getAppName(appName)).waitFor();
    let is_sure = textMatches(/(.*강.*|.*종.*|.*료.*|.*FORCE.*|.*STOP.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled())
    {
        textMatches(/(.*강.*|.*종.*|.*료.*|.*FORCE.*|.*STOP.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*확.*|.*인.*|.*OK.*|.*确.*|.*定.*)/).findOne().click();
        sleep(1000);
        back();
    } else
    {
        log(appName + "应用不能被正常关闭或不在后台运行");
        back();
    }
    home();
    Sleep(3000, 5000);
    LaunchGame();
    console.log("重启游戏......");
};
const CloseHaltMode = () =>
{
    const isInHaltMode = IsHaltMode();
    if (isInHaltMode)
    {
        ExitHaltMode();
    }
    OpenMenu();
    RandomPress([1093, 550, 27, 30]); //setting
    WaitUntilPageBack();
    RandomPress([22, 276, 200, 34]);
    RandomPress([1100, 204, 107, 26]);
    GoBack();
};

const PotionFlow = () =>
{
    console.log("Start Flow: 开始购买药水");

    const isInCity = IsInCity();
    if (!isInCity)
    {
        ReturnHome();
    }
    RandomPress([77, 275, 94, 29]);
    WaitUntilPageBack();
    const curLoad = GetNumber("amount", [1161, 599, 45, 41]);
    const totalLoad = GetNumber("amount", [1199, 605, 44, 30]);
    console.log("当前背包物品数量为：" + curLoad + "，背包总容量为：" + totalLoad);
    if (curLoad == null || totalLoad - curLoad < 3)
    {
        GoBack();
        DecomposeAll();
        RandomPress([77, 275, 94, 29]);
        WaitUntilPageBack();
    }
    RandomPress([1236, 284, 21, 29]);
    const returnHomeScroll = ReadImg("backpack/scroll/returnHome");
    const transformScroll = ReadImg("backpack/scroll/transformRandomly");
    const hasReturnHomeScroll = images.findImage(captureScreen(), returnHomeScroll, { region: [885, 123, 334, 465] });
    const hasTransformScroll = images.findImage(captureScreen(), transformScroll, { region: [885, 123, 334, 465] });
    let returnHomeScrollNum, transformScrollNum;
    if (hasReturnHomeScroll)
    {
        returnHomeScrollNum = GetNumber("tinyfont", [hasReturnHomeScroll.x + 10, hasReturnHomeScroll.y + 20, 30, 30]);
    }
    if (hasTransformScroll)
    {
        transformScrollNum = GetNumber("tinyfont", [hasTransformScroll.x + 10, hasTransformScroll.y + 20, 30, 30]);
    }
    console.log(transformScrollNum, returnHomeScrollNum);
    if (returnHomeScrollNum < 10 || transformScrollNum < 10)
    {
        RandomPress([127, 657, 219, 33]); //批量购买
        RandomPress([279, 214, 35, 15]); //max
        SwipToBottom([105, 520, 25, 25], [87, 502, 60, 59], [81, 481, 303, 78], [96, 142, 288, 92]);
        Sleep();
        const auto_transformScrollNum = GetNumber("amount", [349, 223, 48, 35]);
        if (auto_transformScrollNum < 100)
        {
            RandomPress([102, 311, 26, 20]);
            RandomPress([218, 314, 34, 14]); //transform scroll 100 
        }
        const auto_returnHomeNum = GetNumber("amount", [344, 344, 54, 39]);
        if (auto_returnHomeNum < 100)
        {
            RandomPress([104, 432, 24, 22]);
            RandomPress([218, 436, 35, 17]); // return home 100 
        }
        if (FindGreenBtn([211, 644, 193, 62]))
        {
            RandomPress([229, 660, 157, 31]);
        }

    }

    RandomPress([929, 657, 304, 32]);
    GoBack();

    const potionNum = GetNumber("tinyfont", [978, 661, 32, 30]);
    if (potionNum < 10)
    {
        alert("no money", "没钱买药水");
    }
    console.log("End Flow: 购买药水完成");
};
const MainUIFlow = () =>
{
    console.log("Start Flow: MainUI...");
    for (let i = 0; i < 3; i++)
    {
        RandomPress([166, 75, 898, 489]);
        Sleep(5000, 8000);
        let hasStuck = HasMainUI();
        if (!hasStuck) break;
    }
    Sleep(5000, 8000);
    console.log("End Flow: MainUI");
};

const DeathFlow = () =>
{
    console.log("Start Flow: DeathFlow");
    RandomPress([553, 547, 175, 30]);
    Sleep(3000, 5000);
    PickUpExpOrEquipment();
    PotionCheck() && PotionFlow();;

};

const DisconnectionFlow = () =>
{
    console.log("Start Flow: DisconnectionFlow");
    let setting = game_config.setting;
    if (setting.restartTimes == undefined)
    {
        setting.restartTimes = 0;
    }
    if (setting.data == new Date().getDay())
    {
        setting.restartTimes++;
    }
    else
    {
        setting.restartTimes = 0;
    }
    RWFile("setting", setting);
    if (setting.restartTimes > 3)
    {
        alert("重启游戏次数过多", "游戏已经重启：" + setting.restartTimes + "次");
    }
    RandomPress([456, 443, 155, 24]);
    Sleep(5000, 8000);
    LaunchGame();
};

const PageBackFlow = () => GoBack();

const MenuCloseFlow = () => CloseMenu();

const StartGameFlow = () => { RandomPress([1102, 656, 145, 27]); Sleep(15000, 30000); WaitUntilMenu(); };

const LongTimeNoInputFlow = () =>
{
    console.log("Start Flow: 长时间未输入");
    RandomPress([568, 444, 148, 23]);
    Sleep(3000, 5000);
    LaunchGame();
};
const AttackedFlow = () =>
{
    console.log("attacked by others!!!!");
    UseRandomTransformScroll();
    ModeFlow();
};
const InCityFlow = () =>
{
    console.log("Start Flow: 当前在城内");
    PotionCheck() && PotionFlow();
    Daily();
};


const MakeSureInGame = () =>
{
    console.log("make sure in game");
    const blackSreenColorList = [
        ["#000000", [[41, 4, "#000000"], [69, 4, "#000000"], [6, 21, "#000000"], [46, 25, "#000000"], [71, 25, "#000000"]]]
    ];
    const IsStartingGame = () => FindMultiColors(blackSreenColorList, [1147, 625, 132, 94]);
    for (let i = 0; i < 10; i++)
    {
        Sleep(3000, 5000);
        let hasMenu = HasMenu();
        if (hasMenu)
        {
            break;
        }
        if (IsStartingGame())
        {
            Sleep(90000, 120000);
        }
        Exception();
    }

};
const Exception = () =>
{
    HasMainUI() && MainUIFlow();
    HasPageBack() && PageBackFlow();
    HasCloseMenu() && MenuCloseFlow();
    IsHaltMode() && CloseHaltMode();

    HasDisconnectionPopup() && DisconnectionFlow();
    HasStartGame() && StartGameFlow();
    HasLongTimeNoInput() && LongTimeNoInputFlow();
    HasDeathPopup() && DeathFlow();

    IsInCity() && InCityFlow();
    PotionCheck() && PotionFlow();

    HasAttackByOthers() && AttackedFlow();

    IncreaseCount();
};

module.exports = {
    Exception, MakeSureInGame,
};
