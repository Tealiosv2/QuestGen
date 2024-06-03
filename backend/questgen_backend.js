const express = require('express');
const cors = require('cors');
const https = require('https');
const fetch = require('node-fetch');
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
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/api/login-python', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const response = await fetch('http://127.0.0.1:5000/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Response from Python server:', data);
        res.status(200).json(data);  // Respond to the client with the received data
    } else {
        console.error('Error response from Python server:', response.statusText);
        res.status(response.status).json({ error: 'Error from Python server', details: response.statusText });
    }
      
    }catch (error) {
        console.error('Error sending data to Python server:', error);
        res.status(500).json({ error: 'An error occurred while sending data to the Python server' });
      }
    });



app.post('/api/send-data', async (req, res) => {
    const data = req.body.data;

    try {
        // Send the data to the Python server using node-fetch
        const response = await fetch('http://127.0.0.1:5000/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: data })
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