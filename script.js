
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

  //triangle lady appears
  if(rank >=2){
   document.getElementById("triangleLady").style.visibility = "visible";
  }


});





	

   