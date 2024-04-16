const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,
    CharacterIdentity,
} = require("../Global.js");

//寻找满进度条
const FindMaxProgressBar = function (shot)
{
    let maxArr = [];
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 2; j++)
        {
            let isProgressBarMax = images.findMultiColors(
                shot,
                "#222222",
                [
                    [175, 0, "#8f4c1c"],
                    [307, 0, "#8f4c1b"],
                    [388, 0, "#8f4a1b"],
                    [389, 4, "#59361f"],
                    [391, 0, "#222222"],
                ],
                {
                    region: [140 + j * 500, 440 + i * 76, 110, 20],
                    threshold: 12,
                }
            );
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
            "#ff967a",
            [
                [9, 5, "#f66d71"],
                [18, -6, "#ff432e"],
                [23, -12, "#ff452b"],
            ],
            {
                region: [element.x + 400, element.y - 40, 80, 100],
                threshold: 60,
            }
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
const Flow = function ()
{
    const dutyIcon = ReadImg("duty_icon");
    const hasDuty = images.findImage(captureScreen(), dutyIcon, {
        region: [1148, 186, 69, 73],
    });
    if (!hasDuty) return false;
    RandomPress(posRef.dutyIcon);
    Sleep(2000, 3000);
    const shot = captureScreen();
    const isBelinGrowth = images.findMultiColors(
        shot,
        "#c12411",
        [
            [-2, 1, "#c62316"],
            [4, 1, "#bd311d"],
            [0, 4, "#c52f1d"],
        ],
        { region: [232, 71, 40, 47], threshold: 16 }
    );
    const isAdventurer = images.findMultiColors(
        shot,
        "#c12411",
        [
            [-2, 1, "#c62316"],
            [4, 1, "#bd311d"],
            [0, 4, "#c52f1d"],
        ],
        { region: [372, 69, 40, 28], threshold: 16 }
    );
    if (isBelinGrowth == null && isAdventurer == null) return false;
    if (isBelinGrowth != null)
    {
        DutyPickUp();
    }
    if (isAdventurer != null)
    {
        RandomPress(posRef.duty_adventurer);
        Sleep();
        DutyPickUp();
    }
    Sleep();
    RandomPress(posRef.duty_close, random(100, 300));
    dutyIcon.recycle();
};
module.exports = Flow;