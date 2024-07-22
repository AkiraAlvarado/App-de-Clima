const form = document.querySelector(".header__container")
const input = document.getElementById("city-input")

const obtenerResultados = async (city) => {
  const apiKey = '088eee181164c5751c6967dbabfb2029'
  const urlApiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  const urlApiPronostic = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
  try {
    const resultsWeather = await fetch(urlApiWeather)
    const datosWeather = await resultsWeather.json();
    console.log(datosWeather);  // Verificar los datos recibidos

    const resultsPronostic = await fetch(urlApiPronostic)
    const datosPronostic = await resultsPronostic.json();
    console.log(datosPronostic);

    console.log("ciudad encontrada1")

    showWeather(datosWeather)
    showPronostic(datosPronostic)


    console.log("ciudad encontrada2")
  } catch {

    alert("Ingrese una ciudad correcta")
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  obtenerResultados(input.value);
});

const celsius = dato => {
  return parseInt(dato - 273.15)
}

const convertirTimestamp = timestamp => {
  const fecha = new Date((timestamp + 3600 * 2) * 1000); // Ajuste de 2 horas hacia adelante en segundos

  // Arrays para nombres de días y meses en español
  const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // Obtener el día de la semana, día del mes, mes y año en UTC
  const diaSemana = dias[fecha.getUTCDay()];
  const dia = fecha.getUTCDate();
  const mes = meses[fecha.getUTCMonth()];
  const anio = fecha.getUTCFullYear();

  // Formatear el texto
  return `${diaSemana} ${dia}, ${mes} ${anio}`;
};

const showWeather = objJson => {
  const {
    name,
    visibility,
    dt,
    clouds: { all },
    wind: { speed },
    main: { temp, humidity, pressure },
    weather: [{
      icon, description
    }]


  } = objJson

  const medidaTemp = document.getElementById("main-temp")
  const city = document.getElementById("main-city")
  const date = document.getElementById("main-date")
  const weatherImage = document.getElementById("weather-image")
  const weatherDescription = document.getElementById("weather__description")
  const mainHumidity = document.querySelector(".humidity_main")
  const mainPressure = document.querySelector(".pressure_main")
  const mainWindspeed = document.querySelector(".wind-speed")
  const mainClouds = document.querySelector(".clouds")
  const mainVisibility = document.querySelector(".visibility")



  const fechaFormateada = convertirTimestamp(dt);
  const temp1 = celsius(temp)

  medidaTemp.textContent = ""
  medidaTemp.textContent = `${temp1}°C`

  city.textContent = ""
  city.textContent = `${name}`

  date.textContent = ""
  date.textContent = `${fechaFormateada}`

  weatherImage.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

  weatherDescription.textContent = ""
  weatherDescription.textContent = `${description}`

  mainHumidity.textContent = " "
  mainHumidity.textContent = `${humidity}%`

  mainPressure.textContent = ""
  mainPressure.textContent = `${pressure}pha`

  mainWindspeed.textContent = ""
  mainWindspeed.textContent = `${speed}m/s`

  mainClouds.textContent = ""
  mainClouds.textContent = `${all}%`

  mainVisibility.textContent = ""
  mainVisibility.textContent = `${(visibility) / 100}km`
}

const showPronostic = data => {
  // Toma los primeros 5 elementos y los transforma
  const objJson = data.list.slice(0, 5).map(entry => {
    // Desestructura los datos de cada entrada
    const {
      dt,
      main: { temp, humidity },
      clouds: { all: clouds },
      weather: [{ description, icon }]
    } = entry;

    // Retorna un nuevo objeto con solo las propiedades deseadas
    return { dt, temp, humidity, clouds, description, icon };
  });

  const dates = document.querySelectorAll(".date")
  const icons = document.querySelectorAll(".card-weather__image")
  const descriptions = document.querySelectorAll(".card-weather__weather")
  const temperatures = document.querySelectorAll(".temperature")
  const humiditys = document.querySelectorAll(".humidity")
  console.log(humiditys)
  const nubosity = document.querySelectorAll(".Nubosity")

  objJson.forEach((element, i) => {
    if (dates[i] && icons[i] && descriptions[i] && temperatures[i] && humiditys[i] && nubosity[i]) {
      console.log(element.dt)
      const fechaFormateada = convertirTimestamp(element.dt);
      console.log(fechaFormateada)

      temp1 = celsius(element.temp)

      dates[i].textContent = ""
      dates[i].textContent = fechaFormateada

      icons[i].src = `https://openweathermap.org/img/wn/${element.icon}@2x.png`

      descriptions[i].textContent = ""
      descriptions[i].textContent = `${element.description}`

      temperatures[i].textContent = ""
      temperatures[i].textContent = `${temp1}°C`

      humiditys[i].textContent = ""
      humiditys[i].textContent = `${element.humidity}%`

      nubosity[i].textContent = ""
      nubosity[i].textContent = `${element.clouds}%`
    } else {
      console.log("Hubo un error con las etiquetas")
    }

  });
}

