const ui = {
    gameMode: "mainStory",
    isBeginner: false,
    isRandomServer: false,
    instanceQueue: [],
};

const beginnerCheckBox = document.querySelector("input[name=isBeginner]");
const randomServerCheckBox = document.querySelector("input[name=isRandomServer]");
const gameModeRadio = document.querySelectorAll("input[name= gameMode]");

const menuList = document.querySelectorAll(".select-menu");

const startScript = document.querySelector("#startScript");
const updateScript = document.querySelector("#updateScript");

const version = document.querySelector("#version");
//trade
const total = document.querySelector("#total");
const time = document.querySelector("#time");
const settlement = document.querySelector("#settlement");

//分页
const pages = document.querySelectorAll(".page");
const tabs = document.querySelectorAll(".tab");

pages[1].setAttribute("style", "display:none;");
pages[2].setAttribute("style", "display:none;");
tabs.forEach((item, index) => item.addEventListener("click", () =>
{
    console.log(index);
    pages[index].setAttribute("style", "display:block;");
    for (let i = 0; i < pages.length; i++)
    {
        if (i != index)
        {
            pages[i].setAttribute("style", "display:none;");
        }
    }
}));
//复选框
beginnerCheckBox.addEventListener("click", () =>
{
    ui.isBeginner = beginnerCheckBox.checked;
});

randomServerCheckBox.addEventListener("click", () =>
{
    ui.isRandomServer = randomServerCheckBox.checked;
});
//单选框点击事件
gameModeRadio.forEach((radio) =>
{
    radio.addEventListener("click", () =>
    {
        ui.gameMode = radio.value;
    });
});
// //开始按钮点击事件
startScript.addEventListener("click", () =>
{
    $autox.callHandler("WebToAndroid", JSON.stringify(ui), (callBackData) =>
    {
        startScript.innerHTML = "Stop";
        startScript.style.cssText = "background: red";
        console.log(callBackData);
    });

});
updateScript.addEventListener("click", () =>
{
    console.log("web update");
    $autox.callHandler("updateScript", "update script", (callBackData) =>
    {
        console.log(callBackData);
    });
});

function InitUIData(data)
{
    const game_config = JSON.parse(data);
    for (let key in ui)
    {
        ui[key] = game_config.ui[key];
    }
    if (ui.gameMode == "mainStory")
    {
        gameModeRadio[0].checked = true;
    }
    else if (ui.gameMode == "instance")
    {
        gameModeRadio[1].checked = true;
    }
    else if (ui.gameMode == "delegate")
    {
        gameModeRadio[2].checked = true;
    }
    beginnerCheckBox.checked = ui.isBeginner;
    randomServerCheckBox.checked = ui.isRandomServer;

    ui.instanceQueue.forEach((queue) =>
    {
        if (queue.type == "normal")
        {
            menuList[0].querySelectorAll(".option-list .option input[type=checkbox]")[queue.index].checked = true;
        }
        else if (queue.type == "special")
        {
            menuList[1].querySelectorAll(".option-list .option input[type=checkbox]")[queue.index].checked = true;
        }
        else if (queue.type == "wild")
        {
            menuList[2].querySelectorAll(".option-list .option input[type=checkbox]")[queue.index].checked = true;
        }
    });

}
$autox.registerHandler("InitUIData", (data, callBack) =>
{
    InitUIData(data);
    console.log("android send data to web");
    setTimeout(() =>
    {
        //回调安卓
        callBack(data);
    }, 1000);
});
$autox.registerHandler("updateTradeRecord", (data, callBack) =>
{
    console.log(data);

    callBack(data);
});

$autox.registerHandler("getConfigFile", (data, callBack) =>
{
    pages[1].innerHTML = data;
    setTimeout(() =>
    {
        //回调安卓
        callBack("success");
    }, 1000);
});
$autox.registerHandler("getLogFile", (data, callBack) =>
{
    pages[2].innerHTML = data;
    setTimeout(() =>
    {
        //回调安卓
        callBack("success");
    }, 1000);
});
function MenuSelect(menu, type)
{
    const select = menu.querySelector(".select");
    let option_list = menu.querySelector(".option-list");
    const options = option_list.querySelectorAll(".option");
    options.forEach((option, instanceIndex) =>
    {
        let checkbox = option.querySelector("input[type=checkbox]");
        checkbox.addEventListener("click", () =>
        {
            if (checkbox.checked)
            {
                ui.instanceQueue.push({ type: type, index: instanceIndex, level: 0 });
            }
            else
            {
                ui.instanceQueue = ui.instanceQueue.filter((obj) => !(obj.type == type && obj.index == instanceIndex));
            }
            console.log(ui.instanceQueue);
        });
        if (type != "wild")
        {
            let second_menu = option.querySelector(".second-select-menu");
            let second_select = second_menu.querySelector(".second-select");
            let second_option_list = option.querySelector(".second-option-list");
            let second_options = second_option_list.querySelectorAll(".second-option");
            second_menu?.addEventListener("click", () => { second_option_list.classList.toggle("second-active"); });
            second_options?.forEach((option, levelIndex) =>
            {
                option.addEventListener("click", () =>
                {
                    second_select.innerHTML = option.innerHTML;
                    ui.instanceQueue.forEach(instance =>
                    {
                        if (instance?.index == instanceIndex)
                        {
                            instance.level = levelIndex;
                        }
                    });
                });
            });
        }

    });
    select.addEventListener("click", () =>
    {
        option_list.classList.toggle("active");
        // console.log(second_select_menu);
    });
}
MenuSelect(menuList[0], "normal");
MenuSelect(menuList[1], "special");
MenuSelect(menuList[2], "wild");

document.addEventListener("AutoxJsBridgeReady", () =>
{
    //$autox.
    console.log("AutoxJsBridegReady");
});