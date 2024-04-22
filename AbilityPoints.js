const AbilityPointsPos = {
    icon: [14, 14, 50, 44],
    ability_swift: [312, 282, 25, 20],
    ability_wisedom: [312, 341, 24, 19],
    confirm: [230, 510, 120, 20],
    close: [335, 70, 30, 12],
};

const CharacterIdentity = function ()
{
    const acter = ReadImg("archer");
    if (images.findImage(captureScreen(), acter)) Player.profession = "archer";
    else Player.profession = "wizard";
    acter.recycle();
};
/**
 * @description 技能点全部点防御
 * @param 无
 * @returns 无
 */
const AbilityPointsFlow = function ()
{
    CharacterIdentity();
    Sleep(600, 1500);
    RandomPress(AbilityPointsPos.icon);
    Sleep(1000, 1500);
    if (Player.profession == "archer")
    {
        RandomPress(AbilityPointsPos.ability_swift); //游侠 敏捷
    } else if (Player.profession == "wizard")
    {
        RandomPress(AbilityPointsPos.ability_wisedom); // 法师 智力
    }

    Sleep(600, 1500);
    RandomPress(AbilityPointsPos.confirm);
    Sleep(600, 1500);
    RandomPress(AbilityPointsPos.close);
};
module.exports = AbilityPointsFlow;