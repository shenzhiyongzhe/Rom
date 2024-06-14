const { Sleep, InCity, RandomPress, GoBack, PressMenu } = require("./Utils.js");

const ForgeMaterial = function ()
{
    console.log("ForgeMaterial");
    PressMenu();
    Sleep();
    RandomPress([958, 205, 30, 23]); //Forge material icon
    Sleep(2000, 4000);
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
module.exports = {
    ForgeMaterial
};
// ForgeMaterial();