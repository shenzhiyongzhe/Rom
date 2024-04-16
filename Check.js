const {
    imgRef,
    posRef,
    ReadImg,
    GenerateRandomPos,
    RandomClick,
    RandomPress,
    GoBack,
    CharacterIdentity,
} = require("./Global.js");

//任务是否进行检测
const MissionCheck = () => {
    let shot = captureScreen();
    let hasMission = images.findImage(shot, imgRef.mainStoryTitle, {
        region: [967, 72, 49, 38],
        threshold: 0.8,
    });
    let inMission = images.findImage(shot, imgRef.inMission, {
        region: [556, 285, 213, 207],
        threshold: 0.6,
    });
    let isGray = images.findMultiColors(
        shot,
        "#333332",
        [
            [-6, 6, "#323232"],
            [3, 6, "#333232"],
            [13, 6, "#343232"],
            [25, 6, "#323132"],
            [11, 19, "#343232"],
        ],
        { region: [] }
    );
    if (hasMission) {
        if (inMission) return false;
        else {
            if (isGray) return true;
            else return false;
        }
    } else return false;
};

//死亡检测
const DeathCheck = () =>
    images.findImage(captureScreen(), imgRef.death, {
        region: [555, 174, 176, 88],
    });

//技能点检测
const SkillPointCheck = () =>
    images.findMultiColors(
        captureScreen(),
        "#bd220f",
        [
            [3, 0, "#bd2415"],
            [-1, 3, "#d62d1d"],
            [3, 3, "#bb2316"],
        ],
        { region: [13, 4, 71, 31] }
    );

//任务奖励检测
const RewardsPointCheck = () =>
    images.findMultiColors(
        captureScreen(),
        "#c13b2a",
        [
            [3, 0, "#b42213"],
            [2, 3, "#c42616"],
            [5, 5, "#c43120"],
        ],
        { region: [1154, 3, 53, 31] }
    );

//菜单栏检测
const MenuCheck = function () {
    return images.findMultiColors(
        captureScreen(),
        "#b82412",
        [
            [3, 0, "#b82315"],
            [0, 4, "#c12618"],
            [4, 4, "#bd2516"],
        ],
        { region: [1218, 1, 54, 51] }
    );
};

//每日签到检测
const SignInPointCheck = (shot) => {
    return images.findMultiColors(
        shot,
        "#d8564a",
        [
            [4, 1, "#c82819"],
            [0, 2, "#c82117"],
            [4, 2, "#c52719"],
        ],
        { region: [952, 446, 56, 49] }
    );
};

//邮箱检测
const EmailCheck = (shot) => {
    return images.findMultiColors(
        shot,
        "#ca6054",
        [
            [-2, 3, "#ca291d"],
            [2, 3, "#cb2818"],
            [2, 7, "#d33120"],
        ],
        { region: [1018, 449, 59, 41] }
    );
};

//Skip 和 任务完成检查
const SkipCheck = () =>
    images.findImage(captureScreen(), imgRef.skip, {
        region: [1160, 3, 115, 59],
    });
const MissionFinishCheck = function () {
    return images.findImage(captureScreen(), imgRef.missionFinish, {
        region: [567, 256, 154, 51],
    });
};
//道具图鉴检测
const CollectionPageCheck = function (shot) {
    return images.findMultiColors(
        shot,
        "#bb3221",
        [
            [-4, 2, "#e22f2b"],
            [0, 2, "#cb2816"],
            [-2, 6, "#c02a19"],
            [2, 5, "#c12718"],
        ],
        { region: [1085, 99, 59, 45] }
    );
};
//使命检查
const DutyCheck = function (shot) {
    return images.findMultiColors(
        shot,
        "#c33522",
        [
            [-2, 2, "#c92419"],
            [3, 2, "#d92d1c"],
            [0, 5, "#ba2516"],
        ],
        { region: [1169, 180, 44, 37] }
    );
};
// 背包小红点检查
const BackPackCheck = function () {
    return images.findMultiColors(
        captureScreen(),
        "#b52213",
        [
            [-3, 0, "#c13221"],
            [0, 2, "#c62718"],
            [-3, 5, "#c72c1a"],
        ],
        { region: [1102, 3, 34, 28] }
    );
};

//制造小红点检查
const CraftCheck = function (shot) {
    return images.findMultiColors(
        shot,
        "#b72e1b",
        [
            [-4, 3, "#db2e1c"],
            [1, 3, "#c02517"],
            [4, 3, "#cf3324"],
            [0, 5, "#be2618"],
        ],
        { region: [971, 178, 35, 37] }
    );
};
module.exports = {
    MissionCheck,
    DeathCheck,
    SkillPointCheck,
    RewardsPointCheck,
    MenuCheck,
    SignInPointCheck,
    EmailCheck,
    SkipCheck,
    MissionFinishCheck,
    CollectionPageCheck,
    DutyCheck,
    BackPackCheck,
    CraftCheck,
};
