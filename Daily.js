const { Sleep, RandomPress, GoBack, PressBlank, OpenMenu, GetNumber, RandomSwipe, FindTipPoint, RandomHollow,
    FindMultiColors, ReadImg, FindGreenBtn, FindGrayBtn, SwipToBottom, HasPageBack, WaitUntilMenu, WaitUntilPageBack, FindCheckMark,
    CloseMenu, HasMenu } = require("./Utils.js");
const { OpenAllEquipmentBox, OpenAllProps, StrengthenPlayerEquipment, StrengthenTradeGreenSuit, PutOnSale, } = require("./BackPack.js");


const { game_config, RWFile } = require("./RomConfig.js");
const { MakeComsumables, MakeGreenSuit } = require("./Manufacture.js");
const { EnterInstanceZones } = require("./Instance.js");


const MenuTipPointCheck = () => FindTipPoint([1242, 2, 22, 25]);

const overMaxNumber = () =>
{
    Sleep();
    const hasConfirm = images.findMultiColors(captureScreen(), "#3d4538", [[22, -1, "#3a4436"], [129, 1, "#373f33"], [126, 17, "#333a2e"], [15, 16, "#2f372b"]]
        , { region: [543, 425, 201, 64] });
    if (hasConfirm)
    {
        RandomPress([570, 443, 141, 26]);
        return true;
    }
    return false;
};

const GetSignIn = function ()
{
    OpenMenu();
    const canSignIn = FindTipPoint([977, 536, 21, 27]);
    if (!canSignIn) return;
    RandomPress([961, 555, 26, 30]);
    Sleep(2000, 4000);
    const shot = captureScreen();
    let canGetAward, isCurPage;
    for (let i = 0; i < 4; i++)
    {
        Sleep();
        let hasTipPoint = FindTipPoint([142 + 166 * i, 77, 55, 28]);
        isCurPage = images.findMultiColors(captureScreen(), "#c38e4d", [[13, 0, "#d29950"], [20, 0, "#d49a50"], [30, 0, "#d59a4f"]], { region: [40 + 162 * i, 120, 140, 15] });
        if (hasTipPoint)
        {
            if (isCurPage == null)
            {
                RandomPress([hasTipPoint.x - 110, hasTipPoint.y, 120, 15]);
                Sleep(2000, 4000);
            }
            Sleep();
            canGetAward = images.findMultiColors(captureScreen(), "#3c4538", [[14, 16, "#2e362a"], [131, 15, "#353c30"], [160, -1, "#c62414"], [160, 20, "#2c3328"]], { region: [1020, 547, 230, 85] });
            if (canGetAward)
            {
                RandomPress([1051, 570, 160, 31]);
                overMaxNumber();
            }
        }
    }
    GoBack();
    console.log("get sign in award");
};
const GetEmail = function ()
{
    OpenMenu();
    const hasEmail = FindTipPoint([1045, 536, 21, 25]);
    if (!hasEmail) return false;

    console.log("get email");
    RandomPress([1024, 556, 31, 22]); //email icon;
    Sleep(4000, 6000);
    const shot = captureScreen();
    let hasTipPoint, canGetAward, isCurPage;
    for (let i = 0; i < 4; i++)
    {
        Sleep();
        hasTipPoint = FindTipPoint([100 + 125 * i, 80, 100, 40]);
        isCurPage = images.findMultiColors(captureScreen(), "#cb9f63", [[4, 0, "#d0a262"], [10, 0, "#d8a867"], [21, 0, "#dca966"]], { region: [30 + 125 * i, 115, 140, 15] });
        if (hasTipPoint)
        {
            if (!isCurPage)
            {
                RandomPress([hasTipPoint.x - 110, hasTipPoint.y, 120, 15]);
                Sleep(2000, 4000);
            }
            Sleep();
            canGetAward = FindGreenBtn([1015, 628, 251, 88]);
            if (canGetAward)
            {
                RandomPress([1078, 659, 154, 33]);
                Sleep(8000, 12000);
                let isOverMax = overMaxNumber();
                if (isOverMax == false) RandomHollow([405, 273, 672, 136]);
            }
        }
        else break;

    }
    GoBack();
    console.log("get email end");
};

const GetDuty = function ()
{
    console.log("Start : Get Duty Award");
    OpenMenu();
    const hasDutyTipPoint = FindTipPoint([1176, 184, 30, 27]);
    if (!hasDutyTipPoint)
    {
        console.log("End: no award to pick up");
        return false;
    }
    RandomPress([1166, 207, 18, 20]);

    const redCheckMarkColorList = [
        ["#ff5a27", [[6, 5, "#ff4329"], [10, 10, "#ff3e28"], [20, -10, "#ff431d"]]],
        ["#ff8f72", [[5, 4, "#ff6d63"], [10, 10, "#ff3b3a"], [20, -9, "#ff402a"]]],
        ["#ff4431", [[6, 5, "#ff392b"], [8, -2, "#ff4219"], [16, -15, "#ff4c20"]]],
        ["#ff4032", [[4, 3, "#ff6349"], [9, -6, "#ff3f34"], [13, -13, "#ff3d29"]]],
        ["#ff432d", [[10, 10, "#ff3d30"], [17, -2, "#ff3b28"], [20, -8, "#ff3e29"]]],
        ["#ff4932", [[7, 6, "#ff4331"], [10, 9, "#ff3f2c"], [20, -9, "#ff3921"]]],
        ["#ff2d19", [[7, 7, "#ff2e18"], [11, -1, "#ff3e2c"], [14, -6, "#ff3c26"]]],
        ["#ff432e", [[5, 4, "#ff392b"], [8, 0, "#ff3d29"], [17, -14, "#ff401a"]]],
        ["#ff4b1f", [[6, 7, "#ff392c"], [9, 4, "#ff3d2d"], [17, -9, "#ff3c1b"]]]
    ];
    const popupColorList = [
        ["#4c4c4c", [[8, 3, "#8b7c63"], [15, 11, "#514e3d"], [17, 3, "#938c69"], [9, 10, "#7c7359"]]],
        ["#857b63", [[8, 8, "#7a7a5c"], [5, -1, "#968d72"], [0, 5, "#807555"]]]
    ];
    const HasPopup = () => FindMultiColors(popupColorList, [742, 112, 63, 42]);

    const PickAward = () =>
    {
        const shot = captureScreen();
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 2; j++)
            {
                let isFinished = images.findMultiColors(shot, "#222222", [[11, 0, "#8f4d1d"], [396, 0, "#432e20"], [398, 0, "#222222"]], { region: [139 + j * 500, 431 + i * 78, 435, 50] });
                if (!isFinished)
                {
                    continue;
                }
                let canPickup = FindMultiColors(redCheckMarkColorList, [563 + j * 500, 404 + i * 78, 74, 72]);
                if (!canPickup)
                {
                    if (HasPopup())
                    {
                        RandomPress([765, 124, 25, 14]);
                        Sleep();
                    }
                    RandomPress([581 + j * 500, 424 + i * 78, 36, 32]);
                    Sleep();
                }
            }
        }
    };

    if (FindTipPoint([244, 67, 110, 44]))
    {
        PickAward();
    }
    if (FindTipPoint([461, 63, 80, 35]))
    {
        RandomPress([354, 83, 113, 23]);
        Sleep();
        PickAward();
    }
    RandomPress([1116, 68, 32, 17]);
    console.log("get duty award, finished pick up");
};

const BulkBuy = function ()
{
    if (game_config.setting.hasDailyBuy == true)
    {
        console.log("今天已经商城购买，返回");
        return;
    }
    console.log("start: 开始商城购买");
    const pressMaxScroll = () =>
    {
        if (GetNumber("amount", [879, 265, 38, 39]) != 5)
        {
            RandomPress([1031, 271, 20, 23]);
            RandomPress([652, 440, 40, 40]); //max 
            RandomPress([658, 511, 94, 26]); // confirm
        }
        if (GetNumber("amount", [881, 337, 38, 40]) != 5)
        {
            RandomPress([1030, 343, 21, 22]);
            RandomPress([652, 440, 40, 40]); //max 
            RandomPress([658, 511, 94, 26]); // confirm  
        }

    };
    const hasInGame = WaitUntilMenu();
    if (!hasInGame) return;

    RandomPress([961, 21, 22, 26]); //shop icon
    WaitUntilPageBack();
    Sleep(2000, 4000);
    const totalMoney = GetNumber("amount", [590, 3, 121, 35]);
    if (totalMoney < 1500000)
    {
        console.log("当前金币为：" + totalMoney + " not enough money to buy anything");
        GoBack();
        return false;
    }
    if (!FindGreenBtn([5, 511, 205, 72]))
    {
        GoBack();
        return false;
    }
    RandomPress([26, 530, 163, 32]); //bulk btn



    const curSelectPrice = GetNumber("amount", [772, 561, 103, 41]);
    if (curSelectPrice == 1499704)
    {
        console.log("今天没有购买，开始全部购买");
        if (FindGreenBtn([881, 549, 183, 56]))
        {
            RandomPress([898, 565, 154, 27]);
            Sleep(10000, 12000);
            RandomHollow([260, 284, 806, 142]);
            RandomHollow([260, 284, 806, 142]);
            game_config.setting.hasDailyBuy = true;
            RWFile("setting", game_config.setting);
            GoBack();
        }
    }
    else
    {
        let x1 = random() * 10 + 219;
        let y1 = random() * 10 + 573;
        press(x1, y1, random() * 250 + 16); //select all

        Sleep(2000, 4000);
        SwipToBottom([708, 489, 62, 24], [672, 470, 120, 65], [514, 496, 58, 25], [504, 204, 81, 25]);

        pressMaxScroll();
        RandomPress([218, 206, 15, 14]); //cancel return home scroll
        RandomPress([218, 421, 15, 16]); // cancel equipment box
        const crystalBoxNum = GetNumber("amount", [877, 480, 45, 44]);
        if (crystalBoxNum != 2)
        {
            RandomPress([967, 494, 17, 12]);
        }
        const selectedPrice = GetNumber("amount", [772, 561, 103, 41]);

        // if (selectedPrice != 1284020)
        // {
        //     alert("购买商品出错：请排查");
        // }
        if (FindGreenBtn([881, 549, 183, 56]))
        {
            RandomPress([898, 565, 154, 27]);
            Sleep(10000, 12000);
            RandomHollow([260, 284, 806, 142]);
            RandomHollow([260, 284, 806, 142]);
            game_config.setting.hasDailyBuy = true;
            RWFile("setting", game_config.setting);
        }
    }

    GoBack();

};

const EnterDelegatePage = () =>
{
    const isInGame = WaitUntilMenu();
    if (!isInGame) return false;
    RandomPress([1155, 18, 30, 32]);
    WaitUntilPageBack();
    RandomPress([419, 97, 66, 28]);
    Sleep(2000, 4000);
    return true;
};


const GetDelegate = () =>
{
    console.log("GetDelegate...");

    const purpleColorList = [
        ["#7c4e96", [[6, 1, "#905dae"], [10, 0, "#82549d"], [15, 1, "#8f5da5"]]],
        ["#8c59a9", [[2, 3, "#82559d"], [5, 0, "#915fb0"], [9, 3, "#8a5aa6"], [15, 2, "#8f5da5"]]],
        ["#8c57ad", [[6, -1, "#80519a"], [11, 0, "#8858a4"], [13, 3, "#905cae"], [20, 1, "#9461ab"]]],
        ["#7b4e97", [[6, 0, "#83569e"], [12, 2, "#955fb4"], [19, 0, "#7d5190"]]]
    ];
    const PurpleDelegateCheck = () => FindMultiColors(purpleColorList, [18, 140, 39, 40]);
    const hasMarked = FindCheckMark([249, 571, 35, 41]);

    if (!hasMarked)
    {
        RandomPress([258, 581, 58, 20]);
    }
    let delegateCount = 0;
    for (let i = 0; i < 20; i++)
    {
        if (delegateCount == 5) break;
        let isClickable = FindGreenBtn([1063, 652, 203, 59]);
        if (!isClickable) break;

        let isPurpleDelegate = PurpleDelegateCheck();

        if (isPurpleDelegate)
        {
            RandomPress([1080, 666, 170, 30]);
            Sleep();
            delegateCount++;
        }
        else
        {
            RandomPress([115, 668, 164, 30]);
            let hasPopup = FindGreenBtn([657, 430, 183, 51]);
            if (hasPopup)
            {
                RandomPress([672, 443, 154, 27]);
            }
        }
        Sleep();
    }
    console.log("...delegate  num:" + delegateCount);
};

const StartDelegate = () =>
{
    console.log("start delegate...");
    const isFinished = false;
    const greenCircleColorList = [
        ["#76624e", [[25, 1, "#685a49"], [5, 0, "#556b13"], [19, 1, "#688612"], [13, 7, "#67821a"], [13, -6, "#85b013"], [12, 0, "#222222"], [8, -4, "#6c9009"]]],
        ["#735f4b", [[26, 1, "#695746"], [13, 7, "#617c16"], [13, -6, "#6c9015"], [7, 0, "#6b870f"], [20, 0, "#6c8c11"], [14, 0, "#222222"], [17, -5, "#85a801"]]],
        ["#78634e", [[23, 0, "#2d2925"], [5, 0, "#556b13"], [19, -1, "#6f9212"], [11, -7, "#7db60d"], [9, 6, "#61820d"], [15, -5, "#80ae0a"], [12, 0, "#222222"]]],
        ["#6c5e51", [[6, 1, "#6f803a"], [10, -6, "#8aac3b"], [16, -3, "#596d16"], [12, 2, "#222222"], [12, 7, "#566a25"], [19, 2, "#667928"], [25, 1, "#695f53"]]],
        ["#3d362e", [[6, -1, "#55622a"], [11, -8, "#89a63a"], [15, -8, "#85a631"], [20, -1, "#667c29"], [14, 4, "#5c6c2b"], [12, -1, "#222222"], [16, -1, "#21211f"]]]
    ];

    SwipToBottom([71, 462, 66, 22], [59, 449, 90, 48], [66, 427, 329, 57], [67, 164, 315, 62]);

    for (let i = 0; i < 5; i++)
    {
        let hasOnGoing = FindMultiColors(greenCircleColorList, [393, 263 + i * 53, 36, 32]);
        if (hasOnGoing)
        {
            RandomPress([61, 265 + i * 53, 321, 29]);
            if (FindGreenBtn([1065, 652, 202, 58]))
            {
                RandomPress([1079, 665, 172, 32]);
                Sleep(6000, 9000);
                isFinished = true;
                break;
            }
            else break;
        }
    }
    if (isFinished == false)
    {
        game_config.ui.gameMode = "delegate";
    }
    else
    {
        game_config.ui.gameMode = "instance";
    }
    RWFile("setting", game_config.setting);
};
const CheckDelegate = () =>
{
    if (game_config.setting.hasFinishedDelegate == true)
    {
        console.log("^^今日委托已做完");
        EnterInstanceZones();
        return;
    }
    console.log("检查委托......");

    let isFinished = false;

    const hasEntered = EnterDelegatePage();
    if (!hasEntered)
    {
        return false;
    }

    const canFinishedNum = GetNumber("amount", [393, 527, 23, 30]);
    console.log("可完成委托数量： " + canFinishedNum);
    if (canFinishedNum == 0 || canFinishedNum == null)
    {
        console.log("今日委托已做完，切换模式为副本模式");
        game_config.ui.gameMode = "instance";
        GoBack();
        EnterInstanceZones();
        game_config.setting.hasFinishedDelegate = true;
        RWFile("setting", game_config.setting);
        isFinished = true;
    }
    else
    {
        console.log("今日委托未做完，切换模式为委托模式");
        game_config.ui.gameMode = "delegate";
    }

    for (let i = 0; i < 5; i++)
    {
        let hasMark = FindCheckMark([389, 141, 48, 43]);
        let canGetAward = FindGreenBtn([1058, 652, 210, 57]);
        if (hasMark && canGetAward)
        {
            RandomPress([1085, 668, 162, 27]);
            RandomPress([474, 245, 743, 223]);
            Sleep();
        } else break;
    }
    const onGoingDelegateNum = GetNumber("amount", [108, 528, 22, 28]);
    if (isFinished == false && onGoingDelegateNum <= canFinishedNum)
    {
        let canGetBtn = FindGreenBtn([1058, 649, 212, 67]);
        if (canGetBtn)
        {
            GetDelegate();
        }

    }
    Sleep();
    if (!isFinished)
    {
        StartDelegate();
        Sleep(12000, 16000);
    }
    GoBack();
    Sleep(2000, 4000);
};


const Daily = function ()
{
    console.log("Start: Daily Flow");
    const hasMenu = HasMenu();
    if (!hasMenu)
    {
        console.log("没有菜单，返回");
        return false;
    }
    const setting = game_config.setting;
    const date = new Date().getDate();
    const hasMenuTipPoint = MenuTipPointCheck();
    if (hasMenuTipPoint)
    {
        GetSignIn();
        GetEmail();
    }

    if (date != setting.date)
    {
        setting.date = date;
        game_config.setting.hasDailyBuy = false;
        game_config.setting.hasFinishedDelegate = false;
        game_config.setting.deathTimes = 0;

        console.log("今天" + date + "号");
        RWFile("setting", setting);
        GetDuty();
        Sleep();
        MakeComsumables();
        OpenAllEquipmentBox();
        Sleep();
        OpenAllProps();
        Sleep();
        StrengthenPlayerEquipment("weapon");

        Sleep();
        StrengthenPlayerEquipment("armor");
        Sleep();
        StrengthenPlayerEquipment("ornament");
        Sleep();
        MakeGreenSuit();

        StrengthenTradeGreenSuit();
        PutOnSale();
    }

    CloseMenu();
    GoBack();
    CheckDelegate();

    BulkBuy();
};

module.exports = { CheckDelegate, BulkBuy, Daily };








