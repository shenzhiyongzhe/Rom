const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,
    CharacterIdentity,
} = require("../Global.js");

const emailPos = [1025, 475, 25, 10];
//邮件奖励领取
const Flow = function ()
{
    RandomPress(emailPos, random(100, 300));
    Sleep(2000, 3000);
    const shot = captureScreen();
    const accountPage = images.findMultiColors(
        shot,
        "#b4301a",
        [
            [-4, 3, "#d8382d"],
            [-1, 3, "#c52412"],
            [2, 3, "#c72818"],
            [0, 5, "#c62717"],
        ],
        { region: [105, 76, 45, 50], threshold: 12 }
    );
    const characterPage = images.findMultiColors(
        shot,
        "#b4301a",
        [
            [-4, 3, "#d8382d"],
            [-1, 3, "#c52412"],
            [2, 3, "#c72818"],
            [0, 5, "#c62717"],
        ],
        { region: [204, 86, 80, 39], threshold: 12 }
    );
    if (accountPage)
    {
        RandomPress(posRef.email_account, random(100, 300));
        Sleep(1000, 2000);
        RandomPress(posRef.emailAward, random(100, 200));
        Sleep(1500, 2500);
        RandomClick(posRef.blank);
        Sleep(600, 1000);
        if (characterPage == null) GoBack();
    }
    if (characterPage)
    {
        RandomPress(posRef.email_character, random(100, 300));
        Sleep(2000, 3000);
        RandomPress(posRef.emailAward, random(100, 200));
        Sleep(1500, 2500);
        RandomClick(posRef.blank);
        Sleep(600, 1000);
        GoBack();
    }
};
module.exports = Flow;