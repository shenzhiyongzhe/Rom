const { UseProps, WearEquipment } = require("./BackPack.js");
const { ReadImg, Sleep, RandomPress, GoBack, GetLocalTime, } = require("./Global.js");
const WearSlabStone = require("./Menu/SlabStone.js");

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

/**背包小红点检查
 * @param img
 * @return img
 */
const BackPackCheck = (shot) => images.findMultiColors(shot, "#b52213", [[-3, 0, "#c13221"], [0, 2, "#c62718"], [-3, 5, "#c72c1a"],],
    { region: [1102, 3, 34, 28] });

/**技能点检测 
* @param img
* @return img
*/
const AbilityPointCheck = (shot) => images.findMultiColors(shot, "#bd220f", [[3, 0, "#bd2415"], [-1, 3, "#d62d1d"], [3, 3, "#bb2316"],],
    { region: [13, 4, 71, 31] });

/**
* @description 技能点全部点防御
* @param 无
* @returns 无
*/
const AbilityPointsFlow = function ()
{
    // const isArcher = CharacterIdentity();
    Sleep();
    RandomPress([14, 14, 50, 44]);
    Sleep(2000, 3000);
    RandomPress([312, 282, 25, 20]); //游侠 敏捷

    Sleep();
    RandomPress([230, 510, 120, 20]);
    Sleep();
    game_config.player.level++;
    console.log(`Level UP! 技能点敏捷，当前等级：${game_config.player.level}`);
    RWFile("player", game_config.player);
    if (random() > 0.5)
    {
        RandomPress([335, 70, 30, 12]);
    }
    else
    {
        RandomPress([14, 14, 50, 44]);
    }
};
const MainStoryFlow = function ()
{
    const shot = captureScreen();
    if (MainStoryFinishCheck(shot))
    {
        MainStoryFinishFlow();
        Sleep(1000);
        if (BackPackCheck(shot))
        {
            const hasUsedSlab = UseProps();
            Sleep();
            WearEquipment();
            Sleep();
            if (hasUsedSlab.indexOf("suit"))
            {
                WearSlabStone("suit");
            }
            else if (hasUsedSlab.indexOf("guardian"))
            {
                WearSlabStone("guardian");
            }
        }

        BackPackCheck(shot) && WearEquipment();
        Sleep();
        const hasLevelUp = AbilityPointCheck(shot);

        if (hasLevelUp)
        {
            AbilityPointsFlow();
            Sleep();
        }
        return;
    }
    if (SkipCheck(shot))
    {
        SkipFlow();
        Sleep();
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

    Sleep();
    const curShot = images.clip(captureScreen(), 621, 324, 36, 76);

    const hasStopMoving = images.findImage(shot, curShot, { region: [524, 244, 230, 223], threshold: 0.8 });
    if (hasStopMoving)
    {
        console.log("character is stop moving");
        RandomPress([272, 98, 628, 476]);
    }
};

module.exports = MainStoryFlow;
// MainStoryFlow();
// let shot = captureScreen();
// log(images.matchTemplate(captureScreen(), MainStoryImg.mainStory_icon, { region: MainStory_RegPos.mainStory_icon }));
// log(images.findImage(shot, MainStoryImg.mainStory_icon, { region: [1221, 68, 51, 63], threshold: 0.8 }));