let express = require('express');
let bodyparser = require('body-parser');
let port = 5655;
let app = express();
let data = [{
}]

app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.write('HELLO WROLD')
    res.end()
})
//POST newLISt
app.post('/list',(req,res)=>{
    let newlist = {
        id : data.length,
        nama : req.body.nama,
        email : req.body.email
    }
    data.push(newlist)
    res.json(newlist)
    res.end()
});
//get all data
app.get('/list',(req,res)=>{
    return res.json(data)
})
//get specific data
app.get('/list/:nama',(req,res)=>{
    let dt = data.filter(value=>{
        return value.nama=== req.params.nama;
    })
    return res.json(dt)
})
// update data
app.put('/list/:nama',(req,res)=>{
    let list = data.filter(value=>{
        return value.nama === req.params.nama;
    });
    if (list === null){
        return res.json('NOT FOUND');
    }
    let newemail ={
        nama : req.body.nama || list[0].nama,
        email : req.body.email || list[0].email
    };
    data.push(newemail);
    res.json(newemail);
})

// delete data
app.delete('list/:nama',(req,res)=>{
    let del = data.filter(value=>{
        value.nama.toLocaleLowerCase() !== req.params.nama.toLocaleLowerCase()
    })
    return res.json(del)
})
app.listen(port,()=>{
    console.log("connected");
})