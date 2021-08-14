$.getJSON("https://api.spoonacular.com/recipes/random?number=14&apiKey=59f80c029a6a4e0c9048f8a08f86fde8", function(data){

    for (let i = 0; i < 14; i++) {
  
      var logo = data.recipes[i].image;
      $('#'+i+'_img').attr("src", logo);
  
  
      var Name = data.recipes[i].title;
      $('#'+i+'_h5').append(Name);
    
  
      var diet = data.recipes[i].diets;
      $('#'+i+'_h6_diets').append(diet);
  
      var healthscore = data.recipes[i].healthScore;
      $('#'+i+'_h6_healthscore').append("health Score :- ",healthscore);
  
  
      var licenseby = data.recipes[i].license;
      $('#'+i+'_h6_license').append(licenseby);
  
  
      var sourceurl = data.recipes[i].sourceUrl;
      $('.'+i+'a').attr("href",sourceurl);
  
    }
  
  });

  let suggestions = [];
  let suggestions_done = [];

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        $.getJSON(`https://api.spoonacular.com/recipes/autocomplete?number=6&query=${userData}&apiKey=59f80c029a6a4e0c9048f8a08f86fde8`, function(data){
          for (let i = 0; i < 6; i++) {
            suggestions.push(data[i].title);
            suggestions.forEach((c) => {
              if (!suggestions_done.includes(c)) {
                suggestions_done.push(c);
              }
          });
          }
          });
          
        emptyArray = suggestions_done.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
            
        });
        emptyArray = emptyArray.map((data)=>{
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active");
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active");
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}


function get_me(){

}
