
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

//release date
// let today = new Date();
// const opening = new Date("2023-04-17");

// releaseDate();
// function releaseDate(){
// let remainder= opening.getDate() - today.getDate()

// if(opening.getDate() > today.getDate()){

//     console.log("the show will be available in "+ remainder+ " days");
//     document.querySelector(".overlay").style.visibility =" visible";
//     localStorage.setItem("rank", 0); 
//     document.getElementById("mouse").classList.add("hidden");
//     document.getElementById("readMe").style.visibility ="hidden";
//     document.getElementById("remainder").innerText = `${remainder} days remain`
// }
// }



//make sure selected window is in front
var top_z = 10;

function bringToTop(element)
{
    element.style.zIndex = ++top_z;
    document.getElementById("broken").style.zIndex = top_z +1;
    document.getElementById("flames").style.zIndex = top_z +1;
    document.getElementById("mobileWarning").style.zIndex = top_z +1;
    document.getElementById("readMe").style.zIndex = top_z +1;
    document.getElementById("startOver").style.zIndex = top_z +1;
    
}

//get rank
// localStorage.setItem("rank", 0); 
//--> create button for this
let rank = localStorage.getItem("rank");


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
let startOverButton = document.getElementById("startOver");


function startedGame(){
    readMe.classList.add("hidden");
    toDoList.classList.remove("hidden");
    main_window.classList.remove("hidden");
    code_window.classList.remove("hidden");
    continueButton.classList.remove("hidden");
    document.getElementById("mouse").classList.remove("hidden");
    signButton.style.display="none";
    startOverButton.style.display =" inline-block";
 
    

}

//sign in blood
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
    localStorage.setItem("rank", 1); 
})

continueButton.addEventListener("mousedown", function(){
    readMe.classList.add("hidden");
})
   

readMeLink.addEventListener("mousedown", function() {
    readMe.classList.remove("hidden"); 

})

//START OVER
function startOver(){
    localStorage.setItem("rank", 0);
    checkRank();
main_window.classList.add("hidden");
code_window.classList.add("hidden");
signButton.style.display="inline-block";
continueButton.classList.add("hidden");
startOverButton.style.display = "none";

    //list items unchecked 
    listItems.forEach(item =>{
        item.firstChild.checked = false;
        });


}

//GAME PROGRESSION
const lockedList = document.querySelectorAll(".locked");
console.log(lockedList);

function lock(){
    for (let i = 0; i < lockedList.length; i++) {
        //   console.log(lockedList[i]);
            lockedList[i].children[0].src="img/deadComp.png";
            lockedList[i].children[1].href="#";
            lockedList[i].children[1].innerText ="forbidden";
            lockedList[i].children[1].classList.add("forbidden");
        }
        

}
//To Do List
const listItems = document.querySelectorAll("label");
const toDoList = document.querySelector("#toDo");

//check to see if they are lying
function liar(index){
let access = Number(rank) - 2; 
console.log( "access",access,"index",  index);

if(index != access){
    console.log("liar");

    listItems[index].checked = false;
}
else{
    listItems[index].checked = true;
}

}

for (let i = 0; i < listItems.length; i++) {
    let item = listItems[i];
    item.addEventListener("mousedown", checkRank);
    item.addEventListener("mousedown", function() {
      liar(i);
    });
}




//create if statements for each index to inform check mark and reaction
//keep checked with checkRank function
startOverButton.addEventListener("mousedown", startOver);

checkRank();
function checkRank(){
console.log("page loaded", localStorage.getItem("rank"));
rank = localStorage.getItem("rank");
//add checked attribute for each part of the to do list so it stays checked

    if(rank < 1){
        readMe.classList.remove("hidden");   
        toDoList.classList.add("hidden");
        document.getElementById("broken").style.visibility = "hidden";
        document.getElementById("triangleLady").style.visibility = "hidden";
        document.getElementById("flames").style.visibility = "hidden";
        document.getElementById("warning3").style.visibility = "hidden";

        //reset links and images
        lock();

        folders[0].firstElementChild.lastElementChild.style.color = "pink";
        //reset folders
        folders[2].firstElementChild.lastElementChild.style.color = "black";
        folders[1].firstElementChild.lastElementChild.style.color = "black";

    }

    if(rank ==1){
        lock();
        startedGame();
       
    }

      //calling cps
      if(rank >=2){
        document.getElementById("broken").style.visibility = "visible";
        lock();
        unlock(lockedList[2], "Pronouns/index.html", "public service announcement");
    
        startedGame();

        //add unlocked animation
        folders[2].firstElementChild.lastElementChild.style.color = "pink";
        folders[0].firstElementChild.lastElementChild.style.color = "black"; //reset old folder

        //make box checked & disabled

    
      }
    
      //triangle lady appears
      if(rank >=3){
       document.getElementById("triangleLady").style.visibility = "visible";
       document.getElementById("flames").style.visibility = "hidden";
       document.getElementById("warning3").style.visibility = "hidden";

       lock();
       unlock(lockedList[2], "Pronouns/index.html", "public service announcement");
       unlock(lockedList[0], "TransformationTest/index.html", "spell_of_transformation");

       //keep old list items checked
       listItems[0].firstChild.checked = true;
       listItems[0].firstChild.disabled = true;


       //add unlocked animation
        folders[2].firstElementChild.lastElementChild.style.color = "black"; //reset color
        folders[1].firstElementChild.lastElementChild.style.color = "pink";
      }
    
      //on fire
      if(rank >=4){
        document.getElementById("flames").style.visibility = "visible";
        document.getElementById("warning3").style.visibility = "visible";
        unlock(lockedList[1], "https://walkerboyle.com/MFA/NewStrategy/", "new strategy");

        //keep old list items checked
       listItems[0].firstChild.checked = true;
       listItems[0].firstChild.disabled = true;
       listItems[1].firstChild.checked = true;
       listItems[1].firstChild.disabled = true;


        
      }

      if(rank>=5){
        folders[1].firstElementChild.lastElementChild.style.color = "black";
                //keep old list items checked
       listItems[0].firstChild.checked = true;
       listItems[0].firstChild.disabled = true;
       listItems[1].firstChild.checked = true;
       listItems[1].firstChild.disabled = true;
       listItems[2].firstChild.checked = true;
       listItems[2].firstChild.disabled = true;
      }
}

//  console.log($(window).height());
//  console.log($(window).width());


function unlock(whichContent, link, text){
whichContent.children[0].src = "img/happy_game.png";
whichContent.children[0].classList.add("float");
// console.log(whichContent.children[0].classList);
whichContent.children[1].href=` ${link}`;
whichContent.children[1].innerText = `${text}`;
whichContent.children[1].classList.remove("forbidden");
}



});


//hide toDoList until start game
//remove at start over


	

   