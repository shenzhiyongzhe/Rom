const { Sleep, InCity, RandomPress, GoBack } = require("./Utils.js");
const { ReturnHome, BlankCheck, StrengthenEquipment } = require("./BackPack");

const ColorCheck = function (region)
{
    const colorArr =
    {
        blue: [["#1f333c", [[8, 0, "#1f3b47"], [22, 0, "#224352"], [28, 0, "#274857"], [28, 3, "#254b5e"]]],
        ["#1d343c", [[8, 0, "#1f3a4b"], [17, 0, "#1e3d51"], [27, 0, "#25485b"], [27, 11, "#295d73"]]]],
        green: [["#273b22", [[9, 0, "#2f4222"], [18, 0, "#304a23"], [26, 0, "#375323"], [26, 8, "#4c6428"]]],
        ["#283e21", [[8, 0, "#2d441f"], [23, 0, "#34511f"], [26, 9, "#4e6326"]]],]
    };
    const shot = captureScreen();
    let color, equipColor;
    out: for (let key in colorArr)
    {
        for (let i = 0; i < colorArr[key].length; i++)
        {
            color = images.findMultiColors(shot, colorArr[key][i][0], colorArr[key][i][1], { region: region });
            if (color)
            {
                equipColor = key;
                break out;
            }
        }
    }
    return equipColor;
};

//get equipment from store
const GetEquipmentFromStore = function ()
{
    const PressFirstItem = function ()
    {
        RandomPress([82, 136, 41, 40]);// the first item
        RandomPress([82, 136, 41, 40]);// confirm
        Sleep(2000, 3000);
    };
    let hadGetEquipment = false;
    // check if it is in main city or return home
    const isInCity = InCity();
    if (!isInCity)
    {
        ReturnHome();
    }
    RandomPress([78, 320, 107, 31]); // press "store" button
    //wait for store to open
    for (let i = 0; i < 10; i++)
    {
        Sleep(3000, 5000);
        let hasEnterStore = images.findMultiColors(captureScreen(), "#3e4638", [[19, 1, "#363e33"], [-1, 16, "#2f372b"], [149, 4, "#363e30"], [146, 29, "#2f362b"]], { region: [10, 640, 194, 65] });
        if (hasEnterStore) break;
    }
    Sleep(2000, 3000);
    const shot = captureScreen();
    //check if there is any equipment to sell
    const isNothing = BlankCheck(shot, [71, 120, 64, 64]);
    if (isNothing)
    {
        log("There is no equipment to sell");
        hadGetEquipment = false;
        return hadGetEquipment;
    }
    // take out equipment
    PressFirstItem();
    // check if there is second item
    const secondItemBlank = BlankCheck(captureScreen(), [72, 125, 61, 62]);
    if (!secondItemBlank)
    {
        PressFirstItem();
    }
    hadGetEquipment = true;
    Sleep();
    GoBack();
    return hadGetEquipment;
};
//strengthen equipment

//sell equipment
const SellEquipment = function ()
{
    let fitting = false;
    RandomPress([1022, 17, 33, 34]); //icon
    Sleep(3000, 5000);
    RandomPress([164, 98, 88, 26]); //sell page
    Sleep();
    RandomPress([1229, 296, 24, 42]); // equipments page
    Sleep();
    RandomPress([885, 183, 45, 42]); // first item
    RandomPress([676, 642, 130, 24]); // confirm
    fitting = true;
    return fitting;
};
// GetEquipmentFromStore();
const StrengthenEquipmentAndSell = function ()
{
    let hadSold = false;
    // const hadGetEquipment = GetEquipmentFromStore();
    // if (!hadGetEquipment) return hadSold;
    //strengthen equipment
    // StrengthenEquipment("weapon");
    // StrengthenEquipment("armor");
};
// StrengthenEquipmentAndSell();
// SellEquipment();
