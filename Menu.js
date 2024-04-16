//每日签到检测
const SignInCheck = (shot) => images.findMultiColors(shot, "#d8564a", [[4, 1, "#c82819"], [0, 2, "#c82117"], [4, 2, "#c52719"],], { region: [952, 446, 56, 49] });

//邮箱检测
const EmailCheck = (shot) => images.findMultiColors(shot, "#ca6054", [[-2, 3, "#ca291d"], [2, 3, "#cb2818"], [2, 7, "#d33120"],], { region: [1018, 449, 59, 41] });
