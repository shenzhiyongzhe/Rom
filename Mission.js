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
} = require("./Global.js");
//任务成就奖励
const Flow = function ()
{
    RandomPress(posRef.rewards, random(100, 400));
    Sleep(2000, 3000);
    let isRed = images.findMultiColors(
        captureScreen(),
        "#b5301a",
        [
            [-3, 2, "#ce3326"],
            [0, 5, "#bd2617"],
            [2, 3, "#c92718"],
        ],
        { region: [424, 78, 115, 59] }
    );
    if (isRed)
    {
        RandomPress(posRef.achievement, random(200, 500));
        Sleep(1000, 1500);
        RandomPress(posRef.getAwards, random(100, 400));
        Sleep(2000, 3000);
        RandomClick(posRef.blank);
        Sleep(1000, 2000);
        GoBack();
    }
};
module.exports = Flow;














