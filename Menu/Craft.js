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
} = require("../Global.js");

////----------------------制造-------------------------
const Flow = function ()
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
        const point = images.findMultiColors(captureScreen(), "#c40000", [[-3, 2, "#c30000"], [-1, 2, "#c20000"], [2, 2, "#c20000"], [-1, 4, "#c30000"],],
            { region: [244, 129, 55, 44], threshold: 15 });
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
        captureScreen(), "#3b4336", [[128, -2, "#373e32"], [-3, 18, "#2d3529"], [129, 17, "#343b2f"],], {
        region: [1025, 646, 238, 62], threshold: 12,
    });
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
module.exports = Flow;