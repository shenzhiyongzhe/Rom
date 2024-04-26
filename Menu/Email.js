const {
    posRef,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,
} = require("../Global.js");

const EmailPos = {
    icon: [1025, 475, 25, 10],
    account: [44, 101, 71, 23],
    character: [170, 99, 58, 30],
    award: [1070, 660, 160, 25],
};

//邮件奖励领取
const EmailFlow = function ()
{
    RandomPress(EmailPos.icon);
    Sleep(2000, 3000);
    const shot = captureScreen();
    const accountPage = images.findMultiColors(
        shot,
        "#b4301a", [[-4, 3, "#d8382d"], [-1, 3, "#c52412"], [2, 3, "#c72818"], [0, 5, "#c62717"],],
        { region: [105, 76, 45, 50], threshold: 12 }
    );
    const characterPage = images.findMultiColors(
        shot,
        "#b4301a", [[-4, 3, "#d8382d"], [-1, 3, "#c52412"], [2, 3, "#c72818"], [0, 5, "#c62717"],],
        { region: [204, 86, 80, 39], threshold: 12 }
    );
    if (accountPage)
    {
        RandomPress(EmailPos.award, random(100, 200));
        Sleep(2000, 2500);
        RandomClick(posRef.blank);
        Sleep(2000, 3000);
        if (characterPage == null) GoBack();
    }
    if (characterPage)
    {
        RandomPress(EmailPos.character, random(100, 300));
        Sleep(2000, 3000);
        RandomPress(EmailPos.award, random(100, 200));
        Sleep(1500, 2500);
        RandomClick(posRef.blank);
        Sleep(2000, 3000);
        GoBack();
    }
    else
    {
        Sleep();
        GoBack();
    }
};
module.exports = EmailFlow;
// EmailFlow();