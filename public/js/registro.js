const formLogin = document.getElementById("formRegistro")
formLogin.addEventListener('submit', async e => {

  e.preventDefault()

  const datos = {
    email: formLogin[0].value,
    nombre: formLogin[1].value,
    direccion: formLogin[2].value,
    edad: formLogin[3].value,
    telefono: formLogin[4].value,
    password: formLogin[1].value,
  }

  const respuesta = await fetch('/registro', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })

  const content = await respuesta.json()

  const { access_token } = content 
  console.log(access_token)

  if (access_token) {
    localStorage.setItem("access_token", access_token)
     location.href = '/'
  } else {
    location.href = '/failregistro'
  }

})
