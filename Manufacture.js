const { game_config, RWFile } = require("./RomConfig.js");
const { Sleep, RandomPress, GoBack, OpenMenu, ReadImg, FindMultiColors, GetNumber, WaitUntilPageBack, FindGreenBtn,
    HasMenu, HasPageBack, OpenBackpack, CloseBackpack,
    GetCurMoney, } = require("./Utils.js");

const { StrengthenTradeGreenSuit, DecomposeAll, PutOnSale } = require("./BackPack.js");
const EnterManufacturePage = () =>
{
    console.log("EnterManufacturePage");
    OpenMenu();
    RandomPress([957, 198, 29, 31]);
    WaitUntilPageBack();
};
const CanMake = (region) =>
{
    const whiteBGList = [
        ["#2b2b2b", [[0, 18, "#2d3030"], [-2, 33, "#2e2f2f"], [13, 46, "#2e3030"], [42, 44, "#383939"], [44, 27, "#3f4040"], [45, 18, "#464747"], [22, -2, "#303232"]]],
        ["#2a2b2b", [[2, 16, "#2b2e2e"], [0, 31, "#2d2e2e"], [19, -2, "#2e2e2e"], [37, -2, "#3a3a3a"], [46, 25, "#424343"], [46, 32, "#3e3f3f"], [21, 49, "#3b3d3d"]]],
        ["#2b2b2b", [[1, 12, "#2a2b2b"], [-2, 33, "#2e2f2f"], [15, -4, "#2f3131"], [24, 4, "#393a3a"], [32, -2, "#3d3e3e"], [49, 11, "#4e4f4f"], [24, 44, "#383939"]]]
    ];
    return FindMultiColors(whiteBGList, region);
};
const AutoClickMinusBtn = () =>
{
    Sleep();
    const maxNum = GetNumber("amount", [738, 661, 34, 36]);
    if (maxNum != 1)
    {
        RandomPress([649, 670, 23, 17]);
    }
};
const ForgeMaterial = function ()
{
    console.log("ForgeMaterial");
    EnterManufacturePage();
    RandomPress([156, 105, 100, 20]); // material page
    RandomPress([23, 473, 136, 39]); // material list
    for (let i = 0; i < 7; i++)
    {
        let canMake = images.findMultiColors(captureScreen(), "#222222", [[32, 2, "#222222"], [73, 4, "#222222"], [122, 3, "#222222"], [121, 17, "#202020"],
        [80, 15, "#222222"], [35, 15, "#222222"], [5, 17, "#222222"]], { region: [282, 141 + i * 69, 241, 61] });
        if (canMake)
        {
            console.log("Can make");
            RandomPress([228, 147 + i * 69, 286, 45]); //item
            RandomPress([646, 669, 28, 18]); // max button
            RandomPress([1059, 661, 177, 30]); //make button
            Sleep(10000, 14000);
            RandomPress([43, 33, 1201, 663]); // click blank
            Sleep(2000, 4000);
        }
    }
    GoBack();
    console.log("end: forge material");
};
const MakeActivitiesBox = () =>
{
    console.log("start: make activities box...");
    RandomPress([17, 210, 143, 34]);

    const boxList = [ReadImg("manufacture/activities/royalLegacyBox"), ReadImg("manufacture/activities/purpleBox")];
    for (let i = 0; i < boxList.length; i++)
    {
        let hasBox = images.findImage(captureScreen(), boxList[i], { region: [208, 127, 85, 512] });
        if (hasBox)
        {
            RandomPress([hasBox.x, hasBox.y, 250, 30]);
            Sleep();
            if (FindGreenBtn([1040, 646, 216, 61]))
            {
                AutoClickMinusBtn();
                RandomPress([1066, 662, 169, 29]);
                Sleep(6000, 8000);
                RandomPress([140, 91, 1046, 526]);
            }
        }
        boxList[i].recycle();
    }

    console.log("End: make activities box");
    Sleep();
};
const MakeComsumables = () =>
{
    console.log("start: make comsumables...");
    const MakeSlab = (type) =>
    {
        if (type == "guardian")
        {
            RandomPress([37, 262, 117, 29]);
        }
        else if (type == "monster")
        {
            RandomPress([23, 313, 132, 35]);
        }
        Sleep();
        for (let i = 0; i < 2; i++)
        {
            let canMake = CanMake([218, 139 + i * 68, 63, 63]);
            if (canMake)
            {
                RandomPress([233, 149, 270, 43]);
                AutoClickMinusBtn();
                if (FindGreenBtn([1040, 646, 214, 67]))
                {
                    RandomPress([1061, 662, 175, 30]); //make btn
                    Sleep(10000, 14000);
                    RandomPress([174, 71, 1000, 586]); // press blank
                }

            }
        }
        Sleep();
    };

    EnterManufacturePage();
    MakeActivitiesBox();
    RandomPress([163, 104, 86, 16]); // comsumables, scroll page
    Sleep(2000, 4000);
    const ornamentScroll = ReadImg("manufacture/ornamentScroll");
    const shot = captureScreen();
    const hasOrnamentScroll = images.findImage(shot, ornamentScroll, { region: [217, 135, 65, 273] });
    if (hasOrnamentScroll)
    {
        const canMake = CanMake([hasOrnamentScroll.x - 20, hasOrnamentScroll.y - 20, 60, 65]);
        if (canMake)
        {
            RandomPress([hasOrnamentScroll.x - 10, hasOrnamentScroll.y - 10, 290, 40]);
            if (FindGreenBtn([1041, 650, 213, 56]))
            {
                AutoClickMinusBtn();
                RandomPress([1061, 662, 175, 30]); //make btn
                Sleep(10000, 14000);
                RandomPress([174, 71, 1000, 586]); // press blank
            }

        }
    };
    Sleep();
    console.log("make slab");
    MakeSlab("guardian");
    console.log("make monster slab");
    MakeSlab("monster");
    GoBack();
    Sleep(2000, 4000);
    console.log("end: make comsumables");
};
const BuyGreenSuitMaterial = () =>
{
    console.log("Start: Buy Green Suit Material");
    if (!HasMenu())
    {
        console.log("buy green suit without material");
        return false;
    }
    RandomPress([1021, 20, 30, 27]);
    WaitUntilPageBack();
    let curTotalDiamod = GetNumber("amount", [524, 2, 101, 35]);
    if (curTotalDiamod < 100)
    {
        console.log("当前钻石不足100， 返回");
        GoBack();
        return false;
    }
    const materialText = [
        "철괴", //铁锭
        "천",//布料
        "가죽", //皮革
        "목재", //木材
    ];
    const materialTextImg = [];
    for (let i = 0; i < materialText.length; i++)
    {
        let img = ReadImg(`greenSuitInTrade/text/${i}`);
        materialTextImg.push(img);
    }

    for (let i = 0; i < 4; i++)
    {
        RandomPress([976, 94, 218, 16]);
        Sleep();
        RandomPress([244, 226, 180, 16]);
        Sleep();
        setText(materialText[i]);
        RandomPress([1169, 639, 65, 36]);
        Sleep(2000, 4000);
        let searchResText = images.findImage(captureScreen(), materialTextImg[i], { region: [207, 272, 873, 281] });
        if (searchResText)
        {
            RandomPress([searchResText.x, searchResText.y, 10, 10]);
            RandomPress([267, 179, 838, 34]); //first item 
            Sleep(2000, 4000);
            for (let i = 0; i < 5; i++)
            {
                let totalPrice = GetNumber("amount", [1146, 180 + i * 67, 48, 38]);
                if (totalPrice < 20)
                {
                    RandomPress([268, 180 + i * 67, 787, 34]);
                    break;
                }
            }
            if (FindGreenBtn([994, 621, 166, 53]))
            {
                RandomPress([1015, 635, 121, 23]);
                Sleep();
                if (FindGreenBtn([994, 621, 166, 53]))
                {
                    RandomPress([846, 635, 116, 23]); //cancel
                }
                else if (FindGreenBtn([548, 441, 182, 54]))
                {
                    const spend = GetNumber("amount", [655, 398, 86, 35]);
                    if (game_config.trade.totalSpend == undefined)
                    {
                        game_config.trade.totalSpend = 0;
                    }
                    game_config.trade.totalSpend += spend;
                    RWFile("trade", game_config.trade);
                    RandomPress([578, 453, 128, 25]);
                    console.log("buy successful" + materialText[i]);
                }

            }
        }
        else
        {
            RandomPress([1059, 155, 34, 18]); //close popup
        }
        Sleep();
    }
    return false;

};

const GetGreenSuitPrice = () =>
{
    console.log("Start: Get Green Suit Price");
    if (game_config.setting.date == new Date().getDate())
    {
        let list = game_config.trade.priceList;
        if (list.length > 0)
        {
            console.log("今日已查价，返回");
            return list;
        }

    }
    const hasMenu = HasMenu();
    if (!hasMenu) return console.log("No Menu");

    const priceList = [];
    const greenSuitImg = {
        "helmet": [],
        "shirt": [],
        "chestplate": [],
        "armplate": [],
        "gloves": [],
        "pants": [],
        "shoes": []

    };
    for (let key in greenSuitImg)
    {
        for (let j = 0; j < 3; j++)
        {
            let img = ReadImg(`greenSuitInTrade/${key}/${j}`);
            greenSuitImg[key].push(img);
        }
    }
    const strengthenTo_Lv10 = ReadImg("icon/strengthenTo_Lv10");
    const FindAllSuitPrice = (region) =>
    {
        const shot = captureScreen();
        for (let key in greenSuitImg)
        {
            for (let j = 0; j < greenSuitImg[key].length; j++)
            {
                let img = greenSuitImg[key][j];
                let hasSuit = images.findImage(shot, img, { region: region });
                if (hasSuit)
                {
                    RandomPress([hasSuit.x + 100, hasSuit.y, 600, 40]);
                    Sleep();
                    let hasStrengthedTo_10Lv = images.findImage(captureScreen(), strengthenTo_Lv10, { region: [238, 161, 66, 477] });
                    if (hasStrengthedTo_10Lv)
                    {
                        let num = GetNumber("amount", [hasStrengthedTo_10Lv.x + 700, hasStrengthedTo_10Lv.y, 50, 50]);
                        let price = 0;
                        if (num < 30)
                        {
                            price = GetNumber("amount", [hasStrengthedTo_10Lv.x + 890, hasStrengthedTo_10Lv.y, 80, 50]);
                            console.log("type: " + key + "-- price: " + price);
                        }
                        priceList.push({ type: key, index: j, price: price });
                    }
                    RandomPress([958, 673, 45, 32]);
                    Sleep();
                }
            }
        }
    };


    RandomPress([1021, 20, 30, 27]);
    WaitUntilPageBack();
    for (let i = 0; i < 7; i++)
    {
        Sleep();
        RandomPress([1034, 673, 129, 31]); // select btn
        RandomPress([159, 284, 127, 22]); // green suit btn
        RandomPress([489, 243 + i * 44, 132, 17]); // first green suit,
        RandomPress([986, 662, 160, 28]); //select 
        Sleep(2000, 4000);
        FindAllSuitPrice([178, 157, 83, 349]);
    }

    game_config.trade.priceList = priceList;
    RWFile("trade", game_config.trade);
    GoBack();
    for (let key in greenSuitImg)
    {
        for (let j = 0; j < 3; j++)
        {
            greenSuitImg[key][j].recycle();
        }
    }
    return priceList;
};
const HasEnoughArmorScroll = () =>
{
    OpenBackpack("props");
    const shot = captureScreen();
    const scroll = ReadImg("backpack/scroll/armor");
    let num = 0;
    for (let i = 0; i < 5; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let hasScroll = images.findImage(shot, scroll, { region: [885 + j * 65, 127 + i * 65, 60, 60] });
            if (hasScroll)
            {
                RandomPress([hasScroll.x, hasScroll.y, 20, 20]);
                let isNotBind = images.findMultiColors(captureScreen(), "#282829", [[3, 0, "#90907a"], [3, 2, "#90907a"], [3, 6, "#90907a"], [-1, 15, "#97977f"], [4, 15, "#6c6c55"]], { region: [647, 456, 38, 38] });
                if (!isNotBind)
                {
                    num = GetNumber("amount", [612, 116, 42, 36]);
                    break;
                }
            }
        }
    }
    scroll.recycle();
    console.log("当前防御强化卷轴的数量为：" + num);
    CloseBackpack();
    if (num > 10)
    {
        return true;
    }
    else
    {
        return false;
    }
};

const MakeGreenSuit = () =>
{
    console.log("start: make green suit...");

    let isMadeSuccess = false;
    const hasEnoughArmorScroll = HasEnoughArmorScroll();
    if (!hasEnoughArmorScroll)
    {
        console.log("End: scroll amount is not enough");
        return false;
    }
    const curMoney = GetCurMoney();
    if (curMoney < 300000)
    {
        console.log("金币不足，无法制造装备,当前金币为：" + curMoney);
        return false;
    }
    const priceList = GetGreenSuitPrice();
    if (priceList.length == 0)
    {
        console.log("End: price list is empty");
        return false;
    }
    // const priceList = [{ type: 'chestplate', index: 2, price: 145 },
    // { type: 'chestplate', index: 1, price: 118 },
    // { type: 'chestplate', index: 0, price: 90 }];

    const sortPriceList = priceList.sort((a, b) => b.price - a.price);
    console.log(sortPriceList);
    const EnterTheItemPage = () =>
    {
        EnterManufacturePage();
        RandomPress([40, 99, 81, 28]);
        RandomPress([19, 475, 138, 36]); //armor page
        switch (sortPriceList[0].type)
        {
            case "shirt":
                RandomPress([27, 322, 131, 32]);
                break;
            case "chestplate":
                RandomPress([34, 376, 124, 34]);
                break;
            case "armplate":
                RandomPress([33, 429, 121, 31]);
                break;
            case "gloves":
                RandomPress([31, 480, 122, 31]);
                break;
            case "pants":
                RandomPress([27, 538, 133, 24]);
                break;
            case "shoes":
                RandomPress([29, 591, 125, 23]);
                break;
            default:
                break;
        }
        Sleep(2000, 4000);
    };

    DecomposeAll();

    EnterTheItemPage();
    const theHighestPriceImg = ReadImg(`greenSuitInManufacture/${sortPriceList[0].type}/${sortPriceList[0].index}`);

    const canMakeTheItem = images.findImage(captureScreen(), theHighestPriceImg, { region: [197, 117, 107, 520] });
    theHighestPriceImg.recycle();
    if (canMakeTheItem)
    {
        RandomPress([canMakeTheItem.x, canMakeTheItem.y, 270, 40]);
        AutoClickMinusBtn();
        RandomPress([1063, 661, 165, 30]);
        Sleep(7000, 10000);
        for (let i = 0; i < 3; i++)
        {
            Sleep();
            RandomPress([461, 183, 395, 380]);
            if (HasPageBack()) break;
        }
        GoBack();
        isMadeSuccess = true;
    }
    else
    {
        console.log("制作材料不足，去购买材料");
        GoBack();
        const hasBoughtSuccess = BuyGreenSuitMaterial();
        if (hasBoughtSuccess == true)
        {
            EnterTheItemPage();
            const theHighestPriceImg_ = ReadImg(`greenSuitInTrade/${sortPriceList[0].type}/${sortPriceList[0].index}`);
            const canMakeTheItem_ = images.findImage(captureScreen(), theHighestPriceImg_, { region: [197, 117, 107, 520] });
            theHighestPriceImg_.recycle();
            if (canMakeTheItem_)
            {
                RandomPress([canMakeTheItem_.x, canMakeTheItem_.y, 270, 40]);
                AutoClickMinusBtn();
                RandomPress([1063, 661, 165, 30]);
                Sleep(7000, 10000);
                for (let i = 0; i < 3; i++)
                {
                    Sleep();
                    RandomPress([461, 183, 395, 380]);
                    if (HasPageBack()) break;
                }
                GoBack();
                isMadeSuccess = true;
            }
        }
        else
        {
            console.log("钻石不足，购买失败。");
            GoBack();
            return false;
        }
    }
    console.log("end: make green suit");
    return isMadeSuccess;
};
module.exports = {
    ForgeMaterial,
    MakeComsumables,
    MakeGreenSuit
};
