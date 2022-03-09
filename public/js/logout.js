(async () => {
    try {
      const respuesta =  await fetch('/logout', {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      })
      .then(respuesta => respuesta.json())
      .then(data => {
          console.log(localStorage.getItem('access_token'))
        document.getElementById('h1info').innerHTML = "Hasta Luego "+data.usuarioActual
        
      })

      setTimeout(function(){
        window.location.href = "/login"
        } , 2000)
        localStorage.removeItem('access_token')
  
    } catch (error) {
      document.querySelector('main').innerHTML = error
    }
  })()

 