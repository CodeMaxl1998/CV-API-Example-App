require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json())

const API_URL = 'https://curriculumvitae-api-7cfaa3f879a2.herokuapp.com';
const API_KEY = process.env.API_KEY;

app.get('/proxy/applicants', async (req, res) => {
    const response = await fetch(`${API_URL}/personal-info`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`
      }
    });
  
    const data = await response.json();
    res.json(data);
  });

  app.get('/proxy/applicant/:applicantId', async (req, res) => {
    const applicantId = req.params.applicantId; // Get applicantId from the URL parameter
  
    const response = await fetch(`${API_URL}/personal-info/${applicantId}`, { // Use the applicantId in your fetch URL
      headers: {
        'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`
      }
    });
  
    if (!response.ok) {
      return res.status(response.status).json({ message: `HTTP error ${response.status}` });
    }
  
    const data = await response.json();
    res.json(data);
  });

  app.get('/proxy/education/:applicantId', async (req, res) => {
    const applicantId = req.params.applicantId; // Get applicantId from the URL parameter
  
    const response = await fetch(`${API_URL}/education/${applicantId}`, { // Use the applicantId in your fetch URL
      headers: {
        'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`
      }
    });
  
    if (!response.ok) {
      return res.status(response.status).json({ message: `HTTP error ${response.status}` });
    }
  
    const data = await response.json();
    res.json(data);
  });

  app.get('/proxy/work-experience/:applicantId', async (req, res) => {
    const applicantId = req.params.applicantId; // Get applicantId from the URL parameter
  
    const response = await fetch(`${API_URL}/work-experience/${applicantId}`, { // Use the applicantId in your fetch URL
      headers: {
        'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`
      }
    });
  
    if (!response.ok) {
      return res.status(response.status).json({ message: `HTTP error ${response.status}` });
    }
  
    const data = await response.json();
    res.json(data);
  });

  app.get('/proxy/skills/:applicantId', async (req, res) => {
    const applicantId = req.params.applicantId; // Get applicantId from the URL parameter
  
    const response = await fetch(`${API_URL}/skills/${applicantId}`, { // Use the applicantId in your fetch URL
      headers: {
        'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`
      }
    });
  
    if (!response.ok) {
      return res.status(response.status).json({ message: `HTTP error ${response.status}` });
    }
  
    const data = await response.json();
    res.json(data);
  });

  app.get('/proxy/notes/:applicantId', async (req, res) => {
    const applicantId = req.params.applicantId;
  
    const response = await fetch(`${API_URL}/notes/${applicantId}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`
      }
    });
  
    if (!response.ok) {
      return res.status(response.status).json({ message: `HTTP error ${response.status}` });
    }
  
    const data = await response.json();
    res.json(data);
  });

app.post('/proxy/notes/:applicantId', async(req, res) => {
    const { applicantId } = req.params;
    const { content } = req.body || "no content";
  
    try {
      const response = await fetch(`${API_URL}/notes/${applicantId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(`Error creating note`, error);
      res.status(500).json({ error: error.toString() });
    }
  });
  
  
app.put('/proxy/notes/:noteId', async(req, res) => {
  const { noteId } = req.params;
  const { content } = req.body;

  try {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(`Error updating note`, error);
    res.status(500).json({ error: error.toString() });
  }
});

app.delete('/proxy/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;

  try {
    const response = await fetch(`${API_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(`Error deleting note`, error);
    res.status(500).json({ error: error.toString() });
  }
});


app.listen(PORT);