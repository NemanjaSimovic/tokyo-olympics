import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/tokyoolympics', { useNewUrlParser: true, useUnifiedTopology: true });

//removes the warninig tsc comands give you, although code works fine even without theese few lines.
//use in case you want to get rid of that annoying warning.

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);


const connection = mongoose.connection;

connection.once('once', ()=>{
    console.log('mongo open');
});

app.use('/api/users', userRoutes);

// app.get('/', (req, res) => res.send('Hello World!'));
// app.get('/apple', (req, res) => res.send('Apple!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));