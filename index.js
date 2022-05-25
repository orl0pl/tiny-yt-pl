var express = require('express')
var bcrypt = require('bcrypt')
var fs = require('fs')
var bodyParser = require('body-parser');
var app = express()
// DB read
var usersDB = JSON.parse(fs.readFileSync('database/u.json'))
var videoDB = JSON.parse(fs.readFileSync('database/v.json'))
var sessions = {'test': 0}
//script
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function (req, res) {
    res.render('home.html', {video: [
        {id: 0, title: 'Sus', viewsf: '99', timef: '15 godzin temu', author: 'Sus'},
        
        
    ]})
})
app.get('/styles.css', function (req, res) {
    res.sendFile(`${__dirname}/views/styles.css`)
})
app.get('/script.js', function (req, res) {
    res.sendFile(`${__dirname}/views/script.js`)
})
app.get('/vid/:vidId', function (req, res) {
    res.render(`${__dirname}/views/index.html`, {
        video: videoDB[req.params.vidId],
        rec: [{video: {title: 'Tytuł', author: 'Autor', info: 'Info', id: 0}}]
    })
})
app.get('/api/vid/photo/:vidId', function (req, res) {
    res.sendFile(`${__dirname}/videos/minis/${req.params.vidId}.jpg`)
})
app.get('/api/sub/:vidId', function (req, res) {
    res.sendFile(`${__dirname}/videos/subtitles`)
})
app.get('/api/vid/:vidId', function (req, res) {
    res.sendFile(`${__dirname}/videos/file/${req.params.vidId}.mp4`)
})
app.get('/styles.css', function (req, res) {
    res.sendFile(`${__dirname}/views/styles.css`)
})
app.get('/accounts/login', function (req, res) {
    res.render(`${__dirname}/views/login.html`, {error: ''})
})
app.post('/api/accounts/login', function (req, res) {
    console.log(req.body)
    var loginIndex = usersDB.findIndex(e=> e.login == req.body.login)
    if(loginIndex !== -1) {
        if(bcrypt.compareSync(req.body.password, usersDB[loginIndex].password)) {
            res.send(`Poczekaj chwilę...`)
        }
        else {
            res.render('login.html', {error: 'Złe hasło'})
        }
    }
    else {
        res.render('login.html', {error: 'Nie ma takiego użytkownika'})
    }
})
app.get('/testvid', function (req, res) { res.sendFile(`${__dirname}/videos/file/test.mp4`) })
app.listen(2222)