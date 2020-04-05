export const     initSingerData=(list)=>{
    // console.log('歌手数据',list)
    let singers={'hot':{title:'热',list:[]}}
        for (let index = 0; index < list.length; index++) {
          let {Findex,Fsinger_name,Fsinger_mid}=list[index]
            if(index<10){
                singers.hot.list.push({Findex,Fsinger_name,Fsinger_mid})
            }
            if(singers[Findex]){
                singers[Findex].list.push({Findex,Fsinger_name,Fsinger_mid})
            }else{
              singers[Findex]={
                title:Findex,
                list:[{Findex,Fsinger_name,Fsinger_mid}]
              }
            }
        }
    let hot = [singers.hot]
    let other = []
    for (const key in singers) {
      if (key!=='hot'&&key!=='9') {
            other.push(singers[key])
      }
    }
    let sortArr = other.sort((a,b)=>{return a.title.charCodeAt()-b.title.charCodeAt()})
    let result = hot.concat(sortArr)
    // console.log(result)
    // console.log(sortArr)
    // console.log(hot)
    // console.log(other)
    // this.singers=result
    // console.log(singers)
    return result
  }