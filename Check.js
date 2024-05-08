

/**技能点检测 
 * @param img
 * @return img
 */
const AbilityPointCheck = (shot) => images.findMultiColors(shot, "#bd220f", [[3, 0, "#bd2415"], [-1, 3, "#d62d1d"], [3, 3, "#bb2316"],],
    { region: [13, 4, 71, 31] });

/**任务奖励检测
 * @param img
 * @return img
 */
const MissionCheck = (shot) => images.findMultiColors(shot, "#c13b2a", [[3, 0, "#b42213"], [2, 3, "#c42616"], [5, 5, "#c43120"],],
    { region: [1154, 3, 53, 31] });

/**菜单栏检
 * @param img
 * @return img
*/
const MenuCheck = (shot) => images.findMultiColors(shot, "#b82412", [[3, 0, "#b82315"], [0, 4, "#c12618"], [4, 4, "#bd2516"],],
    { region: [1218, 1, 54, 51] });


/**背包小红点检查
 * @param img
 * @return img
 */
const BackPackCheck = (shot) => images.findMultiColors(shot, "#b52213", [[-3, 0, "#c13221"], [0, 2, "#c62718"], [-3, 5, "#c72c1a"],],
    { region: [1102, 3, 34, 28] });

module.exports = {
    AbilityPointCheck,
    MissionCheck,
    MenuCheck,
    BackPackCheck,
};
