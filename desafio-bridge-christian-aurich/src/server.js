const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(helmet())

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({ express: 'Express server' });
});

app.post('/prime-checker', (req, res) => {
  const { number } = req.body

  let isPrime = true;

  if (number === 1) {
    isPrime = false;
  }

  for (let i = 2; i < number; i++){
      if (number % i === 0){
        isPrime = false;
      }
  }
  
  res.json({ ok: false, isPrime })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
