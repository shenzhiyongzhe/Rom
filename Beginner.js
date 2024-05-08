const {
    ReadImg,
    Sleep,
    RandomPress,
} = require("./Global.js");

const BeginnerImg = {
    skip: ReadImg("mainStory_skip"),
    goldenSkip: ReadImg("goldenSkip"),
    profession: ReadImg("beginner_profession"),
    animate_skip: ReadImg("beginner_animateSkip"),
    close: ReadImg("beginner_close"),
};
const BeginnerPos = {
    skip: [1160, 3, 115, 59],
    goldenSkip: [1158, 675, 86, 22],
    profession: [583, 205, 133, 373],
    animate_skip: [1182, 32, 70, 22],
    continue: [1104, 651, 139, 27],
    nameInput: [497, 331, 297, 15],
    keyboard_confirm: [1168, 643, 65, 27],
    create_confirm: [574, 435, 131, 26],
    startGame: [1105, 658, 132, 20]
};

const BeginnerCheckPos = {
    skip: [1151, 7, 81, 63],
    goldenSkip: [1142, 661, 114, 50],
    profession: [576, 402, 138, 127],
    animate_skip: [1150, 8, 104, 70],
    close: [786, 209, 86, 70]
};

const CharDiction = ['a', "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
function GenerateRandomName()
{
    let name = [];
    for (let i = 0; i < 12; i++)
    {
        name.push(CharDiction[Math.floor(random() * CharDiction.length)]);
    }
    return name.join("");
}
function CreateCharacter()
{
    let hasCharacterOption;
    for (let i = 0; i < 40; i++)
    {
        Sleep();
        hasCharacterOption = images.findImage(captureScreen(), BeginnerImg.profession, { region: BeginnerCheckPos.profession });

        if (hasCharacterOption != null) break;
    }

    if (hasCharacterOption == null) return false;

    RandomPress(BeginnerPos.profession);
    Sleep(2000, 3000);
    //tuo option skip or continue
    if (random() > 0.4)
    {
        for (let i = 0; i < 20; i++)
        {
            const hasSkip = images.findImage(captureScreen(), BeginnerImg.animate_skip, { region: BeginnerCheckPos.animate_skip });
            if (hasSkip)
            {
                Sleep(300, 600);
                RandomPress(BeginnerPos.animate_skip);
                Sleep(3000, 5000);
                break;
            }
            Sleep(200, 400);
        }
    }
    else
    {
        Sleep(10000, 12000);
    }
    RandomPress(BeginnerPos.continue);
    Sleep(2500, 4000);
    for (let i = 0; i < 5; i++)
    {
        RandomPress(BeginnerPos.nameInput);
        Sleep();
        setText(GenerateRandomName());
        Sleep();
        RandomPress(BeginnerPos.keyboard_confirm);
        Sleep();
        RandomPress(BeginnerPos.create_confirm);
        Sleep();
        let shot = captureScreen();
        let confirmTip = ReadImg("mainStory_confirm");
        if (images.findImage(shot, BeginnerImg.close, { region: BeginnerCheckPos.close }) == null) break;
        else if (images.findImage(shot, confirmTip, { region: [594, 419, 93, 76] }))
        {
            log("昵称包含敏感词汇，需要重新输入");
            RandomPress([574, 442, 137, 27]);
            confirmTip.recycle();
        }

    }
    log("Character created!");
    const storage = storages.create("game_config");
    let data = JSON.parse(storage.get("game_config"));
    if (data == null) log("no local data");
    else
    {
        data.setting.isBeginner = false;
        storage.put("game_config", JSON.stringify(data));
    }
    return true;
}

// CreateCharacter();
// log(GenerateRandomName());

const ClickSkip = (shot) =>
{
    let skipBtn = images.findImage(shot, BeginnerImg.skip, { region: BeginnerCheckPos.skip });
    let goldenSkipBtn = images.findImage(shot, BeginnerImg.goldenSkip, { region: BeginnerCheckPos.goldenSkip });
    if (skipBtn)
    {
        RandomPress(BeginnerPos.skip);
        log("Skip!");
        return true;
    }
    else if (goldenSkipBtn)
    {
        RandomPress(BeginnerPos.goldenSkip);
        log("Golden Skip!");
        return true;
    }
    else return false;
};

const PassTutorial = function ()
{
    for (let i = 0; i < 12; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            let shot = captureScreen();
            let hasSkip = ClickSkip(shot);
            if (hasSkip) break;
            Sleep(3000, 5000);
            log("Waiting for skip button...");
        }
        Sleep(5000, 8000);
    };
};

function BeginnerFlow()
{
    CreateCharacter();
    Sleep(5000, 7000);
    RandomPress(BeginnerPos.startGame);
    Sleep(20000, 30000);
    PassTutorial();
}
module.exports = BeginnerFlow;
// BeginnerFlow();
// const storage = storages.create("LocalStorage");
// log(storage.get("LocalStorage"));