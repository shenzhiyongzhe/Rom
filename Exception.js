const DeathFlow = require("./Death.js");
const {
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
} = require("./Global.js");

const back_icon = ReadImg("back");
const backPack_close = ReadImg("backPack_close");
const menu_close = ReadImg("menu_close");

const mainStory_confirm = ReadImg("mainStory_confirm");
// const death_confirm = ReadImg("death_confirm");
// const backPack_confirm = ReadImg("backPack_confirm");

const version_icon = ReadImg("version");
const startGameBtn = ReadImg("startGame");
const haltModeBtn = ReadImg("haltMode");

let isCloseLoginTip = false;
const propsCollection_loginConfirm = ReadImg("propsCollection_warningConfirm");

const ConfirmBtnCheck = function (shot)
{
    // const hasmainStory_confirm = images.findImage(shot, mainStory_confirm, { region: [672, 444, 143, 74], threshold: 0.7 });
    // if (hasmainStory_confirm) { RandomPress([670, 466, 157, 30]); return true; }

    // const hasDeathConfirm = images.findImage(shot, death_confirm, { region: [579, 532, 120, 61], threshold: 0.7 });
    // if (hasDeathConfirm) { RandomPress([551, 544, 180, 37]); Sleep(3000, 5000); DeathFlow(); log("character is dead"); return true; }

    // const hasBackPackConfirm = images.findImage(shot, backPack_confirm, { region: [649, 501, 158, 112], threshold: 0.7 });
    // if (hasBackPackConfirm) { RandomPress([hasBackPackConfirm.x - 20, hasBackPackConfirm.y - 5, 40, 15]); return true; }

    // if (isCloseLoginTip == false)
    // {
    //     const hasPropsCollection_loginConfirm = images.findImage(shot, propsCollection_loginConfirm, { region: [687, 416, 109, 86], threshold: 0.7 });
    //     if (hasPropsCollection_loginConfirm)
    //     {
    //         RandomPress([582, 397, 13, 13]); // 关闭不再提示
    //         Sleep();
    //         RandomPress([666, 444, 150, 28]); //点击登录
    //         Sleep();
    //         isCloseLoginTip = true;
    //         return true;
    //     }
    // }

    // return false;
    const hasConfirm = images.findImage(shot, mainStory_confirm, { region: [220, 138, 802, 436], threshold: 0.7 });
    if (hasConfirm) { RandomPress([hasConfirm.x - 15, hasConfirm.y - 5, 30, 15]); return true; }
    return false;
};

const CloseBtnCheck = function (shot)
{
    const hasBack = images.findImage(shot, back_icon, { region: [1183, 8, 90, 58] });
    if (hasBack) { GoBack(); return true; }

    const hasBackPack_close = images.findImage(shot, backPack_close, { region: [1232, 57, 46, 42] });
    if (hasBackPack_close) { RandomPress([hasBackPack_close.x, hasBackPack_close.y, 10, 10]); return true; }

    const hasMenu_close = images.findImage(shot, menu_close, { region: [1212, 9, 54, 52] });
    if (hasMenu_close) { RandomPress([hasMenu_close.x, hasMenu_close.y, 10, 10]); return true; }

    return false;
};

const ExitGameCheck = function (shot)
{
    const hasVersion = images.findImage(shot, version_icon, { region: [1136, 14, 125, 45], threshold: 0.8 });
    if (hasVersion) { RandomPress([136, 63, 966, 500]); return true; }

    const hasStart = images.findImage(shot, startGameBtn, { region: [1124, 647, 92, 41], threshold: 0.8, });
    if (hasStart) { RandomPress([1102, 655, 144, 28]); return true; }

    const hasEnterHaltMode = images.findImage(shot, haltModeBtn, { region: [529, 415, 226, 78] });
    if (hasEnterHaltMode)
    {
        const x1 = 630 + random(-20, 20);
        const y1 = 200 + random(-10, 10);
        const x2 = x1;
        const y2 = 400 + random(-20, 100);
        gesture(1000, [x1, y1], [x2, y2]);
        log("Exiting Halt Mode");
        return true;
    }

    return false;
};
const ExceptionFlow = function ()
{
    const shot = captureScreen();
    ConfirmBtnCheck(shot) == false
        && CloseBtnCheck(shot) == false
        && ExitGameCheck(shot) == false;

    log("Exception Flow");
};


// auto();
module.exports = ExceptionFlow;
// console.time("Exception Flow");
// ExceptionFlow();
// console.timeEnd("Exception Flow");