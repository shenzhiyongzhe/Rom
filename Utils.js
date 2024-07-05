const { baseUrl } = require("./CONST.js");
const { TipPointArr, GreenBtn, GrayBtn, PageBackColorList, MenuIconColorList, MenuCloseColorList, CheckMarkColorList, HaltModeColorList } = require("./Color.js");
const { OpenBackpack } = require("./BackPack.js");
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
    const hasIcon = FindMultiColors(MenuIconColorList, [1217, 11, 41, 44]);
    const hasClose = FindMultiColors(MenuCloseColorList, [1219, 13, 39, 43]);
    if (hasIcon && !hasClose)
    {
        RandomPress([1221, 15, 33, 33]);
        Sleep(2000, 4000);
    }
    else if (!hasIcon && hasClose)
    {
        Sleep();
    }
    else
    {
        console.log("当前页面没有菜单按钮");
    }

};
const CloseMenu = () =>
{
    console.log("关闭菜单");
    const hasIcon = FindMultiColors(MenuIconColorList, [1217, 11, 41, 44]);
    const hasClose = FindMultiColors(MenuCloseColorList, [1219, 13, 39, 43]);
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
const PressBackpack = () => RandomPress([1094, 24, 22, 27]);

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
const FindMultiColors = (colorArr, region) =>
{
    let hasColor = false;
    const shot = captureScreen();
    for (let i = 0; i < colorArr.length; i++)
    {
        let [color, position] = colorArr[i];
        hasColor = images.findMultiColors(shot, color, position, { region });
        if (hasColor) break;
    }
    return hasColor;
};
const ColorCheck = function (shot, region)
{
    const colorArr =
    {
        blue: [["#1f333c", [[8, 0, "#1f3b47"], [22, 0, "#224352"], [28, 0, "#274857"], [28, 3, "#254b5e"]]],
        ["#1d343c", [[8, 0, "#1f3a4b"], [17, 0, "#1e3d51"], [27, 0, "#25485b"], [27, 11, "#295d73"]]]],
        green: [["#273b22", [[9, 0, "#2f4222"], [18, 0, "#304a23"], [26, 0, "#375323"], [26, 8, "#4c6428"]]],
        ["#283e21", [[8, 0, "#2d441f"], [23, 0, "#34511f"], [26, 9, "#4e6326"]]],]
    };
    let color, equipColor;
    out: for (let key in colorArr)
    {
        for (let i = 0; i < colorArr[key].length; i++)
        {
            color = images.findMultiColors(shot, colorArr[key][i][0], colorArr[key][i][1], { region: region });
            if (color)
            {
                equipColor = key;
                break out;
            }
        }
    }
    return equipColor;
};
const RandomSwipe = function ([x1, y1, w1, h1], [x2, y2, w2, h2])
{
    let x1 = random() * w1 + x1;
    let y1 = random() * h1 + y1;
    let x2 = random() * w2 + x2;
    let y2 = random() * h2 + y2;
    const duration = random() * 100 + 400;
    swipe(x1, y1, x2, y2, duration);
    Sleep(4000, 6000);
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
const WaitUntil = (iconColorList, region) =>
{
    let hasIcon;
    for (let i = 0; i < 10; i++)
    {
        Sleep();
        hasIcon = FindMultiColors(iconColorList, region);
        if (hasIcon) break;
    }
    return hasIcon;
};
const WaitUntilPageBack = () => WaitUntil(PageBackColorList, [1225, 12, 42, 44]);
const WaitUntilMenu = () => { GoBack(); return WaitUntil(MenuIconColorList, [1214, 12, 47, 42]); };
const UseRandomTransformScroll = () =>
{
    const quickItem_randomTransformScroll = ReadImg("quickItem/scroll_transformRandomly");
    const randomTransformScroll = ReadImg("backpack/scroll/transformRandomly");
    const hasQuickItem = images.findImage(captureScreen(), quickItem_randomTransformScroll, { region: [724, 634, 47, 50] });
    if (hasQuickItem == null)
    {

        OpenBackpack("props");
        const hasScroll = images.findImage(captureScreen(), randomTransformScroll, { region: [892, 82, 333, 433] });

        if (hasScroll == null)
        {
            ReturnHome();
            GroceryFlow();
            return;
        }
        RandomPress([hasScroll.x, hasScroll.y, 25, 25]);
        RandomPress([731, 641, 37, 36]); // add to quick item
        RandomPress([hasScroll.x, hasScroll.y, 25, 25]); // use scroll
        CloseBackpack();
    }
    else
    {
        RandomPress([731, 641, 37, 36]);
    }
    quickItem_randomTransformScroll.recycle();
    randomTransformScroll.recycle();
};
module.exports = {
    Sleep, ReadImg,
    RandomPress, RandomSwipe, RandomHollow, SwipToBottom,
    GoBack, PressBlank, OpenMenu, CloseMenu, PressBackpack,
    GetNumber, IsInCity, NoMoneyAlert, ConvertTradeTime, GetCurrentDate,
    FindMultiColors, FindTipPoint,
    FindGreenBtn, FindGrayBtn, FindCheckMark, IsHaltMode, SaveShot,
    ExitHaltMode, HasPageBack, HasMenu,
    WaitUntilPageBack, WaitUntilMenu,
    UseRandomTransformScroll
};
