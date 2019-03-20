var request;

init();

function init(){
    getDogPic();
}; 

document.querySelector('button').addEventListener('click', function(){
    getDogPic();
});

function getDogPic(){
    request = new XMLHttpRequest();
    request.open('GET', 'https://dog.ceo/api/breeds/image/random', true);
    
    request.onload = function() {
        var data = JSON.parse(this.response)
        var url = (data.message);
        document.getElementById('image').src = url;
    }
    request.send();
    
}