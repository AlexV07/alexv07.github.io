
const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const initial_url = "https://dog.ceo/api/breed/affenpinscher/images/random"
const select = document.querySelector(".breeds");
const img = document.querySelector(".dog_img");
const icon = document.querySelector(".dog_icon");
const generateBtn = document.querySelector(".btn");
let current_breed = "affenpinscher";


// fetch all breeds from the API  and populate the select.
fetch(BREEDS_URL)
.then(function (response) {
    return response.json();
})
.then(function (data){
    const breedsObject = data.message;
    const breedsArray = Object.keys(breedsObject);


    for(let i= 0; i < breedsArray.length; i++ ){
        const option = document.createElement("option");
        option.value = breedsArray[i];
        option.innerText = breedsArray[i];
        select.appendChild(option);
    }
})

// show icon and hide img. show img and hide icon when loaded.
function ShowDoggo(){
    img.classList.remove("active");
    icon.classList.add("active");
    
    img.addEventListener("load", function(){
        icon.classList.remove("active");
        img.classList.add("active");
    }) 
}

//fetch from some url and then change de img scr with the url
function ChangeImg(url){

    fetch(url)
    .then(function(response){
        return response.json();
    })
    //change the img url
    .then(function(data){
        const img_Url = data.message;
        img.src = img_Url;
    })
}

//fetch the initial img url from the API
ChangeImg(initial_url);
ShowDoggo();

// change the image when another breed is selected. 
select.addEventListener("change", function(event) {

    //make url 
    const dog_Url =`https://dog.ceo/api/breed/${event.target.value}/images/random`;

    // store current breed
    current_breed = event.target.value;

    // Change function
    ChangeImg(dog_Url);

    //show spinner icon and hide img until loaded
    ShowDoggo();
});

//btn that does all this but without changing breed
generateBtn.addEventListener("click", function(){
    const dog_Url = `https://dog.ceo/api/breed/${current_breed}/images/random`;

    ChangeImg(dog_Url);
    ShowDoggo();
})
    



