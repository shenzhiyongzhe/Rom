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


const Check = function ()
{
    let shot = captureScreen();
    let hasMission = images.findImage(shot, mainStoryTxt, { region: [967, 72, 49, 38], threshold: 0.8, });
    let inMission = images.findImage(shot, autoMissioningTxt, { region: [556, 285, 213, 207], threshold: 0.6, });
    let isGray = images.findMultiColors(
        shot,
        "#31312e", [[-15, 5, "#30302d"], [-33, 5, "#30302b"], [-33, 20, "#312e2a"], [-16, 17, "#32312c"], [4, 18, "#353430"]],
        { region: [1072, 62, 151, 79] }
    );
    if (hasMission)
    {
        if (inMission) return false;
        else
        {
            if (isGray) return true;
            else return false;
        }
    } else return false;
};
const Flow = function ()
{
    if (Check())
    {
        RandomPress(mainStoryPos);
    }
};


module.exports = Flow;