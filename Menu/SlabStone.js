// const { RandomPress, Sleep } = require("../Global.js");

function WearSlabStone(type)
{
    if (type == "suit")
    {
        RandomPress([961, 125, 22, 44]);
    }
    else if (type == "follower")
    {
        RandomPress([1029, 116, 20, 53]);
    }
    Sleep(5000, 6000);
    RandomPress([1041, 511, 116, 26]);
    Sleep();
    const suitCollectionTipPoint = images.findMultiColors(captureScreen(), "#c7321f", [[3, 0, "#cb2f20"], [-1, 3, "#ca2a19"], [2, 3, "#bb2316"]], { region: [356, 75, 60, 48] },);
    if (suitCollectionTipPoint)
    {
        RandomPress([306, 102, 62, 19]);
        Sleep();
    }
    RandomPress([1159, 20, 95, 25]);
}
// WearSlabStone("follower");
module.exports = WearSlabStone;