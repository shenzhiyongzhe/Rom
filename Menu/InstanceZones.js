const {
    game_config,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
    currentVariables,
} = require("../Global.js");

const instancePos = [
    [36, 156, 174, 483],
    [292, 156, 167, 477],
    [530, 151, 187, 481],
    [780, 155, 185, 486],
    [1032, 156, 179, 479],
];
const instanceLevel = [
    [396, 225, 493, 38],
    [396, 289, 490, 38],
    [393, 353, 496, 38]
];
const distanceMazeIns = [42, 154, 164, 486];
const maze_B1 = [399, 223, 492, 43];
const confirmBtn = [672, 447, 123, 26];
const autoBtn = [1163, 553, 31, 23];

function EnterInstanceZones()
{
    let hasMenuIcon;
    const menuIcon = ReadImg("menu_icon");
    for (let i = 0; i < 20; i++)
    {
        console.log("waiting for enter instance zones");
        hasMenuIcon = images.findImage(captureScreen(), menuIcon, { region: [1195, 5, 82, 55] });
        if (hasMenuIcon != null) break;
        Sleep(1000, 2000);
    }
    if (hasMenuIcon == null) return;

    RandomPress([1228, 24, 20, 22]); //menu icon
    const instanceZonesIcon = ReadImg("instance_icon");
    Sleep();
    const hasInsIcon = images.findImage(captureScreen(), instanceZonesIcon, { region: [939, 264, 71, 92] });
    if (hasInsIcon == null) return;
    RandomPress([958, 286, 27, 34]); //instance icon
    Sleep(3000, 6000);
    for (let i = 0; i < game_config.ui.specialZone.length; i++)
    {
        let zone = game_config.ui.specialZone[i];
        if (zone.checked == true)
        {
            RandomPress([176, 92, 57, 39]); //special zone page
            Sleep();
            RandomPress(instancePos[i]);
            Sleep();
            switch (zone.level)
            {
                case "firstLevel":
                    RandomPress(instanceLevel[0]);
                    break;
                case "secondLevel":
                    RandomPress(instanceLevel[1]);
                    break;
                case "thirdLevel":
                    RandomPress(instanceLevel[2]);
                    break;
                default:
                    break;
            }
            Sleep();
            RandomPress([680, 469, 142, 24]); // confirm
            game_config.ui.specialZone[i].checked = false;
            currentVariables.instancePos = [1, i];
            console.log("currentVariables.instancePos", currentVariables.instancePos);
            Sleep(10000, 20000);
            RandomPress([1165, 552, 26, 24]); // auto battle
            return;
        }
    }
    for (let i = 0; i < game_config.ui.normalZone.length; i++)
    {
        let zone = game_config.ui.normalZone[i];
        if (zone.checked == true)
        {
            RandomPress(instancePos[i]);
            Sleep();
            switch (zone.level)
            {
                case "firstLevel":
                    RandomPress(instanceLevel[0]);
                    break;
                case "secondLevel":
                    RandomPress(instanceLevel[1]);
                    break;
                case "thirdLevel":
                    RandomPress(instanceLevel[2]);
                    break;
                default:
                    break;
            }
            Sleep();
            RandomPress([680, 469, 142, 24]); // confirm
            game_config.ui.normalZone[i].checked = false;
            Sleep(10000, 20000);
            RandomPress([1165, 552, 26, 24]); // auto battle
            return;
        }
    }
    // setInterval(() =>
    // {
    //     log("game_config.setting.time" + game_config.setting.time);

    // }, 1000);
}

const Flow = function ()
{
    const instanceZonesIcon = ReadImg("instance_icon");
    Sleep(100, 200);
    const hasInsIcon = images.findImage(captureScreen(), instanceZonesIcon, { region: [938, 269, 65, 82] });
    if (hasInsIcon == null) return;
    RandomPress([958, 286, 27, 34]);
    Sleep(2000, 3000);
    RandomPress(distanceMazeIns);
    let popup = images.findMultiColors(captureScreen(), "#685c47", [[-13, 9, "#615c43"], [13, 8, "#887c5c"], [0, 14, "#59513c"], [454, 80, "#c5b092"]], { region: [343, 113, 595, 169] });
    for (let i = 0; i < 3; i++)
    {
        if (popup != null) break;
        Sleep(1000, 2000);
        popup = images.findMultiColors(captureScreen(), "#685c47", [[-13, 9, "#615c43"], [13, 8, "#887c5c"], [0, 14, "#59513c"], [454, 80, "#c5b092"]], { region: [343, 113, 595, 169] });

    }
    log(popup);
    if (popup == null) return;
    RandomPress(maze_B1);
    Sleep();
    RandomPress(confirmBtn);
    Sleep(3000, 4000);
    const menuIcon = ReadImg("menu_icon");
    let isArrived = images.findImage(captureScreen(), menuIcon, { region: [1205, 4, 67, 57] });
    for (let i = 0; i < 5; i++)
    {
        Sleep();
        if (isArrived != null) break;
        isArrived = images.findImage(captureScreen(), menuIcon, { region: [1205, 4, 67, 57] });
    }
    if (isArrived == null) return;
    RandomPress(autoBtn);
    instanceZonesIcon.recycle();
};

module.exports = EnterInstanceZones;
// EnterInstanceZones();