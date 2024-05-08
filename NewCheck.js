const { ReadImg, Sleep } = require("./Global.js");
const AbilityPoints = require("./AbilityPoints.js");
const fn1 = () => false;

const fn2 = () => true;
function fn()
{
    log("test success");
};
function AbilityPointCheck(shot) {
     return images.findMultiColors(shot, "#bd220f", [[3, 0, "#bd2415"], [-1, 3, "#d62d1d"], [3, 3, "#bb2316"],],
    { region: [13, 4, 71, 31] });
}

const conditiosnList = {
    abilityPoints: (shot) => AbilityPointCheck,
    test: fn1
};

const excuteList = {
    abilityPoints: AbilityPoints,
    test: fn
};

function Check()
{
    const shot = captureScreen();
    for (let key of Object.keys(conditiosnList))
    {
        // if (conditiosnList[key]())
        // {
        //     excuteList[key]();
        // }
        log(conditiosnList[key]());
    }
}
Check();