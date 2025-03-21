<script setup>

import { computed, ref, onMounted } from 'vue';

const greeting = "Music Array is Analizing, Waiting a Moment ☕️!"

let text = ref(greeting);
let myHtml = computed(()=>text.value)



let musicIdArrayText = ref('')
let musicIdArray = computed(()=>musicIdArrayText.value.split(',').map(id => id.trim()))
let musicURLArray = []


async function getMusic(array) {
    let musicURLs = {};
    for (let i = 0; i < array.length; i++) {
        try{
            console.log(array[i])
            let musicJSON = await fetch(`http://localhost:5000/Song_V1?ids=${array[i]}&level=jymaster&type=json`);
            let JSONContext = await musicJSON.json();
            let musicURL = JSONContext.url;
            musicURLs[i] = musicURL;
            musicURLArray[i] = musicURL
        }catch(err){
            console.error(`music ${array[i]} is analysis failed！`)
        }
    }
    return musicURLs
}

// 只需要让function生成文本
async function generateText(){
    let resault = await getMusic(musicIdArray.value)
    text.value = JSON.stringify(resault,null,'\t')
}

let downloadUrl = ref('');
let downloadUrlValue = computed(()=>downloadUrl.value)
const VDOM = ref(null);

async function downloadFile() {
    alert("功能暂出现问题，等待后期修复")
    // console.log("downloadFile function called");
    // console.log("musicIdArray.value:", musicIdArray.value);
    let downloadUrlArray = await getMusic(musicIdArray.value);
    // console.log("data Fetched");
    // console.log("downloadUrlArray:", downloadUrlArray);
    const downloadUrlList = Object.values(downloadUrlArray);
    // console.log("downloadUrlList:", downloadUrlList);
    for (let i = 0; i < downloadUrlList.length; i++) {
        downloadUrl.value = downloadUrlList[i];
        await VDOM.value.click();
        // console.log("downloadUrl.value:", downloadUrl.value);
        // console.log("VDOM.value:", VDOM.value);
        console.log(`${i} is Downloading……`);
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
            <div class=" bg-slate-100 h-[560px] max-h-[560px] w-96 p-4  rounded-3xl flex items-center flex-col mt-8 whitespace-break-spaces break-all overflow-scroll" v-html="myHtml">

            </div>

            <!-- Visiual DOM -->
            <a ref="VDOM" :v-show="false" :href="downloadUrlValue" download="music.flac" type="audio/mpeg" class=" bg-slate-300 h-3 w-3"></a>

        </div>
    </div>
</template>
