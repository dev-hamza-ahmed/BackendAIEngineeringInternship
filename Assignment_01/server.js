import express from 'express'

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        text: "Hello World!"
    })
})

app.get('/description', (req, res) => {
    res.json({
        text: "Building simple server with two JSON endpoints"
    })
})

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})
