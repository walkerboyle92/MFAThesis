
$(document).ready(function(){

    $(function() { //draggable windows - jquery
        $('.window').draggable({
          
            start: function(event, ui){
               $(ui.helper).css('width', `${ $(event.target).width() }px`);
            }
         })
        });

 //main window
let main_window = document.getElementById('welcome');
let code_window = document.getElementById('codeWindow');

//find all windows and bring the active one to top
let windows = document.querySelectorAll('.window');
     windows.forEach(window =>{
        
window.addEventListener("mousedown", function() {
    bringToTop(this);
  });
})

// TURNED OFF FOR TESTS

// //alert
// main_window.addEventListener("animationend", function() {
//    alert("turn back");
// });



//make sure selected window is in front
var top_z = 10;

function bringToTop(element)
{
    element.style.zIndex = ++top_z;
    document.getElementById("broken").style.zIndex = top_z +1;
    document.getElementById("flames").style.zIndex = top_z +1;
    document.getElementById("mobileWarning").style.zIndex = top_z +1;
    document.getElementById("readMe").style.zIndex = top_z +1;
    
}

//get rank
// localStorage.setItem("rank", 0); 
//--> create button for this
let rank = localStorage.getItem("rank");
console.log(rank);

//number each piece of folder content
let contentIndex = 0;
let folders = document.querySelectorAll('.folder');


folders.forEach(folder =>{ 

//get folder content
let folderContent = folder.querySelectorAll('.folder-content')
let folder_img = folder.querySelector('.folder-img');


folderContent.forEach(content =>{
    content.classList.add('hidden');
    content.classList.add(`content-${contentIndex}`);
    contentIndex++;

    if(contentIndex > 3){
        contentIndex= 1;
    }
})


//if you click the folder, send its img src to the change function
folder_img.addEventListener('click', function() {
    changeState(folder, folderContent, folders);
  
  
  });

})

//open folder image
function changeState (whichFolder, content, otherFolders){

//get the src image for each folder
let folderState = whichFolder.children[0].children[0].getAttribute('src');
let mainScreen = document.querySelector('main');
let folderContent = document.querySelectorAll('.folder-content');


//CLOSE OTHER FOLDERS
otherFolders.forEach(folder =>{
    if(folder != whichFolder){
       folder.children[0].children[0].setAttribute('src',  "img/folder-closed.png");
    //    folderState = "img/folder-closed.png";

       folderContent.forEach(content_piece =>{
        
        //display none added
        content_piece.classList.add('hidden'); 

        if(content_piece.tagName == "VIDEO"){
            content_piece.pause(); //for videos
          
        }
      
        }) 
    }
})




//OPEN FOLDER
if(folderState == "img/folder-closed.png"){
   
    //change image to open
    whichFolder.children[0].children[0].setAttribute('src',  "img/folder-open.png");
    //change state to open
    folderState = "img/folder-open.png";
    console.log(folderState);
    
    

//for each piece of folder content
content.forEach(content_piece =>{

//give each piece a unique class
// content_piece.classList.add(`content-${contentIndex}`);
// contentIndex++;

//display none removed
    content_piece.classList.remove('hidden');
    bringToTop(content_piece);

    //apend window content to main window
    if(content_piece.classList.contains('window')){
        mainScreen.appendChild(content_piece);
    }

})

console.log('open');
    
} 



//CLOSE FOLDER
else {
    console.log(folderState);
    whichFolder.children[0].children[0].setAttribute('src',"img/folder-closed.png");
    folderState = "img/folder-closed.png";

    //for each piece of folder content
    content.forEach(content_piece =>{

    //display none added
    content_piece.classList.add('hidden'); 

    if(content_piece.tagName == "VIDEO"){
        content_piece.pause(); //for videos
      
    }

  
    })
   
    console.log('closed');
}
}

//secret folder click event
document.getElementById("secrets").addEventListener('click', function() {
  
    // console.log(this.children[0].children[0].getAttribute('src'));
if(this.children[0].children[0].getAttribute('src')=="img/folder-open.png"){
    document.body.style.backgroundImage = "url('img/unhappy.jpg')"; 
    document.body.style.backgroundSize = "50px 50px";
}
else{
    document.body.style.backgroundImage = "url('img/8bitPentagram.jpg')"; 
    document.body.style.backgroundSize = "37.5px 30px";
} 
  
  });

  //READ ME FUNCTIONALITY
let readMe = document.getElementById("readMe");
let signButton = document.getElementById("signButton");
let readMeLink = document.querySelector(".readme");
let continueButton = document.getElementById("continueButton");
let fateSealed =  document.getElementById("fateSealed")

function startedGame(){
    readMe.classList.add("hidden");
    main_window.classList.remove("hidden");
    code_window.classList.remove("hidden");
    continueButton.classList.remove("hidden");
    document.getElementById("mouse").classList.remove("hidden");
    signButton.style.display="none";

}

signButton.addEventListener("mousedown", function(){
    fateSealed.style.display = "block";
    readMe.classList.add("hidden");
    document.getElementById("mouse").classList.add("hidden");

})

//windows appear after animation
fateSealed.addEventListener("animationend", function(){
    fateSealed.style = display = "none";
    console.log("animation ended");
    startedGame();
})

continueButton.addEventListener("mousedown", function(){
    readMe.classList.add("hidden");
})
   

readMeLink.addEventListener("mousedown", function() {
    readMe.classList.remove("hidden"); 

})

//GAME PROGRESSION
const lockedList = document.querySelectorAll(".locked");
for (let i = 0; i < lockedList.length; i++) {
//   console.log(lockedList[i]);
    lockedList[i].children[0].src="img/deadComp.png";
    lockedList[i].children[1].href="#";
    lockedList[i].children[1].innerText ="forbidden";
    lockedList[i].children[1].classList.add("forbidden");
}



if(rank < 1){
    readMe.classList.remove("hidden");   
}
  //rank 1
  if(rank >=1){
    document.getElementById("broken").style.visibility = "visible";
    unlock(lockedList[2], "Pronouns/index.html", "public service announcement");

    startedGame();

  }

  //triangle lady appears
  if(rank >=2){
   document.getElementById("triangleLady").style.visibility = "visible";
   unlock(lockedList[0], "TransformationTest/index.html", "spell_of_transformation");
  }

  //on fire
  if(rank >=3){
    document.getElementById("flames").style.visibility = "visible";
    document.getElementById("warning3").style.visibility = "visible";
    unlock(lockedList[1], "NewStrategy/index.html", "new strategy");
    
  }
//  console.log($(window).height());
//  console.log($(window).width());


function unlock(whichContent, link, text){
whichContent.children[0].src = "img/happy_game.png";
whichContent.children[0].classList.add("float");
console.log(whichContent.children[0].classList);
whichContent.children[1].href=` ${link}`;
whichContent.children[1].innerText = `${text}`;
whichContent.children[1].classList.remove("forbidden");
}




});





	

   