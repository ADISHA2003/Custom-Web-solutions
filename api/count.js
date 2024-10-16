const { TinyDB } = require('tinydb');
const path = require('path');

const db = new TinyDB(path.join('/tmp', 'visitor-count.db')); // Use /tmp for now

export default async function handler(req, res) {
  try {
    let count = db.getData('/') || 0; // Get existing count or initialize to 0
    count++;
    db.setData('/', count); // Update the count in the database
    res.status(200).json({ visitorCount: count });
  } catch (error) {
    console.error("Error updating counter:", error);
    res.status(500).json({ error: 'Failed to update counter' });
  }
}
