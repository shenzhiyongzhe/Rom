const TipPointCheck = function (region)
{
    const tipPointArr = [
        ["#b9200f", [[-2, 2, "#b92211"], [0, 4, "#c02416"], [3, 2, "#b92315"]]],
        ["#b8200e", [[-2, 2, "#c22314"], [2, 2, "#bb2415"], [0, 4, "#bf2416"]]],
        ["#b32615", [[1, 3, "#c82817"], [-2, 3, "#ca2618"], [0, 6, "#b02215"]]]
    ];
    const shot = captureScreen();
    let hasTipPoint;
    for (let i = 0; i < tipPointArr.length; i++)
    {
        hasTipPoint = images.findMultiColors(shot, tipPointArr[i][0], tipPointArr[i][1], { region: region });
        if (hasTipPoint) break;
    }
    return hasTipPoint;
};
const ColorCheck = function (region)
{
    const colorArr =
    {
        blue: [["#1f333c", [[8, 0, "#1f3b47"], [22, 0, "#224352"], [28, 0, "#274857"], [28, 3, "#254b5e"]]],
        ["#1d343c", [[8, 0, "#1f3a4b"], [17, 0, "#1e3d51"], [27, 0, "#25485b"], [27, 11, "#295d73"]]]],
        green: [["#273b22", [[9, 0, "#2f4222"], [18, 0, "#304a23"], [26, 0, "#375323"], [26, 8, "#4c6428"]]],
        ["#283e21", [[8, 0, "#2d441f"], [23, 0, "#34511f"], [26, 9, "#4e6326"]]],]
    };
    const shot = captureScreen();
    let color, equipColor;
    out: for (let key in colorArr)
    {
        for (let i = 0; i < colorArr[key].length; i++)
        {
            color = images.findMultiColors(shot, colorArr[key][i][0], colorArr[key][i][1], { region: region });
            if (color)
            {
                equipColor = key;
                break out;
            }
        }
    }
    return equipColor;
};
// log(TipPointCheck([361, 76, 45, 44]));
log(ColorCheck([871, 363, 77, 79]));