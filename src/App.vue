<script setup>
import { computed, ref } from 'vue';

const greeting = "Music Array is Analizing, Waiting a Moment ☕️!"

let text = 2832;
let myHtml = computed(()=>text)



let musicIdArrayText = ref('')

let musicIDArray = Array(musicIdArrayText)

async function getMusic(array) {
    let musicURLs = {};
    for (let i = 0; i < array.length; i++) {
        try{
            console.log(array[i])
            let musicJSON = await fetch(`http://localhost:5000/Song_V1?ids=${array[i]}&level=jymaster&type=json`);
            let JSONContext = await musicJSON.json();
            let musicURL = JSONContext.url;
            musicURLs[i] = musicURL;
        }catch(err){
            console.error(`music ${array[i]} is analysis failed！`)
        }
    }
    return musicURLs
}

// 只需要让function生成文本
async function generateText(){
    console.log('get')
    console.log(musicIdArrayText.value)
    let musicIdArray = musicIdArrayText.value.split(',').map(id => id.trim());
    console.log(musicIdArray)
    let resault = await getMusic(musicIdArray)
    text = JSON.stringify(resault)
    console.log(typeof text)
}


const downloadUrl = ref(''); // 添加下载链接的 ref 变量


const downloadFile = () => {
  if (downloadUrl.value) {
    const link = document.createElement('a');
    link.href = downloadUrl.value;
    link.setAttribute('download', 'music.flac'); // 设置下载的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    app.$forceUpdate()
  }
}



</script>

<template>
    <div id="page-container" class=" h-screen w-screen flex justify-center bg-slate-300">
        <div id="box-container" class=" h-screen w-[580px] bg-white rounded-3xl flex items-center flex-col">
            <div>
                <p class=" mt-8 text-lg mb-12">Earth-East</p>
            </div>
            <div class=" h-44 w-96  rounded-3xl border-2 flex items-center justify-around flex-col">
                <input type="text" v-model="musicIdArrayText" placeholder="Please Give Your Music ID Array!" class=" rounded-3xl pl-4 border-2 w-72 h-8 mt-8"/>
                <div>
                    <button class=" bg-slate-300 m-6 w-32 h-8 rounded-2xl" @click="generateText">Only URL</button>
                    <button class=" bg-slate-300 m-6 w-32 h-8 rounded-2xl" @click="downloadFile">Download Flac</button>
                </div>
            </div>
            <div class=" bg-slate-100 h-[560px] max-h-[560px] w-96  rounded-3xl flex items-center flex-col p-2 mt-8">
                <div class="mt-4 p-4">{{ myHtml }}</div>
            </div>

            <!-- Visiual DOM -->
            <a :href="downloadUrl" :v-show="false" download="music.flac"></a>
            
        </div>
    </div>
</template>
