
const baseUrl = "http://10.6.130.129:82/RomProj/";
const ignoreList = [".gitignore", "test.js", "tool.js", "z_fileSync.js", "project.json", "../", "frame"];

const getUrl = (path) =>
{
    path = path || "";
    const res = http.get(baseUrl + path);
    if (res.statusCode !== 200)
    {
        console.log("Error fetching:", path);
        return [];
    }

    const htmlString = res.body.string();
    const result = htmlString.split('\n').map(line =>
    {
        const regex = /<a\s+href="([^"]+)">([^<]+)<\/a>/;
        const match = regex.exec(line);
        if (match)
        {
            const url = match[1];
            const fullPath = path + url; // Construct full path
            return { url, fullPath };
        } else
        {
            return null;
        }
    });

    const filterResult = result.filter(item =>
        item !== null && !ignoreList.includes(item.url)
    );

    let finalResult = [];
    filterResult.forEach(item =>
    {
        if (item.url.endsWith('/'))
        { // If it's a directory
            const directoryPath = item.url; // Remove trailing slash
            const subUrls = getUrl(path + directoryPath);
            finalResult = finalResult.concat(subUrls); // Concatenate arrays
        } else
        {
            finalResult.push(item); // Push single item
        }
    });

    return finalResult;
};


const downloadFile = (url) =>
{
    http.get(`http://10.6.130.129:82/RomProj/${url}`, {}, function (res, err)
    {
        if (err)
        {
            console.log(err);
            return;
        }
        files.createWithDirs("/sdcard/脚本/" + url);
        files.writeBytes("/sdcard/脚本/" + url, res.body.bytes());
    });
};
const SyncFile = function ()
{
    const urlList = getUrl();
    for (let i = 0; i < urlList.length; i++)
    {
        downloadFile(urlList[i].fullPath);
    }
    console.log("同步完成");
};
SyncFile();
// console.log(getUrl());

// files.createWithDirs("/sdcard/脚本/" + 'img/mainStory_confirm.png')



