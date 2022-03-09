(async () => {
    try {
      const respuesta = await fetch('/api/carritos', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(respuesta => respuesta.json())
      .then(data => {
        if (data.error){
           document.getElementById("container").remove()
           document.getElementById("formCarritos").remove()
           document.querySelector('main').innerHTML = JSON.stringify(data)
        }else{
          document.getElementById('h1info').innerHTML = "Bienvendido "+data.usuarioActual
          makeHtmlTable(data.carritos).then(html => {
            document.querySelector('main').innerHTML = html
          })  
        }
      })
  
    } catch (error) {
      document.querySelector('main').innerHTML = error
    }
  })()

  function makeHtmlTable(carritos) {
    return fetch('../plantillas/tabla-carritos.hbs')
      .then(respuesta => respuesta.text())
      .then(plantilla => {
        const template = Handlebars.compile(plantilla)
        const html = template({ carritos })
        return html
      })
  }