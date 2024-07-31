
let game_config = {};
function RWFile(type, obj)
{
    const jsonFile = "/sdcard/Rom/game_config.json";
    const isCreate = files.createWithDirs(jsonFile);
    if (isCreate)
    {
        files.write(jsonFile, JSON.stringify(game_config));
    }
    let data = JSON.parse(files.read(jsonFile));
    if (type == null || obj == null)
    {
        return data;
    }
    else
    {
        data[type] = obj;
    }
    try
    {
        files.write(jsonFile, JSON.stringify(data));
    } catch (e)
    {
        log(e);
    }
}
game_config = RWFile();



function GetLocalTime()
{
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hours = date.getHours() - 1;
    let minutes = date.getMinutes();
    return `${month}月${day}日${hours}:${minutes}`;
};

log("Global.js 加载完成");
module.exports = {
    game_config,
    RWFile,
    GetLocalTime,
};
