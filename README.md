# Employee Creator Frontend

A simple React + TypeScript application for viewing, adding, deleting, and editing employees.  
It connects to a Scala backend with a MySQL database.

## Features

- View the list of all employees
- See basic info for each employee
- Click an employee to view full details and edit them
- Add a new employee using a form
- Deleting an employee

---

## Endpoints

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | `/employees`     | Get all employees        |
| GET    | `/employees/:id` | Get employee by ID       |
| POST   | `/employees`     | Create a new employee    |
| PATCH  | `/employees/:id` | Update an employee by ID |
| DELETE | `/employees/:id` | Delete an employee by ID |

---

## Backend Setup

1. **Clone & run the backend repo**

```bash
 git clone https://github.com/PabloJulianRial/employee-creator-backend.git

 cd employee-creator-frontend
```

2. Follow instructions in backend's README.md file to connect database to API.
3. Start the backend with:

```bash
sbt run
```

4. By default, the backend should be available at `http://localhost:9000`.

---

## Frontend Setup

1. **Clone & run the frontend repo**:

```bash
git clone https://github.com/PabloJulianRial/employee-creator-frontend.git

cd employee-creator-frontend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the development server**:

```bash
npm run dev
```

4. Open your browser and go to:

```
http://localhost:5173
```

---

## Usage

1. **View Employees**

- The home page lists all employees with basic info.

2. **Add a New Employee**

- Click the **"Add Employee"** button.
- Fill in the form fields.
- Click **Save**.

3. **Edit an Employee**

- Click **"View"** on any employee in the list.
- Update details and click **Save**.

4. **Delete an Employee**

- Open any employee card.
- Click **Delete**.
- Confirm in the dialogue.
- You’ll be returned to the list after deletion.

---

## Tech Stack

- **React**
- **TypeScript**
- **SCSS**
- **Axios**

---
