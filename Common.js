
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
    const abilityPoint_65 = ReadImg("abilityPoint_65");
    const abilityPoint_66 = ReadImg("abilityPoint_66");
    const isMaxPoint65 = images.findImage(captureScreen(), abilityPoint_65, { region: [260, 273, 55, 43] });
    const isMaxPoint66 = images.findImage(captureScreen(), abilityPoint_66, { region: [260, 273, 55, 43] });
    if (isMaxPoint65 || isMaxPoint66)
    {
        RandomPress([318, 284, 15, 19]); //敏捷
    }
    else
    {
        RandomPress([317, 285, 18, 18]); //体力
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
    abilityPoint_65.recycle();
    abilityPoint_66.recycle();
    console.log("AbilityPointsFlow end");
};
const GetTypeOfMaterial = function (region)
{
    const materialList = {
        "blue_cloth": ReadImg("material/blue_cloth"),
        "blue_wood": ReadImg("material/blue_wood"),
        "green_ironIngot": ReadImg("material/green_ironIngot"),
        "green_jewel": ReadImg("material/green_jewel"),
        "green_magicGem": ReadImg("material/green_magicGem"),

    };
    for (let material in materialList)
    {
        let type = images.findImage(captureScreen(), materialList[material], { region: region });
        if (type)
        {
            return material;
        }
    }
    return null;
};
const MakeMaterial = function ()
{
    console.log("MakeMaterial");
    const canUpgrade = images.findMultiColors(captureScreen(), "#353c30", [[95, 0, "#32392d"], [102, 13, "#2e362b"], [2, 13, "#272e23"]], { region: [1116, 140, 161, 65] });
    for (let i = 0; i < 10; i++)
    {
        let type = GetTypeOfMaterial([110, 100, 100, 100]);
    }

};
module.exports = { AbilityPointsFlow, MissionAwardFlow };
// MissionAwardFlow(captureScreen());
// AbilityPointsFlow();
