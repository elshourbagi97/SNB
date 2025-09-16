
````markdown
# 🚀 Stages Competition API

This project manages users, stages, and views for a quiz/competition system.  
It is built with **Node.js + Express + SQLite**.

---

## 📦 Installation

```bash
# Install dependencies
npm install

# Start server
npm start
````

Server runs at:

```
http://localhost:5000
```

---

## 📘 API Endpoints

### 🔹 1. `/check`

Check the **current available stage** for a user.

* **Method:** `POST`
* **Body (JSON):**

```json
{
  "userId": "user123"
}
```

* **Response (examples):**

```json
{ "currentStage": 1 }
```

```json
{ "message": "Competition has not started yet" }
```

```json
{ "message": "User completed all stages" }
```

---

### 🔹 2. `/submit`

Mark a stage as completed for a user.

* **Method:** `POST`
* **Body (JSON):**

```json
{
  "userId": "user123",
  "stageNumber": 1
}
```

* **Response:**

```json
{ "success": true, "message": "Stage 1 completed" }
```

---

### 🔹 3. `/report`

Get a list of all users who finished **all stages**.

* **Method:** `GET`
* **Response:**

```json
{
  "completedUsers": [
    { "user_id": "user123" },
    { "user_id": "user456" }
  ]
}
```

---

### 🔹 4. `/view`

Log a view (page load / request).

* **Method:** `POST`
* **Body (JSON):**

```json
{
  "userId": "user123",
  "deviceId": "deviceABC"
}
```

* **Response:**

```json
{ "success": true }
```

---

### 🔹 5. `/views/summary`

Get statistics of total and unique views.

* **Method:** `GET`
* **Response:**

```json
{
  "totalViews": 10,
  "uniqueUsers": 3,
  "uniqueDevices": 5
}
```

---

### 🔹 6. `/stages`

Insert a new stage **or** update an existing stage.

* **Method:** `POST`
* **Body (JSON):**

```json
{
  "stage_number": 4,
  "name": "Stage 4",
  "description": "Fourth quiz",
  "start_date": "2025-09-16 00:00:00"
}
```

* **Response (insert):**

```json
{ "message": "Stage inserted successfully" }
```

* **Response (update):**

```json
{ "message": "Stage updated successfully" }
```

---

## 📌 Notes

* All dates use `YYYY-MM-DD HH:mm:ss` format.
* A user can only access the next stage if:

  * They completed the previous one, AND
  * The current date >= `start_date` of that stage.
* If a new user checks late, they must still start from **Stage 1**.

---

## 🛠 Development Notes

* Database file: `stages.db` (auto-created if missing).
* To run in background: use [pm2](https://pm2.keymetrics.io/).

```bash
pm2 start server.js --name stages-app
pm2 save
pm2 startup
```

---

✅ Now your backend is ready to integrate with frontend.

```

3. Save with `CTRL+O`, then `CTRL+X`.

Now you can open the README in GitHub, VS Code, or Markdown viewers.  

👉 Do you want me to also generate the **SQL schema file (`schema.sql`)** with the tables + insert sample stages, so you can just `sqlite3 stages.db < schema.sql` to rebuild quickly?
```
