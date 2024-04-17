const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,
} = require("./Global.js");

const autoMissioningTxt = ReadImg("inMission");
const mainStoryTxt = ReadImg("mainStoryTxt");
const mainStoryPos = [951, 89, 252, 31];
const skip = ReadImg("skip");
const missionFinish = ReadImg("CN_missionFinish");
//Skip 和 任务完成检查
const SkipCheck = (shot) => images.findImage(shot, skip, { region: [1160, 3, 115, 59], });
const MainStoryFinishCheck = (shot) => images.findImage(shot, missionFinish, { region: [567, 256, 154, 51], });

//完成任务 点击空白
const MainStoryFinishFlow = () => RandomPress(posRef.missionFinish);
//剧情跳过
const SkipFlow = () =>
{
    Sleep(600, 1200);
    RandomPress(posRef.skip, random(200, 600));
};
const Check = function ()
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
const Flow = function ()
{
    if (Check() && Player.pushMainStory == true)
    {
        RandomPress(mainStoryPos);

    }
};


module.exports = Flow;