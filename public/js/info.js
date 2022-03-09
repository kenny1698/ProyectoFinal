(async () => {
    try {
      const respuesta =  await fetch('/info', {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      })
      .then(respuesta => respuesta.json())
      .then(data => {
        if (data.error){
          document.getElementById("container").remove()
          document.querySelector('main').innerHTML = JSON.stringify(data)
        }else{
        document.getElementById('h1info').innerHTML = `Bienvendido `+data.email        
        document.querySelector('main').innerHTML =
        `<div class="form-group">
            <label><b>`+data.email+`</b></label>
            <div class="form-group">
            <label><b>`+data.nombre+`</b></label>
            <div class="form-group">
            <label><b>`+data.password+`</b></label>
            <div class="form-group">
            <label><b>`+data.direccion+`</b></label>
            <div class="form-group">
            <label><b>`+data.edad+`</b></label>
            <div class="form-group">
            <label><b>`+data.telefono+`</b></label>
            <div class="form-group">
            <img src=`+data.avatar+` width="200" height="200">
        </div>`
        }
      })     
    } catch (error) {
      document.querySelector('main').innerHTML = error
    }
  })()