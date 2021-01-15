window.addEventListener('load',()=>{
    let long;
    let lat;
    let location = document.querySelector(".location-timezone");
    let icon = document.querySelector(".icon");
    let degree = document.querySelector(".degree-section");
    let description = document.querySelector(".temperature-description");
   const weather={};
   weather.temperature ={
       unit :"C"
   }
   
     let HAk = 273;
        
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api =`${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f703fb0f5a4207506dda2c39e8af3cb2`;
        fetch(api)
            .then(response =>{
               return response.json();
        })
            .then(data=>{
               
                weather.temperature.value = Math.floor(data.main.temp -HAk);
                     degree.innerHTML = `${ weather.temperature.value}°<span>C</span>`
                description.textContent = data.weather[0].description;
               location.textContent = data.name;
               icon.innerHTML =`<img src="icons/white/png/128x128/${data.weather[0].icon}.png"/>`
               
              
            
        });
        function CtoF(temperature){
            return (temperature * 9/5)+32;
        }
        degree.addEventListener('click',function(){
            if( weather.temperature.value === undefined)return;
            if( weather.temperature.unit == "C" ){
                   let F = CtoF(weather.temperature.value);
                   F = Math.floor(F);
                   degree.innerHTML = `${F}°<span>F</span>`;
                   weather.temperature.unit ="F";
            }else{
                degree.innerHTML = `${weather.temperature.value}°<span>C</span>`;
                weather.temperature.unit ="C";
            }
        })
   
       
        
    })
}
   
});

