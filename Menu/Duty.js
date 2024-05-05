const {
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
} = require("../Global.js");

const DutyPos = {
    icon: [1166, 198, 17, 32],
    adventurer: [278, 89, 104, 13],
    close: [1108, 62, 43, 25],
};
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
const CanPickUpPoints = function ()
{
    const shot = captureScreen();
    let points = [];
    const maxArr = FindMaxProgressBar(shot);
    if (maxArr.length == 0) return false;
    maxArr.forEach((element) =>
    {
        let isPickable = images.findMultiColors(
            shot,
            "#ff4a3d", [[3, 2, "#ff4335"], [4, 4, "#ff5549"], [9, -5, "#ff4a3d"], [12, -11, "#ff4c3c"]],
            { region: [element.x + 400, element.y - 40, 80, 100], threshold: 35, }
        );
        if (isPickable == null)
        {
            let x = element.x + 417;
            let y = element.y - 37;
            points.push([x, y, 40, 40]);
        }
    });

    return points;
};
//领取奖励
const DutyPickUp = function ()
{
    const canPickArr = CanPickUpPoints();
    if (canPickArr.length == 0) return false;
    canPickArr.forEach((element) =>
    {
        RandomPress(element);
        Sleep(1000, 2000);
    });
};
const DutyFlow = function ()
{
    const dutyIcon = ReadImg("duty_icon");
    const hasDuty = images.findImage(captureScreen(), dutyIcon, { region: [1148, 186, 69, 73], });
    if (!hasDuty) return false;
    RandomPress(DutyPos.icon);
    Sleep(2000, 3000);
    const shot = captureScreen();
    const isBelinGrowth = images.findMultiColors(
        shot,
        "#c12411",
        [[-2, 1, "#c62316"], [4, 1, "#bd311d"], [0, 4, "#c52f1d"],],
        { region: [232, 71, 40, 47], threshold: 16 }
    );
    const isAdventurer = images.findMultiColors(
        shot,
        "#c12411",
        [[-2, 1, "#c62316"], [4, 1, "#bd311d"], [0, 4, "#c52f1d"],],
        { region: [372, 69, 40, 28], threshold: 16 }
    );
    if (isBelinGrowth == null && isAdventurer == null) return false;
    if (isBelinGrowth != null)
    {
        DutyPickUp();
    }
    if (isAdventurer != null)
    {
        RandomPress(DutyPos.adventurer);
        Sleep();
        DutyPickUp();
    }
    Sleep();
    RandomPress(DutyPos.close);
    dutyIcon.recycle();
};
// log(CanPickUpPoints());
// DutyFlow();
module.exports = DutyFlow;