const express = require('express')
const cors = require('cors');
const port = process.env.PORT || 5000;

// require('dotenv').config();
// const { MongoClient, ServerApiVersion } = require('mongodb');

//mongoose connection
require('./src/db/conn')

// routes
const postroute=require('./src/routes/posts');

const app = express()

// middleware
app.use(cors());
app.use(express.json());
app.use('/post',postroute);

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kx9ii.mongodb.net/?retryWrites=true&w=majority`;
// const uri = "mongodb+srv://admin:Shj4TXkg3zxJ4PTx@cluster0.k3lbm8n.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    // await client.connect();
    // const userCollection = conn.userCollection;
    // client.db("project").collection('users');
    
    const verifyAdmin = async (req, res, next) => {
      const requester = req.decoded.email;
      const requesterAccount = await userCollection.findOne({ email: requester });
      if (requesterAccount.role === 'admin') {
        next();
      }
      else {
        res.status(403).send({ message: 'forbidden' });
      }
    }

    app.put('/user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };

      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send({ result });
    })

    app.get('/admin/:email', async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      const isAdmin = user.role === 'admin';
      res.send({ admin: isAdmin })
    })

    app.get('/user', async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    })
  }
  finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running genius server!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})