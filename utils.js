
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
/**
 * @param {*} path  settlement or level
 * @param {*} region [961, 657, 216, 61] or [31, 38, 64, 40]
 * @returns 
 */
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
    // log(numberArr);
    //recognition
    const shot = captureScreen();
    let settleAccount = []; //settle account
    for (let i = 0; i < 10; i++)
    {
        let n = numberArr[i].length;
        // log("n: " + n);
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
// console.time("NumberRecognition");
// log(NumberRecognition("amount", [1109, 377, 94, 45]));
// log(images.matchTemplate(captureScreen(), ReadImg("number/amount/1/3"), { region: [956, 399, 48, 37] }));
// log(ReadImg("number/amount/0/0"));
// console.timeEnd("NumberRecognition");
/**
 * @description check if there is a tip point in the area
 * @param {*} region the tip point area
 * @returns 
 */
const TipPointCheck = function (region)
{
    const tipPointArr = [
        ["#b9200f", [[-2, 2, "#b92211"], [0, 4, "#c02416"], [3, 2, "#b92315"]]],
        ["#b8200e", [[-2, 2, "#c22314"], [2, 2, "#bb2415"], [0, 4, "#bf2416"]]],
        ["#b32615", [[1, 3, "#c82817"], [-2, 3, "#ca2618"], [0, 6, "#b02215"]]]
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

/**
 * 
 * @returns {boolean} true in city, false not in city
 */
const InCity = function ()
{
    const groceryIcon = ReadImg("grocery");
    const hasGrocery = images.findImage(captureScreen(), groceryIcon, { region: [65, 259, 65, 58] });
    groceryIcon.recycle();
    return hasGrocery;
};
// log(InCity());

const NoMoneyAlert = function ()
{
    alert("手动处理", "no money");
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
    NoMoneyAlert
};