const { WearEquipment } = require("../BackPack.js");
const {

    game_config,
    PressBlank,
    RWFile,
    ReadImg,
    Sleep,
    RandomPress,
    GoBack,
    CharacterIdentity,
} = require("../Global.js");

const CraftPos = {
    icon: [953, 200, 33, 31],
    craft_button: [1062, 657, 175, 36],
    equipmentPage: [31, 97, 96, 35],
    defensePage: [16, 470, 142, 44],
    defense_chestplate: [30, 373, 112, 35],
    craft_bow: [22, 257, 134, 42],
    craft_staff: [28, 314, 129, 31],
    abilityIcon: [14, 14, 50, 44]
};

const player = game_config.player;
////----------------------制造-------------------------
function CraftFlow()
{
    Sleep();
    const craftIcon = ReadImg("craft_icon");
    const hasCraft = images.findImage(captureScreen(), craftIcon, {
        region: [937, 176, 79, 93],
    });
    if (!hasCraft) return false;
    else
    {
        // 判断装备颜色，根据颜色选择制造
        GetEquipmentColor();
        RandomPress(CraftPos.icon);
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

        if (player.equipment.weapon.color != "blue")
        {
            Craft_Weapon();
        } else if (player.equipment.chestplate.color != "blue")
        {
            Craft_Chestplate();
        }
        craftIcon.recycle();
        GoBack();
    }
    Sleep();
    WearEquipment();
};
function CraftBtn()
{
    const isCraftable = images.findMultiColors(
        captureScreen(), "#3b4336", [[128, -2, "#373e32"], [-3, 18, "#2d3529"], [129, 17, "#343b2f"],], {
        region: [1025, 646, 238, 62], threshold: 12,
    });
    if (isCraftable)
    {
        RandomPress(CraftPos.craft_button);
        Sleep(10000, 15000);
        PressBlank();
        Sleep();
    }
};
function Craft_Weapon()
{
    RandomPress(CraftPos.equipmentPage);
    Sleep();
    CharacterIdentity()
        ? player.profession == "archer"
        : player.profession == "wizard";
    if (player.profession == "archer")
    {
        RandomPress(CraftPos.craft_bow); //点击弓 页面
        Sleep();
        RandomPress([291, 148, 213, 45]); //点击右侧第一个武器
        Sleep();
        CraftBtn();
    } else if (player.profession == "wizard")
    {
        RandomPress(CraftPos.craft_staff);
        RandomPress([291, 148, 213, 45]);
        Sleep();
        CraftBtn();
    }
};
function Craft_Chestplate()
{
    RandomPress(CraftPos.equipmentPage);
    Sleep(2000, 3000);
    RandomPress(CraftPos.defensePage);
    Sleep(2000, 3000);
    RandomPress(CraftPos.defense_chestplate);
    Sleep();
    RandomPress([291, 148, 213, 45]); //点击右侧第一个
    Sleep();
    CraftBtn();
};
//判断装备颜色
function JudgeEquipmentColor(itemColor)
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
// 获取装备颜色
function GetEquipmentColor()
{
    RandomPress(CraftPos.abilityIcon);
    Sleep(2000, 3000);
    const shot = captureScreen();
    const weaponColor = JudgeEquipmentColor(
        colors.toString(images.pixel(shot, 435, 130))
    );
    const chestplateColor = JudgeEquipmentColor(
        colors.toString(images.pixel(shot, 435, 208))
    );
    const pantsColor = JudgeEquipmentColor(
        colors.toString(images.pixel(shot, 435, 363))
    );
    const bootsColor = JudgeEquipmentColor(
        colors.toString(images.pixel(shot, 483, 401))
    );

    player.equipment.weapon.color = weaponColor;
    player.equipment.chestplate.color = chestplateColor;
    player.equipment.pants.color = pantsColor;
    player.equipment.boots.color = bootsColor;
    RWFile("player", player);
    log(
        `装备颜色：武器${weaponColor}，胸甲${chestplateColor}，裤子${pantsColor}，靴子${bootsColor}`
    );
};

module.exports = CraftFlow;
// CraftFlow();
