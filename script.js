
//button target it
//create event listener click or submit
//api fetch call
//parse data from api
//distribute data across the page

var searchForm = document.querySelector("#city-input");
console.log(searchForm)
function citySearchSubmit (event){
    event.preventDefault()
    console.log(event)
}
searchBtn.addEventListener("submit", citySearchSubmit)
