const {
    posRef,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,
    CharacterIdentity,
} = require("./Global.js");
//任务成就奖励
const MissionPos = {
    rewards: [1150, 10, 33, 28],
    achievement: [420, 95, 80, 15],
    getAwards: [1145, 160, 100, 15],
};
const MissionFlow = function ()
{
    RandomPress(MissionPos.rewards, random(100, 400));
    Sleep(2000, 3000);
    let isRed = images.findMultiColors(
        captureScreen(),
        "#b5301a",
        [[-3, 2, "#ce3326"], [0, 5, "#bd2617"], [2, 3, "#c92718"],],
        { region: [424, 78, 115, 59] }
    );
    if (isRed)
    {
        RandomPress(MissionPos.achievement, random(200, 500));
        Sleep(1000, 1500);
        RandomPress(MissionPos.getAwards, random(100, 400));
        Sleep(2000, 3000);
        RandomClick(posRef.blank);
        Sleep(1000, 2000);
        GoBack();
    }
};
module.exports = MissionFlow;














