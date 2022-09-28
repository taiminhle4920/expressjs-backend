const express = require('express');
const cors = require('cors');

const app = express();

const port = 5050;
const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

function randomString(length) {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyz'.split('');
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if(name != undefined && job != undefined){
        let result = findUserByJobAndName(job, name);
        result = {users_list: result};
        res.send(result); 
    }
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else if(job != undefined){
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});
const findUserByJobAndName = (job, name) =>{
    return users['users_list'].filter( (user) => user['job'] === job && user['name'] === name);
}
const findUserByJob = (job) =>{
    return users['users_list'].filter( (user) => user['job'] === job);
}
const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}


app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd['id'] = randomString(6);
    addUser(userToAdd);
    res.status(201).send(userToAdd).end();
});

function addUser(user){
    users['users_list'].push(user);
}


app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if(result === undefined || result.length == 0)
        res.status(404).send('Resourse not found');
    else{
        result = {users_list: result};
        users['users_list'].pop(result);
        res.status(204).end();
    }
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      
