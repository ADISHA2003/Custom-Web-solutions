const fs = require('fs').promises; // Use promises for easier async/await
const lockfile = require('proper-lockfile');

const counterFile = path.join('/tmp', 'counter.txt');

export default async function handler(req, res) {
  try {
    await lockfile.lock(counterFile, { stale: 5000, retries: 100 });
    let count = parseInt(await fs.readFile(counterFile, 'utf-8')) || 0;
    count++;
    await fs.writeFile(counterFile, count.toString());
    res.status(200).json({ visitorCount: count });
  } catch (error) {
    console.error("Error updating counter:", error);
    res.status(500).json({ error: 'Failed to update counter' });
  } finally {
    await lockfile.unlock(counterFile);
  }
}