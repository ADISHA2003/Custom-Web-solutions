const { TinyDB } = require('tinydb');
const fs = require('fs').promises; // For file system access
const path = require('path');

const dbPath = path.join('/tmp', 'visitor-count.db');

// Function to initialize the database if it doesn't exist
async function initializeDatabase() {
  try {
    await fs.access(dbPath); // Check if the file exists
  } catch (err) {
    // File doesn't exist, so create it
    const db = new TinyDB(dbPath);
    await db.setData('/', 0); // Initialize with a count of 0
  }
}

export default async function handler(req, res) {
  try {
    await initializeDatabase(); // Ensure DB is initialized

    const db = new TinyDB(dbPath);
    let count = db.getData('/') || 0;
    count++;
    db.setData('/', count);
    res.status(200).json({ visitorCount: count });
  } catch (error) {
    console.error("Error updating counter:", error);
    res.status(500).json({ error: 'Failed to update counter' });
  }
}
