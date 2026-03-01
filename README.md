# 🖋️ Quills Literary Society - Platform Architecture <br><br>

Welcome to the official web platform for the **Quills Literary Society** at Quantum University. <br>
This project is a custom-built, full-stack web application designed to serve as a digital hub for writers, poets, and readers. It transitions the society from manual record-keeping to a dynamic, cloud-based ecosystem. <br><br>

---

## 🌟 Unique Selling Propositions (USPs) <br><br>

What sets this university club website apart from standard templates: <br><br>

* **Zero-Touch Publishing Pipeline:** A fully automated workflow where student submissions are routed to an Admin CMS for 1-click approval, instantly publishing them to the live journal without touching the code. <br>
* **The AI Muse:** An integrated Large Language Model (Google Gemini 2.5 Flash API) that acts as a real-time creative assistant, generating custom prompts, haikus, and opening sentences to cure writer's block. <br>
* **The Ambient Lounge:** A dedicated digital reading room featuring a glassmorphism UI, a built-in Pomodoro timer, an embedded Lo-Fi focus playlist, and an auto-saving writer's scratchpad utilizing browser `localStorage`. <br>
* **Privacy-First Attendance Tracking:** A dynamic system that calculates overall attendance percentages based on live database queries, locked behind an exact-name search to protect student privacy. <br>
* **Single-Page Application (SPA) Feel:** Utilizes a centralized `iframe` routing system (`index.html`) so the navigation bar and Dark Mode states remain persistent while content loads seamlessly. <br><br>

---

## 🔄 The Complete System Workflow <br><br>

The Quills platform operates on a centralized NoSQL cloud database (Firebase Firestore). The entire website reads from and writes to a single document path: `website/content`. <br><br>

### 1. The Publication Workflow (Submit -> Admin -> Live) <br>
* **Action:** A student writes a poem and submits it via `submit.html`. <br>
* **Data Flow:** The JavaScript intercepts the form, formats it as a JSON object, and pushes it to the `pendingJournal` array in Firestore. <br>
* **Review:** The society leads log into `admin.html`. The dashboard detects the pending array and displays the submission. <br>
* **Approval:** The admin clicks "Approve & Publish". The script splices the object from `pendingJournal` and pushes it into the live `journal` array in Firestore. <br>
* **Live Render:** The next time any user opens `journal.html`, the page fetches the updated database and dynamically generates a new aesthetic reading card for the poem. <br><br>

### 2. The Event Management Workflow <br>
* **Action:** Admins add a new society gathering via the Admin Panel. <br>
* **Data Flow:** The event details are saved to the `events` array in Firestore. <br>
* **Live Render:** The `events.html` page pulls this array and automatically constructs chronological event cards, complete with registration buttons linked to `comingsoon.html` (the embedded Google Form). <br><br>

### 3. The Attendance & Membership Workflow <br>
* **Action:** An admin adds a new member or marks them present for a specific date in the Admin Panel. <br>
* **Data Flow:** The database updates the `members` array. If marked present, that specific date string is added to the member's individual `attendance` array. <br>
* **Live Render:** When a student searches their exact name on `attendance.html`, the system counts all unique session dates across the entire society to determine the "Total Sessions Held". It then calculates the student's personal percentage and generates a color-coded progress bar. <br><br>

---

## 📁 File Structure & Routing <br><br>

* **`index.html`:** The master shell. Contains the responsive navigation bar, the Midnight Reading (dark mode) logic, and the central `iframe` that loads all other pages. <br>
* **`admin.html`:** The secured Content Management System. Handles all C.R.U.D. (Create, Read, Update, Delete) operations for the Firestore database. <br>
* **`submit.html`:** The public portal for sending literary works to the admin review queue. <br>
* **`journal.html`:** The live publication page featuring dynamic modal pop-ups for long-form reading. <br>
* **`events.html`:** The dynamic bulletin board for upcoming society sessions. <br>
* **`attendance.html`:** The secure student portal for checking participation records. <br>
* **`muse.html`:** The Gemini-powered AI writing assistant interface. <br>
* **`lounge.html`:** The interactive, ambient study space with focus tools. <br>
* **`comingsoon.html`:** The registration page featuring a Google Forms embed bypass. <br>
* **`about.html` / `vision.html` / `team.html`:** Static informational pages. <br><br>

---

## 🛠️ Tech Stack <br><br>

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+) <br>
* **Backend / Database:** Firebase (Cloud Firestore NoSQL) <br>
* **AI Integration:** Google Gemini API (`gemini-2.5-flash`) <br>
* **Deployment:** Vercel and GitHub <br><br>
