auto();
auto.waitFor();
requestScreenCapture();

const {
    imgRef,
    posRef,
    Player,
    ReadImg,
    Sleep,
    RandomClick,
    RandomPress,
    GoBack,
    CharacterIdentity,
} = require("./Global.js");

const {
    MissionCheck,
    DeathCheck,
    SkillPointCheck,
    RewardsPointCheck,
    MenuCheck,
    SignInPointCheck,
    EmailCheck,
    SkipCheck,
    MissionFinishCheck,
    CollectionPageCheck,
    DutyCheck,
    BackPackCheck,
} = require("./Check.js");

const {
    SkillPointFlow,
    GroceryFlow,
    DeathFlow,
    RewardsAchievementFlow,
    MissionFlow,
    SignInFlow,
    EmailFlow,
    SkipFlow,
    MissionFinishFlow,
    CollectionPageFlow,
    MenuFlow,
    DutyFlow,
    CraftFlow,
    BackPackFlow,
} = require("./Flow.js");

const ReGetInGame = function (shot)
{
    const isVersion = images.findImage(shot, imgRef.version, {
        region: [1136, 14, 125, 45],
        threshold: 0.8,
    });
    const startGameBtn = ReadImg("startGameBtn");
    if (isVersion)
    {
        RandomPress([136, 63, 966, 500]);
        Sleep(3000, 5000);
        let isStart;
        while (!isStart)
        {
            isStart = images.findImage(captureScreen(), startGameBtn, {
                region: [1118, 634, 107, 67],
                threshold: 0.8,
            });
            if (isStart)
            {
                Sleep();
                let x = isStart.x + random(-40, 90);
                let y = isStart.y + random(-5, 10);
                press(x, y, random(100, 300));
                break;
            }
        }
    }

    startGameBtn.recycle();
};
const ExceptionCatch = function ()
{
    const shot = images.captureScreen();
    const hasBack = images.findImage(shot, imgRef.back, {
        region: [1173, 6, 101, 54],
        threshold: 0.8,
    });
    const hasConfirm = images.findImage(shot, imgRef.confirm, {
        region: [325, 195, 680, 421],
        threshold: 0.8,
    });
    const isHaltMode = images.findImage(shot, imgRef.haltMode, {
        region: [537, 422, 227, 63],
    });

    if (hasBack)
    {
        log("发现返回按钮，正在处理..." + hasBack);
        press(
            hasBack.x + random(4, 18),
            hasBack.y + random(4, 35),
            random(100, 300)
        );
    }
    if (hasConfirm)
    {
        log("发现确认按钮，正在处理..." + hasConfirm);
        press(
            hasConfirm.x + random(-15, 15),
            hasConfirm.y + random(-4, 4),
            random(100, 300)
        );
    }
    if (isHaltMode)
    {
        const x1 = random(420, 820);
        const y1 = random(140, 240);
        const x2 = x1;
        const y2 = random(400, 540);
        swipe(x1, y1, x2, y2, random(300, 600));
    }
    ReGetInGame(shot);
};
const Check = function ()
{
    //死亡检查
    DeathCheck() && DeathFlow();
    //主线任务检查
    MissionCheck() && MissionFlow();
    Sleep(200, 1000);
    //剧情跳过检查
    SkipCheck() && SkipFlow();

    Sleep(200, 1000);
    //任务完成检查
    MissionFinishCheck() && MissionFinishFlow();
    Sleep(200, 1000);
    // 技能点检查
    SkillPointCheck() && SkillPointFlow();
    Sleep(500, 1000);
    //成就奖励检查
    RewardsPointCheck() && RewardsAchievementFlow();
    Sleep(500, 1000);
    // 菜单检查
    MenuCheck() && MenuFlow();
    Sleep(100, 2000);
    //背包小红点检查 打开宝箱
    BackPackCheck() && BackPackFlow();

    // 异常检查
    ExceptionCatch();
};
// RandomPress(posRef.potion);
//Flow Check
// SkillPointCheck() && SkillPointFlow(); //OK
// EquipmentCheck() && EquipmentFlow();// OK
// MissionCheck() && MissionFlow(); //OK
// MenuCheck() && MenuFlow(); //OK
// CollectionPageCheck(captureScreen()) && CollectionPageFlow(); //OK

// DutyCheck() && DutyFlow(); //OK
// BackPackCheck() && BackPack_BoxFlow(); //ok
// ExceptionCatch();
// while (true) {
//     console.time("Elapsed Time");
//     Check();
//     sleep(2000);
//     console.timeEnd("Elapsed Time");
// }
// CraftFlow();

// BackPackFlow();

// log(FindBlueEquip([912, 136, 39, 36]));
// GoBack();
const BrushInstanceZones = function ()
{
    const instanceIcon = ReadImg("instance_icon");
    const isInstance = images.findImage(captureScreen(), instanceIcon, {
        region: [941, 267, 62, 80],
    });
    if (isInstance)
    {
        RandomPress(posRef.instanceIcon);
    }
};
BrushInstanceZones();