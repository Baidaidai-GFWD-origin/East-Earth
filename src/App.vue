<script setup>

import { computed, ref, useTemplateRef } from 'vue';

const greeting = "Music Array is Analizing, Waiting a Moment ☕️!"

let text = ref(greeting);
let myHtml = computed(()=>text.value)



let musicIdArrayText = ref('')
let musicIdArray = computed(()=>musicIdArrayText.value.split(',').map(id => id.trim()))
let downloadUrl = ref('');
let fileName = ref('');

const VDOM = useTemplateRef('VDOM')

async function getMusic(array) {
    let musicURLs = {};
    for (let i = 0; i < array.length; i++) {
        try{
            console.log(array[i])
            let musicJSON = await fetch(`http://localhost:5000/Song_V1?ids=${array[i]}&level=jymaster&type=json`);
            let JSONContext = await musicJSON.json();
            let musicURL = JSONContext.url;
            let musicName = JSONContext.al_name
            musicURLs[i] = {}
            musicURLs[i].Name = musicName
            musicURLs[i].URL = musicURL
        }catch(err){
            console.error(`music ${array[i]} is analysis failed！`)
        }
    }
    return musicURLs
}

async function generateText(){
    let resault = await getMusic(musicIdArray.value)
    text.value = JSON.stringify(resault,null,'\t')
}

async function downloadFile() {
    // fetch文件 -> 转存Blob -> 生成URI -> 触发点击下载
    let downloadUrlArray = await getMusic(musicIdArray.value);
    const downloadUrlList = Object.values(downloadUrlArray);
    for (let i = 0; i < downloadUrlList.length; i++) {
        try{
            let musicFetchResaults = await fetch(downloadUrlList[i].URL)

            let musicBlob = await musicFetchResaults.blob()

            let musicDownloadUrl = URL.createObjectURL(musicBlob)

            downloadUrl.value = musicDownloadUrl
            fileName.value = `${downloadUrlList[i].Name}.flac`
            console.log(downloadUrl.value)
            console.log(fileName.value)

            VDOM.value.href = downloadUrl.value
            VDOM.value.download = fileName.value
            console.log(VDOM.value.href)
            console.log(VDOM.value.download)

            VDOM.value.click();
            console.log(`${i} is Downloading……`);
        }catch(err){
            console.error(`music ${downloadUrlList[i].Name} is analysis failed！`)
        }
    }
}



</script>

<template>
    <div id="page-container" class=" h-screen w-screen flex justify-center bg-slate-300">
        <div id="box-container" class=" h-screen w-[580px] bg-white rounded-3xl flex items-center flex-col">
            <div class="flex items-center h-24">
                <img src="./assets/east-erarth.jpeg" class="h-12 mr-4">
                <div class="flex items-center">
                    <p class="text-lg">Earth-East</p>
                </div>
            </div>
            <div class=" h-44 w-96  rounded-3xl border-2 flex items-center justify-around flex-col">
                <input type="text" v-model="musicIdArrayText" placeholder="Please Give Your Music ID Array!" class=" rounded-3xl pl-4 border-2 w-72 h-8 mt-8"/>
                <div>
                    <button class=" bg-slate-300 m-6 w-32 h-8 rounded-2xl" @click="generateText">Only URL</button>
                    <button class=" bg-slate-300 m-6 w-32 h-8 rounded-2xl" @click="downloadFile">Download Flac</button>
                </div>
            </div>
            <div class=" bg-slate-100 h-[560px] max-h-[560px] w-96 p-4  rounded-3xl flex items-center flex-col mt-8 whitespace-break-spaces break-all overflow-scroll text-sm" v-html="myHtml">

            </div>

            <!-- Visiual DOM -->
            <a ref="VDOM" v-show="false" href="" target="_blank" download="audio.flac" type="audio/flac">clickme!</a>

        </div>
    </div>
</template>
