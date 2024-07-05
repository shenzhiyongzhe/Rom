const Frequency = {
    backpackFullCheck: 720,
    deathTimes: 5
};
const CurrentCount = {
    backpackFullCheck: 0,
    deathTimes: 0,
};

// const GetCurrentCount = (obj) =>
// {
//     return CurrentCount[obj];
// };
const IncreaseCount = (obj) =>
{
    CurrentCount[obj]++;
    if (CurrentCount[obj] >= Frequency[obj])
    {
        CurrentCount.obj = 0;
        return true;
    }
    return false;
};

const DailyResetCheck = () =>
{

};
const DailyReset = () =>
{
    CurrentCount.deathTimes = 0;
};
module.exports = {
    IncreaseCount
};