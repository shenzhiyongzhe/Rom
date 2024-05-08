const { game_config, CharacterIdentity, Sleep, RandomPress, RWFile } = require("./Global.js");

const AbilityPointsPos = {
    icon: [14, 14, 50, 44],
    ability_swift: [312, 282, 25, 20],
    ability_wisedom: [312, 341, 24, 19],
    confirm: [230, 510, 120, 20],
    close: [335, 70, 30, 12],
};


/**
 * @description 技能点全部点防御
 * @param 无
 * @returns 无
 */
const AbilityPointsFlow = function ()
{
    const isArcher = CharacterIdentity();
    Sleep();
    RandomPress(AbilityPointsPos.icon);
    Sleep(2000, 3000);
    if (isArcher)
    {
        RandomPress(AbilityPointsPos.ability_swift); //游侠 敏捷
    } else 
    {
        RandomPress(AbilityPointsPos.ability_wisedom); // 法师 智力
    }

    Sleep();
    RandomPress(AbilityPointsPos.confirm);
    Sleep();
    game_config.player.level++;
    console.log(`技能点全部点敏捷，等级提升到${game_config.player.level}`);
    RWFile("player", game_config.player);
    RandomPress(AbilityPointsPos.close);
};
module.exports = AbilityPointsFlow;
// AbilityPointsFlow();
// log(game_config);