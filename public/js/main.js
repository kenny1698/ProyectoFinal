window.onload = function() {
const socket = io();

let emailMensaje = ''

if (location.pathname.split('/')[3])
  emailMensaje = location.pathname.split('/')[3]


//-------------------------------------------------------------------------------------

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity(
    'author',
    {},
    { idAttribute: 'id' }
  )
  
  // Definimos un esquema de mensaje
  const schemaMensaje = new normalizr.schema.Entity(
    'post',
    { author: schemaAuthor },
    { idAttribute: '_id' }
  )
  
  // Definimos un esquema de posts
  const schemaMensajes = new normalizr.schema.Entity(
    'posts',
    { mensajes: [schemaMensaje] },
    { idAttribute: 'id' }
  )
  /* ----------------------------------------------------------------------------- */
  
  const inputUsername = document.getElementById('username')
  const inputMensaje = document.getElementById('inputMensaje')
  const btnEnviar = document.getElementById('btnEnviar')
  
  const formPublicarMensaje = document.getElementById('formPublicarMensaje')
  formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
  
    const mensaje = {
      email: inputUsername.value,
      tipo: document.getElementById('tipo').value,
      text: inputMensaje.value,
    }
  
    socket.emit('nuevoMensaje', mensaje)
    formPublicarMensaje.reset()
    inputMensaje.focus()
  })
  
  socket.on('mensajes', mensajesN => {
    const mensajesNsize = JSON.stringify(mensajesN).length
    console.log(mensajesN, mensajesNsize)
  
    const mensajesD = normalizr.denormalize(
      mensajesN.result,
      schemaMensajes,
      mensajesN.entities
    )
  
    const mensajesDsize = JSON.stringify(mensajesD).length
    console.log(mensajesD, mensajesDsize)
  
    const porcentajeC = parseInt(
      (Math.abs(mensajesDsize - mensajesNsize) * 100) / mensajesNsize
    )
    console.log(`Porcentaje de compresión ${porcentajeC}%`)
    document.getElementById('compresion-info').innerText = porcentajeC
  
    console.log(mensajesD.mensajes)
    const html = makeHtmlList(mensajesD.mensajes)
    document.getElementById('mensajes').innerHTML = html
  })
  
  function makeHtmlList(mensajes) {
    return mensajes
      .map(mensaje => {
        if (emailMensaje == mensaje.email && emailMensaje != ''){
          return `
            <div>
                [<span style="color:grey;">${mensaje.tipo}</span>]:
                <b style="color:blue;">${mensaje.email}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.text}</i>
            </div>
        `
        }
        if (emailMensaje == ''){
          return `
            <div>
                [<span style="color:grey;">${mensaje.tipo}</span>]:
                <b style="color:blue;">${mensaje.email}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.text}</i>
            </div>
        `          
        }
      })
      .join(' ')
    
  }
  
  inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
  })
  
  inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
  })
  

}