const { DecomposeAll } = require("./BackPack");
const { Daily } = require("./Daily");

const { PickUpExpOrEquipment } = require("./Player.js");

const Frequency = {
    backpackFullCheck: 1440,
    dailyCheck: 1440,
    pickUpExp: 1440,

};
const CurrentCount = {
    backpackFullCheck: 1438,
    dailyCheck: 1438,
    pickUpExp: 1438,

};

const PeriodicallyCheck = {
    backpackFullCheck: DecomposeAll,
    dailyCheck: Daily,
    pickUpExp: PickUpExpOrEquipment,

};
const IncreaseCount = () =>
{
    for (let key in CurrentCount)
    {
        CurrentCount[key]++;
        if (CurrentCount[key] >= Frequency[key])
        {
            CurrentCount[key] = 0;
            PeriodicallyCheck[key]();
        }
    }
};


module.exports = {
    IncreaseCount
};

// for (let i = 0; i < 10; i++)
// {
//     IncreaseCount();
// }
