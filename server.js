const express = require('express');
const fs = require('fs');
const lockfile = require('proper-lockfile');
const path = require('path'); 

const app = express();
const port = 3000; 

const counterFile = path.join(__dirname, 'counter.txt'); 

// Function to get the current count (without incrementing)
async function getCurrentCount() {
  try {
    await lockfile.lock(counterFile, { stale: 5000, retries: 100 });
    let count = parseInt(fs.readFileSync(counterFile, 'utf-8')) || 0;
    return count;
  } catch (error) {
    console.error("Error reading counter:", error);
    return 0; 
  } finally {
    await lockfile.unlock(counterFile);
  }
}

// Function to increment the count
async function incrementCount() {
  try {
    await lockfile.lock(counterFile, { stale: 5000, retries: 100 });
    let count = parseInt(fs.readFileSync(counterFile, 'utf-8')) || 0;
    count++;
    fs.writeFileSync(counterFile, count.toString());
  } catch (error) {
    console.error("Error incrementing counter:", error);
  } finally {
    await lockfile.unlock(counterFile);
  }
}

// Serve static files 
app.use(express.static(path.join(__dirname, 'public'))); 

// API endpoint to get the visitor count (without incrementing)
app.get('/api/count', async (req, res) => {
  const count = await getCurrentCount();
  res.json({ visitorCount: count });
});

// API endpoint to increment the count
app.post('/api/count', async (req, res) => { // Use POST for incrementing
  await incrementCount();
  res.status(204).send(); // Send a 204 No Content response
});

// Route for your homepage 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
