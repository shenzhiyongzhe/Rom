
const { ReadImg, Sleep, RandomPress, PressBlank } = require("./Utils.js");

const MissionAwardFlow = function ()
{
    const hasAwards = images.findMultiColors(captureScreen(), "#b51f0d", [[-2, 2, "#c52314"], [2, 2, "#bc2416"], [0, 5, "#bd2a1b"]], { region: [1174, 2, 28, 28] });
    if (hasAwards == null) return;

    RandomPress([1154, 19, 37, 34]);
    Sleep(3000, 5000);
    RandomPress([539, 99, 84, 24]); //award page
    Sleep(2000, 3000);
    for (let i = 0; i < 5; i++)
    {
        let canContinousPress = images.findMultiColors(captureScreen(), "#353c30", [[95, 0, "#32392d"], [102, 13, "#2e362b"], [2, 13, "#272e23"]], { region: [1116, 140, 161, 65] });
        if (canContinousPress)
        {
            RandomPress([1140, 159, 113, 25]);
            PressBlank();
        }
        Sleep();
    }
    RandomPress([1158, 11, 115, 41]);
};

const AbilityPointsFlow = function ()
{
    console.log("AbilityPointsFlow");
    const AbilityPointCheck = images.findMultiColors(captureScreen(), "#bd220f", [[3, 0, "#bd2415"], [-1, 3, "#d62d1d"], [3, 3, "#bb2316"],],
        { region: [13, 4, 71, 31] });
    if (AbilityPointCheck == null) return;

    Sleep();
    RandomPress([14, 14, 50, 44]);
    Sleep(2000, 3000);
    const isMax = images.findMultiColors(captureScreen(), "#2d2e31", [[7, 0, "#757678"], [13, 0, "#757578"], [9, -5, "#757577"], [9, 3, "#747477"],
    [9, 11, "#292a2b"], [10, -8, "#2d2e31"], [9, 0, "#7e7f81"]], { region: [302, 273, 44, 42] });
    if (isMax)
    {
        RandomPress([314, 399, 21, 18]); //体力
    }
    else
    {
        RandomPress([318, 287, 15, 14]); //敏捷
    }

    Sleep();
    RandomPress([230, 510, 120, 20]);
    Sleep();
    if (random() > 0.5)
    {
        RandomPress([340, 71, 31, 13]);
    }
    else
    {
        RandomPress([22, 20, 47, 30]);
    }
    console.log("AbilityPointsFlow end");
};


module.exports = { AbilityPointsFlow, MissionAwardFlow };


