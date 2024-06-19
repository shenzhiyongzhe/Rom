
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
const GoBack = () => RandomPress([1125, 18, 141, 35]);
const PressBlank = () => RandomPress([270, 96, 647, 502]);
const PressMenu = () => RandomPress([1226, 19, 24, 27]);
const PressBackpack = () => RandomPress([1094, 24, 22, 27]);

const NumberRecognition = function (directory, region)
{
    const numberArr = [];
    for (let i = 0; i < 10; i++)
    {
        let arr = [];
        for (let j = 0; j < 10; j++)
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

const TipPointCheck = function (region)
{
    const tipPointArr = [
        ["#b9200f", [[-2, 2, "#b92211"], [0, 4, "#c02416"], [3, 2, "#b92315"]]],
        ["#b8200e", [[-2, 2, "#c22314"], [2, 2, "#bb2415"], [0, 4, "#bf2416"]]],
        ["#b32615", [[1, 3, "#c82817"], [-2, 3, "#ca2618"], [0, 6, "#b02215"]]],

    ];
    const shot = captureScreen();
    let hasTipPoint;
    for (let i = 0; i < tipPointArr.length; i++)
    {
        hasTipPoint = images.findMultiColors(shot, tipPointArr[i][0], tipPointArr[i][1], { region: region });
        if (hasTipPoint) break;
    }
    return hasTipPoint;
};

const InCity = function ()
{
    const groceryIcon = ReadImg("grocery");
    const hasGrocery = images.findImage(captureScreen(), groceryIcon, { region: [65, 259, 65, 58] });
    groceryIcon.recycle();
    return hasGrocery;
};
// log(InCity());


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
const GetCurrentDate = function ()
{
    const time = new Date();

    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
const GetColorInMultiple = function (shot, colorArr, region)
{
    let hasColor = false;
    for (let i = 0; i < colorArr.length; i++)
    {
        let color = colorArr[i][0];
        let position = colorArr[i][1];
        hasColor = images.findMultiColors(shot, color, position, { region: region });
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
    Sleep(2000, 3000);
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

module.exports = {
    Sleep,
    RandomPress,
    ReadImg,
    GoBack,
    PressBlank,
    PressMenu,
    PressBackpack,
    NumberRecognition,
    TipPointCheck,
    InCity,
    NoMoneyAlert,
    ConvertTradeTime,
    GetCurrentDate,
    GetColorInMultiple,
    RandomSwipe,
    RandomHollow,
};