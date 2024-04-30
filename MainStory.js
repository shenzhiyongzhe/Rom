const {
    Player,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
    GetLocalTime,
} = require("./Global.js");

const MainStory_ClickPos = {
    mainStory: [951, 89, 252, 31],
    mainStoryIcon: [1238, 84, 19, 35],
    missionFinish: [567, 256, 154, 51],
    skip: [154, 12, 1111, 681],

};
const MainStory_RegPos = {
    skip: [1156, 14, 72, 43],
    missionFinish: [567, 262, 147, 45],
    mainStory_hiddenIcon: [1222, 88, 50, 39],
    mainStoryTxt: [967, 72, 49, 38],
    autoMissioningTxt: [556, 285, 213, 207],
};

const MainStoryImg = {
    autoMissioningTxt: ReadImg("mainStory_inMissioning"),
    mainStoryTxt: ReadImg("mainStoryTxt"),
    skip: ReadImg("mainStory_skip"),
    missionFinish: ReadImg("mainStory_missionFinish"),
    mainStory_hiddenIcon: ReadImg("mainStory_hiddenIcon"),
};



//Skip 和 任务完成检查
const SkipCheck = (shot) => images.findImage(shot, MainStoryImg.skip, { region: MainStory_RegPos.skip, });
const MainStoryFinishCheck = (shot) => images.findImage(shot, MainStoryImg.missionFinish, { region: MainStory_RegPos.missionFinish });

// //完成任务 点击空白
const MainStoryFinishFlow = () => RandomPress(MainStory_ClickPos.missionFinish);
// //剧情跳过
const SkipFlow = () => RandomPress(MainStory_ClickPos.skip);

const MainStoryCheck = function ()
{
    let shot = captureScreen();
    MainStoryFinishCheck(shot) && MainStoryFinishFlow();
    SkipCheck(shot) && SkipFlow();
    let hasMission = images.findImage(shot, MainStoryImg.mainStoryTxt, { region: MainStory_RegPos.mainStoryTxt, threshold: 0.8, });
    let hasmainStory_hiddenIcon = images.findImage(shot, MainStoryImg.mainStory_hiddenIcon, { region: MainStory_RegPos.mainStory_hiddenIcon, threshold: 0.8, });
    let inMission = images.findImage(shot, MainStoryImg.autoMissioningTxt, { region: MainStory_RegPos.autoMissioningTxt, threshold: 0.6, });
    let isGray = images.findMultiColors(
        shot,
        "#31312e", [[-15, 5, "#30302d"], [-33, 5, "#30302b"], [-33, 20, "#312e2a"], [-16, 17, "#32312c"], [4, 18, "#353430"]],
        { region: [1072, 62, 151, 79], threshold: 14 }
    );
    if (hasmainStory_hiddenIcon != null && hasMission == null)
    {
        RandomPress(MainStory_ClickPos.mainStoryIcon);
    }
    if (hasMission)
    {
        if (isGray)
        {
            if (inMission) return false;
            else return true;
        }
        else
        {
            Player.isInMainStory = true;
            return false;
        }
    } else return false;
};

/**
 * @description 主线流程检测,判断玩家是否正在进行主线任务
 * @param none;
 * @return none;
 */
const MainStoryFlow = function ()
{
    if (MainStoryCheck() && Player.pushMainStory == true)
    {
        RandomPress(MainStory_ClickPos.mainStory);

    }

    log("MainStoryFlow");
};


module.exports = MainStoryFlow;
// MainStoryFlow();
// log(SkipCheck(captureScreen()));