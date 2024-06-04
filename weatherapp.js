// http://api.weatherapi.com/v1/current.json?key=323e19f8a59c4cff80861201240206&q=Hyderabad&aqi=yes


// console.log("geolocation" in window.navigator)


window.navigator.geolocation.getCurrentPosition(
    (success)=>{
        console.log(success)
        const coord = success.coords
        const latitide = coord.latitude;
        const longitude = coord.longitude;
        console.log('latitude: ',latitide);
        console.log('longitude: ',longitude);
        let lat_element = document.createElement('h2');
        let long_element = document.createElement('h2');


        let weatherCard=document.getElementsByClassName('w-main-body')[0];

        lat_element.classList.add('latitude');
        lat_element.textContent = `Latitude : ${latitide}`;

        long_element.classList.add('longitude');
        long_element.textContent = `Longitude : ${longitude}`;

        weatherCard.appendChild(lat_element);
        weatherCard.appendChild(long_element);

    },
    (err)=>{
        console.log(`There was an error: ${err.message}`);
    }
)




const getLatandLong =()=>{

return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed,
          country: position.coords.country

        }

    
    ),
      (error) => reject(error)
    );
});
};

const getWeatherUrlData = async (lat, long,speed)=>{
    try{
        
        const url = `http://api.weatherapi.com/v1/current.json?key=323e19f8a59c4cff80861201240206&q=${lat},${long}&aqi=yes`
        const rawResponse = await fetch(url);
        const resultResponse = rawResponse.json();
        // console.log(resultResponse);
        return resultResponse;
    }
    catch(error){
        console.log(`Unable to Fetch/Parse Url: ${error.message}`);
    }
    
};



const init =async ()=>{
     try{
        const locationData = await getLatandLong();
        const weatherData = await getWeatherUrlData(
            locationData.latitide,locationData.longitude
        );
        console.log(weatherData);
        console.log(weatherData.location.localtime);
        console.log(weatherData.location.name);
        cardBody= document.getElementsByClassName('w-main-body')[0]
        let countryElement = document.createElement('h2');
        countryElement.classList.add('country-weather');
        let localtimeElement=document.createElement('h2');
        localtimeElement.classList.add('localtime-weather');
        let nameElement = document.createElement('h2');
        nameElement.classList.add('name-weather');

        // Weather Temperature and Condition
        const tempCElement = document.createElement('h2');
        const feels_likeC = document.createElement('h2');
        const conditionElement = document.createElement('h2');




        conditionElement.textContent = `Currently Its ${weatherData.current.condition.text}`;
        tempCElement.textContent = `Temperatre Is : ${weatherData.current.temp_c}\u00B0C`;
        feels_likeC.textContent = `Feels Like ${weatherData.current.feelslike_c}\u00B0C`;
        

        

        countryElement.textContent = `Country: ${weatherData.location.country}`;
        nameElement.textContent = `City: ${weatherData.location.name}`;

        cardBody.appendChild(countryElement);
        cardBody.appendChild(nameElement);
        cardBody.appendChild(conditionElement);
        cardBody.appendChild(tempCElement);
        cardBody.appendChild(feels_likeC)

        
        
        
     }
     catch(error){
        console.log(`Unable to Display Weather Data: ${error.message}`);
     }

};


init()
/*
const placeName = ()=>{
    const place =  document.getElementsByClassName('w-place')[0];
    place.addEventListener('keydown',(event)=>{
        if (event.key==='Enter'){
            console.log('place is',place.value);
            return place.value;
        }
    })
    
};


const placeNAmePromise = ()=>{
    return new Promise((resolve,reject)=>{
        const place_name = placeName();
        if (place_name){
            resolve(place_name);
        }else{
            reject(place_name)
        }

})
}


const getWeatherPlaceUrlData = async ()=>{
    try{
        let place_name = await placeNAmePromise();
        
        const url = `http://api.weatherapi.com/v1/current.json?key=323e19f8a59c4cff80861201240206&q="${place_name}"&aqi=no`;
        const rawResponse = await fetch(url);
        const resultsResponse = await rawResponse.json();
        return resultsResponse;
    }
    catch (error){
        console.log(`Unable to Get Weather Data with Place: ${error}`);
    }
}

const init_place = async ()=>{
    const place_name =placeName();
    const placeData =await getWeatherPlaceUrlData(place_name);
    console.log(placeData)
}

console.log(init_place());
*/