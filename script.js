const input = document.getElementById("city-input");
const button = document.getElementById("search-btn");
const mainDiv = document.getElementById("main-div");



function displayData(temparature, feelsLike, max_temp, min_temp, humidity, heatIndex, dew_point, wind, windchill, windDirection, name) {


    //Set heading of the city
    const heading = document.createElement("h2");
    heading.setAttribute("id", "city");
    heading.innerText = `${name} Weather`;


    //create new section for the temperature data
    const section = document.createElement("section");
    section.setAttribute("id", "Display");

    //make each report column
    const divs = [];
    for (let i = 0; i < 3; i++) {

        // create three separate div using for loop
        divs[i] = document.createElement("div");
        divs[i].classList.add("display")


        const heading = document.createElement("h3");//heading for div
        const div = document.createElement("div");   //child div into div for displaying data
        const list = document.createElement("ul");   // list for child div

        heading.classList.add("dheading"); //add class to the heading
        div.classList.add("dData");        //add class to the child div
        list.classList.add("Dlist");       //add class to the list

        divs[i].appendChild(heading);      // append heading into parent div
        divs[i].appendChild(div);          //append child div into parent div


        div.appendChild(list);              //append list into child div


        //set data to the temperature column
        if (i === 0) {
            heading.innerText = "Temperature";
            const li = [];
            for (let i = 0; i < 4; i++) {
                li[i] = document.createElement("li");
                if (i == 0) {
                    li[i].innerHTML = `Temperature is ${temparature}&deg;C`;
                }
                else if (i == 1) {
                    li[i].innerHTML = `Feels Like ${feelsLike}&deg;C`
                }
                else if (i == 2) {
                    li[i].innerHTML = `Max temperature is ${max_temp}&deg;C`
                }
                else if (i == 3) {
                    li[i].innerHTML = `Min temperature is ${min_temp}&deg;C`
                }

            }
            list.append(li[0], li[1], li[2], li[3]);

        }

        //set data to the Humidity column
        else if (i === 1) {
            heading.innerText = "Humidity";
            const li = [];
            for (let i = 0; i < 3; i++) {
                li[i] = document.createElement("li");
                if (i == 0) {
                    li[i].innerHTML = `Humidity is ${humidity}%`;
                }
                else if (i == 1) {
                    li[i].innerHTML = `Heat Index is ${heatIndex}&deg;C`;
                }
                else if (i == 2) {
                    li[i].innerHTML = `Dew point is ${dew_point}&deg;C`;
                }
            }
            list.append(li[0], li[1], li[2]);

        }

        //set data to the wind column
        else if (i === 2) {
            heading.innerText = "wind";
            const li = [];
            for (let i = 0; i < 3; i++) {
                li[i] = document.createElement("li");
                if (i == 0) {
                    li[i].innerHTML = `Wind Speed is ${wind}km/h`;
                }
                else if (i == 1) {
                    li[i].innerHTML = `Wind chill is ${windchill}&deg;C`;
                }
                else if (i == 2) {
                    li[i].innerHTML = `Wind direction is "${windDirection}"`;
                }
            }
            list.append(li[0], li[1], li[2]);


        }
    }



    section.append(divs[0], divs[1], divs[2]);// now all three div append into section
    mainDiv.append(heading, section);         // heading and section append into Main div



}


function separateData(data) {

    //show under temparature column
    const temparature = data.current.temp_c;
    const feelsLike = data.current.feelslike_c;
    const max_temp = data.forecast.forecastday[0].day.maxtemp_c;
    const min_temp = data.forecast.forecastday[0].day.mintemp_c;


    //show under humidity column
    const humidity = data.current.humidity;
    const heatIndex = data.current.heatindex_c;
    const dew_point = data.current.dewpoint_c;

    //show under wind column
    const wind = data.current.wind_kph;
    const windchill = data.current.windchill_c;
    const windDirection = data.current.wind_dir;

    const name = data.location.name;



    displayData(temparature, feelsLike, max_temp, min_temp, humidity, heatIndex, dew_point, wind, windchill, windDirection, name);
}

async function fetchApi() {

    //fetch data
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ea9daa7b4bd5454bb2a40940242809&q=${input.value}`);
    //convert response object into json object
    const data = await response.json();

    input.value = "";
    //check if something wrong
    if (response.status == 400) {
        if (data.error.code === 1003) {
            return alert("Enter city name");
        }
        else if (data.error.code === 1006) {
            return alert("city not found");
        }
    }

    mainDiv.innerHTML = "";
    console.log(data);
    separateData(data);


}




button.addEventListener("click", fetchApi);