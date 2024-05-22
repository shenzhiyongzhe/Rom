const ui = {
    gameMode: "mainStory",
    isBeginner: false,
    isRandomServer: false,
    instanceQueue: [],
};
const selects = document.querySelectorAll(".select-menu");

const normalZone = document.querySelectorAll("#normal-instanceZone .option input[type=checkbox]");
const levelSelectMenu = document.querySelectorAll("#normal-instanceZone .level-select-menu");
const specialZone = document.querySelectorAll("#special-instanceZone .option input[type=checkbox]");
const startBtn = document.querySelector("#startBtn");
const updateBtn = document.querySelector("#updateBtn");
const beginnerCheckBox = document.querySelector("input[name=isBeginner]");
const randomServerCheckBox = document.querySelector("input[name=isRandomServer]");
const time = document.querySelector("#time");
const worldMapOption = document.querySelectorAll("#world-map .option input[type=checkbox]");
worldMapOption.forEach((checkbox, index) =>
{
    checkbox.addEventListener("click", () =>
    {
        if (checkbox.checked)
        {
            ui.instanceQueue.push({ type: "wild", index: (index + 6).toString().padStart(2, 0), level: "firstLevel" });
        }
        else
        {
            ui.instanceQueue = ui.instanceQueue.filter((obj) => obj.index != index);
        }
        console.log(ui.instanceQueue);
    });
});
updateBtn.addEventListener("click", () =>
{
    console.log("web update");
    $autox.callHandler("updateScript", "update script", (callBackData) =>
    {
        console.log(callBackData);
    });
});

levelSelectMenu.forEach((menu, selectMenuIndex) =>
{
    let levelSelect = menu.querySelector(".level-select");
    let levelOptionList = menu.querySelector(".level-option-list");
    levelSelect.addEventListener("click", () =>
    {
        levelOptionList.classList.toggle("level-selected");
        levelOptionList.querySelectorAll(".level-option").forEach((option, index) =>
        {
            option.addEventListener("click", () =>
            {
                levelSelect.innerHTML = option.innerHTML;
                let level;
                if (index == 0) level = "firstLevel";
                else if (index == 1) level = "secondLevel";
                else if (index == 2) level = "thirdLevel";
                ui.instanceQueue.forEach(item =>
                {
                    if (item.index == selectMenuIndex)
                    {
                        item.level = level;
                    }
                });
                levelOptionList.classList.toggle("level-selected");
            });
        });
        console.log(ui.instanceQueue);
    });
});
//单选框点击事件
document.querySelectorAll("input[name= gameMode]").forEach((radio) =>
{
    radio.addEventListener("click", () =>
    {
        ui.gameMode = radio.value;
    });
});

//新手复选框
beginnerCheckBox.addEventListener("click", () =>
{
    ui.isBeginner = beginnerCheckBox.checked;
});
randomServerCheckBox.addEventListener("click", () =>
{
    ui.isRandomServer = randomServerCheckBox.checked;
});
//副本选项
normalZone.forEach((checkbox, index) =>
{
    checkbox.addEventListener("click", () =>
    {
        if (checkbox.checked)
        {
            ui.instanceQueue.push({ type: "normal", index: index, level: "firstLevel" });
        }
        else
        {
            ui.instanceQueue = ui.instanceQueue.filter((obj) => obj.index != index);
        }
    });
});
specialZone.forEach((checkbox, index) =>
{
    checkbox.addEventListener("click", () =>
    {
        if (checkbox.checked)
        {
            ui.instanceQueue.push({ type: "special", index: index, level: "firstLevel" });
        }
        else
        {
            ui.instanceQueue = ui.instanceQueue.filter((obj) => obj.index != index);
        }
    });
});
//下拉菜单显示与隐藏
selects.forEach((select) =>
{
    select.querySelector(".select").addEventListener("click", () =>
    {
        select.querySelector(".option-list").classList.toggle("active");
        select
            .querySelectorAll(".arrow")
            .forEach((arrow) => arrow.classList.toggle("arrow-hidden"));
    });
});


//选项的点击事件

//开始按钮点击事件
startBtn.addEventListener("click", () =>
{
    $autox.callHandler("WebToAndroid", JSON.stringify(ui), (callBackData) =>
    {
        startBtn.innerHTML = "Stop";
        startBtn.style.cssText = "background: red";
        console.log(callBackData);
    });

});
// $autox.registerHandler("AndroidToWeb", (data, callBack) =>
// {
//   time.innerText = data;
//   console.log("time:" + JSON.parse(data));
//   setTimeout(() =>
//   {
//     //回调安卓
//     callBack("web回调数据");
//   }, 1000);
// });
document.addEventListener("AutoxJsBridgeReady", () =>
{
    //$autox.
    console.log("AutoxJsBridegReady");
});