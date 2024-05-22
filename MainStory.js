const { ReadImg, Sleep, RandomPress, GoBack, PressMenu, } = require("./Global.js");
const { UseProps, WearEquipment } = require("./BackPack.js");
const { AbilityPointsFlow, MissionAwardFlow } = require("./Common.js");
const { Daily } = require("./Daily.js");
const CraftFlow = require("./Craft.js");


const MissionSkip = function (shot)
{
    const hasSkip = images.findMultiColors(shot, "#fbfbfb", [[14, 4, "#f9f9f9"], [28, 6, "#e9e9e7"], [35, -1, "#f5f5f5"], [43, 0, "#e3e3e3"], [35, 9, "#f5f5f5"], [78, 0, "#cbd3d4"]],
        { region: [1149, 8, 120, 49] });
    if (hasSkip)
    {
        Sleep();
        RandomPress([214, 24, 1045, 665]);
        for (let i = 0; i < 5; i++)
        {
            Sleep();
            let hasAnotherSkip = images.findMultiColors(captureScreen(), "#fbfbfb", [[14, 4, "#f9f9f9"], [28, 6, "#e9e9e7"], [35, -1, "#f5f5f5"], [43, 0, "#e3e3e3"], [35, 9, "#f5f5f5"], [78, 0, "#cbd3d4"]],
                { region: [1149, 8, 120, 49] });

            if (hasAnotherSkip)
            {
                RandomPress([214, 24, 1045, 665]);
            }
            else break;
        }
        return true;
    }
    return false;
};
const MissionFinishCheck = function (shot)
{
    const hasFinished = images.findMultiColors(shot, "#cec6b5", [[8, 7, "#d2c7bb"], [13, 13, "#92806e"], [-1, 19, "#433b31"], [-14, 23, "#bfb4a6"], [-20, 33, "#e0e0e0"], [-10, 33, "#c4b4a3"], [4, 39, "#847561"]],
        { region: [591, 185, 98, 80] });
    if (hasFinished) return true;
    return false;
};
const TraceOnMission = function (shot)
{
    const isHighLight = images.findMultiColors(shot, "#67472e", [[10, 0, "#67472d"], [25, 0, "#68482d"], [35, 0, "#68462d"]],
        { region: [1084, 110, 92, 20] });
    if (isHighLight) return;

    const hasMissionScrollIcon = images.findMultiColors(shot, "#a3905f", [[-4, 10, "#4a3c18"], [-13, 14, "#806d2b"], [297, -15, "#b7a78d"], [288, 3, "#9f9d91"], [282, 14, "#6b7b95"], [289, 17, "#4c5661"]],
        { region: [920, 59, 356, 81] });
    const isNotSkip = images.findMultiColors(shot, "#afa17a", [[17, 0, "#9b8e64"], [-1, 11, "#9b8d62"], [14, 12, "#3b362b"]],
        { region: [1213, 10, 50, 46] });
    if (hasMissionScrollIcon && isHighLight == null)
    {
        RandomPress([986, 89, 210, 36]);
        console.log("start new mission");
        const hasTransformPopup = images.findMultiColors(captureScreen(), "#363637", [[108, -1, "#343434"], [133, -3, "#353536"], [207, -3, "#3e4638"], [345, -1, "#353c2f"]],
            { region: [419, 448, 432, 70] });
        if (hasTransformPopup)
        {
            if (random() > 0.5) return;
            Sleep(600, 3500);
            RandomPress([676, 468, 147, 26]);
        }
    }
    else if (isNotSkip == null)
    {
        return;
    }
    else
    {
        RandomPress([1240, 93, 28, 23]);
    }
};
const GetNewProps = function (shot)
{
    const hasBackPackPoint = images.findMultiColors(shot, "#b52213", [[-3, 0, "#c13221"], [0, 2, "#c62718"], [-3, 5, "#c72c1a"]],
        { region: [1102, 3, 34, 28] });
    if (hasBackPackPoint == null) return;

    RandomPress([1087, 20, 36, 32]); //点击背包
    Sleep();
    RandomPress([1240, 215, 21, 20]); //equip page
    Sleep();
    const hasEquipPoint = images.findMultiColors(captureScreen(), "#bd2712", [[-2, 1, "#cb3120"], [1, 2, "#c42617"], [1, 4, "#c92b1d"]], { region: [882, 103, 350, 413] });
    if (hasEquipPoint)
    {
        WearEquipment(false);
        Sleep();
        return;
    }
    else
    {
        UseProps(false);
        Sleep();
        if (random() > 0.5) RandomPress([1094, 25, 22, 26]);
        else RandomPress([1244, 69, 30, 14]);
    }

};

const gapTime = 10;
let curTime = 0;
const Craft = function ()
{

    PressMenu();
    Sleep();

    const hasCraftPoint = images.findMultiColors(captureScreen(), "#b72e1b", [[-4, 3, "#db2e1c"], [1, 3, "#c02517"], [4, 3, "#cf3324"], [0, 5, "#be2618"],], { region: [971, 178, 35, 37] });
    if (hasCraftPoint == null) return;
    CraftFlow();
};

const OnMissionFinish = function ()
{
    log("mission finish");
    RandomPress([318, 126, 591, 466]); //press mission finish
    Sleep(2000, 3000);
    AbilityPointsFlow();
    Sleep();
    MissionAwardFlow();
    Sleep();
    if (curTime >= gapTime)
    {
        const hasMenuTipPoint = images.findMultiColors(captureScreen(), "#b8200c", [[0, 3, "#d72a19"], [2, 3, "#b72215"], [1, 5, "#c22b1c"]], { region: [1237, 2, 32, 28] });
        if (hasMenuTipPoint == null) return;

        Daily();
        // Craft();
        curTime = 0;
    }
    else
    {
        curTime += 1;
    }
    GetNewProps(captureScreen());

};
const MainStory = function ()
{
    let shot = captureScreen();

    if (MissionSkip(shot) == true)
    {
        Sleep(3000, 5000);
        shot = captureScreen();
    }

    const isFinished = MissionFinishCheck(shot);
    if (isFinished == true)
    {
        OnMissionFinish();
    }

    Sleep(3000, 5000);
    TraceOnMission(shot);

};

// for (let i = 0; i < 1000; i++)
// {
//     console.time("MainStory");
//     MainStoryUpdate();
//     // log(images.findMultiColors(captureScreen(), "#bd2712", [[-2, 1, "#cb3120"], [1, 2, "#c42617"], [1, 4, "#c92b1d"]], { region: [882, 103, 350, 413] }));
//     console.timeEnd("MainStory");
// }

//制造小红点检查


//菜单小红点检查


module.exports = { MainStory };