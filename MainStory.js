const MainStoryPos = {
    mainStory: [951, 89, 252, 31],
    missionFinish: [567, 256, 154, 51],
    skip: [1160, 3, 115, 59],

};

const autoMissioningTxt = ReadImg("inMission");
const mainStoryTxt = ReadImg("mainStoryTxt");
const skip = ReadImg("skip");
const missionFinish = ReadImg("CN_missionFinish");
//Skip 和 任务完成检查
const SkipCheck = (shot) => images.findImage(shot, skip, { region: [1160, 3, 115, 59], });
const MainStoryFinishCheck = (shot) => images.findImage(shot, missionFinish, { region: [567, 256, 154, 51], });

// //完成任务 点击空白
const MainStoryFinishFlow = () => RandomPress(MainStoryPos.missionFinish);
// //剧情跳过
const SkipFlow = () =>
{
    Sleep(600, 1200);
    RandomPress(MainStoryPos.skip, random(200, 600));
};
const MainStoryCheck = function ()
{
    let shot = captureScreen();
    MainStoryFinishCheck(shot) && MainStoryFinishFlow();
    SkipCheck(shot) && SkipFlow();
    let hasMission = images.findImage(shot, mainStoryTxt, { region: [967, 72, 49, 38], threshold: 0.8, });
    let inMission = images.findImage(shot, autoMissioningTxt, { region: [556, 285, 213, 207], threshold: 0.6, });
    let isGray = images.findMultiColors(
        shot,
        "#31312e", [[-15, 5, "#30302d"], [-33, 5, "#30302b"], [-33, 20, "#312e2a"], [-16, 17, "#32312c"], [4, 18, "#353430"]],
        { region: [1072, 62, 151, 79], threshold: 14 }
    );
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
        RandomPress(MainStoryPos.mainStory);

    }

    log("MainStoryFlow");
};


module.exports = MainStoryFlow;