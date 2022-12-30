const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

// database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hnlrj23.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const myTaskCollection = client.db('taskManager').collection('tasks');
        const completedTaskCollection = client.db('taskManager').collection('completedTask');

        //    tasks
        app.post('/tasks', async (req, res) => {
            const tasks = req.body;
            const task = await myTaskCollection.insertOne(tasks);
            res.send(task);
        })

        // app.get('/tasks', async (req, res) => {
        //     const query = {};
        //     const result = await myTaskCollection.find(query).toArray();
        //     res.send(result);
        // })

    }
    finally {

    }
}
run().catch(err => console.log(err));


app.get('/', async (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`task-manager server is running on port: ${port}`)
})