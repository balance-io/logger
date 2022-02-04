const express = require(`express`);
const cors = require(`cors`);

let responseData = {
    logs: [],
};

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    headers: `Origin, X-Requsted-With, Content-Type, Accept`,
    methods: `PUT, PATCH, GET, POST, DELETE, OPTIONS`,
    origin: `*`,
}));

app.use('/', express.static(`public`));

app.get(`/json`, (req, res) => {
    res.set(`Content-Type`, `application/json`);
    res.writeHead(200);
    res.end(JSON.stringify(responseData));
});

app.get(`/add`, (req, res) => {
    res.set(`Content-Type`, `application/json`);
    const message = req.query[`message`];
    const senderContext = req.query[`sender`];
    if (typeof message !== `undefined` && typeof senderContext !== `undefined`) {
        const timestamp = Date.now();
        responseData.logs.push({
            message,
            senderContext,
            timestamp,
        });
        res.writeHead(200);
        res.end(JSON.stringify({
            error: false,
            message: `Success.`,
        }));
    } else {
        console.log('fail');
        res.writeHead(500);
        res.end(JSON.stringify({
            error: true,
            message: `Unable to add log.`,
        }));
    }
});

app.post(`/clear`, (req, res) => {
    res.set(`Content-Type`, `application/json`);
    responseData.logs = [];
    res.writeHead(200);
    res.end(JSON.stringify({
        error: false,
        message: `Success.`,
    }));
});

const startup = () => console.log(`Listening for requests at http://localhost:3000`);

app.listen(3000, startup);
