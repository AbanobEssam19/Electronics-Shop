const express = require('express');
const next = require('next');
const bcrypt = require('bcrypt');
const session = require('express-session');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const users = require('./models/users');

const server = express();

server.use(express.json());

server.use(session({
    secret: '9f8c7e4a8d5b6c3b4e9d2a8f2e6b1c7e3a4d5f1a3b4e6f9d5a8e4c3b2f7a8e1',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));


require("./mongodb");

app.prepare().then(() => {
    // Handle custom API or Express routes here if needed

    server.post("/register", async (req, res) => {

        let exist = await users.findOne({username: req.body.username});

        
        if (exist) {
            res.status(404).json({success: false});
            return;
        }

        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        const data = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone
        }


        await users.insertMany([data]);

        let userID = (await users.findOne({username: req.body.username})).id;

        req.session.user = {
            id: userID
        };

        res.status(200).json({success: true});

    });

    server.post("/login", async (req, res) => {
        let targetUser = await users.findOne({username: req.body.username});

        if (!targetUser) {
            res.status(404).json({success: false});
            return;
        }

        const checkPass = await bcrypt.compare(req.body.password, targetUser.password);

        if (checkPass) {
            req.session.user = {
                id: targetUser._id
            };
            res.status(200).json({success: true});

            console.log("Session after login:", req.session);
        }
        else {
            res.status(404).json({success: false});
        }

    });

    server.get("/user", async (req, res) => {
        if (req.session.user) {
            let user = await users.findById(req.session.user.id);
            return res.status(200).json({ user: user });
        }
        return res.status(401).json({ user: null });
    });

    server.get('/logout', (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        });
    });

    // For all other routes, use Next.js' default handler
    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});