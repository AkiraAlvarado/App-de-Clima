const form = document.querySelector(".header__container")
const input = document.getElementById("city-input")

const obtenerResultados = async (city) => {
  const apiKey = '088eee181164c5751c6967dbabfb2029'
  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  try {
    const results = await fetch(urlApi)
    const datos = await results.json();
    console.log(datos);  // Verificar los datos recibidos
    console.log("ciudad encontrada1")

    showWeather(datos)
    console.log("ciudad encontrada2")
  } catch {

    console.log("Ciudad no encontrada")
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
  // Crear un objeto Date a partir del timestamp Unix
  const fecha = new Date(timestamp * 1000); // El timestamp Unix está en segundos, Date requiere milisegundos

  // Arrays para nombres de días y meses en español
  const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  // Obtener el día de la semana, día del mes, mes y año
  const diaSemana = dias[fecha.getDay()]; // getDay() devuelve el índice del día de la semana (0-6)
  const dia = fecha.getDate(); // Día del mes (1-31)
  const mes = meses[fecha.getMonth()]; // getMonth() devuelve el índice del mes (0-11)
  const anio = fecha.getFullYear(); // Año (4 dígitos)

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
  const mainHumidity = document.querySelector(".humidity")
  const mainPressure = document.querySelector(".pressure")
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

