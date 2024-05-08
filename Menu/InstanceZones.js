const {
    game_config,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
} = require("../Global.js");

const instancePos = {
    normal_1: [36, 156, 174, 483],
    normal_2: [292, 156, 167, 477],
    normal_3: [530, 151, 187, 481],
    normal_4: [780, 155, 185, 486],
    normal_5: [1032, 156, 179, 479],
};
const distanceMazeIns = [42, 154, 164, 486];
const maze_B1 = [399, 223, 492, 43];
const confirmBtn = [672, 447, 123, 26];
const autoBtn = [1163, 553, 31, 23];

function EnterInstanceZones()
{
    const menuIcon = ReadImg("menu_icon");
    for (let i = 0; i < 20; i++)
    {
        let hasMenuIcon = images.findImage(captureScreen(), menuIcon, { region: [1195, 5, 82, 55] });
        if (hasMenuIcon != null) break;
        Sleep(1000, 2000);
    }
    RandomPress([1228, 24, 20, 22]);
    const instanceZonesIcon = ReadImg("instance_icon");
    Sleep(100, 200);
    const hasInsIcon = images.findImage(captureScreen(), instanceZonesIcon, { region: [938, 269, 65, 82] });
    if (hasInsIcon == null) return;
    RandomPress([958, 286, 27, 34]);
    Sleep(2000, 3000);
    log(game_config.ui);
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