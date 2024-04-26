const {
    ReadImg,
    Sleep,
    RandomPress,
} = require("./Global.js");

const skip = ReadImg("skip");
const goldenSkip = ReadImg("goldenSkip");
const skipPos = [1160, 3, 115, 59];
const goldenSkipPos = [1158, 675, 86, 22];

const SkipCF = (shot) =>
{
    let skipBtn = images.findImage(shot, skip, { region: [1169, 8, 106, 46], });
    let goldenSkipBtn = images.findImage(shot, goldenSkip, { region: [1142, 661, 114, 50] });
    if (skipBtn)
    {
        RandomPress(skipPos);
        return true;
    }
    else if (goldenSkipBtn)
    {
        RandomPress(goldenSkipPos);
        return true;
    }
    else return false;
};

const BeginnerFlow = function ()
{
    for (let i = 0; i < 12; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            let shot = captureScreen();
            let hasSkip = SkipCF(shot);
            if (hasSkip) break;
            Sleep(3000, 5000);
        }
        Sleep(5000, 8000);
    };
};

module.exports = BeginnerFlow;
// BeginnerFlow();