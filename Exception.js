
const { game_config, ReadImg, Sleep, RandomPress, } = require("./Global.js");
const { ReturnHome, DecomposeProps } = require("./BackPack.js");
const { GroceryFlow } = require("./Death.js");
const PropsCollectionFlow = require("./PropsCollection.js");

const imgArr = {
    potion_zero: ReadImg("potion_zero"),
    version: ReadImg("version"),
    startGame: ReadImg("startGame"),
    haltMode: ReadImg("haltMode"),
    disconnected: ReadImg("game_disconnected"),
    longTimeTip: ReadImg("game_longTimeTip"),
    // cancel: ReadImg("cancel"),
    mainStory_confirm: ReadImg("mainStory_confirm"),
    propsLogin: ReadImg("propsCollection_warningConfirm"),
    backPack_close: ReadImg("backPack_close"),
    instance_close: ReadImg("instance_close"),
    menu_close: ReadImg("menu_close"),

    pageBack: ReadImg("back")
    // exitGame: ReadImg("exitGame"),
};

const checkList = {
    //confirm
    mainStory_confirm: [imgArr.mainStory_confirm, [672, 444, 143, 74], [670, 466, 157, 30]],
    //close
    backPack_close: [imgArr.backPack_close, [1223, 54, 56, 51], [1240, 68, 33, 17]],
    instance_close: [imgArr.instance_close, [850, 115, 80, 58], [880, 140, 27, 12]],
    menu_close: [imgArr.menu_close, [1210, 3, 58, 55], [1227, 21, 24, 23]],
    //special
    version: [imgArr.version, [1136, 14, 125, 45], [136, 63, 966, 500]],
    startGame: [imgArr.startGame, [1115, 636, 130, 70], [1106, 660, 132, 21]],
    longTimeTip: [imgArr.longTimeTip, [596, 426, 86, 60], [576, 443, 133, 27]],
    pageBack: [imgArr.pageBack, [1213, 6, 56, 52], [1148, 5, 131, 54]]

};

let isFirstPropsLogin = game_config.setting.isFirstPropsLogin;

const NormalCheck = function (shot)
{
    for (let key in checkList)
    {
        let hasException = images.findImage(shot, checkList[key][0], { region: checkList[key][1] });
        if (hasException)
        {
            log("Exception Found: " + key);
            Sleep();
            RandomPress(checkList[key][2]);
            return false;
        }
    }
    return true;
};


const SpecialCheck = function (shot)
{
    const useOutofPotion = images.findImage(shot, imgArr.potion_zero, { region: [941, 618, 77, 78] });
    if (useOutofPotion)
    {
        console.log("药水用完了，回城购买");
        ReturnHome();
        Sleep(20000, 30000);
        GroceryFlow();
        return false;
    }
    if (isFirstPropsLogin == true)
    {
        const hasPropsCollection_loginConfirm = images.findImage(shot, imgArr.propsLogin, { region: [687, 416, 109, 86] });
        if (hasPropsCollection_loginConfirm)
        {
            RandomPress([582, 397, 13, 13]); // 关闭不再提示
            Sleep();
            RandomPress([666, 444, 150, 28]); //点击登录
            Sleep();
            isFirstPropsLogin = false;
            return false;
        }
    }
    //断开连接
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
    // const hasCancel = images.findImage(shot, imgArr.haltMode, { region: [1115, 636, 130, 70] });
    // if (hasCancel)
    // {
    //     console.log("检测到游戏中断，尝试重新启动游戏");
    //     RandomPress([1106, 660, 132, 21]);
    //     return false;
    // }
    return true;
};

const ExceptionCheck = function ()
{
    const shot = captureScreen();
    NormalCheck(shot) &&

        SpecialCheck(shot);
};

// console.time("test");
// ExceptionCheck();

// console.timeEnd("test");


module.exports = { ExceptionCheck };

