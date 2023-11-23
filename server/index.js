import express from 'express';

const app = express();
app.use(express.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`ADS API is listening at http://localhost:${PORT}`);
});

