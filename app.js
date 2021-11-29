const express = require('express')

const port = 5000

const app = express()

const indexUse = require("./src/routes/router.estudiante")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log("Escuchando en el puerto: " + port)
})

app.use("/estudiante", indexUse);
app.use("/estudiante/edad/:rango", indexUse);
app.use("/estudiante/:dni", indexUse);

module.exports = app