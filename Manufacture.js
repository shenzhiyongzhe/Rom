const { Sleep, InCity, RandomPress, GoBack, OpenMenu, ReadImg, GetColorInMultiple } = require("./Utils.js");

const EnterManufacturePage = () =>
{
    console.log("EnterManufacturePage");
    OpenMenu();
    RandomPress([957, 198, 29, 31]);
    Sleep(3000, 6000);
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
};
const MakeOrnamentScroll = function ()
{
    const whiteBGList = [
        ["#2b2b2b", [[0, 18, "#2d3030"], [-2, 33, "#2e2f2f"], [13, 46, "#2e3030"], [42, 44, "#383939"], [44, 27, "#3f4040"], [45, 18, "#464747"], [22, -2, "#303232"]]],
        ["#2a2b2b", [[2, 16, "#2b2e2e"], [0, 31, "#2d2e2e"], [19, -2, "#2e2e2e"], [37, -2, "#3a3a3a"], [46, 25, "#424343"], [46, 32, "#3e3f3f"], [21, 49, "#3b3d3d"]]],
        ["#2b2b2b", [[1, 12, "#2a2b2b"], [-2, 33, "#2e2f2f"], [15, -4, "#2f3131"], [24, 4, "#393a3a"], [32, -2, "#3d3e3e"], [49, 11, "#4e4f4f"], [24, 44, "#383939"]]]
    ];
    EnterManufacturePage();
    RandomPress([163, 104, 86, 16]); // scroll page
    Sleep(2000, 4000);
    const ornamentScroll = ReadImg("stuff/strengthenScroll_ornament");
    const shot = captureScreen();
    const hasOrnamentScroll = images.findImage(shot, ornamentScroll, { region: [217, 135, 65, 273] });
    if (hasOrnamentScroll)
    {
        const canMake = GetColorInMultiple(shot, whiteBGList, [hasOrnamentScroll.x - 20, hasOrnamentScroll.y - 20, 60, 65]);
        if (canMake)
        {
            RandomPress([hasOrnamentScroll.x - 10, hasOrnamentScroll.y - 10, 290, 40]);
            RandomPress([649, 667, 22, 21]); // max button
            RandomPress([1061, 662, 175, 30]); //make btn
            Sleep(10000, 14000);
            RandomPress([174, 71, 1000, 586]); // press blank
        }
    }
    GoBack();
    Sleep(2000, 4000);
};

module.exports = {
    ForgeMaterial,
    MakeOrnamentScroll
};
// ForgeMaterial();