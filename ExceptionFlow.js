const { ReadImg, RandomPress, Sleep, FindMultiColors, FindGreenBtn, FindTipPoint, IsInCity, IsHaltMode, RandomSwipe, GetNumber, GoBack, CloseMenu, ExitHaltMode } = require("./Utils");
const { HasNoPotion, HasMainUI, CanPickExpOrEquipment } = require("./ExceptionCheck");
const { PropsCollectionFlow } = require("./Common");
const { ReturnHome, PutOnSale } = require("./BackPack");

const { game_config, RWFile } = require("./RomConfig");

const { GoOnTask } = require("./Player");
const LaunchGame = () =>
{
    app.launch("com.kakaogames.rom");
    console.log("游戏启动中...");
    Sleep(120000, 180000);
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

const MainUIFlow = () =>
{
    console.log("MainUIFlow");
    for (let i = 0; i < 3; i++)
    {
        RandomPress([166, 75, 898, 489]);
        Sleep(5000, 8000);
        let hasStuck = HasMainUI();
        if (!hasStuck) break;
    }
    Sleep(5000, 8000);
};

const PickUpExpOrEquipment = () =>
{
    console.log("PickUpExpAndEquipment");
    const expColorList = [
        ["#e7e7ce", [[0, 3, "#ecead4"], [0, 12, "#857c6a"], [18, 9, "#cfcfb2"], [26, 8, "#f1ecd4"], [35, 9, "#d2d0b9"], [44, 7, "#232323"], [127, 3, "#232323"]]]
    ];
    const coinColorList = [
        ["#232323", [[10, -2, "#e9d887"], [14, -2, "#eadf9e"], [18, -2, "#7f5927"], [18, 3, "#d7c384"], [14, 3, "#ddc77d"], [14, 4, "#bea863"], [13, 13, "#232323"]]]
    ];
    Sleep(3000, 5000);
    RandomPress([894, 20, 21, 31]);
    Sleep(3000, 5000);

    let shot = captureScreen();
    for (let i = 0; i < 5; i++)
    {
        let isExp = FindMultiColors(expColorList, [76, 135 + i * 83, 192, 68]);
        if (isExp)
        {
            RandomPress([178, 139 + i * 83, 190, 55]);
        }
        else break;
    }

    if (FindGreenBtn())
    {
        RandomPress([104, 595, 192, 22]); //confirm
        Sleep(2000, 4000);
    }

    if (FindGreenBtn())
    {
        RandomPress([674, 474, 133, 23]); // popup confirm
    }
    else
    {
        RandomPress([475, 474, 130, 26]);  //cancel
    }
    Sleep();

    //equipment 
    const hasLostEquipment = FindTipPoint([42, 220, 25, 30]);
    if (hasLostEquipment)
    {
        RandomPress([24, 238, 30, 46]); // equip page
        for (let j = 0; j < 5; j++)
        {
            let isEquip = FindMultiColors(coinColorList, [138, 144 + j * 83, 48, 57]);
            if (isEquip)
            {
                RandomPress([178, 139 + j * 83, 190, 55]);
            }
        }
    }
    if (FindGreenBtn())
    {
        RandomPress([104, 595, 192, 22]); //confirm
        Sleep(2000, 4000);
    }

    if (FindGreenBtn())
    {
        RandomPress([674, 474, 133, 23]); // popup confirm
    }
    else
    {
        RandomPress([475, 474, 130, 26]);  //cancel
    }
    Sleep();
    RandomPress([350, 69, 34, 15]);
    Sleep();
    console.log("拾取经验装备结束");
};
const BuyPotion = () =>
{
    console.log("开始购买药水");
    CanPickExpOrEquipment() && PickUpExpOrEquipment();
    const isInCity = IsInCity();
    if (isInCity)
    {
        RandomPress([77, 275, 94, 29]);
        for (let i = 0; i < 10; i++)
        {
            Sleep(3000, 5000);
            let hasEntered = FindGreenBtn([908, 641, 341, 63]);
            if (hasEntered) break;
        }
        const hasAutoGrocery = game_config.setting.autoGrocery;
        if (!hasAutoGrocery)
        {
            RandomPress([127, 657, 219, 33]); //批量购买
            RandomPress([279, 214, 35, 15]); //max
            for (let i = 0; i < 4; i++)
            {
                RandomSwipe([93, 508, 294, 60], [90, 144, 295, 77]);
                let hasReachedBottom = GetNumber("amount", [368, 472, 28, 28]);
                if (hasReachedBottom == 0)
                {
                    console.log("hasReachedBottom");
                    break;
                }
            }
            Sleep();
            const transformScrollNum = GetNumber("amount", [341, 222, 54, 40]);
            if (transformScrollNum < 100)
            {
                RandomPress([218, 314, 34, 14]); //transform scroll 100 
            }
            const returnHomeNum = GetNumber("amount", [344, 344, 54, 39]);
            if (returnHomeNum < 100)
            {
                RandomPress([218, 436, 35, 17]); // return home 100 
            }

            RandomPress([229, 660, 157, 31]);
            Sleep();
        }

        RandomPress([929, 657, 304, 32]);
        GoBack();
        Sleep();
    }
    const noPotion = HasNoPotion();
    if (noPotion)
    {
        alert("no money", "没钱买药水");
    }
    console.log("购买药水完成");
    Sleep();
};
const DeathFlow = () =>
{
    console.log("DeathFlow");
    RandomPress([553, 547, 175, 30]);
    Sleep(3000, 5000);
    PickUpExpOrEquipment();
    BuyPotion();
};
const DisconnectionFlow = () =>
{
    console.log("DisconnectionFlow");
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

const StartGameFlow = () => RandomPress([1102, 656, 145, 27]);

const LongTimeNoInputFlow = () =>
{
    console.log("长时间未输入");
    RandomPress([568, 444, 148, 23]);
    Sleep(3000, 5000);
    LaunchGame();

};

const BackpackFullFlow = () =>
{
    console.log("背包已满");
    const isInHaltMode = IsHaltMode();
    if (isInHaltMode)
    {
        ExitHaltMode();
    }

    PropsCollectionFlow();
    PutOnSale();
    CanPickExpOrEquipment() && PickUpExpOrEquipment();
    GoOnTask();
};

const InCityFlow = () =>
{
    console.log("当前在城内");
    CanPickExpOrEquipment() && PickUpExpOrEquipment();
    const isNoPotion = HasNoPotion();
    if (isNoPotion)
    {
        BuyPotion();
    }
    GoOnTask();
};

const NoExpFlow = () =>
{
    console.log("no exp flow");
    ExitHaltMode();
    const isInCity = IsInCity();
    if (isInCity)
    {
        InCityFlow();
    }
    else
    {
        GoOnTask();
    }
};
const NoPotionFlow = () =>
{
    console.log("no potion flow");
    ExitHaltMode();
    ReturnHome();
    InCityFlow();
};

module.exports = {
    ExitHaltMode, MainUIFlow, DeathFlow, DisconnectionFlow, PageBackFlow, MenuCloseFlow, StartGameFlow,
    LongTimeNoInputFlow, BackpackFullFlow, InCityFlow, NoExpFlow, NoPotionFlow
};