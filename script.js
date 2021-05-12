const videoElem= document.getElementById("video");
const button = document.getElementById("button");

let sharing=false;
// ref : https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
async function triggerPictureInPicture(){
    button.disabled=true;
    await video.requestPictureInPicture();
    button.disabled=false;
    sharing=true;
}


async function requestScreenSharing(){
    try{
        const video =await navigator.mediaDevices.getDisplayMedia();
        videoElem.srcObject = video;
        videoElem.onloadedmetadata =()=>{
            videoElem.play()
            triggerPictureInPicture();
            console.log("yes")
        }
    }catch(err){
        console.log("something's wrong :",err)
        sharing=false;
    }
    
    return video;
}

async function stopScreenSharing(){
    let tracks = videoElem.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    videoElem.srcObject = null;

    sharing=false;
}




videoElem.addEventListener("leavepictureinpicture",()=>{
    stopScreenSharing();
})

button.addEventListener("click",async ()=>{
    if (sharing){
       
        stopScreenSharing();
        await requestScreenSharing();
    }
    else if (!sharing){
        await requestScreenSharing();
        
        
       
    }
})