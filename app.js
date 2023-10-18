const express = require('express');
const { Client } = require('ssh2');
const fs = require('fs');

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
    res.render('home');
});

app.post('/', (req, res) => {
    const client_uname = req.body.client_uname;
    const client_ip = req.body.client_ip;

    if (client_ip.length === 0 || client_uname.length === 0) {
        console.log("Client Parameters missing!");
        res.redirect('/');
        return;
    }

    console.log("Uname: " + client_uname);
    console.log("Client IP: " + client_ip);

    // Update this with the actual path to your AWS private key
    const privateKeyPath = './secret-public-key.pem';
    
    const conn = new Client();

    conn.on('ready', () => {
        console.log('SSH Connection Established');
        conn.shell((err, stream) => {
            if (err) throw err;
            stream.on('close', () => {
                console.log('SSH Connection Closed');
                conn.end();
            }).on('data', (data) => {
                res.send(`<pre>${data}</pre>`);
            });
        });
    }).on('error', (err) => {
        console.error('SSH Connection Error: ' + err.message);
        res.send('SSH Connection Error: ' + err.message);
    }).connect({
        host: client_ip,
        username: client_uname,
        privateKey: fs.readFileSync(privateKeyPath),
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
