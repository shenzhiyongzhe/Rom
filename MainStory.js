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
    missionFinish: [342, 183, 549, 327],
    skip: [154, 12, 1111, 681],

};
const MainStory_RegPos = {
    skip: [1156, 14, 72, 43],
    missionFinish: [557, 256, 162, 58],
    mainStory_hiddenIcon: [1222, 88, 50, 39],
    autoMissioningTxt: [556, 285, 213, 207],
};

const MainStoryImg = {
    autoMissioningTxt: ReadImg("mainStory_inMissioning"),
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

const MainStoryFlow = function ()
{
    const shot = captureScreen();
    if (MainStoryFinishCheck(shot))
    {
        MainStoryFinishFlow();
        return;
    }
    if (SkipCheck(shot))
    {
        SkipFlow();
        return;
    }
    const isHighLight = images.findMultiColors(shot, "#67472e", [[10, 0, "#67472d"], [25, 0, "#68482d"], [35, 0, "#68462d"]],
        { region: [1060, 104, 115, 34] });
    const hasmainStory_hiddenIcon = images.findImage(shot, MainStoryImg.mainStory_hiddenIcon, { region: MainStory_RegPos.mainStory_hiddenIcon, threshold: 0.95, });
    const isInAutoMission = images.findImage(shot, MainStoryImg.autoMissioningTxt, { region: MainStory_RegPos.autoMissioningTxt, threshold: 0.6, });

    if (isHighLight || isInAutoMission) return;
    if (hasmainStory_hiddenIcon != null) RandomPress(MainStory_ClickPos.mainStoryIcon);
    else
    {
        Sleep();
        log("keep on trace mainStory");
        RandomPress(MainStory_ClickPos.mainStory);
    }

};



module.exports = MainStoryFlow;
// MainStoryFlow();
// log(SkipCheck(captureScreen()));