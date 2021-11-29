const controller = {}
let estudiantes = require('../dataBase/estudiantes.db')


controller.get=(req, res) => {
    res.json(estudiantes)
    console.log("mostrando estudiantes")
}

controller.post=(req, res) => {
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
  }

controller.delete=(req, res) => {

    const estudiante = req.body
  
    const existe = estudiantes.find((est) => {
      return est.dni == estudiante.dni   
    })
    //console.log(estudiantes(existe))
    if (existe!=undefined){
      
      res.json(existe)
      res.status(200)
      
      var filtered = estudiantes.filter(function(el) { return el.dni != estudiante.dni; }); 
      estudiantes=filtered
      console.log("eliminando estudiante")
    }
    else{
      res.json("No existe")
      res.status(409)
    }
    
  }
controller.put=(req, res) => {
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
  }

  controller.getD= (req, res) => {
  
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
    
  }

  controller.getE=(req, res) => {
  
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
  }

module.exports=controller