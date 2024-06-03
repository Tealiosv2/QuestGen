const express = require('express');
const cors = require('cors');
const https = require('https');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const allowedOrigins = ['http://127.0.0.1:5500'];

// Configure CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow forwarding cookies
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/api/login-python', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
      // Send login request to Python server
      const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          credentials: 'include', // Include credentials (cookies)
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username, password: password })
      });

      if (response.ok) {
          // Parse response data
          const data = await response.json();
          const uid = data.uid;
          console.log("Received uid:", uid); // Log the received uid
          // Set the 'uid' cookie with the received uid
          res.cookie('uid', uid);
          res.send('Login successful');
      } else {
          console.error('Error response from Python server:', response.statusText);
          res.status(response.status).json({ error: 'Error from Python server', details: response.statusText });
      }
  } catch (error) {
      console.error('Error sending data to Python server:', error);
      res.status(500).json({ error: 'An error occurred while sending data to the Python server' });
  }
});


app.post('/api/send-data', async (req, res) => {
  const data = req.body.prompt;
  const cookie = req.body.cookie;
  console.log(cookie);

    try {
        // Send the data to the Python server using node-fetch
        const response = await fetch('http://127.0.0.1:5000/query', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cookie: cookie, prompt: data })
        });
    
        const responseData = await response.json();
        res.json(responseData);
      } catch (error) {
        console.error('Error sending data to Python server:', error);
        res.status(500).json({ error: 'An error occurred while sending data to the Python server' });
      }
    });

  

    


app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
  });