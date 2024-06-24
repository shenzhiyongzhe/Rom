const ReadImg = (name) => images.read(`./img/${name}.png`);
const RomApp = "com.kakaogames.rom";
const baseUrl = "/sdcard/Rom";
const icon = {
    menu: ReadImg("icon/menu_icon")
};

module.exports = {
    RomApp, baseUrl, icon
};