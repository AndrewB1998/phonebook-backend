
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())



let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
app.get('/api/persons/', (req, res) => {
    res.json(persons)})



const generateId = () => {
    const maxId = Math.floor(Math.random()*99999999)
    return maxId + 1
  }

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(body.name === undefined){
        return res.status(400).json({error: 'name missing'})
    }    
    if(body.number === undefined){
        return res.status(400).json({error: 'number missing'})
    }
    if(persons.find(person=> person.name=== body.name)){
        return res.status(400).json({error: 'name must be unique'})
    }


const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
}
persons = persons.concat(person)

res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {res.json(person)}
    else {res.status(404).end()}})  


app.delete('/api/persons/:id', (req, res) => {
const id = Number(req.params.id)
persons = persons.filter(person => person.id !== id)
res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const cors = require('cors')

app.use(cors())