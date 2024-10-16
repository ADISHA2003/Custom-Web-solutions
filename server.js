const express = require('express');
const fs = require('fs');
const lockfile = require('proper-lockfile');
const path = require('path'); // For serving static files

const app = express();
const port = 3000; 

const counterFile = path.join(__dirname, 'counter.txt'); // Construct path safely

// Function to increment and get the count (same as before)
async function incrementAndGetCount() {
  try {
    await lockfile.lock(counterFile, { stale: 5000, retries: 100 });
    let count = parseInt(fs.readFileSync(counterFile, 'utf-8')) || 0;
    count++;
    fs.writeFileSync(counterFile, count.toString());
    return count;
  } catch (error) {
    console.error("Error updating counter:", error);
    return 0; 
  } finally {
    await lockfile.unlock(counterFile);
  }
}

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public'))); 

// API endpoint to get the visitor count
app.get('/api/count', async (req, res) => {
  const count = await incrementAndGetCount();
  res.json({ visitorCount: count });
});

// Route for your homepage (index.html) - serves the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
