const { Sleep, RandomPress, GoBack, OpenMenu, ReadImg, FindMultiColors, GetNumber, WaitUntilPageBack, FindGreenBtn } = require("./Utils.js");

const EnterManufacturePage = () =>
{
    console.log("EnterManufacturePage");
    OpenMenu();
    RandomPress([957, 198, 29, 31]);
    WaitUntilPageBack();
};
const CanMake = (region) =>
{
    const whiteBGList = [
        ["#2b2b2b", [[0, 18, "#2d3030"], [-2, 33, "#2e2f2f"], [13, 46, "#2e3030"], [42, 44, "#383939"], [44, 27, "#3f4040"], [45, 18, "#464747"], [22, -2, "#303232"]]],
        ["#2a2b2b", [[2, 16, "#2b2e2e"], [0, 31, "#2d2e2e"], [19, -2, "#2e2e2e"], [37, -2, "#3a3a3a"], [46, 25, "#424343"], [46, 32, "#3e3f3f"], [21, 49, "#3b3d3d"]]],
        ["#2b2b2b", [[1, 12, "#2a2b2b"], [-2, 33, "#2e2f2f"], [15, -4, "#2f3131"], [24, 4, "#393a3a"], [32, -2, "#3d3e3e"], [49, 11, "#4e4f4f"], [24, 44, "#383939"]]]
    ];
    return FindMultiColors(whiteBGList, region);
};
const AutoClickMinusBtn = () =>
{
    Sleep();
    const maxNum = GetNumber("amount", [738, 661, 34, 36]);
    if (maxNum != 1)
    {
        RandomPress([649, 670, 23, 17]);
    }
};
const ForgeMaterial = function ()
{
    console.log("ForgeMaterial");
    EnterManufacturePage();
    RandomPress([156, 105, 100, 20]); // material page
    RandomPress([23, 473, 136, 39]); // material list
    for (let i = 0; i < 7; i++)
    {
        let canMake = images.findMultiColors(captureScreen(), "#222222", [[32, 2, "#222222"], [73, 4, "#222222"], [122, 3, "#222222"], [121, 17, "#202020"],
        [80, 15, "#222222"], [35, 15, "#222222"], [5, 17, "#222222"]], { region: [282, 141 + i * 69, 241, 61] });
        if (canMake)
        {
            console.log("Can make");
            RandomPress([228, 147 + i * 69, 286, 45]); //item
            RandomPress([646, 669, 28, 18]); // max button
            RandomPress([1059, 661, 177, 30]); //make button
            Sleep(10000, 14000);
            RandomPress([43, 33, 1201, 663]); // click blank
            Sleep(2000, 4000);
        }
    }
    GoBack();
    console.log("end: forge material");
};
const MakeActivitiesBox = () =>
{
    console.log("start: make activities box...");
    RandomPress([17, 210, 143, 34]);
    const royalBox = ReadImg("manufacture/activities/royalLegacyBox");
    const hasRoyalBox = images.findImage(captureScreen(), royalBox, { region: [208, 127, 85, 512] });
    if (hasRoyalBox)
    {
        RandomPress([hasRoyalBox.x, hasRoyalBox.y, 250, 30]);
        Sleep();
        if (FindGreenBtn([1040, 646, 216, 61]))
        {
            AutoClickMinusBtn();
            RandomPress([1066, 662, 169, 29]);
            Sleep(6000, 8000);
            RandomPress([140, 91, 1046, 526]);
        }
    }
    royalBox.recycle();
    console.log("End: make activities box");
    Sleep();
};
const MakeComsumables = () =>
{
    console.log("start: make comsumables...");
    const MakeSlab = (type) =>
    {
        if (type == "guardian")
        {
            RandomPress([37, 262, 117, 29]);
        }
        else if (type == "monster")
        {
            RandomPress([23, 313, 132, 35]);
        }
        Sleep();
        for (let i = 0; i < 2; i++)
        {
            let canMake = CanMake([218, 139 + i * 68, 63, 63]);
            if (canMake)
            {
                RandomPress([233, 149, 270, 43]);
                AutoClickMinusBtn();
                if (FindGreenBtn([1040, 646, 214, 67]))
                {
                    RandomPress([1061, 662, 175, 30]); //make btn
                    Sleep(10000, 14000);
                    RandomPress([174, 71, 1000, 586]); // press blank
                }

            }
        }
        Sleep();
    };

    EnterManufacturePage();
    MakeActivitiesBox();
    RandomPress([163, 104, 86, 16]); // comsumables, scroll page
    Sleep(2000, 4000);
    const ornamentScroll = ReadImg("manufacture/ornamentScroll");
    const shot = captureScreen();
    const hasOrnamentScroll = images.findImage(shot, ornamentScroll, { region: [217, 135, 65, 273] });
    if (hasOrnamentScroll)
    {
        const canMake = CanMake([hasOrnamentScroll.x - 20, hasOrnamentScroll.y - 20, 60, 65]);
        if (canMake)
        {
            RandomPress([hasOrnamentScroll.x - 10, hasOrnamentScroll.y - 10, 290, 40]);
            if (FindGreenBtn([1041, 650, 213, 56]))
            {
                AutoClickMinusBtn();
                RandomPress([1061, 662, 175, 30]); //make btn
                Sleep(10000, 14000);
                RandomPress([174, 71, 1000, 586]); // press blank
            }

        }
    };
    Sleep();
    console.log("make slab");
    MakeSlab("guardian");
    console.log("make monster slab");
    MakeSlab("monster");
    GoBack();
    Sleep(2000, 4000);
    console.log("end: make comsumables");
};

// module.exports = {
//     ForgeMaterial,
//     MakeComsumables
// };

MakeComsumables();