const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const logger = require('./middleware/logger');

const members  = require('./Members')



const app = express();


// Init middleware
// app.use(logger);

// Handlebars Middleware

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Homepge Route

app.get('/', (req, res) => res.render('index', {title: 'Member App',
members
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Gets All Members

// app.get('/api/members', (req, res) => res.json(members));  

// Get Single Member
// app.get('/api/membes/:id', (req, res) => {

// const found = members.some(member => member.id === parseInt(req.params.id));

// if(found) {

//     res.json(members.filter(member => member.id === parseInt(req.params.id)))
// } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
// }

   
// });

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello World</h1>')
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
