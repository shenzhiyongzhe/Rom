
const { game_config, ReadImg, Sleep, RandomPress,
} = require("./Global.js");

const { DeathFlow } = require("./Death.js");

const imgArr = {
    mainStory_confirm: ReadImg("mainStory_confirm"),
    propsLogin: ReadImg("propsCollection_warningConfirm"),
    backPack_close: ReadImg("backPack_close"),
    instance_close: ReadImg("instance_close"),
    version: ReadImg("version"),
    startGame: ReadImg("startGame"),
    haltMode: ReadImg("haltMode"),
    disconnected: ReadImg("game_disconnected"),
    longTimeTip: ReadImg("game_longTimeTip"),
    goBack: ReadImg("back"),
    // exitGame: ReadImg("exitGame"),
};

const checkList = {
    //confirm
    mainStory_confirm: [imgArr.mainStory_confirm, [672, 444, 143, 74], [670, 466, 157, 30]],
    backPack_small_confirm: [imgArr.mainStory_confirm, [658, 491, 102, 69], [663, 510, 87, 29]],
    backPack_big_confirm: [imgArr.mainStory_confirm, [744, 522, 78, 59], [702, 534, 159, 29]],
    //close
    backPack_close: [imgArr.backPack_close, [1223, 54, 56, 51], [1240, 68, 33, 17]],
    instance_close: [imgArr.instance_close, [850, 115, 80, 58], [880, 140, 27, 12]],
    //special
    version: [imgArr.version, [1136, 14, 125, 45], [136, 63, 966, 500]],
    startGame: [imgArr.startGame, [1115, 636, 130, 70], [1106, 660, 132, 21]],
    longTimeTip: [imgArr.longTimeTip, [596, 426, 86, 60], [576, 443, 133, 27]],
    goBack: [imgArr.goBack, [1182, 2, 97, 68], [1185, 15, 79, 36]],

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
            RandomPress(checkList[key][2]);
            return false;
        }
    }
    return true;
};


const SpecialCheck = function (shot)
{
    Sleep();
    const curShot = images.clip(captureScreen(), 621, 324, 36, 76);

    const hasStopMoving = images.findImage(shot, curShot, { region: [524, 244, 230, 223], threshold: 0.8 });
    if (hasStopMoving)
    {
        console.log("character is stop moving");
        RandomPress([272, 98, 628, 476]);
    }
    const hasEnterHaltMode = images.findImage(shot, imgArr.haltMode, { region: [529, 415, 226, 78] });
    if (hasEnterHaltMode)
    {
        Sleep(3600000, 18000000);
        const x1 = 630 + random(-20, 20);
        const y1 = 200 + random(-10, 10);
        const x2 = x1;
        const y2 = 400 + random(-20, 100);
        gesture(1000, [x1, y1], [x2, y2]);
        log("Exiting Halt Mode");
        return false;
    }
    const hasDead = images.findImage(shot, imgArr.mainStory_confirm, { region: [598, 529, 82, 69], threshold: 0.8 });
    if (hasDead)
    {
        log("character is Dead");
        game_config.player.deathtime++;
        log("Character Death Time: " + game_config.player.deathtime);
        RandomPress([555, 547, 168, 32]);
        Sleep(5000, 8000);
        DeathFlow();
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

    const hasDisconnected = images.findImage(shot, imgArr.disconnected, { region: [483, 418, 110, 71] });
    if (hasDisconnected)
    {
        log("Exit Game");
        RandomPress([464, 443, 139, 28]);
        Sleep(3000, 5000);
        app.launch("com.kakaogames.rom");
        Sleep(20000, 30000);
        return false;
    }
    return true;
};

const ExceptionCheck = function ()
{
    log("Exception Check ");
    const shot = captureScreen();
    NormalCheck(shot)
        && SpecialCheck(shot);
};

// console.time("test");
// ExceptionCheck();

// console.timeEnd("test");


module.exports = ExceptionCheck;
