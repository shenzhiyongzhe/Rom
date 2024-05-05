const {
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
} = require("./Global.js");

const UnionPos = {
    icon: [957, 363, 31, 38],
    donate: []
};

const unionIcon = ReadImg("unionIcon");

const JoinUnion = function ()
{
    const hasIcon = images.findImage(captureScreen(), unionIcon, { region: [945, 352, 54, 61] });
    if (hasIcon === null) return;

    RandomPress(UnionPos.icon);
    Sleep(3000, 5000);
    const freeToJoin = images.findMultiColors(captureScreen(),
        "#3e4638", [[37, 1, "#343b30"], [80, 3, "#373e32"], [0, 22, "#2e362a"], [38, 25, "#2c3428"], [82, 22, "#2f362b"]],
        { region: [1137, 124, 135, 558] });
    if (freeToJoin === null) return;

    RandomPress([freeToJoin.x, freeToJoin.y, 85, 25]);
    Sleep();
};

const UnionDonation = function ()
{
    const hasDonate = images.findMultiColors(captureScreen(),
        "#3d4638", [[-1, 13, "#373e33"], [0, 25, "#323a2d"], [63, 0, "#343b2f"], [62, 26, "#2b3528"], [124, 0, "#383f33"], [121, 12, "#333a2e"], [123, 25, "#30372b"]],
        { region: [938, 637, 151, 70] });
    if (hasDonate === null) return;
    RandomPress([hasDonate.x, hasDonate.y, 120, 30]);
};

const UnionSignIn = function ()
{
    const hasSignIn = images.findMultiColors(captureScreen(),
        "#495848", [[0, 10, "#3f4839"], [0, 30, "#363a2f"], [69, 0, "#434c3e"], [68, 29, "#2f362a"], [131, 3, "#32392e"], [130, 15, "#33392d"], [129, 27, "#30372b"]],
        { region: [1085, 642, 151, 60] });
    if (hasSignIn === null) return;
    RandomPress([hasSignIn.x, hasSignIn.y, 120, 30]);
};
// JoinUnion();
// UnionDonation();
// UnionSignIn();

const UnionFlow = function ()
{
    JoinUnion();
    UnionDonation();
    UnionSignIn();
};