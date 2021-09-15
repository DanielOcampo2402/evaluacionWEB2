let uri = "https://accounts.spotify.com/api/token";


let dato1="grant_type=client_credentials";
let dato2="client_id=e69b9e86bd5744999e1258484983e5bc";
let dato3="client_secret=f65b2012d0f44ea6b6abebaaff8a147f";

let parametrosPost={
  method:"POST",
  headers:{
    "Content-Type":"application/x-www-form-urlencoded"

  },
  body: `${dato1}&${dato2}&${dato3}`

} 

fetch(uri,parametrosPost)
.then(function(respuesta){
    return(respuesta.json())

})
.then(function(respuesta){
  console.log(respuesta)
  obtenerToken(respuesta);
})
.catch(function(error){
  console.log(error)
})

function obtenerToken(respuesta){
    let token = respuesta.token_type+" "+respuesta.access_token
    console.log(token);
    obtenerCanciones(token);
    

}


function obtenerCanciones(token){
  let uri = "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ/top-tracks?market=US";

  let parametrosEnvio={
    method: "GET",
    headers:{
        Authorization:token
    }

}
//buscar en el servidor
fetch (uri,parametrosEnvio)
.then(function(respuesta){
    return(respuesta.json())
})
.then(function(respuesta){
    console.log(respuesta)
    pintarDatos(respuesta)
   
})
.catch(function(error){
    console.log(error)
})

}

function pintarDatos(datos){
  let fila = document.getElementById("fila")
  datos.tracks.forEach(function(cancion){
      console.log(cancion.name)
      console.log(cancion.preview_url)
      console.log(cancion.album.images[0].url)
      console.log(cancion.popularity)
      //crear un div con js

      let columna = document.createElement("div")
      columna.classList.add("col")

      //crear div que sirve de tarjeta

      let tarjeta = document.createElement("div")
      tarjeta.classList.add("card")
      tarjeta.classList.add("h-100")

      //crear una img de tarjeta   
      let imagen = document.createElement("img")
      imagen.classList.add("card-img-top")
      imagen.src= cancion.album.images[0].url

      let nombre = document.createElement("p")
      nombre.classList.add("card-text")
      nombre.src= cancion.name

     //crear un audio en la tarjeta tarjeta
      let audio = document.createElement("audio")
      audio.classList.add("w-100")
      audio.src= cancion.preview_url;
      audio.setAttribute("controls", "controls")

      let popularidad = document.createElement("h1")
      popularidad.classList.add("card-text")
      popularidad.src = cancion.popularity;


      //padres e hijos
      tarjeta.appendChild(popularidad)
      tarjeta.appendChild(imagen)
      tarjeta.appendChild(audio)
      columna.appendChild(tarjeta)
      fila.appendChild(columna)


  })
}



