# East Earth 网易云音乐歌单解析

## <p xmlns:cc="http://creativecommons.org/ns#" >本作品采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p>

## 关于 
Need [English Version](./teaching/README_en-US.md) ?

    感谢 Suxiaoqinx/Netease_url 提供了核心功能！

- 本项目是一个网络工具，旨在帮助您解析/下载网易云个人音乐列表
并以 JSON 格式显示。
- 功能包括：
    1. 仅分析音乐列表
    2. 分析音乐并下载音乐列表

## 如何使用？

### 首先，您需要自行分析您的音乐列表
1. 复制以下所有 LLFE 代码并打开音乐页面👇🏻

```javascript
(function(){
    const rawHTML = $0
    const context = rawHTML.innerHTML
    
    function analyzeMusicList(params) {
        const regexp = /href="\/song\?id=(\d+)"/g;
        const songIDMatches = context.match(regexp);
        if (!songIDMatches) {
            console.log("未找到歌曲 ID。");
            return [];
        }
        const songIDs = songIDMatches.map(match => {
            const matchResult = /href="\/song\?id=(\d+)"/.exec(match);
            return matchResult ? matchResult[1] : null;
        });
        return songIDs;
    }
    
    const result = analyzeMusicList();
    
    console.log(result)
    console.log(result.toString())
})()
```

2. 打开音乐页面
    点击这里！ 👉🏻 [网易云音乐](https://music.163.com/#/my/)
3. 打开浏览器的开发者工具并找到它，如下图所示
<img src="./teaching/web.JPG">
4. 尽情享用 ：- ）

## 其次，基本技能

### 环境准备

请确保您的系统上已安装 [Node.js](https://nodejs.org/)（建议使用 v18.x 或更新版本）。npm 已包含在 Node.js 中。

核心的音乐分析功能由 [Suxiaoqinx/Netease_url](https://github.com/Suxiaoqinx/Netease_url) 后端服务提供。要运行此服务，您还需要：Python 3.x。
有关完整的设置详细信息，请参阅该项目。



### 项目设置

```sh
npm install
```

##### 编译和热重载（用于开发）

```sh
npm run dev
```

##### 编译和最小化（用于生产）

```sh
npm run build