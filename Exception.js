const { ReadImg, Sleep } = require("./Global.js");

const { ReturnHome, DecomposeProps } = require("./BackPack.js");
const { GroceryFlow } = require("./Death.js");
//断开连接
const imgArr = {
    disconnected: ReadImg("exception_disconnected"),
    potion_zero: ReadImg("potion_zero"),
    version: ReadImg("version"),
    startGame: ReadImg("startGame"),
    longTimeTip: ReadImg("game_longTimeTip"),

};

function AsyncException()
{
    const hasDisconnected = images.findImage(shot, imgArr.disconnected, { region: [483, 418, 110, 71] });
    if (hasDisconnected)
    {
        log("connetion lost! :);Exit Game and Restart");
        RandomPress([464, 443, 139, 28]);
        Sleep(3000, 5000);
        app.launch("com.kakaogames.rom");
        Sleep(20000, 30000);
        return false;
    }
    //背包满了
    const isOverLoad = images.findMultiColors(shot, "#912815", [[6, 3, "#6f0905"], [16, 3, "#8e1814"], [24, 3, "#891613"]], { region: [1080, 34, 50, 30] });
    if (isOverLoad)
    {
        console.log("背包已满，需要清理背包");
        PropsCollectionFlow();
        Sleep();
        DecomposeProps();
        return false;
    }
    //游戏终止
    const gameOver = images.findMultiColors(shot, "#3b4336", [[57, 1, "#343c2f"], [55, 9, "#d19e5c"], [70, 9, "#9b7743"], [70, 18, "#ae8c5c"], [118, 12, "#353d30"]], { region: [526, 423, 222, 71] },);
    if (gameOver)
    {
        console.log("检测到游戏不正常运行，游戏终止");
        RandomPress([568, 444, 148, 24]);
        Sleep(10000, 15000);
        app.launch("com.kakaogames.rom");
        Sleep(20000, 30000);
        return false;
    }

    const useOutofPotion = images.findImage(shot, imgArr.potion_zero, { region: [941, 618, 77, 78] });
    if (useOutofPotion)
    {
        console.log("药水用完了，回城购买");
        ReturnHome();
        Sleep(20000, 30000);
        GroceryFlow();
        return false;
    }
    //special
    const hasVersion = images.findImage(shot, imgArr.version, { region: [1136, 14, 125, 45] });
    if (hasVersion)
    {
        console.log("游戏主界面，点击开始游戏");
        RandomPress([136, 63, 966, 500]); return false;
    }
    const hasStartGame = images.findImage(shot, imgArr.startGame, { region: [1115, 636, 130, 70] });
    if (hasStartGame)
    {
        console.log("角色界面，点击开始游戏");
        RandomPress([1106, 660, 132, 21]); return false;
    }
    const hasLongTimeTip = images.findImage(shot, imgArr.longTimeTip, { region: [596, 426, 86, 60] });
    if (hasLongTimeTip)
    {
        console.log("长时间未操作，自动点击");
        RandomPress([576, 443, 133, 27]); return false;
    }
    return true;
}
module.exports = { AsyncException };
// AsyncException();