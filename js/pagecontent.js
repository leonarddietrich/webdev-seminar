console.log("loaded");
function loadTracker(){
    display("content");
}
function loadNewExercise(){
   display("loadNewExercise");
}
function loadNewSession(){
    display("loadNewSession");
}
function loadProgresstracking(){
    display("loadProgresstracking");
}


const displays = [
"content",
"loadNewExercise",
"loadNewSession",
"loadProgresstracking"
]; 

function display(whoDisplay) {
    for(let i=0;i<displays.length;i++){
        const element= document.getElementById(displays[i]);
        if(whoDisplay==displays[i]){
          element.style= "";  
        }else{
            element.style= "display: none";
        }

    }

}



