const {
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,
} = require("../Global.js");

const SignInPos = {
    icon: [960, 468, 20, 32],
    signIn: [960, 468, 20, 32],
    awardsBtn: [1050, 570, 150, 30],
    characterPage: [210, 100, 100, 15],
    katePage: [386, 100, 88, 21],
};

//每日登录奖励领取
const Flow = function ()
{
    RandomPress(SignInPos.icon);
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
        RandomPress(SignInPos.awardsBtn, random(100, 300));
        Sleep();
        if (isCharacter == null && kate == null) GoBack();
    }
    Sleep();

    if (isCharacter)
    {
        RandomPress(SignInPos.characterPage);
        Sleep(2000, 2500);
        RandomPress(SignInPos.awardsBtn, random(100, 300));
        Sleep(2000, 4000);
        if (kate == null) GoBack();
    }

    if (kate)
    {
        RandomPress(SignInPos.katePage, random(200, 400));
        Sleep(2000, 2500);
        RandomPress(SignInPos.awardsBtn, random(100, 300));
        Sleep(2000, 4000);
        GoBack();
    }
};
module.exports = Flow;
// Flow();