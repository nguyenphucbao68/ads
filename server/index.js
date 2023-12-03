import express from 'express';
import addSocket from './middlewares/realtime';
import socketHandler from './utils/socketHandler';

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors:{
    origin: "*"
  }
});

app.use(express.json());
app.use(addSocket(io));

app.get('/', function (req, res) {
  res.json({
    msg: 'hello from expressjs',
  });
});

app.get('/err', function (req, res) {
  throw new Error('Error!');
});

app.use(function (req, res) {
  res.status(404).json({
    error: 'Endpoint not found.',
  });
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).json({
    error: 'Something wrong!',
  });
});

socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`ADS API is listening at http://localhost:${PORT}`);
});

