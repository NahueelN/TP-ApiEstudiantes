const express = require('express')


const port = 5000

const app = express()

const resource = 'estudiante'

const route = `/${resource}`

const estudiantes = [
  {
    nombre: "José",
    apellido: "Vázquez",
    dni: 90909090,
    edad: 30
  },
  
]
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post(route, (req, res) => {
  // req.body
  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })
  
  if (!existe) {
   
    estudiantes.push(estudiante)
    res.status(200)
    res.json(estudiante)
    console.log("agregando estudiantes")
  } else {
    res.status(409)
    res.send()
  }
})


app.delete(route, (req, res) => {

  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })
  console.log(estudiantes(existe))
  if (existe!=undefined){
    
    res.json(existe)
    res.status(200)
    console.log("eliminando estudiante")
  }
  else{
    res.json("No existe")
    res.status(409)
  }
  
})

app.put(`${route}/:dni`, (req, res) => {
  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })

  if (existe!=undefined){
    existe.apellido=estudiante.apellido
    existe.nombre=estudiante.nombre
    existe.edad=estudiante.edad
    existe.dni=estudiante.dniNuevo
    res.json(existe)
    res.status(200)
    console.log("modificando estudiante")
  }
  else{
    res.json("No existe")
    res.status(409)
  }
})

app.get(route, (req, res) => {
  res.json(estudiantes)
  console.log("mostrando estudiantes")
})

app.get(`${route}/:dni`, (req, res) => {
  
  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })

  if (existe!=undefined){
    res.json(existe)
    res.status(200)
    console.log("mostrando estudiante")
  }
  else{
    res.json("No existe")
    res.status(409)
  }
  

  
})

app.get(`${route}/edad/:rango`, (req, res) => {
  
  const edades = req.body
  const resultados=[]
  let encontro=false

  estudiantes.forEach(est=>{
    if(est.edad>edades.min && est.edad<edades.max){
      resultados.push(est)
      encontro=true
    }
    
    
  })
  
  if (encontro){
    res.json(resultados)
    res.status(200)
    console.log("mostrando estudiantes entre edades")
  }
  else{
    res.json("No existe")
    res.status(409)
  }
})


app.listen(port, () => {
  console.log("Escuchando en el puerto: "+port)
})

