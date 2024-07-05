const { FindMultiColors, IsHaltMode, ExitHaltMode, IsInCity, HasPageBack } = require("./Utils");
const { HasMainUI, HasDisconnectionPopup, HasStartGame, HasLongTimeNoInput, HasBackpackFull, HasNoPotion, HasNoExp, HasDeathPopup, HasBackpackFull_notInHaltMode, CanPickExpOrEquipment, HasAttackByOthers } = require("./ExceptionCheck");
const { MainUIFlow, PageBackFlow, DisconnectionFlow, StartGameFlow, LongTimeNoInputFlow, BackpackFullFlow, NoPotionFlow, NoExpFlow, DeathFlow, InCityFlow, PickUpExpOrEquipment, AttackedFlow } = require("./ExceptionFlow");
const { IncreaseCount } = require("./Timer");



const Exception = () =>
{
    const isHalt = IsHaltMode();
    if (isHalt)
    {
        HasBackpackFull() && BackpackFullFlow();
        HasNoPotion() && NoPotionFlow();
        HasNoExp && NoExpFlow();
    }
    else
    {
        HasMainUI() && MainUIFlow();
        HasPageBack() && PageBackFlow();
        HasDisconnectionPopup() && DisconnectionFlow();
        HasStartGame() && StartGameFlow();
        HasLongTimeNoInput() && LongTimeNoInputFlow();
        HasDeathPopup() && DeathFlow();
        IsInCity() && InCityFlow();
        IncreaseCount("backpackFullCheck") && HasBackpackFull_notInHaltMode() && BackpackFullFlow();
        CanPickExpOrEquipment() && PickUpExpOrEquipment();
        HasAttackByOthers() && AttackedFlow();
    }
};



module.exports = {
    Exception
};
