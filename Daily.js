const { Sleep, RandomPress, GoBack, PressBlank, OpenMenu, GetNumber, RandomSwipe, FindTipPoint, RandomHollow, FindMultiColors, ReadImg, FindGreenBtn, FindGrayBtn, SwipToBottom, HasPageBack } = require("./Utils.js");
const { OpenAllEquipmentBox, OpenAllProps, StrengthenPlayerEquipment, } = require("./BackPack.js");
const { ForgeMaterial, MakeComsumables } = require("./Manufacture.js");
const { game_config, RWFile } = require("./RomConfig.js");


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
            canGetAward = images.findMultiColors(captureScreen(), "#3b4436", [[5, 19, "#2b3428"], [118, 9, "#373f32"], [136, 28, "#2e362a"]], { region: [1044, 635, 214, 77] });
            if (canGetAward)
            {
                RandomPress([1078, 659, 154, 33]);
                Sleep(8000, 12000);
                let isOverMax = overMaxNumber();
                if (isOverMax == false) PressBlank();
            }
        }
        else break;

    }
    GoBack();
    console.log("get email end");
};

const GetDuty = function ()
{
    //寻找满进度条
    const FindMaxProgressBar = function (shot)
    {
        let maxArr = [];
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 2; j++)
            {
                let isProgressBarMax = images.findMultiColors(shot,
                    "#222222", [[175, 0, "#8f4c1c"], [307, 0, "#8f4c1b"], [388, 0, "#8f4a1b"], [389, 4, "#59361f"], [391, 0, "#222222"],],
                    { region: [140 + j * 500, 440 + i * 76, 110, 20], threshold: 16, });
                if (isProgressBarMax)
                {
                    maxArr.push(isProgressBarMax);
                }
            }
        }
        return maxArr;
    };
    //寻找没有领取的奖励的点
    const CanPickUpPoints = function (shot)
    {
        let points = [];
        const maxArr = FindMaxProgressBar(shot);
        if (maxArr.length == 0) return false;
        maxArr.forEach((element) =>
        {
            let isPickable = images.findMultiColors(shot, "#ff4a3d", [[3, 2, "#ff4335"], [4, 4, "#ff5549"], [9, -5, "#ff4a3d"], [12, -11, "#ff4c3c"]],
                { region: [element.x + 400, element.y - 40, 80, 100] });
            let isPickable_2 = images.findMultiColors(shot, "#ff836b", [[8, 9, "#ff3b3a"], [12, 0, "#ff8365"], [18, -10, "#ff412a"]],
                { region: [element.x + 400, element.y - 40, 80, 100] });
            if (isPickable == null && isPickable_2 == null)
            {
                let x = element.x + 417;
                let y = element.y - 37;
                points.push([x, y, 40, 40]);
            }
        });

        return points;
    };
    //领取奖励
    const DutyPickUp = function (shot)
    {
        const canPickArr = CanPickUpPoints(shot);
        if (canPickArr.length == 0) return false;
        canPickArr.forEach((element) =>
        {
            RandomPress(element);
            Sleep(1000, 2000);
        });
    };
    OpenMenu();
    Sleep(2000, 4000);
    const hasDutyTip = images.findMultiColors(captureScreen(), "#b72313", [[0, 2, "#bd2515"], [0, 4, "#be2417"]], { region: [1172, 175, 41, 45] });
    if (!hasDutyTip) return;

    RandomPress([1161, 203, 24, 25]); //duty icon;
    Sleep(2000, 4000);
    let shot = captureScreen();
    for (let i = 0; i < 3; i++)
    {
        let hasTip = images.findMultiColors(shot, "#b52211", [[-1, 2, "#d02919"], [1, 2, "#c02515"], [1, 4, "#c72a1c"]], { region: [272 + i * 176, 56, 73, 45] });
        let hasTip_2 = images.findMultiColors(shot, "#aa2111", [[-2, 2, "#c62717"], [1, 2, "#c32617"], [-1, 3, "#c22618"]], { region: [272 + i * 176, 56, 73, 45] });
        if (hasTip == null && hasTip_2 == null) continue;
        let isCurPage = images.findMultiColors(shot, "#ca9653", [[4, -1, "#a67032"], [11, -1, "#af7533"]], { region: [183 + i * 176, 99, 92, 28] });
        if (!isCurPage) 
        {
            RandomPress([173 + i * 176, 82, 124, 26]);
            Sleep();
            shot = captureScreen();
        }
        //pick award
        DutyPickUp(shot);
    }
    RandomPress([1112, 69, 38, 16]); //close 
    console.log("get duty award, finished pick up");
};
const BulkBuy = function ()
{
    console.log("开始每日购买");
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
    RandomPress([961, 21, 22, 26]); //shop icon
    Sleep(6000, 12000);
    const totalMoney = GetNumber("amount", [590, 3, 121, 35]);
    if (totalMoney < 700000)
    {
        console.log("当前金币为：" + totalMoney + " not enough money to buy anything");
        GoBack();
        return false;
    }
    RandomPress([26, 530, 163, 32]); //bulk btn
    let x1 = x2 = random() * 10 + 219;
    let y1 = y2 = random() * 10 + 573;

    press(x1, y1, random() * 250 + 16); //select all
    Sleep(2000, 4000);
    for (let i = 0; i < 10; i++)
    {
        Sleep();
        let x2 = random() * 10 + 219;
        let y2 = random() * 10 + 573;
        if (x1 != x2 || y1 != y2)
        {
            press(x2, y2, random() * 250 + 16);
            Sleep(2000, 4000);
            break;
        }
    }
    RandomSwipe([277, 444, 795, 64], [271, 194, 802, 65]);
    Sleep(2000, 4000);
    for (let i = 0; i < 3; i++)
    {
        let isBottom = GetNumber("amount", [704, 486, 71, 33]) == 222010;
        if (!isBottom)
        {
            RandomSwipe([277, 444, 795, 64], [271, 194, 802, 65]);
            Sleep(2000, 4000);
        }
        else
        {
            break;
        }
        if (i == 2)
        {
            console.log("bulk buy failed");
            GoBack();
            return false;
        }
    }
    if (totalMoney >= 700000 && totalMoney < 1040000)
    {
        console.log("当前金币为：" + totalMoney + " can only buy scroll");
        RandomPress([218, 277, 16, 16]); // weapon scroll;
        RandomPress([218, 350, 15, 14]); // defence scroll 
        pressMaxScroll();
    }
    else if (totalMoney >= 1040000 && totalMoney < 1440000)
    {
        console.log("当前金币为：" + totalMoney + " can buy scroll and slab");
        RandomPress([218, 573, 15, 14]); // select all btn
        //cancel the return home scroll treasure box crystal box
        RandomPress([218, 206, 16, 14]); // return home scroll
        RandomPress([218, 420, 15, 16]); //treasure box
        RandomPress([216, 492, 17, 16]); // crystal box
        pressMaxScroll();
    }
    else
    {
        console.log("当前金币为：" + totalMoney + " can buy scroll, slab and crystal box");
        RandomPress([218, 573, 15, 14]); // select all btn
        RandomPress([218, 206, 16, 14]); // return home scroll
        RandomPress([218, 420, 15, 16]); //treasure box
        RandomPress([967, 493, 14, 12]); // plus crystal box
        pressMaxScroll();
    }
    Sleep(3000, 6000);
    RandomPress([900, 565, 148, 26]); // buy btn
    Sleep(6000, 10000);
    RandomHollow([210, 311, 847, 81]);
    const hasNeedClickOnceMore = images.findMultiColors(captureScreen(), "#493426", [[12, 1, "#8d6f50"], [30, 3, "#906c51"], [29, 15, "#91694a"], [14, 17, "#ebe7d5"],
    [-4, 17, "#6b4d3c"], [4, 27, "#9d9168"], [29, 26, "#6d6648"]], { region: [595, 120, 91, 92] });
    if (totalMoney > 1440000 || hasNeedClickOnceMore)
    {
        RandomHollow([210, 311, 847, 81]);
    }
    console.log("bulk buy finished");
    Sleep();
    const hasGrayBtn = FindGrayBtn([421, 561, 202, 58]);
    if (hasGrayBtn)
    {
        RandomPress([445, 576, 159, 26]);
        Sleep();
    }
    GoBack();
    Sleep();
    return true;
};

const EnterDelegatePage = () =>
{
    const missionIcon = images.findMultiColors(captureScreen(), "#776f53", [[-5, 4, "#887559"], [-8, 11, "#5b221b"], [-13, 14, "#a3966e"], [-19, 16, "#c0b293"], [-21, 18, "#bdae89"]]);
    if (!missionIcon) return false;
    RandomPress([1155, 18, 30, 32]);
    Sleep(4000, 6000);
    RandomPress([419, 97, 66, 28]);
    Sleep(2000, 4000);
    return true;
};

const MarkCheck = (region) =>
{
    const checkedColor = [
        ["#0e0c0c", [[4, -2, "#f6d07d"], [6, 0, "#cca75d"], [10, -3, "#c9a760"], [14, -6, "#cca864"]]],
        ["#d4a960", [[2, 1, "#d8b267"], [5, 0, "#9c8442"], [7, -2, "#a37d47"], [10, -5, "#c39c5d"]]],
        ["#d2a765", [[2, 2, "#cfa75b"], [5, -1, "#e9ca82"], [7, -3, "#d5bb73"], [10, -5, "#deb868"]]],
        ["#c39c63", [[3, 2, "#d1a960"], [7, 0, "#977944"], [9, -3, "#daba70"], [10, -57, "#cfb069"]]],
        ["#d9b166", [[1, 2, "#d8a95a"], [3, 3, "#cea85c"], [7, 0, "#aa884a"], [9, -2, "#dcb26d"]]]
    ];
    return FindMultiColors(checkedColor, region);
};
const GetDelegate = () =>
{
    console.log("GetDelegate...");
    const hasEntered = EnterDelegatePage();
    if (!hasEntered) return;

    const purpleColorList = [
        ["#7c4e96", [[6, 1, "#905dae"], [10, 0, "#82549d"], [15, 1, "#8f5da5"]]],
        ["#8c59a9", [[2, 3, "#82559d"], [5, 0, "#915fb0"], [9, 3, "#8a5aa6"], [15, 2, "#8f5da5"]]],
        ["#8c57ad", [[6, -1, "#80519a"], [11, 0, "#8858a4"], [13, 3, "#905cae"], [20, 1, "#9461ab"]]],
        ["#7b4e97", [[6, 0, "#83569e"], [12, 2, "#955fb4"], [19, 0, "#7d5190"]]]
    ];
    const PurpleDelegateCheck = () => FindMultiColors(purpleColorList, [18, 140, 39, 40]);
    const hasMarked = MarkCheck([249, 571, 35, 41]);

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
            Sleep(8000, 12000);
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
    GoBack();
    console.log("get delegate : " + delegateCount);
    if (delegateCount > 0)
    {
        game_config.ui.gameMode = "delegate";
        console.log("get delegate:" + game_config.ui.gameMode);
    }
};

const StartDelegate = () =>
{
    console.log("start delegate...");
    const greenCircleColorList = [
        ["#76624e", [[25, 1, "#685a49"], [5, 0, "#556b13"], [19, 1, "#688612"], [13, 7, "#67821a"], [13, -6, "#85b013"], [12, 0, "#222222"], [8, -4, "#6c9009"]]],
        ["#735f4b", [[26, 1, "#695746"], [13, 7, "#617c16"], [13, -6, "#6c9015"], [7, 0, "#6b870f"], [20, 0, "#6c8c11"], [14, 0, "#222222"], [17, -5, "#85a801"]]],
        ["#78634e", [[23, 0, "#2d2925"], [5, 0, "#556b13"], [19, -1, "#6f9212"], [11, -7, "#7db60d"], [9, 6, "#61820d"], [15, -5, "#80ae0a"], [12, 0, "#222222"]]]
    ];
    const hasEntered = HasPageBack();
    if (!hasEntered)
    {
        EnterDelegatePage();
    }
    SwipToBottom([71, 462, 66, 22], [59, 449, 90, 48], [23, 452, 405, 46], [28, 176, 402, 52]);
    const shot = captureScreen();

    for (let i = 0; i < 5; i++)
    {
        let hasOnGoing = FindMultiColors(greenCircleColorList, [393, 263 + i * 53, 36, 32]);
        if (hasOnGoing)
        {
            RandomPress([61, 265 + i * 53, 321, 29]);
            if (FindGreenBtn([1065, 652, 202, 58]))
            {
                RandomPress([1079, 665, 172, 32]);
                break;
            }
            else break;
        }
    }
};
const CheckDelegate = () =>
{
    console.log("检查委托......");
    let isFinished = false;
    EnterDelegatePage();
    const canFinishedNum = GetNumber("amount", [393, 527, 23, 30]);
    if (canFinishedNum == 0 || null)
    {
        console.log("今日委托已做完，切换模式为副本模式");
        game_config.ui.gameMode = "instance";
        isFinished = true;
    }
    else
    {
        console.log("今日委托未做完，切换模式为委托模式");
        game_config.ui.gameMode = "delegate";
    }
    console.log("当前模式为： " + game_config.ui.gameMode);
    for (let i = 0; i < 5; i++)
    {
        let canGetAward = FindGreenBtn([1058, 652, 210, 57]);
        if (canGetAward)
        {
            RandomPress([1085, 668, 162, 27]);
            Sleep(7000, 10000);
        } else break;
    }
    Sleep();
    if (!isFinished)
    {
        StartDelegate();
        Sleep();
    }

    GoBack();
    Sleep(2000, 4000);
};
const EnterPageCheck = () =>
{
    let isEntered = false;
    const backIcon = ReadImg("icon/back");
    for (let i = 0; i < 10; i++)
    {
        Sleep();
        let hasEntered = images.findImage(captureScreen(), backIcon, { region: [1212, 5, 63, 58] });
        if (hasEntered)
        {
            isEntered = true;
        };
    }
    backIcon.recycle();
    Sleep();
    return isEntered;
};
const MergeIntoSlab = (type) =>
{
    console.log("开始融合石板： " + type);
    OpenMenu();
    if (type == "suit")
    {
        RandomPress([963, 122, 19, 24]);
    }
    else if (type == "guardian")
    {
        RandomPress([1028, 118, 25, 32]);
    }

    const hasEntered = EnterPageCheck();
    if (!hasEntered) return;
    RandomPress([168, 97, 75, 27]);
    for (let i = 0; i < 10; i++)
    {
        let canAutoSelect = FindGreenBtn([936, 495, 157, 59]);
        if (!canAutoSelect) break;
        RandomPress([954, 509, 123, 29]);
        let canMerge = FindGreenBtn([1105, 496, 151, 55]);
        if (!canMerge) break;
        RandomPress([1118, 508, 126, 31]);
        Sleep();
        let isMergePage = EnterPageCheck();
        if (!isMergePage) break;
        let hasJumpAnim = MarkCheck([1096, 638, 37, 32]);
        if (!hasJumpAnim)
        {
            RandomPress([1104, 647, 87, 16]);
        }
        Sleep();
        let hasOpenBtn = FindGreenBtn([525, 623, 232, 60]);
        if (hasOpenBtn)
        {
            RandomPress([545, 634, 191, 35]);
        }
        Sleep();
        let hasGrayBtn = FindGrayBtn([525, 623, 232, 60]);
        if (hasGrayBtn)
        {
            RandomPress([545, 634, 191, 35]);
        }
    }
    Sleep();
    GoBack();
    console.log("融合" + type + "完成");
};
const Daily = function ()
{
    const setting = game_config.setting;
    const date = new Date().getDate();
    const hasMenuTipPoint = MenuTipPointCheck();
    if (hasMenuTipPoint)
    {
        GetSignIn();
        GetEmail();
    }
    CheckDelegate();
    if (date != setting.date)
    {
        setting.date = date;
        console.log("今天" + date + "号");
        RWFile("setting", setting);
        GetDelegate();
        StartDelegate();
        Sleep(10000, 15000);
        GetDuty();
        Sleep();
        MakeComsumables();
        OpenAllEquipmentBox();
        Sleep();
        OpenAllProps();
        BulkBuy();
        Sleep();
        if (game_config.player.equipment.weapon.level < 7)
        {
            StrengthenPlayerEquipment("weapon");
        }
        Sleep();
        StrengthenPlayerEquipment("armor");
        Sleep();
        MergeIntoSlab("suit");
        Sleep();
        MergeIntoSlab("guardian");
        // ForgeMaterial();
    }
};

module.exports = { CheckDelegate, Daily };





