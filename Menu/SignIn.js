const {
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,
} = require("../Global.js");

const signInPos = [960, 468, 20, 32];
const getAwardsBtn = [1050, 570, 150, 30];

//每日登录奖励领取
const Flow = function ()
{
    RandomPress(signInPos, random(100, 300));
    Sleep(1500, 2500);
    const shot = captureScreen();
    const isGreen = images.findMultiColors(shot, "#c02312", [[-3, 1, "#d42b1e"], [0, 4, "#b42416"], [4, 2, "#b62b1c"],], { region: [147, 71, 45, 48], threshold: 12 });
    const isCharacter = images.findMultiColors(shot, "#c02312", [[-3, 1, "#d42b1e"], [0, 4, "#b42416"], [4, 2, "#b62b1c"],], { region: [318, 76, 35, 38], threshold: 12 });
    const kate = images.findMultiColors(shot, "#b42d1a", [[-4, 2, "#ce2723"], [-1, 2, "#c62612"], [3, 2, "#d12c1c"], [0, 5, "#bd2517"],], { region: [478, 77, 49, 37], threshold: 12 });
    for (let i = 0; i < 3; i++)
    {
        if (isGreen == null && isCharacter == null && kate == null)
        {
            shot = captureScreen();
            Sleep(1000, 2000);
        }
        else break;
    }

    if (isGreen)
    {
        RandomPress(signInPos, random(100, 300));
        Sleep();
        RandomPress(getAwardsBtn, random(100, 300));
        Sleep();
        RandomClick(posRef.blank);
        if (isCharacter == null && kate == null) GoBack();
    }
    Sleep();

    if (isCharacter)
    {
        RandomPress(posRef.characterSignIn, random(200, 400));
        Sleep(2000, 2500);
        RandomPress(posRef.signInAwards, random(100, 300));
        Sleep(2000, 4000);
        RandomClick(posRef.blank);
        Sleep(1000, 2000);
        if (kate == null) GoBack();
    }

    if (kate)
    {
        RandomPress(posRef.signIn_kate, random(200, 400));
        Sleep(2000, 2500);
        RandomPress(posRef.signInAwards, random(100, 300));
        Sleep(2000, 4000);
        RandomClick(posRef.blank);
        Sleep(1000, 2000);
        GoBack();
    }
};
module.exports = Flow;