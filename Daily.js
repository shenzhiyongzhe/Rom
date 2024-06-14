const { Sleep, RandomPress, GoBack, PressBlank, PressMenu, NumberRecognition, RandomSwipe, TipPointCheck, RandomHollow } = require("./Utils.js");
const { OpenEquipmentBox, WearEquipment, StrengthenEquipment, } = require("./BackPack.js");
const { ForgeMaterial } = require("./Manufacture.js");
function MenuTipCheck()
{
    const hasMenuTipPoint = images.findMultiColors(captureScreen(), "#b52110", [[0, 3, "#c22516"], [0, 5, "#c32b1c"]], { region: [1236, 3, 32, 25] });
    if (hasMenuTipPoint == null) return false;
    PressMenu();
    Sleep(3000, 5000);
    return true;
}

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
    const hasMenu = MenuTipCheck();
    if (hasMenu == false) return;
    const canSignIn = images.findMultiColors(captureScreen(), "#ad2514", [[0, 2, "#c32513"], [0, 5, "#c32719"]], { region: [969, 527, 36, 43] });
    if (canSignIn == null) return false;
    RandomPress([961, 555, 26, 30]);
    Sleep(2000, 4000);
    const shot = captureScreen();
    let hasTipPoint, hasTipPoint2, canGetAward, isCurPage;
    for (let i = 0; i < 4; i++)
    {
        Sleep();
        hasTipPoint = images.findMultiColors(shot, "#b02c1c", [[0, 3, "#bc2213"], [0, 5, "#c02619"]], { region: [130 + 162 * i, 77, 100, 40] });
        hasTipPoint2 = images.findMultiColors(shot, "#ba2414", [[0, 2, "#bc2213"], [0, 4, "#c02619"]], { region: [130 + 162 * i, 77, 100, 40] });
        isCurPage = images.findMultiColors(captureScreen(), "#c38e4d", [[13, 0, "#d29950"], [20, 0, "#d49a50"], [30, 0, "#d59a4f"]], { region: [40 + 162 * i, 120, 140, 15] });
        if (hasTipPoint || hasTipPoint2)
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
    return true;
};
const GetEmail = function (needPressMenu)
{
    if (needPressMenu)
    {
        PressMenu();
        Sleep(3000, 5000);
    }
    const hasEmail = TipPointCheck([1043, 536, 24, 27]);
    if (!hasEmail) return false;
    RandomPress([1024, 556, 31, 22]); //email icon;
    Sleep(2000, 4000);
    const shot = captureScreen();
    let hasTipPoint, canGetAward, isCurPage;
    for (let i = 0; i < 4; i++)
    {
        Sleep();
        hasTipPoint = images.findMultiColors(shot, "#c02914", [[0, 1, "#c12411"], [0, 4, "#c22718"]], { region: [100 + 125 * i, 80, 100, 40] });
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
                Sleep(2000, 3000);
                let isOverMax = overMaxNumber();
                if (isOverMax == false) PressBlank();
            }
        }
        else break;

    }
    GoBack();
    console.log("get email award");
    return true;
};


const NoMoneyCheck = function ()
{
    Sleep();
    const isNoMoney = images.findMultiColors(captureScreen(), "#3d4538", [[121, 1, "#384033"], [143, 11, "#333b2f"], [4, 17, "#2b3428"]], { region: [658, 556, 209, 66] });
    if (isNoMoney == null) return false;
    else
    {
        console.log("No Money");
        if (random() > 0.5)
        {
            RandomPress([447, 580, 157, 21]);
        }
        else
        {
            RandomPress([958, 78, 32, 14]);
        }
        return true;
    }
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
    PressMenu();
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
    console.log("bulk buy");

    // RandomPress([961, 21, 22, 26]); //shop icon
    // Sleep(6000, 12000);
    const totalMoney = NumberRecognition("amount", [590, 3, 121, 35]);
    if (totalMoney < 700000)
    {
        console.log("当前金币为：" + totalMoney + " not enough money to buy anything");
        GoBack();
        return false;
    }
    RandomPress([26, 530, 163, 32]); //bulk btn
    RandomSwipe([277, 444, 795, 64], [271, 194, 802, 65]);
    for (let i = 0; i < 3; i++)
    {
        let isBottom = NumberRecognition("amount", [704, 486, 71, 33]) == 193110;
        if (!isBottom)
        {
            RandomSwipe([277, 444, 795, 64], [271, 194, 802, 65]);
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
        RandomPress([813, 278, 21, 13]); // - btn
        RandomPress([813, 350, 20, 15]); // defence scroll -btn
    }
    else if (totalMoney >= 1040000 && totalMoney < 1440000)
    {
        console.log("当前金币为：" + totalMoney + " can buy scroll and slab");
        RandomPress([218, 573, 15, 14]); // select all btn
        //cancel the return home scroll treasure box crystal box
        RandomPress([218, 206, 16, 14]); // return home scroll
        RandomPress([218, 420, 15, 16]); //treasure box
        RandomPress([216, 492, 17, 16]); // crystal box
    }
    else
    {
        console.log("当前金币为：" + totalMoney + " can buy scroll, slab and crystal box");
        RandomPress([218, 573, 15, 14]); // select all btn
        RandomPress([218, 206, 16, 14]); // return home scroll
        RandomPress([218, 420, 15, 16]); //treasure box
    }
    RandomPress([900, 565, 148, 26]); // buy btn
    Sleep(2000, 4000);
    RandomHollow([210, 311, 847, 81]);
    console.log("bulk buy finished");
    GoBack();
    return true;
};
// BulkBuy();
// log(NumberRecognition("amount", [704, 486, 71, 33]));
const Daily = function ()
{
    const hasGetSignIn = GetSignIn();
    if (hasGetSignIn)
    {
        GetDuty();
        Sleep();
        OpenEquipmentBox();
        Sleep();
        BulkBuy();
        Sleep();
        WearEquipment();
        Sleep();
        StrengthenEquipment("weapon");
        Sleep();
        StrengthenEquipment("armor");
        Sleep();
        ForgeMaterial();
    }
    else
    {
        const hasGetEmail = GetEmail(false);
        if (!hasGetEmail) PressMenu();
    }
};

// Daily();
module.exports = { Daily };

