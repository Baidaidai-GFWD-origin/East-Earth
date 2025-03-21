# East Earth Mucis Analysis

## <p xmlns:cc="http://creativecommons.org/ns#" >This work is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p>


## About
    Thanks of Suxiaoqinx/Netease_url, provide the Core funcitons !  


- This Project is an WebTool to help You Analyse Your personal Music List  
and Shown it in JSON
- It Can Do:
    1. Just analyze the Music List
    2. Analyze Music and Download the Music (Pending……)

## How to Use?

### Frist You Need To Analyse Your Music List By Your Self
1. Copy all this LLFE Code and Open The Music PagePage👇🏻  

```javascript
(function(){
    const rawHTML = $0
    const context = rawHTML.innerHTML
    
    function analyzeMusicList(params) {
        const regexp = /href="\/song\?id=(\d+)"/g;
        const songIDMatches = context.match(regexp);
        if (!songIDMatches) {
            console.log("No song IDs found.");
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

2. Open The Music Page and Open It  
    Click Me! 👉🏻 [Mucsic163](https://music.163.com/#/my/)
3. Open The Borwser's DevTools and Find It, Flow It
<img src="./teaching/web.JPG">
4. Enjoy It ：- ）

### Secondly, Basic Skill


#### Project Setup

```sh
npm install
```

##### Compile and Hot-Reload for Development

```sh
npm run dev
```

##### Compile and Minify for Production

```sh
npm run build
```
