const work = localStorage.getItem("eyJkZXZpY2VJZCI6Ijc2ZmM2MWYxLWU3ZGEtNDE4Zi1hZjc2LTQ5Yjc5NmUwYjAwY1IiLCJ1c2VySWQiOiIxZGE1ZWI5MC05MGI4LTRhZDQtYTlkYS1hNmM4MDQzOWZjNTIiLCJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOjE2Mjk5NzI1NTM0NTYsImxhc3RFdmVudFRpbWUiOjE2Mjk5NzMxNjQ3MzksImV2ZW50SWQiOjIwMDQsImlkZW50aWZ5SWQiOjM0MSwic2VxdWVuY2VOdW1iZXIiOjIzNDV9");

$.getJSON(`https://api.spoonacular.com/recipes/complexSearch?query=${work}&number=14&includeNutrition=false&apiKey=59f80c029a6a4e0c9048f8a08f86fde8`, function(data){
  const number = data.results.length;

  if(number==0){
    document.getElementById("error_img").style.width = "330px";
    document.getElementById("error").style.visibility = "visible";
    document.getElementById("result_div").style.visibility = "hidden";
  }
  else if(data.results.length>0){

    for (let i = 0; i < number; i++) {

      document.getElementById("gallery_"+i).style.visibility = "visible";
      document.getElementById("gallery_"+i).style.height = "250px";

      const logo = data.results[i].image;
      $('#'+i+'_img').attr("src", logo);
  
      const Name = data.results[i].title;
      $('#'+i+'_h5').append(Name);

      const sourceUrl = data.results[i].sourceUrl;
      localStorage.setItem("5C23656EE78197A7B46C2F2E6B6B2",sourceUrl);
      $('.'+i+'a').attr("href","https://sb-bot-bab.github.io/Cooking-pilot/result/");
  
    }
  }
});
  
const firebaseConfig = {
  apiKey: "AIzaSyD-RMib6JEKdLXScOShizn6BJfRQH6xnK0",
  authDomain: "cooking-pilot.firebaseapp.com",
  databaseURL: "https://cooking-pilot-default-rtdb.firebaseio.com",
  projectId: "cooking-pilot",
  storageBucket: "cooking-pilot.appspot.com",
  messagingSenderId: "489501005832",
  appId: "1:489501005832:web:e895cbc573d537a09899bd"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let suggestions = [];
  let suggestions_done = [];

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

inputBox.onkeyup = (e)=>{

    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
          localStorage.setItem("eyJkZXZpY2VJZCI6Ijc2ZmM2MWYxLWU3ZGEtNDE4Zi1hZjc2LTQ5Yjc5NmUwYjAwY1IiLCJ1c2VySWQiOiIxZGE1ZWI5MC05MGI4LTRhZDQtYTlkYS1hNmM4MDQzOWZjNTIiLCJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOjE2Mjk5NzI1NTM0NTYsImxhc3RFdmVudFRpbWUiOjE2Mjk5NzMxNjQ3MzksImV2ZW50SWQiOjIwMDQsImlkZW50aWZ5SWQiOjM0MSwic2VxdWVuY2VOdW1iZXIiOjIzNDV9",userData);
            webLink = `https://sb-bot-bab.github.io/Cooking-pilot/search/`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        $.getJSON(`https://api.spoonacular.com/recipes/autocomplete?number=6&query=${userData}&apiKey=59f80c029a6a4e0c9048f8a08f86fde8`, function(data){
          for (let i = 0; i < 6; i++) {
            suggestions.push(data[i].title);
            firebase.database().ref("autofill").push({
              name: data[i].title,
            });
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
      localStorage.setItem("eyJkZXZpY2VJZCI6Ijc2ZmM2MWYxLWU3ZGEtNDE4Zi1hZjc2LTQ5Yjc5NmUwYjAwY1IiLCJ1c2VySWQiOiIxZGE1ZWI5MC05MGI4LTRhZDQtYTlkYS1hNmM4MDQzOWZjNTIiLCJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOjE2Mjk5NzI1NTM0NTYsImxhc3RFdmVudFRpbWUiOjE2Mjk5NzMxNjQ3MzksImV2ZW50SWQiOjIwMDQsImlkZW50aWZ5SWQiOjM0MSwic2VxdWVuY2VOdW1iZXIiOjIzNDV9",selectData);
      webLink = `https://sb-bot-bab.github.io/Cooking-pilot/search/`;
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
