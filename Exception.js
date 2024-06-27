
const { ReadImg, Sleep, RandomPress, InCity, NoMoneyAlert, GetColorInMultiple, GoBack, SaveShot } = require("./Utils.js");
const { DisconnectedGameArray, DisconnectedServerArray, MainUIArray, DeathPopupArray, LongTimeNoInputArray, StartGameArray } = require("./Color.js");
const { RomApp, } = require("./CONST.js");
const { ReturnHome, PutOnSale } = require("./BackPack.js");
const { DeathFlow, GroceryFlow, CrucifixFlow } = require("./Death.js");
const { AutoBattleCheck, EnterInstanceZones } = require("./Instance.js");
const { game_config } = require("./RomConfig.js");
const { PropsCollectionFlow } = require("./PropsCollection.js");
//断开连接
const imgList = {
    pageBack: ReadImg("icon/back"),
    noPotion: ReadImg("exception/noPotion"),
    haltMode_noPotion: ReadImg("exception/haltMode_noPotion"),
    haltMode_backpack90: ReadImg("exception/haltMode_backpack90"),
    haltMode_backpack100: ReadImg("exception/haltMode_backpack100"),
    menu_close: ReadImg("icon/menu_close")
};
const RestartApp = function (appName)
{
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
    sleep(5000);
    app.launch(appName);
    Sleep(60000, 120000);
};
const LaunchApp = function (appName)
{
    app.launch(appName);
    Sleep(60000, 120000);
};
const HaltModeCheck = function (shot)
{
    const hasHaltMode = images.findMultiColors(shot, "#454442", [[24, 1, "#373737"], [47, 4, "#535353"], [73, 1, "#515151"], [91, 1, "#494947"]], { region: [516, 172, 271, 250] });
    if (hasHaltMode)
    {
        return true;
    }
    return false;
};
const ExitHaltMode = function ()
{
    const x1 = 630 + random(-20, 20);
    const y1 = 200 + random(-10, 10);
    const x2 = x1 + random(-10, 10);
    const y2 = 400 + random(-20, 100);
    gesture(1000, [x1, y1], [x2, y2]);
    log("Exiting Halt Mode");
    Sleep(3000, 5000);
    return true;
};
const PageBackCheck = function (shot)
{
    const hasPageBack = images.findImage(shot, imgList.pageBack, { region: [1197, 4, 80, 58] });
    if (hasPageBack)
    {
        Sleep();
        RandomPress([1162, 17, 106, 30]);
    }
};
const MenuCloseCheck = (shot) => images.findImage(shot, imgList.menu_close, { region: [1213, 7, 51, 52] });
const NoExpCheck = function (shot)
{
    let curExp = images.clip(shot, 151, 547, 80, 24);
    for (let i = 0; i < 10; i++)
    {
        Sleep(10000, 20000);
        let hasIncrease = images.findImage(captureScreen(), curExp, { region: [136, 536, 121, 52] });

        if (hasIncrease == null) return false;
        else if (i == 9)
        {
            ExitHaltMode();
            console.log("long time no exp!!! exit halt mode check game");
            return true;
        }
    }
};
const NoPotionCheck = function (shot)
{
    const hasNoPotion = images.findImage(shot, imgList.noPotion, { region: [941, 615, 80, 82] });
    const hasNoPotion_haltMode = images.findImage(shot, imgList.haltMode_noPotion, { region: [904, 4, 63, 70] });
    if (hasNoPotion || hasNoPotion_haltMode)
    {
        console.log("---------------no potion---------------");
        return true;
    }

    return false;
};
const BackpackFullCheck = function (shot)
{
    const backpack90 = images.findImage(shot, imgList.haltMode_backpack90, { region: [967, 16, 65, 65] });
    const backpack100 = images.findImage(shot, imgList.haltMode_backpack100, { region: [967, 16, 65, 65] });
    if (backpack90 || backpack100)
    {
        console.log("---------------backpack full--------------");
        return true;
    }
    return false;
};
const DisconnectedGameCheck = function (shot)
{
    // 1-6: 断开连接
    const hasDisconnected = GetColorInMultiple(shot, DisconnectedGameArray, [501, 429, 79, 57]);
    if (hasDisconnected)
    {
        console.log("DisconnectedGameCheck: disconnected game!!!");
        return true;
    }
    return false;
};

const DisconnectedServerCheck = function (shot)
{
    const hasDisconnected = GetColorInMultiple(shot, DisconnectedServerArray, [501, 436, 64, 40]);
    if (hasDisconnected)
    {
        console.log("DisconnectedServerCheck: disconnected server!!!");
        return true;
    }
    return false;
};
const LongTimeNoInputCheck = function (shot)
{
    const hasLongTimeNoInput = GetColorInMultiple(shot, LongTimeNoInputArray, [612, 438, 56, 38]);
    if (hasLongTimeNoInput)
    {
        console.log("LongTimeNoInputCheck: 检测到长时间无输入，点击继续");
        return true;
    }
    return false;
};
const MainUICheck = function (shot)
{
    const hasMainUI = GetColorInMultiple(shot, MainUIArray, [1107, 664, 148, 49]);
    if (hasMainUI)
    {
        console.log("MainUICheck: 检测到主界面");
        return true;
    }
    return false;
};
const DeathPopupCheck = function (shot)
{
    const hasDeathPopup = GetColorInMultiple(shot, DeathPopupArray, [598, 539, 80, 46]);
    if (hasDeathPopup)
    {
        console.log("DeathPopupCheck: 检测到死亡弹窗");
        return true;
    }
    return false;
};
const StartGameCheck = function (shot)
{
    const hasStartGame = GetColorInMultiple(shot, StartGameArray, [119, 651, 48, 34]);
    if (hasStartGame)
    {
        console.log("StartGameCheck: 检测到开始游戏按钮");
        return true;
    }
    return false;
};

const NoPotionFlow = function (shot)
{
    const isInHaltMode = HaltModeCheck(shot);
    if (isInHaltMode)
    {
        ExitHaltMode();
    }
    const isInCity = InCity(shot);
    if (!isInCity)
    {
        ReturnHome();
    }
    GroceryFlow();
    Sleep(4000, 8000);
    const isNoMoneyTobuy = NoPotionCheck(captureScreen());
    if (isNoMoneyTobuy)
    {
        SaveShot();
        NoMoneyAlert("{{没钱买药}}");
    }
    EnterInstanceZones();
};
function Exception()
{
    const shot = captureScreen();

    const isNoPotion = NoPotionCheck(shot);
    if (isNoPotion)
    {
        NoPotionFlow(shot);
        CrucifixFlow();
        return;
    }

    const hasHaltMode = HaltModeCheck(shot);
    if (hasHaltMode)
    {
        const isNoExpIncrease = NoExpCheck(shot);
        if (isNoExpIncrease)
        {
            ExitHaltMode();
            const noExp_shot = captureScreen();
            const noExp_IsInCity = InCity(noExp_shot);
            if (noExp_IsInCity)
            {
                const haltMode_isNoPotion = NoPotionCheck(noExp_shot);
                if (haltMode_isNoPotion)
                {
                    NoPotionFlow(noExp_shot);
                }
                EnterInstanceZones();
            }
            else
            {
                AutoBattleCheck();
            }
            return;
        }
        const isBackpackFull = BackpackFullCheck(shot);
        if (isBackpackFull)
        {
            ExitHaltMode();
            PropsCollectionFlow();
            PutOnSale();
            Sleep(10000, 20000);
            EnterInstanceZones();
            CrucifixFlow();
            return;
        }
    }
    else
    {
        const hadPageBack = PageBackCheck(shot);
        if (hadPageBack)
        {
            GoBack();
            return;
        }
        const hadMenuClose = MenuCloseCheck(shot);
        if (hadMenuClose)
        {
            RandomPress([1227, 20, 21, 28]);
        }
        const isInCity = InCity(shot);
        if (isInCity)
        {
            const inCity_isNoPotion = NoPotionCheck(shot);
            if (inCity_isNoPotion)
            {
                NoPotionFlow(shot);
            }
            if (game_config.ui.gameMode == "instance")
            {
                EnterInstanceZones();
            }
        }
        else
        {
            Sleep(4000, 6000);
            const stillInCity = InCity(captureScreen());
            if (stillInCity)
            {
                if (game_config.ui.gameMode == "instance")
                {
                    EnterInstanceZones();
                }
            }
            else
            {
                if (game_config.ui.gameMode == "instance")
                {
                    AutoBattleCheck(shot);
                }
            }

        }
        const atMainUI = MainUICheck(shot);
        if (atMainUI)
        {
            for (let i = 0; i < 3; i++)
            {
                RandomPress([184, 107, 902, 456]);
                Sleep(10000, 20000);
                let hasMainUI = MainUICheck(captureScreen());
                if (!hasMainUI)
                {
                    return;
                }
                else if (i == 9)
                {
                    RestartApp(RomApp);
                }
            }
            return;
        }
        const hadDead = DeathPopupCheck(shot);
        if (hadDead)
        {
            Sleep(1000, 5000);
            RandomPress([574, 565, 140, 25]);
            Sleep(15000, 20000);
            RandomPress([563, 546, 160, 34]);
            Sleep(3000, 5000);
            DeathFlow();
            return;
        }
        const hasStartGame = StartGameCheck(shot);
        if (hasStartGame)
        {
            RandomPress([1106, 660, 132, 21]);
            Sleep(60000, 120000);
            const startGame_isNoPotion = NoPotionCheck(captureScreen());
            if (startGame_isNoPotion)
            {
                GroceryFlow();
            }
            return;
        }
        const hasLongTimeNoInput = LongTimeNoInputCheck(shot);
        if (hasLongTimeNoInput)
        {
            RandomPress([571, 447, 140, 21]);
            Sleep(3000, 5000);
            LaunchApp(RomApp);
            return;
        }
        const isDisconnectedGame = DisconnectedGameCheck(shot);
        if (isDisconnectedGame)
        {
            RandomPress([468, 443, 138, 25]);
            Sleep(10000, 20000);
            LaunchApp(RomApp);
            return;
        }
        const isDisconnectedServer = DisconnectedServerCheck(shot);
        if (isDisconnectedServer)
        {
            RandomPress([463, 442, 146, 25]);
            Sleep(10000, 20000);
            LaunchApp(RomApp);
            return;
        }

    }
}
const UnifyScreen = function ()
{
    Sleep();
    let shot = captureScreen();
    const menuIcon = ReadImg("menu_icon");
    const hasMenu = images.findImage(shot, menuIcon, { region: [1206, 6, 68, 64] });
    menuIcon.recycle();
    if (hasMenu)
    {
        return;
    };
    const inSaveMode = images.findMultiColors(shot, "#454442", [[24, 1, "#373737"], [47, 4, "#535353"], [73, 1, "#515151"], [91, 1, "#494947"]], { region: [516, 172, 271, 250] });
    if (inSaveMode)
    {
        Sleep();
        ExitHaltMode();
        return;
    }
};
const FirstOpenGameCheck = function ()
{
    //screen is black
    const blackScreenArr = [
        ["#000000", [[-11, 162, "#000000"], [-8, 383, "#000000"], [-12, 598, "#000000"], [474, 644, "#000000"], [1033, 643, "#000000"], [1045, 324, "#000000"], [1046, -10, "#000000"]]],
        ["#000000", [[43, 187, "#000000"], [57, 480, "#000000"], [287, 99, "#000000"], [881, 88, "#000000"], [987, 443, "#000000"], [664, 532, "#000000"], [499, 556, "#000000"]]],
        ["#000000", [[362, 23, "#000000"], [600, 42, "#000000"], [1040, 257, "#000000"], [797, 487, "#000000"], [441, 509, "#000000"], [152, 469, "#000000"], [544, 581, "#000000"]]]
    ];
    for (let i = 0; i < 3; i++)
    {
        let isFirstEnterGame = GetColorInMultiple(captureScreen(), blackScreenArr, [4, 4, 1275, 714]);
        if (isFirstEnterGame)
        {
            Sleep(120000, 180000);
            break;
        }
        else
        {
            isFirstEnterGame = GetColorInMultiple(captureScreen(), blackScreenArr, [4, 4, 1275, 714]);
        }
        Sleep(3000, 6000);
    }
};
module.exports = { Exception, UnifyScreen, FirstOpenGameCheck };
