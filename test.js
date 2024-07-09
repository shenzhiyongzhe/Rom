
const { Sleep, ReadImg, RandomPress, GetNumber, GetCurrentDate, FindMultiColors, FindGreenBtn, FindCheckMark,
    RandomSwipe, FindTipPoint, GoBack, SwipToBottom } = require("./Utils.js");


const NumberPool = { "amount": [], "equipmentPower": [] };

const RecycleImg = (second) =>
{
    setTimeout(() =>
    {
        for (let key in NumberPool)
        {
            NumberPool[key].forEach(arr => arr.forEach(img => img.recycle()));
            NumberPool[key] = [];
        }
        console.log("RecycleImg");
    }, second);
};

const PoolTest = () =>
{
    const regionList = [
        [1120, 176, 70, 44],
        [1124, 245, 70, 41],
        [1128, 316, 63, 33],
        [1131, 375, 63, 45],
        [1124, 449, 74, 34],
        [1127, 513, 66, 37],
        [1131, 580, 67, 34]
    ];
    for (let i = 0; i < regionList.length; i++)
    {
        let region = regionList[i];
        console.log(GetNumber("amount", region));
    }
};

// console.time("getNumber");
// PoolTest();
// console.timeEnd("getNumber");
// console.log(GetNumber("amount", [1062, 293, 22, 25]));
// for (let i = 0; i < 4; i++)
// {
//     RandomSwipe([93, 508, 294, 60], [90, 144, 295, 77]);
//     let hasReachedBottom = GetNumber("amount", [368, 472, 28, 28]);
//     if (hasReachedBottom == 0)
//     {
//         console.log("hasReachedBottom");
//         break;
//     }
// }
SwipToBottom([71, 462, 66, 22], [59, 449, 90, 48], [65, 470, 325, 27], [64, 311, 327, 25]);

