const { ReadImg, Sleep, RandomPress, game_config, PressMenu } = require("./Global.js");

const { ReturnHome } = require("./BackPack.js");
const { DeathFlow, GroceryFlow } = require("./Death.js");
const { EnterInstanceZones } = require("./Instance.js");
const { PropsCollectionFlow } = require("./PropsCollection.js");
//断开连接
const imgArr = {
    pageBack: ReadImg("back"),
    potion_zero: ReadImg("potion_zero"),
    haltMode_outOfPotion: ReadImg("haltMode_outOfPotion"),
    exception_outOfPotion: ReadImg("exception_outOfPotion"),
    backpack_overload: ReadImg("exception_backpackOverload"),
    backpack_overload100: ReadImg("exception_backpackOverload100"),
    no_exp: ReadImg("exception_noExp")
};
const appName = "com.kakaogames.rom";
function RestartApp(appName)
{
    app.openAppSetting(appName);
    text(app.getAppName(appName)).waitFor();
    let is_sure = textMatches(/(.*강.*|.*종.*|.*료.*|.*FORCE.*|.*STOP.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled())
    {
        textMatches(/(.*강.*|.*종.*|.*료.*|.*FORCE.*|.*STOP.*|.*强.*|.*止.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*확.*|.*인.*|.*OK.*|.*确.*|.*定.*)/).findOne().click();
        sleep(1000);
        back();
    } else
    {
        log(appName + "应用不能被正常关闭或不在后台运行");
        back();
    }
    home();
    sleep(5000);
    app.launch(appName);
    Sleep(15000, 25000);
}
const ExitHaltMode = function ()
{
    const x1 = 630 + random(-20, 20);
    const y1 = 200 + random(-10, 10);
    const x2 = x1 + random(-10, 10);
    const y2 = 400 + random(-20, 100);
    gesture(1000, [x1, y1], [x2, y2]);
    log("Exiting Halt Mode");
    Sleep();
    return true;
};

function Exception()
{
    const shot = captureScreen();
    const hasPageBack = images.findImage(shot, imgArr.pageBack, { region: [1197, 4, 80, 58] });
    if (hasPageBack)
    {
        RandomPress([1162, 17, 106, 30]);
        return false;
    }
    const hasDisconnected = images.findMultiColors(shot, "#343434", [[0, 16, "#292929"], [32, 7, "#2c2c2c"], [129, 1, "#333333"], [123, 15, "#30302e"]], { region: [431, 426, 207, 65] });
    const hasDisconnected_2 = images.findMultiColors(shot, "#383838", [[-5, 18, "#2a2a2a"], [108, 0, "#313131"], [103, 16, "#313131"], [71, 4, "#383838"]], { region: [427, 424, 210, 68] });
    if (hasDisconnected || hasDisconnected_2)
    {
        log("connetion lost! :);Exit Game and Restart");
        RandomPress([462, 449, 146, 18]);
        Sleep(3000, 5000);
        app.launch("com.kakaogames.rom");
        Sleep(20000, 30000);
        return false;
    }
    //背包满了
    const isBackpackOverLoad = images.findImage(shot, imgArr.backpack_overload, { region: [967, 16, 65, 65] });
    const isBackpackOverLoad100 = images.findImage(shot, imgArr.backpack_overload100, { region: [967, 16, 65, 65] });
    if (isBackpackOverLoad || isBackpackOverLoad100)
    {
        console.log("背包已满，需要清理背包");
        ExitHaltMode();
        PropsCollectionFlow();
        Sleep();
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

    const outOfPotion = images.findImage(shot, imgArr.exception_outOfPotion, { region: [941, 615, 80, 82] });
    const saveMode_outOfPotion = images.findImage(captureScreen(), imgArr.haltMode_outOfPotion,
        { region: [904, 4, 63, 70] });
    if (outOfPotion)
    {
        console.log("药水用完了，回城购买");
        ReturnHome();
        Sleep(10000, 15000);
        GroceryFlow();
        return false;
    }
    if (saveMode_outOfPotion)
    {
        ExitHaltMode();
        ReturnHome();
        Sleep(10000, 15000);
        GroceryFlow();
        return false;
    }
    //special
    const hasVersion = images.findMultiColors(shot, "#ff2200", [[-1, 6, "#ff2200"], [20, 4, "#ff2200"], [57, 11, "#ff2200"], [68, 10, "#ffffff"]],
        { region: [1107, 664, 148, 49] });
    const hasVersion_2 = images.findMultiColors(shot, "#fe2200", [[0, 7, "#fe2200"], [19, -4, "#fd2300"], [19, 13, "#fe2200"], [68, 6, "#fefefc"], [114, 10, "#fefefc"]],
        { region: [1108, 657, 152, 62] });
    if (hasVersion || hasVersion_2)
    {
        console.log("游戏主界面，点击开始游戏");
        RandomPress([184, 107, 902, 456]);
        Sleep(3000, 5000);
        for (let i = 0; i < 10; i++)
        {
            Sleep();
            let hasStillInVersion = images.findMultiColors(captureScreen(), "#ff2200", [[-1, 6, "#ff2200"], [20, 4, "#ff2200"], [57, 11, "#ff2200"], [68, 10, "#ffffff"]],
                { region: [1107, 664, 148, 49] });
            if (hasStillInVersion)
            {
                RandomPress([184, 107, 902, 456]);
                if (i == 9)
                {
                    //restart game
                    RestartApp(appName);
                }
            }
            else break;
        }
        return false;
    }
    const hasStartGame = images.findMultiColors(shot, "#3e4638", [[21, -1, "#3b4437"], [133, -1, "#384034"], [131, 19, "#2f382b"], [6, 19, "#2b3227"]],
        { region: [1073, 636, 192, 61] });
    const hasStartGame_2 = images.findMultiColors(shot, "#393939", [[0, 15, "#2b2b29"], [105, 5, "#323232"], [102, 17, "#303030"]], { region: [25, 635, 180, 68] },);
    if (hasStartGame || hasStartGame_2)
    {
        console.log("角色界面，点击开始游戏");
        RandomPress([1106, 660, 132, 21]);
        Sleep(15000, 20000);
        if (images.findImage(captureScreen(), imgArr.potion_zero, { region: [941, 618, 77, 78] }))
        {
            GroceryFlow();
        }
        return false;
    }
    const hasLongTimeTip = images.findMultiColors(shot, "#384033", [[3, 19, "#2c3729"], [40, 8, "#2e3629"], [139, 1, "#353d30"], [114, 13, "#333b2e"]], { region: [534, 419, 208, 77] });
    if (hasLongTimeTip)
    {
        console.log("长时间未操作，自动点击");
        RandomPress([571, 447, 140, 21]); return false;
    }

    const hasDead_1 = images.findMultiColors(shot, "#766c61", [[0, 32, "#7a7166"], [0, 76, "#8c847a"], [-22, 34, "#8c8987"], [31, 32, "#857b71"]],
        { region: [576, 49, 131, 135] });
    const hasDead_2 = images.findMultiColors(shot, "#3b4336", [[35, 0, "#394134"], [132, -1, "#393f33"], [135, 21, "#333b2e"], [13, 17, "#2b3326"]],
        { region: [522, 531, 245, 66] });
    const hasRevive = findMultiColors(shot, "#401b06", [[25, -3, "#3c1906"], [143, -2, "#381706"], [153, 22, "#321504"], [4, 21, "#2d1204"]],
        { region: [528, 542, 229, 66] });

    const hasDeadConfirm = images.findMultiColors(shot, "#3e4638", [[24, 2, "#384134"], [154, 2, "#373f33"], [154, 25, "#32392d"], [11, 25, "#2a3226"]],
        { region: [530, 529, 224, 67] });
    if ((hasDead_1 || hasDead_2) && hasRevive)
    {
        Sleep(1000, 5000);
        RandomPress([574, 565, 140, 25]);
        Sleep(15000, 20000);
        RandomPress([563, 546, 160, 34]);
        Sleep(3000, 5000);
        DeathFlow();
        return false;
    }
    else if ((hasDead_1 || hasDead_2) && hasDeadConfirm)
    {
        RandomPress([555, 547, 168, 32]);
        Sleep(5000, 8000);
        DeathFlow();
        return false;
    }

    const hasNoExp = images.findImage(shot, imgArr.no_exp, { region: [43, 528, 212, 67] });

    if (hasNoExp)
    {
        for (let i = 0; i < 10; i++)
        {
            Sleep(3000, 5000);
            let isStillNoExp = images.findImage(captureScreen(), imgArr.no_exp, { region: [43, 528, 212, 67] });

            if (isStillNoExp == null) return;
            else if (i == 9)
            {
                ExitHaltMode();
                if (game_config.ui.gameMode == "instance")
                {
                    console.log("long time no exp!!! exit halt mode check game");
                    Sleep();
                    EnterInstanceZones();
                }
                else if (game_config.ui.gameMode == "wild")
                {
                    console.log("go to wild ");
                }
            }
        }

    }
    return true;

}
const UnifyScreen = function ()
{
    Sleep();
    let shot = captureScreen();
    const menuIcon = ReadImg("menu_icon");
    const hasMenu = images.findImage(shot, menuIcon, { region: [1206, 6, 68, 64] });
    if (hasMenu)
    {
        menuIcon.recycle();
        return;
    };
    const back = ReadImg("back");
    const hasBack = images.findImage(shot, back, { region: [1206, 3, 64, 63] });
    if (hasBack)
    {
        GoBack();
        back.recycle();
        return;
    }
    const justStartGame_01 = images.findMultiColors(shot, "#231f20", [[8, 233, "#231f20"], [5, 619, "#231f20"], [536, -20, "#231f20"], [1215, -16, "#231f20"],
    [1222, 303, "#231f20"], [1209, 656, "#231f20"]]);
    const justStartGame_02 = images.findMultiColors(shot, "#000000", [[1, 195, "#000000"], [1, 439, "#000000"], [423, -29, "#000000"], [936, 7, "#000000"],
    [924, 452, "#000000"], [511, 438, "#000000"]]);
    if (justStartGame_01 || justStartGame_02)
    {
        Sleep(10000, 20000);
        return;
    }
    const inSaveMode = images.findMultiColors(shot, "#454442", [[24, 1, "#373737"], [47, 4, "#535353"], [73, 1, "#515151"], [91, 1, "#494947"]], { region: [516, 172, 271, 250] });
    if (inSaveMode)
    {
        Sleep();
        ExitHaltMode();
        return;
    }
};
module.exports = { Exception, UnifyScreen };
// UnifyScreen();
// log(images.findMultiColors(captureScreen(), "#454442", [[24, 1, "#373737"], [47, 4, "#535353"], [73, 1, "#515151"], [91, 1, "#494947"]], { region: [516, 172, 271, 250] }));
// console.time("exception");
// Exception();
// // const isBackpackOverLoad = images.findImage(captureScreen(), imgArr.backpack_overload, { region: [967, 16, 65, 65] });
// // log(isBackpackOverLoad);
// console.timeEnd("exception");