
const { TipPointArr, GreenBtn, GrayBtn, PageBackColorList, MenuIconColorList, MenuCloseColorList, CheckMarkColorList, HaltModeColorList } = require("./Color.js");
const baseUrl = "/sdcard/Rom";
const BackpackColorList = [
    ["#c5ba90", [[17, 2, "#b6aa86"], [0, 9, "#6f7877"], [0, 16, "#4f3f2c"], [16, 11, "#a2b1b0"]]],
    ["#adb1a2", [[14, 2, "#9baaaa"], [-2, -7, "#bdae88"], [16, -8, "#baae8b"], [7, 5, "#3a3425"]]]
];
const BackpackCloseColorList = [
    ["#a5b3b5", [[15, 2, "#b9cac8"], [2, -8, "#b1a57c"], [15, -7, "#b8aa85"], [8, 3, "#17150f"]]]
];

const Sleep = (min, max) =>
{
    min = min || 1000;
    max = max || 2000;
    sleep(random(min, max));
};
const RandomPress = ([startX, startY, w, h]) =>
{
    const time = random(16, 512);
    const x = Math.round(Math.random() * w + startX);
    const y = Math.round(Math.random() * h + startY);
    press(x, y, time);
    Sleep();
};
const ReadImg = (name) => images.read(`./img/${name}.png`);
const GoBack = () => FindMultiColors(PageBackColorList, [1224, 9, 43, 49]) && RandomPress([1159, 14, 115, 40]);

const PressBlank = () => RandomPress([270, 96, 647, 502]);
const OpenMenu = () =>
{
    console.log("打开菜单");
    const shot = captureScreen();
    const hasIcon = FindMultiColors(MenuIconColorList, [1217, 11, 41, 44], shot);
    const hasClose = FindMultiColors(MenuCloseColorList, [1219, 13, 39, 43], shot);
    if (hasIcon && !hasClose)
    {
        RandomPress([1221, 15, 33, 33]);
        Sleep(2000, 4000);
        return true;
    }
    else if (!hasIcon && hasClose)
    {
        Sleep();
        return true;
    }
    else
    {
        console.log("当前页面没有菜单按钮");
        return false;
    }

};
const CloseMenu = () =>
{
    console.log("关闭菜单");
    const shot = captureScreen();
    const hasIcon = FindMultiColors(MenuIconColorList, [1217, 11, 41, 44], shot);
    const hasClose = FindMultiColors(MenuCloseColorList, [1219, 13, 39, 43], shot);
    if (!hasIcon && hasClose)
    {
        RandomPress([1221, 15, 33, 33]);
        Sleep(2000, 4000);
    }
    else if (hasIcon && !hasClose)
    {
        Sleep();
    }
    else
    {
        console.log("当前页面没有菜单按钮");
    }
};
/**
 * @param {*} page "equipment" "props" "material"
 * @returns 
 */
const OpenBackpack = (page) =>
{
    const shot = captureScreen();
    const hasBackpack = FindMultiColors(BackpackColorList, [1085, 15, 38, 42], shot);
    if (!hasBackpack) return false;

    const hasBackpack_close = FindMultiColors(BackpackCloseColorList, [912, 80, 33, 31], shot);
    if (!hasBackpack_close)
    {
        log(page == undefined ? "open backpack" : "open backpack: " + page);
        RandomPress([1091, 21, 29, 28]);
        Sleep(3000, 4000);
    }

    const CurrentPageCheck = (region) => images.findMultiColors(captureScreen(), "#cc6a2e", [[0, 2, "#cc6a2d"], [0, 9, "#cc692d"], [0, 17, "#cc692d"], [0, 25, "#cc6a2e"], [0, 31, "#cc6a2e"]], { region });
    if (page == "equipment")
    {
        const isInEquipPage = CurrentPageCheck([1209, 196, 18, 53]);
        if (!isInEquipPage)
        {
            RandomPress([1237, 207, 19, 29]);
        }
    }
    else if (page == "props")
    {
        const isInPropsPage = CurrentPageCheck([1210, 271, 16, 56]);
        if (!isInPropsPage)
        {
            RandomPress([1235, 286, 18, 26]);
        }
    }
    else if (page == "material")
    {
        const isInMaterialPage = CurrentPageCheck([1210, 349, 16, 55]);
        if (!isInMaterialPage)
        {
            RandomPress([1232, 361, 24, 26]);
        }

    }

    Sleep();
    return true;
};
const CloseBackpack = () =>
{
    const hasBackpack_close = FindMultiColors(BackpackCloseColorList, [912, 80, 33, 31]);
    if (hasBackpack_close)
    {
        console.log('close backpack');
        if (random() > 0.5)
        {
            RandomPress([1241, 69, 27, 16]);
        }
        else
        {
            RandomPress([1092, 24, 28, 21]);
        }
        return true;
    }
    return false;
};

const GetNumber = function (directory, region)
{
    const numberArr = [];
    for (let i = 0; i < 10; i++)
    {
        let arr = [];
        for (let j = 0; j < 20; j++)
        {
            let img = ReadImg(`number/${directory}/${i}/${j}`);
            if (img == null) break;
            arr.push(img);
        }
        numberArr.push(arr);
    }
    const shot = captureScreen();
    let settleAccount = []; //settle account
    for (let i = 0; i < 10; i++)
    {
        let n = numberArr[i].length;
        for (let j = 0; j < n; j++)
        {
            let num = images.matchTemplate(shot, numberArr[i][j], { region: region });
            if (num.points.length > 0)
            {
                settleAccount.push({ num: i, points: num.points });
            }
        }

    }
    // //recycle
    numberArr.forEach(arr => arr.forEach(img => img.recycle()));
    // check if it is not a number
    if (settleAccount.length === 0) return null;
    //sort
    const sequence = [];
    settleAccount.forEach(item =>
    {
        item.points.forEach(point => sequence.push({ number: item.num, x: point.x }));
    });
    sequence.sort((a, b) => a.x - b.x);

    const filteredArr = sequence.filter((element, index) =>
    {
        if (index > 0 && Math.abs(element.x - sequence[index - 1].x) < 3)
        {
            return false; // 删除相邻元素x值小于3的情况
        }
        return true;
    });

    filteredArr.forEach((point, index, arr) => arr[index] = point.number);

    // log(sequence);
    const finalNumber = filteredArr.join("");
    return parseInt(finalNumber);
};


const IsInCity = function ()
{
    const groceryIcon = ReadImg("icon/grocery_icon");
    const hasGrocery = images.findImage(captureScreen(), groceryIcon, { region: [65, 259, 65, 58] });
    groceryIcon.recycle();
    return hasGrocery;
};
const ExitHaltMode = () =>
{
    console.log("---ExitHaltMode---");
    RandomSwipe([585, 209, 114, 51], [585, 323, 115, 30]);
    Sleep(3000, 5000);
};
const NoMoneyAlert = function (money)
{
    const curMoney = money || "---";
    alert("请手动处理", "当前金币为 " + curMoney + " 金币不足");
};
const ConvertTradeTime = function (timeString)
{
    if (timeString == null) return null;
    timeString = timeString.toString();
    if (timeString.length != 14) return null;

    const year = timeString.slice(0, 4);
    const month = timeString.slice(4, 6);
    const day = timeString.slice(6, 8);
    const hour = timeString.slice(8, 10);
    const minute = timeString.slice(10, 12);
    const second = timeString.slice(12, 14);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
const GetCurrentDate = function (sign)
{
    let s = sign || ":";
    const time = new Date();

    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    return `${year}-${month}-${day} ${hour}${s}${minute}${s}${second}`;
};
const FindMultiColors = (colorArr, region, shot) =>
{
    let hasColor = false;
    shot = shot || captureScreen();
    for (let i = 0; i < colorArr.length; i++)
    {
        let [color, position] = colorArr[i];
        hasColor = images.findMultiColors(shot, color, position, { region });
        if (hasColor) break;
    }
    return hasColor;
};

const RandomSwipe = function ([x1, y1, w1, h1], [x2, y2, w2, h2])
{
    let x1 = random() * w1 + x1;
    let y1 = random() * h1 + y1;
    let x2 = random() * w2 + x2;
    let y2 = random() * h2 + y2;
    const duration = random(1, 2) * 10 + 400;
    swipe(x1, y1, x2, y2, duration);
    Sleep(2000, 4000);
};
const SwipToBottom = (clipRegion, findRegion, swipFrom, swipTo) =>
{
    const [x1, y1, w1, h1] = clipRegion;
    let clip = images.clip(captureScreen(), x1, y1, w1, h1);
    for (let i = 0; i < 5; i++)
    {
        RandomSwipe(swipFrom, swipTo);
        let isBottom = images.findImage(captureScreen(), clip, { region: findRegion });
        if (isBottom) break;
        clip = images.clip(captureScreen(), x1, y1, w1, h1);
    }
};
const UpdateConfig = (type) =>
{
    console.log("rewrite config" + type);
};
const RandomHollow = (hollowRegion) =>
{
    const [x, y, w, h] = hollowRegion;
    let x1 = random() * 1000 + 140;
    let y1 = random() * 620 + 70;
    for (let i = 0; i < 100; i++)
    {
        x1 = random() * 1000 + 140;
        y1 = random() * 620 + 70;
        if ((x1 < x || x1 > x + w) && (y1 < y || y1 > y + h))
        {
            break;
        }
    }
    log(`RandomHollow ${x1}, ${y1}`);
    press(x1, y1, random(16, 256));
    Sleep();
};
const SaveShot = () =>
{
    const moneyClip = captureScreen();
    const time = GetCurrentDate("_");
    files.create(baseUrl + "/shot/");
    images.save(moneyClip, `${baseUrl}/shot/${time}.png`);
};
const FindGreenBtn = (region) => FindMultiColors(GreenBtn, region);
const FindGrayBtn = (region) => FindMultiColors(GrayBtn, region);
const FindTipPoint = (region) => FindMultiColors(TipPointArr, region);
const FindCheckMark = (region) => FindMultiColors(CheckMarkColorList, region);
const IsHaltMode = () => FindMultiColors(HaltModeColorList, [550, 182, 180, 193]);
const HasPageBack = () => FindMultiColors(PageBackColorList, [1225, 12, 42, 44]);
const HasMenu = () => FindMultiColors(MenuIconColorList, [1214, 12, 47, 42]);
const HasCloseMenu = () => FindMultiColors(MenuCloseColorList, [1214, 12, 47, 42]);
const WaitUntil = (iconColorList, region) =>
{
    let hasIcon;
    for (let i = 0; i < 10; i++)
    {
        hasIcon = FindMultiColors(iconColorList, region);
        if (hasIcon) break;
        Sleep();
    }
    Sleep();
    return hasIcon;
};
const WaitUntilPageBack = () => WaitUntil(PageBackColorList, [1225, 12, 42, 44]);
const WaitUntilMenu = () => { GoBack(); return WaitUntil(MenuIconColorList, [1214, 12, 47, 42]); };
const ReturnHome = () =>
{
    console.log('----------------return home----------------');
    const quickItem_returnHome = ReadImg("quickItem/scroll_returnHome");
    const hasQuickReturnHome = images.findImage(captureScreen(), quickItem_returnHome, { region: [647, 624, 71, 68] });
    if (hasQuickReturnHome)
    {
        RandomPress([670, 642, 30, 35]);
        Sleep(10000, 15000);
    }
    else
    {
        OpenBackpack("props");
        const returnHomeIcon = ReadImg("backpack/scroll/returnHome");
        const hasReturnHome = images.findImage(captureScreen(), returnHomeIcon, { region: [883, 104, 344, 401] });
        returnHomeIcon.recycle();

        if (hasReturnHome)
        {
            RandomPress([hasReturnHome.x - 10, hasReturnHome.y - 6, 30, 30]);
            RandomPress([670, 642, 30, 35]); //添加到快捷栏
            RandomPress([hasReturnHome.x - 10, hasReturnHome.y - 6, 30, 30]);
            Sleep(10000, 15000);
        }
        else
        {
            RandomPress([955, 19, 35, 30]); // 商城
            Sleep(4000, 6000);
            RandomPress([296, 98, 72, 28]); //第三页 普通页
            Sleep(2000, 4000);
            RandomPress([17, 211, 173, 37]); // 消耗品分页
            Sleep(2000, 4000);
            RandomPress([529, 164, 227, 236]); //return home scroll
            RandomPress([686, 578, 151, 24]); //confrim
            GoBack();
            RandomPress([668, 644, 37, 32]);
        }
    }
    quickItem_returnHome.recycle();
    log("return home to purchase potion");
};
const UseRandomTransformScroll = () =>
{
    const quickItem_randomTransformScroll = ReadImg("quickItem/scroll_transformRandomly");
    const randomTransformScroll = ReadImg("backpack/scroll/transformRandomly");
    const hasQuickItem = images.findImage(captureScreen(), quickItem_randomTransformScroll, { region: [724, 634, 47, 50] });
    if (hasQuickItem == null)
    {

        OpenBackpack("props");
        const hasScroll = images.findImage(captureScreen(), randomTransformScroll, { region: [892, 82, 333, 433] });

        if (hasScroll)
        {
            RandomPress([hasScroll.x, hasScroll.y, 25, 25]);
            RandomPress([731, 641, 37, 36]); // add to quick item
            RandomPress([hasScroll.x, hasScroll.y, 25, 25]); // use scroll
            CloseBackpack();
        }

    }
    else
    {
        RandomPress([731, 641, 37, 36]);
    }
    quickItem_randomTransformScroll.recycle();
    randomTransformScroll.recycle();
};
const GetCurMoney = () =>
{
    let curMoney = 0;
    const hasMenu = HasMenu();
    if (!hasMenu) return;
    RandomPress([1155, 17, 30, 33]);
    WaitUntilPageBack();
    curMoney = GetNumber("amount", [567, 2, 110, 40]);
    for (let i = 0; i < 3; i++)
    {
        Sleep();
        GoBack();
        if (!HasPageBack())
        {
            break;
        }
    }
    return curMoney;
};
module.exports = {
    Sleep, ReadImg,
    RandomPress, RandomSwipe, RandomHollow, SwipToBottom,
    HasPageBack, GoBack, PressBlank,
    HasMenu, OpenMenu, CloseMenu, HasCloseMenu,
    OpenBackpack, CloseBackpack,
    GetNumber, IsInCity, NoMoneyAlert, ConvertTradeTime, GetCurrentDate,
    FindMultiColors, FindTipPoint,
    FindGreenBtn, FindGrayBtn, FindCheckMark, SaveShot,
    IsHaltMode, ExitHaltMode,
    WaitUntilPageBack, WaitUntilMenu,
    UseRandomTransformScroll, ReturnHome,
    GetCurMoney,
};


