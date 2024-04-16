const {
    SignInPointCheck,
    EmailCheck,
    CollectionPageCheck,
    DutyCheck,
    CraftCheck,
} = require("./Check.js");
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



//------------------------主线任务流程---------------------
//剧情跳过
const SkipFlow = () =>
{
    Sleep(600, 1200);
    RandomPress(posRef.skip, random(200, 600));
};

//完成任务 点击空白
const MissionFinishFlow = () => RandomPress(posRef.missionFinish);
//任务成就奖励
const RewardsAchievementFlow = function ()
{
    RandomPress(posRef.rewards, random(100, 400));
    Sleep(1000, 2000);
    let isRed = images.findMultiColors(
        captureScreen(),
        "#b5301a",
        [
            [-3, 2, "#ce3326"],
            [0, 5, "#bd2617"],
            [2, 3, "#c92718"],
        ],
        { region: [424, 78, 115, 59] }
    );
    if (isRed)
    {
        RandomPress(posRef.achievement, random(200, 500));
        Sleep(1000, 1500);
        RandomPress(posRef.getAwards, random(100, 400));
        Sleep(2000, 3000);
        RandomClick(posRef.blank);
        Sleep(1000, 2000);
        GoBack();
    }
};

const MissionFlow = () => RandomClick(posRef.mainStory);

//购买药水
const GroceryFlow = function ()
{
    const inGrocery = findImage(captureScreen(), ReadImg("grocery"));
    const staminaPotion_icon = ReadImg("staminaPotion_icon");
    if (inGrocery)
    {
        RandomPress(posRef.grocery);
        Sleep(300, 5000);
        while (true)
        {
            let staminaPotion = images.findImage(
                captureScreen(),
                staminaPotion_icon
            );
            Sleep();
            if (staminaPotion)
            {
                RandomPress(posRef.potion);
                Sleep(1500, 2500);
                const potionMax = ReadImg("potionMax");
                let isMax = findImage(captureScreen(), potionMax);
                Sleep(200, 500);
                if (isMax)
                {
                    RandomPress(posRef.potionMax);
                    Sleep(1000, 1500);
                    RandomPress(posRef.potionConfirm);
                    Sleep(1000, 1500);
                    GoBack();
                }
                staminaPotion_icon.recycle();
                potionMax.recycle();
                break;
            }
        }
    }
};

//死亡流程 点击确认按钮，购买药水
const DeathFlow = function ()
{
    const revive = findImage(captureScreen(), imgRef.revive, {
        region: [546, 511, 203, 54],
    });
    if (revive)
    {
        Sleep(1000, 10000);
        RandomPress([568, 525, 145, 31]);
        Sleep(3000, 1000);
        let deathConfirmBtn;
        do
        {
            deathConfirmBtn = findImage(captureScreen(), imgRef.confirm);
            if (deathConfirmBtn)
            {
                Sleep();
                RandomPress(posRef.deathConfirm, random(100, 300));
                break;
            }
            Sleep(200, 500);
        } while (!deathConfirmBtn);
    }

    //寻找死亡弹窗的确认按钮
    Sleep(1000, 2000);
    GroceryFlow();
    Sleep(2000, 3000);
    BackPack_EquipmentFlow();
};

//----------------------菜单流程-------------------------
const MenuFlow = function ()
{
    RandomClick(posRef.menu);
    Sleep();
    const shot = captureScreen();
    Sleep(100, 300);
    const isSignIn = SignInPointCheck(shot);
    const isEmail = EmailCheck(shot);
    const isCollectionPage = CollectionPageCheck(shot);
    const isDuty = DutyCheck(shot);
    const isCraft = CraftCheck(shot);
    if (isSignIn)
    {
        SignInFlow();
    } else if (isEmail)
    {
        EmailFlow();
    } else if (isCollectionPage)
    {
        BackPack_EquipmentFlow();
        Sleep(1000, 2000);
        RandomPress(posRef.menu);
        Sleep(1000, 2000);
        CollectionPageFlow();
    } else if (isDuty)
    {
        DutyFlow();
    } else if (isCraft)
    {
        CraftFlow();
    }
};


////----------------------制造-------------------------
const CraftFlow = function ()
{
    Sleep();
    const craftIcon = ReadImg("craft_icon");
    const hasCraft = images.findImage(captureScreen(), craftIcon, {
        region: [937, 176, 79, 93],
    });
    if (!hasCraft)
    {
        RandomPress(posRef.menu_close);
        return false;
    } else
    {
        // 判断装备颜色，根据颜色选择制造
        GetEquipmentColor();
        RandomPress(posRef.craft_icon);
        Sleep(3000, 4500);
        const point = images.findMultiColors(
            captureScreen(),
            "#c40000",
            [
                [-3, 2, "#c30000"],
                [-1, 2, "#c20000"],
                [2, 2, "#c20000"],
                [-1, 4, "#c30000"],
            ],
            { region: [244, 129, 55, 44], threshold: 15 }
        );
        if (point)
        {
            let x = point.x + random(25, 210);
            let y = point.y + random(5, 30);
            press(x, y, random(100, 300));
            Sleep();
            CraftBtn();
        }
        Sleep(2000, 4000);

        if (Player.equipment.weapon != "blue")
        {
            Craft_Weapon();
        } else if (Player.equipment.chestplate != "blue")
        {
            Craft_Chestplate();
        }
        craftIcon.recycle();
        GoBack();
    }
};
const CraftBtn = function ()
{
    const isCraftable = images.findMultiColors(
        captureScreen(),
        "#3b4336",
        [
            [128, -2, "#373e32"],
            [-3, 18, "#2d3529"],
            [129, 17, "#343b2f"],
        ],
        {
            region: [1025, 646, 238, 62],
            threshold: 12,
        }
    );
    if (isCraftable)
    {
        RandomPress(posRef.craft_button);
        Sleep(10000, 15000);
        RandomClick(posRef.blank);
        Sleep(1000, 2000);
    }
};
const Craft_Weapon = function ()
{
    RandomPress(posRef.craft_equipmentPage);
    Sleep();
    CharacterIdentity()
        ? Player.profession == "archer"
        : Player.profession == "wizard";
    if (Player.profession == "archer")
    {
        RandomPress(posRef.craft_bow); //点击弓 页面
        Sleep();
        RandomPress([291, 148, 213, 45]); //点击右侧第一个武器
        Sleep();
        CraftBtn();
    } else if (Player.profession == "wizard")
    {
        RandomPress(posRef.craft_staff);
        RandomPress([291, 148, 213, 45]);
        Sleep();
        CraftBtn();
    }
};
const Craft_Chestplate = function ()
{
    RandomPress(posRef.craft_equipmentPage);
    Sleep(2000, 3000);
    RandomPress(posRef.craft_defensePage);
    Sleep(2000, 3000);
    RandomPress(posRef.craft_defense_chestplate);
    Sleep();
    RandomPress([291, 148, 213, 45]); //点击右侧第一个
    Sleep();
    CraftBtn();
};
//判断装备颜色
const JudgeEquipmentColor = function (itemColor)
{
    if (colors.isSimilar(itemColor, "#1E4C62", 12))
    {
        return "blue";
    } else if (colors.isSimilar(itemColor, "#365620", 12))
    {
        return "green";
    } else
    {
        return "white";
    }
};
//获取装备颜色
const GetEquipmentColor = function ()
{
    RandomPress(posRef.skillPoint);
    Sleep(2000, 3000);
    const shot = captureScreen();
    const weaponColor = JudgeEquipmentColor(
        colors.toString(images.pixel(shot, 435, 130))
    );
    const chestplateColor = JudgeEquipmentColor(
        colors.toString(images.pixel(shot, 435, 208))
    );
    const pantColor = JudgeEquipmentColor(
        colors.toString(images.pixel(shot, 435, 363))
    );
    const bootsColor = JudgeEquipmentColor(
        colors.toString(images.pixel(shot, 483, 401))
    );
    Player.equipment.weapon = weaponColor;
    Player.equipment.chestplate = chestplateColor;
    Player.equipment.pant = pantColor;
    Player.equipment.boots = bootsColor;
    log(
        `装备颜色：武器${weaponColor}，胸甲${chestplateColor}，裤子${pantColor}，靴子${bootsColor}`
    );
};



//--------------------------背包------------------------------------
//--------------------------背包------------------------------------
//--------------------------背包------------------------------------
const BackPackFlow = function ()
{
    // BackPack_EquipmentFlow();
    // Sleep(2000, 3000);
    BackPack_BoxFlow();
};
//背包 循环遍历所有装备
const ItemLoop = function ()
{
    const shot = captureScreen();
    const E = ReadImg("E");
    const plus = ReadImg("plus");

    for (let i = 0; i < 6; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let isEquip = images.findImage(shot, E, {
                region: [927 + j * 65, 122 + i * 65, 40, 40],
                threshold: 0.7,
            });
            let isBlank = images.findMultiColors(
                shot,
                "#1b1b1b",
                [
                    [15, 0, "#1e1e1f"],
                    [33, 0, "#1f1f21"],
                    [5, 12, "#1c1c1e"],
                    [17, 9, "#1e1e1f"],
                    [33, 9, "#1f2020"],
                ],
                { region: [890 + j * 65, 125 + i * 65, 50, 50] }
            );
            if (isEquip == null && isBlank == null)
            {
                let x = 890 + j * 65 + random(5, 45);
                let y = 130 + i * 65 + random(5, 40);
                press(x, y, random(200, 400));
                Sleep(600, 1200);

                let isPlus = images.findImage(captureScreen(), plus, {
                    region: [747, 154, 128, 70],
                });
                if (isPlus != null)
                {
                    Sleep(600, 1200);
                    press(x, y, random(200, 400));
                }
                let isWear = images.findMultiColors(
                    images.captureScreen(),
                    "#262626",
                    [
                        [19, 3, "#252626"],
                        [4, 18, "#242526"],
                        [31, 18, "#242526"],
                    ],
                    { region: [176, 192, 60, 132] }
                );
                if (isWear == null)
                {
                    press(x, y, random(200, 400));
                    Sleep(600, 1200);
                }
            }
        }
    }
    Sleep(500, 1000);
    E.recycle();
    plus.recycle();
};
const BackPack_EquipmentFlow = function ()
{
    const backPackIcon = ReadImg("backPack");
    const backPack = findImage(captureScreen(), backPackIcon, {
        region: [1072, 7, 68, 59],
    });
    if (backPack)
    {
        RandomPress(posRef.backPack);
        Sleep(1500, 2500);
        RandomPress(posRef.equipment, random(100, 300));
        Sleep(600, 1200);
        RandomPress(posRef.equipmentSort, random(200, 400));
        Sleep(300, 600);
        RandomClick(posRef.sortByLevel);
        Sleep(400, 1400);
        //循环遍历所有装备
        ItemLoop();
        Sleep();
        DecomposeProps();
        RandomPress(posRef.backPackClose, random(100, 300));
    }
    backPackIcon.recycle();
};
//分解道具
const DecomposeProps = function ()
{
    const decompositionIcon = ReadImg("backPack_decompose");
    const isDecompose = images.findImage(captureScreen(), decompositionIcon, {
        region: [991, 495, 62, 52],
    });

    if (isDecompose)
    {
        RandomPress(posRef.backPack_decompose);
        Sleep(2000, 2500);
        RandomPress(posRef.backPack_decompose_normal);
        Sleep();
        RandomPress(posRef.backPack_decompose_btn);
        const isDecomposeConfirm = images.findImage(
            captureScreen(),
            imgRef.confirm,
            {
                region: [325, 195, 680, 421],
                threshold: 0.8,
            }
        );
        for (let i = 0; i < 3; i++)
        {
            Sleep(1000, 2000);
            isDecomposeConfirm = images.findImage(
                captureScreen(),
                imgRef.confirm,
                {
                    region: [709, 488, 67, 58],
                    threshold: 0.8,
                }
            );
            if (isDecomposeConfirm) break;
        }
        RandomPress(posRef.backPack_decompose_confirm);
        Sleep(2000, 3000);
        RandomPress(posRef.blank);
        Sleep();
        RandomPress(posRef.backPackClose);
    }
    decompositionIcon.recycle();
};
//强化装备
//使用道具 flow
const StrengthenWeapon = function () { };
//判断是否是宝箱
const IsTreasureBox = function ()
{
    const img = ReadImg("CN_treasureBox");
    let isBox = images.findImage(images.captureScreen(), img, {
        region: [626, 66, 237, 55],
        threshold: 0.65,
    });
    return isBox;
};
//判断是否是强化卷轴
const IsStrengthenScroll = function ()
{
    const weaponScroll = ReadImg("backPack_props_weaponStrengthen");
    const defenceScroll = ReadImg("backPack_props_defenceStrengthen");
    const isWeapon = images.findImage(images.captureScreen(), weaponScroll, {
        region: [580, 71, 82, 84],
    });
    const isDefence = images.findImage(images.captureScreen(), defenceScroll, {
        region: [580, 71, 82, 84],
    });
    weaponScroll.recycle();
    defenceScroll.recycle();
    if (isWeapon) return "weapon";
    if (isDefence) return "defence";
    return false;
};
//寻找蓝装并且未强化的装备
const FindBlueEquip = function ([x, y, w, h])
{
    const plus = ReadImg("backPack_props_plus");
    const isPlus = images.findImage(images.captureScreen(), plus, {
        region: [x, y, w, h],
    });
    return isPlus;
};
const BackPack_BoxFlow = function ()
{
    RandomClick(posRef.backPack);
    Sleep(1500, 2500);
    const propIcon = ReadImg("backPack_propIcon");
    const isProp = images.findImage(images.captureScreen(), propIcon, {
        region: [1214, 268, 62, 69],
    });
    if (isProp)
    {
        RandomPress(posRef.backPack_props, random(100, 300));
        Sleep(1000, 1500);
        const shot = images.captureScreen();
        for (let i = 0; i < 6; i++)
        {
            for (let j = 0; j < 5; j++)
            {
                let x = 895 + j * 65;
                let y = 135 + i * 65;
                let w = 40;
                let h = 35;
                let isBlank = images.findMultiColors(
                    shot,
                    "#1b1b1b",
                    [
                        [17, 1, "#1d1d1e"],
                        [40, 1, "#1e1f1f"],
                        [-4, 13, "#191a1b"],
                        [16, 13, "#1e1f20"],
                        [36, 15, "#1f2021"],
                    ],
                    { region: [890 + j * 65, 125 + i * 65, 50, 50] }
                );
                if (isBlank == null)
                {
                    RandomPress([x, y, w, h]);
                    Sleep(600, 1200);
                    let box = IsTreasureBox(); //判断是否是宝箱
                    let scroll = IsStrengthenScroll(); //判断是否是强化卷轴
                    if (box)
                    {
                        //点击使用
                        RandomPress([x, y, w, h]);
                        Sleep(1200, 2000);
                        let isConfirm = findImage(
                            captureScreen(),
                            imgRef.confirm,
                            { region: [536, 406, 462, 158] }
                        );
                        if (isConfirm)
                        {
                            press(
                                isConfirm.x + random(-20, 50),
                                isConfirm.y + random(-5, 10),
                                random(100, 300)
                            );
                            Sleep(1000, 1500);
                            RandomPress(posRef.blank);
                            Sleep(600, 1200);
                        }
                    }
                    // else if (scroll == "defence")
                    // {

                    //     //点击使用
                    //     RandomPress([x, y, w, h]);
                    //     Sleep(1200, 2000);
                    //     RandomPress([1224, 282, 26, 28]);
                    //     Sleep(2000, 3000);
                    //     let isPlus = FindBlueEquip([x + 20, y + 10, 20, 20]);
                    //     if (isPlus == null)
                    //     {
                    //         RandomPress([x - 8, y - 25, w, h]);
                    //         Sleep();
                    //         RandomPress([942, 662, 272, 33]); //点击强化按钮
                    //         Sleep();
                    //         RandomPress([1170, 21, 85, 30]);
                    //         break;
                    //     }


                    // }
                } else break;
            }
        }
    }
    else RandomPress(posRef.backPackClose);
    propIcon.recycle();
};

//--------------------------副本-------------------------------
const BrushInstanceZones = function ()
{
    const instanceIcon = ReadImg("instanceIcon");
    const isInstance = images.findImage(captureScreen(), instanceIcon, {
        region: [1148, 186, 69, 73],
    });
    log("instanceIcon", isInstance);
};
module.exports = {
    GroceryFlow,
    DeathFlow,
    RewardsAchievementFlow,
    MissionFlow,
    BackPackFlow,
    SkipFlow,
    MissionFinishFlow,
    MenuFlow,
    CraftFlow,
};
