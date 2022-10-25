
/**
 * 动作列表打印的数据
 * file: 模型名字
 * action: 动作名字
 * 模型名字讲解：
 *
 * 例子1：
 * 文件名：Breakdance 1990_-1_105_move.fbx
 *
 * 从https://www.mixamo.com下载源文件是Breakdance 1990.fbx
 * -1 指的是fbx选中的帧数，-1播放动画，大于0固定某一帧
 * 105 指的是fbx的总帧数
 * move 指的是猴子在移动
 *
 * 例子2：
 * 文件名：Standing Up_136_182_nomove.fbx
 *
 * 从https://www.mixamo.com下载源文件是Standing Up.fbx
 * 136 指的是fbx选中的帧数，-1播放动画，大于0固定某一帧，此处只需要展示第136帧
 * 182 指的是fbx的总帧数有182帧
 * nomove 指的是猴子在原地不动静止或者做动作
 *
 * 例子3：
 * 文件名：Male Action Pose_-1_1_nomove.fbx
 *
 * 从https://www.mixamo.com下载源文件是Male Action Pose.fbx
 * -1 指的是fbx选中的帧数，-1播放动画，大于0固定某一帧，此处播放动画就好了
 * 1 指的是fbx的总帧数有1帧，循环播放也无妨
 * nomove 指的是猴子在原地不动静止或者做动作
 */
export const originalPose: any = [
    {
        file: "o_Cartwheel_-1_106_move.fbx",
        action: "翻跟头",
        type: "action",
        level: 5,
        rarity: "SR"
    },
    {
        file: "o_Drunk Idle Variation_-1_119_nomove.fbx",
        action: "喝醉了",
        type: "action",
        level: 5,
        rarity: "SSR"
    },
    {
        file: "o_Fist Fight A_-1_140_nomove.fbx",
        action: "耍一套军体拳",
        type: "action",
        level: 5,
        rarity: "SSR"
    },
    {
        file: "o_Male Action Pose_-1_1_nomove.fbx",
        action: "推箱子",
        type: "model",
        level: 0,
        rarity: "R"
    },
    {
        file: "o_Male Laying Pose_-1_1_nomove.fbx",
        action: "睡觉",
        type: "model",
        level: 0,
        rarity: "R"
    },
    {
        file: "o_Male Locomotion Pose_-1_1_nomove.fbx",
        action: "跑步",
        type: "model",
        level: 0,
        rarity: "R"
    },
    {
        file: "o_Male Sitting Pose_-1_1_nomove.fbx",
        action: "看天上云彩",
        type: "model",
        level: 0,
        rarity: "SR"
    },
    {
        file: "o_Male Standing Pose_-1_1_nomove.fbx",
        action: "解释",
        type: "model",
        level: 0,
        rarity: "R"
    },
    {
        file: "o_Military Signaling_-1_195_nomove.fbx",
        action: "红孩儿乖",
        type: "action",
        level: 5,
        rarity: "SSR"
    },
    {
        file: "o_Nervously Look Around_-1_188_nomove.fbx",
        action: "不安",
        type: "action",
        level: 5,
        rarity: "SR"
    },
    {
        file: "o_Praying_-1_206_nomove.fbx",
        action: "求菩萨",
        type: "action",
        level: 5,
        rarity: "SR"
    },
    {
        file: "o_Running_-1_21_move.fbx",
        action: "慢跑",
        type: "action",
        level: 5,
        rarity: "SR"
    },
    {
        file: "o_Silly Dancing_-1_115_nomove.fbx",
        action: "接着奏乐接着舞",
        type: "action",
        level: 5,
        rarity: "UR"
    },
    {
        file: "o_Situps_-1_67_nomove.fbx",
        action: "仰卧起坐",
        type: "action",
        level: 5,
        rarity: "SR"
    },
];

export const armourPosePath = [
    {
        file: "a_Drinking_-1_266_nomove.fbx",
        action: "喝了这杯酒啊",
        type: "action",
        level: 10,
        rarity: "SSR"
    },
    {
        file: "a_Drunk1_-1_75_move.fbx",
        action: "喝醉了",
        type: "action",
        level: 10,
        rarity: "LR"
    },
    {
        file: "a_Female Action Pose_-1_1_nomove.fbx",
        action: "格挡下盘进攻",
        type: "model",
        level: 5,
        rarity: "SSR"
    },
    {
        file: "a_Female Locomotion Pose1_-1_1_nomove.fbx",
        action: "行者大圣",
        type: "model",
        level: 5,
        rarity: "SR"
    },
    {
        file: "a_Male Laying Pose_-1_1_nomove.fbx",
        action: "看孩儿们操练",
        type: "model",
        level: 5,
        rarity: "SR"
    },
    {
        file: "a_Male Standing Pose Skirt_-1_1_nomove.fbx",
        action: "叉腰站立",
        type: "model",
        level: 5,
        rarity: "R"
    },
    {
        file: "a_Male Standing Pose Skirt01_-1_1_nomove.fbx",
        action: "向龙王解释",
        type: "model",
        level: 5,
        rarity: "SR"
    },
    // {
    //     file: "a_Male Standing Pose_-1_1_nomove.fbx",
    //     action: "单手叉腰站立",
    //     type: "model",
    //     level: 5
    // },
    {
        file: "a_Male Standing Pose1_-1_1_nomove.fbx",
        action: "踩在石头上凹造型",
        type: "model",
        level: 5,
        rarity: "SR"
    },
    {
        file: "a_Praying_-1_58_nomove.fbx",
        action: "我佛慈悲",
        type: "action",
        level: 10,
        rarity: "SSR"
    },
    {
        file: "a_Walking1_-1_29_move.fbx",
        action: "大步向前走",
        type: "action",
        level: 10,
        rarity: "SSR"
    }];

export function print() {
    let result = ''
    for (let i = 0; i < originalPose.length; i++) {
        const name = originalPose[i].file.split(".")[0]
        result += `nameToFileNameMap.put("${name}", "${originalPose[i].action}");`;
    }
    for (let i = 0; i < armourPosePath.length; i++) {
        const name = armourPosePath[i].file.split(".")[0]
        result += `nameToFileNameMap.put("${name}", "${armourPosePath[i].action}");`;
    }
    // console.log(result)
}

export function random10000() {
    let result = [];

    for (let i = 0; i < originalPose.length; i++) {
        if (originalPose[i].level == 5) {
            const random = Math.random() * 2.5;
            result.push({
                file: originalPose[i].file,
                action: originalPose[i].action,
                level: 10 - (originalPose[i].level - random)
            });
        } else {
            const random = Math.random() * 2.5;
            result.push({
                file: originalPose[i].file,
                action: originalPose[i].action,
                level: 10 - (originalPose[i].level + random)
            });
        }
    }

    for (let i = 0; i < armourPosePath.length; i++) {
        if (armourPosePath[i].level == 10) {
            const random = Math.random() * 2.5;
            result.push({
                file: armourPosePath[i].file,
                action: armourPosePath[i].action,
                level: (10 - (armourPosePath[i].level - random))
            });
        } else {
            const random = Math.random() * 2.5;
            result.push({
                file: armourPosePath[i].file,
                action: armourPosePath[i].action,
                level: (10 - (armourPosePath[i].level + random))
            });
        }
    }

    let total = 0;

    for (let i = 0; i < result.length; i++) {
        total += result[i].level;
    }

    const scale = 10000 / total;

    for (let i = 0; i < result.length; i++) {
        result[i].level = Math.floor(result[i].level * scale);
    }

    let nowTotal = 0;
    for (let i = 0; i < result.length; i++) {
        nowTotal += result[i].level;
    }

    const left = 10000 - nowTotal;

    console.log(nowTotal, left);

    // random from result.length

    let index = Math.floor(result.length * Math.random());
    result[index].level +=  left;


    nowTotal = 0;
    for (let i = 0; i < result.length; i++) {
        nowTotal += result[i].level;
    }

    console.log(nowTotal)
    console.log(result)

    let print = ""
    for (let i = 0; i < result.length; i++) {
        print += `nameToTotalMap.put("${result[i].file.split(".")[0]}", ${result[i].level});`;
    }
    console.log(print)
}
// random10000();

const random5000 = () => {
    let total = 0;

    let duizhao = {
        R: 300,
        SR: 200,
        SSR: 100,
        UR: 60,
        LR: 30,
    }

    for (let i = 0; i < originalPose.length; i++) {
        if (originalPose[i].rarity === "R") {
            const random = duizhao.R + Math.floor(Math.random() * 4) * 50 - 50;
            originalPose[i].level = random
            total += random;
        } else if (originalPose[i].rarity === "SR") {
            const random = duizhao.SR + Math.floor(Math.random() * 4) * 30 - 30;
            originalPose[i].level = random
            total += random;
        } else if (originalPose[i].rarity === "SSR") {
            const random = duizhao.SSR + Math.floor(Math.random() * 4) * 10 - 10;
            originalPose[i].level = random
            total += random;
        } else if (originalPose[i].rarity === "UR") {
            originalPose[i].level = duizhao.UR
            total += duizhao.UR;
        } else {
            originalPose[i].level = duizhao.LR
            total += duizhao.LR;
        }
    }

    for (let i = 0; i < armourPosePath.length; i++) {
        if (armourPosePath[i].rarity === "R") {
            // random -50, 0, 50, 100
            const random = duizhao.R + Math.floor(Math.random() * 4) * 50 - 50;
            armourPosePath[i].level = random
            total += random;
        } else if (armourPosePath[i].rarity === "SR") {
            // -30, 0, 30, 60
            const random = duizhao.SR + Math.floor(Math.random() * 4) * 30 - 30;
            armourPosePath[i].level = random
            total += random;
        } else if (armourPosePath[i].rarity === "SSR") {
            const random = duizhao.SSR + Math.floor(Math.random() * 4) * 10 - 10;
            armourPosePath[i].level = random
            total += random;
        } else if (armourPosePath[i].rarity === "UR") {
            total += duizhao.UR;
            armourPosePath[i].level = duizhao.UR;
        } else {
            total += duizhao.LR;
            armourPosePath[i].level = duizhao.LR;
        }
    }
    // console.log(total);
    let result = [];
    for (let i = 0; i < originalPose.length; i++) {
        result.push(originalPose[i]);
    }
    for (let i = 0; i < armourPosePath.length; i++) {
        result.push(armourPosePath[i]);
    }
    console.log(JSON.stringify(result));
    return total;
}

const random7200 = () => {
    let total = 0;

    let duizhao = {
        R: 420,
        SR: 280,
        SSR: 140,
        UR: 80,
        LR: 40,
    }

    for (let i = 0; i < originalPose.length; i++) {
        if (originalPose[i].rarity === "R") {
            const random = duizhao.R + Math.floor(Math.random() * 2) * 80;
            originalPose[i].level = random
            total += random;
        } else if (originalPose[i].rarity === "SR") {
            const random = duizhao.SR + Math.floor(Math.random() * 4) * 60 - 60;
            originalPose[i].level = random
            total += random;
        } else if (originalPose[i].rarity === "SSR") {
            const random = duizhao.SSR + Math.floor(Math.random() * 4) * 20 - 20;
            originalPose[i].level = random
            total += random;
        } else if (originalPose[i].rarity === "UR") {
            originalPose[i].level = duizhao.UR
            total += duizhao.UR;
        } else {
            originalPose[i].level = duizhao.LR
            total += duizhao.LR;
        }
    }

    for (let i = 0; i < armourPosePath.length; i++) {
        if (armourPosePath[i].rarity === "R") {
            // random -50, 0, 50, 100
            // const random = duizhao.R + Math.floor(Math.random() * 4) * 70 - 70;
            const random = duizhao.R + Math.floor(Math.random() * 2) * 80;
            armourPosePath[i].level = random
            total += random;
        } else if (armourPosePath[i].rarity === "SR") {
            // -30, 0, 30, 60
            const random = duizhao.SR + Math.floor(Math.random() * 4) * 60 - 60;
            armourPosePath[i].level = random
            total += random;
        } else if (armourPosePath[i].rarity === "SSR") {
            const random = duizhao.SSR + Math.floor(Math.random() * 4) * 20 - 20;
            armourPosePath[i].level = random
            total += random;
        } else if (armourPosePath[i].rarity === "UR") {
            total += duizhao.UR;
            armourPosePath[i].level = duizhao.UR;
        } else {
            total += duizhao.LR;
            armourPosePath[i].level = duizhao.LR;
        }
    }
    console.log(total);
    let result = [];
    for (let i = 0; i < originalPose.length; i++) {
        result.push(originalPose[i]);
    }
    for (let i = 0; i < armourPosePath.length; i++) {
        result.push(armourPosePath[i]);
    }
    console.log(JSON.stringify(result));
    return total;
}

// for (let i = 0; i < 1000; i++) {
//     const total = random7200();
//     if (total == 7200) {
//         break;
//     }
// }

// for (let i = 0; i < 1000; i++) {
//     const total = random5000();
//     if (total == 5000) {
//         break;
//     }
// }

