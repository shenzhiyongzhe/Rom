const { game_config } = require("./Global");
const MainStoryFlow = require("./MainStory");
const { EnterInstanceZones, HaltModeCheck, InstanceCheck } = require("./Instance.js");
const ExceptionCheck = require("./Exception.js");


/**任务奖励检测
 * @param img
 * @return img
 */
const MissionCheck = (shot) => images.findMultiColors(shot, "#c13b2a", [[3, 0, "#b42213"], [2, 3, "#c42616"], [5, 5, "#c43120"],],
    { region: [1154, 3, 53, 31] });

/**菜单栏检
 * @param img
 * @return img
*/
const MenuCheck = (shot) => images.findMultiColors(shot, "#b82412", [[3, 0, "#b82315"], [0, 4, "#c12618"], [4, 4, "#bd2516"],],
    { region: [1218, 1, 54, 51] });





const Check = function (gameMode)
{
    const shot = images.captureScreen();
    if (gameMode == "mainStory")
    {
        MainStoryFlow(shot);
    }
    else if (gameMode == "instance")
    {
        InstanceCheck(shot);
    }
    else if (gameMode == "delegate")
    {
        // DelegateFlow(shot)
        console.log("DelegateFlow");
    }
    ExceptionCheck(shot);
};

module.exports = Check;
