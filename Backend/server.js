import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json());

// open SQLite DB
const dbPromise = open({
  filename: "./stages.db",
  driver: sqlite3.Database,
});

// ✅ Initialize DB schema if not exists
async function initDB() {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS stages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stage_number INTEGER NOT NULL UNIQUE,
      name TEXT,
      description TEXT,
      start_date DATETIME NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_stages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      stage_number INTEGER NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, stage_number)
    );

    CREATE TABLE IF NOT EXISTS views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      device_id TEXT,
      ip_address TEXT,
      user_agent TEXT,
      viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert default stages only if table is empty
  const count = await db.get(`SELECT COUNT(*) as count FROM stages`);
  if (count.count === 0) {
    await db.run(`
      INSERT INTO stages (stage_number, name, description, start_date) VALUES
      (1, 'Stage 1', 'First quiz', '2025-09-10 00:00:00'),
      (2, 'Stage 2', 'Second quiz', '2025-09-12 00:00:00'),
      (3, 'Stage 3', 'Third quiz', '2025-09-14 00:00:00')
    `);
  }
}

// ---------- Endpoints ----------

// ✅ /check
app.post("/check", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const db = await dbPromise;
    await db.run(`INSERT OR IGNORE INTO users (user_id) VALUES (?)`, [userId]);

    const lastStage = await db.get(
      `SELECT stage_number FROM user_stages 
       WHERE user_id = ? 
       ORDER BY stage_number DESC 
       LIMIT 1`,
      [userId]
    );

    const now = new Date();

    if (!lastStage) {
      const stage1 = await db.get(
        `SELECT * FROM stages WHERE stage_number = 1`
      );
      if (stage1 && now >= new Date(stage1.start_date)) {
        return res.json({ currentStage: 1 });
      } else {
        return res.json({ message: "Competition has not started yet" });
      }
    }

    const nextStage = await db.get(
      `SELECT * FROM stages WHERE stage_number = ?`,
      [lastStage.stage_number + 1]
    );

    if (!nextStage) {
      return res.json({ message: "User completed all stages" });
    }

    if (now >= new Date(nextStage.start_date)) {
      return res.json({ currentStage: nextStage.stage_number });
    } else {
      return res.json({ currentStage: lastStage.stage_number });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to check stage" });
  }
});

// ✅ /submit
app.post("/submit", async (req, res) => {
  try {
    const { userId, stageNumber } = req.body;
    if (!userId || !stageNumber) {
      return res
        .status(400)
        .json({ error: "userId and stageNumber are required" });
    }

    const db = await dbPromise;
    await db.run(`INSERT OR IGNORE INTO users (user_id) VALUES (?)`, [userId]);
    await db.run(
      `INSERT OR IGNORE INTO user_stages (user_id, stage_number) VALUES (?, ?)`,
      [userId, stageNumber]
    );

    res.json({ success: true, message: `Stage ${stageNumber} completed` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit stage" });
  }
});

// ✅ /report
app.get("/report", async (req, res) => {
  try {
    const db = await dbPromise;
    const totalStages = await db.get(`SELECT COUNT(*) as count FROM stages`);
    const users = await db.all(
      `SELECT u.user_id
       FROM users u
       WHERE (
         SELECT COUNT(*) FROM user_stages us WHERE us.user_id = u.user_id
       ) = ?`,
      [totalStages.count]
    );

    res.json({ completedUsers: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

// ✅ /view
app.post("/view", async (req, res) => {
  try {
    const { userId, deviceId } = req.body;
    const db = await dbPromise;

    await db.run(
      `INSERT INTO views (user_id, device_id, ip_address, user_agent)
       VALUES (?, ?, ?, ?)`,
      [
        userId || null,
        deviceId || null,
        req.ip,
        req.headers["user-agent"] || null,
      ]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log view" });
  }
});

// ✅ /views/summary
app.get("/views/summary", async (req, res) => {
  try {
    const db = await dbPromise;
    const totalViews = await db.get(`SELECT COUNT(*) as count FROM views`);
    const uniqueUsers = await db.get(
      `SELECT COUNT(DISTINCT user_id) as count FROM views WHERE user_id IS NOT NULL`
    );
    const uniqueDevices = await db.get(
      `SELECT COUNT(DISTINCT device_id) as count FROM views WHERE device_id IS NOT NULL`
    );

    res.json({
      totalViews: totalViews.count,
      uniqueUsers: uniqueUsers.count,
      uniqueDevices: uniqueDevices.count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch view summary" });
  }
});

// ✅ /stages (insert/update)
app.post("/stages", async (req, res) => {
  try {
    const { stage_number, name, description, start_date } = req.body;
    if (!stage_number || !start_date) {
      return res
        .status(400)
        .json({ error: "stage_number and start_date are required" });
    }

    const db = await dbPromise;
    const existing = await db.get(
      `SELECT id FROM stages WHERE stage_number = ?`,
      [stage_number]
    );

    if (existing) {
      await db.run(
        `UPDATE stages 
         SET name = ?, description = ?, start_date = ? 
         WHERE stage_number = ?`,
        [name, description, start_date, stage_number]
      );
      return res.json({ message: "Stage updated successfully" });
    } else {
      await db.run(
        `INSERT INTO stages (stage_number, name, description, start_date) 
         VALUES (?, ?, ?, ?)`,
        [stage_number, name, description, start_date]
      );
      return res.json({ message: "Stage inserted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert/update stage" });
  }
});

// start server
const PORT = 5000;
app.listen(PORT, async () => {
  await initDB(); // ✅ ensure DB schema exists
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
