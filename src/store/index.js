import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        fullScreen:true,
        songList:[],
        nowIndex:-1,
        loop:1, //1单曲 2列表 3随即循环 4不循环 
    },
    mutations:{
        addSongList(state,params){
            state.songList=params
        },
        toggleScreen(state,params){
            state.fullScreen=params     
        },
        changeNowIndex(state,playIndex){
            state.nowIndex=playIndex
        },

    },
    getters:{
        currentSong(state){
            return state.songList[state.nowIndex]
        }
    }
})

export default store