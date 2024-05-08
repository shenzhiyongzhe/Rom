const {
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
    mainStory_icon: [1222, 88, 50, 39],
    autoMissioningTxt: [556, 285, 213, 207],
};

const MainStoryImg = {
    autoMissioningTxt: ReadImg("mainStory_inMissioning"),
    skip: ReadImg("mainStory_skip"),
    missionFinish: ReadImg("mainStory_missionFinish"),
    mainStory_icon: ReadImg("mainStory_icon"),
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
    log("MainStoryFlow keep on trace mainStory");
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
    const hasMainStory_icon = images.findImage(shot, MainStoryImg.mainStory_icon, { region: [1221, 68, 51, 63] });
    const hasMainStory_hiddenIcon = images.findImage(shot, MainStoryImg.mainStory_icon, { region: [1221, 68, 51, 63], threshold: 0.8 });
    if (hasMainStory_icon == null && hasMainStory_hiddenIcon == null) return;

    if (hasMainStory_hiddenIcon != null && hasMainStory_icon == null)
    {
        log("MainStory_icon is hidden, click it");
        RandomPress(MainStory_ClickPos.mainStoryIcon);
        Sleep(1000, 3000);
        RandomPress([982, 87, 215, 38]);
        return;
    }
    const isHighLight = images.findMultiColors(shot, "#67472e", [[10, 0, "#67472d"], [25, 0, "#68482d"], [35, 0, "#68462d"]],
        { region: [1084, 110, 92, 20] });

    const isInAutoMission = images.findImage(shot, MainStoryImg.autoMissioningTxt, { region: MainStory_RegPos.autoMissioningTxt, threshold: 0.6, });

    if (isHighLight || isInAutoMission) return;

    if (hasMainStory_icon != null)
    {
        RandomPress([982, 87, 215, 38]);
    }



};


module.exports = MainStoryFlow;
// MainStoryFlow();
// let shot = captureScreen();
// log(images.matchTemplate(captureScreen(), MainStoryImg.mainStory_icon, { region: MainStory_RegPos.mainStory_icon }));
// log(images.findImage(shot, MainStoryImg.mainStory_icon, { region: [1221, 68, 51, 63], threshold: 0.8 }));