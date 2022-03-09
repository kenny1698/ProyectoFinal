(async () => {
    try {
      const respuesta = await fetch('/api/productos', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(respuesta => respuesta.json())
      .then(data => {
        if (data.error){
           document.getElementById("container").remove()
           document.getElementById("formProductos").remove()
           document.querySelector('main').innerHTML = JSON.stringify(data)
        }else{
          document.getElementById('h1info').innerHTML = "Bienvendido "+data.usuarioActual
          makeHtmlTable(data.productos).then(html => {
            document.querySelector('main').innerHTML = html
          })  
        }
      })
  
    } catch (error) {
      document.querySelector('main').innerHTML = error
    }
  })()

  function makeHtmlTable(productos) {
    return fetch('../plantillas/tabla-productos.hbs')
      .then(respuesta => respuesta.text())
      .then(plantilla => {
        const template = Handlebars.compile(plantilla)
        const html = template({ productos })
        return html
      })
  }