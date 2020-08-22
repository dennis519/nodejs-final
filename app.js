let express = require('express');
let firebase = require('firebase')
let path = require('path');
var firebaseConfig = {
    apiKey: "AIzaSyCEGlSi8dAotUj58lI4iV5DNX6J0HqDBtc",
    authDomain: "test-2d036.firebaseapp.com",
    databaseURL: "https://test-2d036.firebaseio.com",
    projectId: "test-2d036",
    storageBucket: "test-2d036.appspot.com",
    messagingSenderId: "1088875786883",
    appId: "1:1088875786883:web:672c2d2ea208b0696361b6",
    measurementId: "G-F9XNL03T1L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let app = express();
app.use(express.static('./public')); //丟所有public的檔案上來
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    pathname = path.join(__dirname, 'public');
    let options = {
        root: pathname,
        dotfiles: 'deny'
    }
    res.sendFile('home.html',options);
    //let data = await db.collection('booklist').get();
    //let userArr = []
     //data.forEach((doc) => {
         //console.log(doc.data().name)
         //userArr.push(doc.data().name);
     //})
     
    //res.render('default', {  
        //title: '首頁', 
        //header:'小書單使用說明', 
        //users: ['Fisheep', 'Fiona', 'Alice', 'Bob']
        //users: userArr
        
    //}); 
     
});

app.get("/firebase-test", async (req, res) => {
    let html = '';
    let data = await db.collection('booklist').get();
    data.forEach(doc => {
        console.log(doc.data());
        html += `<div>${doc.id}: name = ${doc.data().name} author = ${doc.data().author} ISBN = ${doc.data().ISBN}</div>`;
    });
    res.send(html)
})

app.get("/backend", async (req, res) => {
    let data = await db.collection('booklist').get();
    userArr = []
    data.forEach((doc) => {
        userArr.push({
            id: doc.id,
            name: doc.data().name,
            author: doc.data().author,
            ISBN: doc.data().ISBN
        })
    })
    res.render('booklist', {
        users: userArr
    })
})

app.get("/frontend", (req, res) => {
    let options = {
        root:  __dirname+"/public",
        dotfiles: 'ignore'
    }
    console.log(__dirname+"/public");
    res.sendFile("/booklist.html", options);
    
})


app.get('/API/deleteBook', (req, res) => {
    db.collection('booklist').doc(req.query.id).delete();
    console.log(req.query.id);
    res.send(`delete Book id = ${req.query.id}!`)
})

app.get('/API/addBook', (req, res) => {
    db.collection('booklist').add({
        name: req.query.name,
        author: req.query.author,
        ISBN: req.query.ISBN
    });
    console.log("Add Book !!");
    res.send("Add Book success!");
})

app.get('*', (req, res) => {  
    res.send('No Content');  
});

let port = process.env.PORT || 3000

console.log(process.env);


app.listen(port, () => {
    console.log(`Server is running at ${port}`)
});