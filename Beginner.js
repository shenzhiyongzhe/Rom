const { ReadImg, Sleep, RandomPress, GoBack } = require("./Global.js");

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

const SetResolution = function ()
{
    RandomPress([1128, 586, 41, 38]);
    Sleep(3000, 6000);
    RandomPress([289, 97, 83, 26]);
    Sleep(3000, 6000);
    RandomPress([23, 209, 197, 38]);
    Sleep();
    RandomPress([1103, 205, 99, 22]);
    Sleep(3000, 6000);
    GoBack();
};

const ChooseGameServer = function ()
{
    RandomPress([403, 603, 124, 24]);
    Sleep(3000, 10000);
    const cantInServer = ReadImg("beginner_cantInServer");
    const shot = captureScreen();
    const availableServers = [];
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 5; j++)
        {
            let hasServer = images.findImage(shot, cantInServer, { region: [250 + j * 204, 240 + i * 73, 80, 50] });
            if (hasServer == null)
            {
                availableServers.push([i, j]);
            }
        }
    }
    const randomServer = availableServers[Math.floor(random() * availableServers.length)];
    RandomPress([150 + randomServer[1] * 204, 230 + randomServer[0] * 73, 165, 40]);
    RandomPress([1009, 563, 137, 26]);
    const hasCancel = images.findMultiColors(captureScreen(), "#394135", [[19, 0, "#3b4436"], [107, 1, "#363e31"], [132, 0, "#353c30"], [122, 13, "#323a2e"], [5, 11, "#2b3428"]],
        { region: [980, 544, 192, 68] });
    if (hasCancel) RandomPress([1009, 563, 137, 26]);
    log("Choose game server: " + randomServer[0] + " " + randomServer[1]);
    cantInServer.recycle();
};
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
    //two option skip or continue
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
        log("Press Skip!");
        return true;
    }
    else if (goldenSkipBtn)
    {
        RandomPress(BeginnerPos.goldenSkip);
        log("Press Golden Skip!");
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
        }
        Sleep(5000, 8000);
    };
};

function BeginnerFlow(isRandomServer)
{

    SetResolution();
    Sleep(3000, 5000);
    isRandomServer && ChooseGameServer();
    Sleep(10000, 20000);
    RandomPress([234, 121, 788, 450]);
    Sleep(10000, 20000);
    CreateCharacter();
    Sleep(10000, 20000);
    RandomPress(BeginnerPos.startGame);
    Sleep(20000, 30000);
    PassTutorial();
}
module.exports = BeginnerFlow;
// BeginnerFlow();
// ChooseGameServer();
