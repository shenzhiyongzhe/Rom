const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
} = require("./Global.js");

const deathTxt = ReadImg("death");



//死亡检测
const DeathCheck = (shot) => images.findImage(shot, deathTxt, { region: [593, 198, 98, 44], });

//技能点检测
const AbilityPointCheck = (shot) => images.findMultiColors(shot, "#bd220f", [[3, 0, "#bd2415"], [-1, 3, "#d62d1d"], [3, 3, "#bb2316"],],
    { region: [13, 4, 71, 31] });

//任务奖励检测
const MissionCheck = (shot) => images.findMultiColors(shot, "#c13b2a", [[3, 0, "#b42213"], [2, 3, "#c42616"], [5, 5, "#c43120"],],
    { region: [1154, 3, 53, 31] });

//菜单栏检测
const MenuCheck = (shot) => images.findMultiColors(shot, "#b82412", [[3, 0, "#b82315"], [0, 4, "#c12618"], [4, 4, "#bd2516"],],
    { region: [1218, 1, 54, 51] });

// 背包小红点检查
const BackPackCheck = (shot) => images.findMultiColors(shot, "#b52213", [[-3, 0, "#c13221"], [0, 2, "#c62718"], [-3, 5, "#c72c1a"],],
    { region: [1102, 3, 34, 28] });

module.exports = {
    DeathCheck,
    AbilityPointCheck,
    MissionCheck,
    MenuCheck,
    BackPackCheck,
};
