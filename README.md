# Employee Creator Frontend

A simple React + TypeScript application for viewing, adding, deleting, and editing employees **and their contracts**.  
It connects to a Scala + Play backend with a MySQL database.

## Features

- **Employees**

  - View the list of all employees (basic info)
  - Add a new employee using a form
  - Edit employee details
  - Delete an employee

- **Contracts**
  - View contracts for a specific employee
  - Open a contract to see full details
  - Add a new contract to an employee
  - Delete a contract

---

## Endpoints

### Employee Endpoints

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | `/employees`     | Get all employees        |
| GET    | `/employees/:id` | Get employee by ID       |
| POST   | `/employees`     | Create a new employee    |
| PATCH  | `/employees/:id` | Update an employee by ID |
| DELETE | `/employees/:id` | Delete an employee by ID |

### Contract Endpoints

| Method | Endpoint                                  | Description                          |
| ------ | ----------------------------------------- | ------------------------------------ |
| GET    | `/employees/:empId/contracts`             | Get all contracts for an employee    |
| GET    | `/employees/:empId/contracts/:contractId` | Get a specific contract for employee |
| POST   | `/employees/:empId/contracts`             | Create a new contract for employee   |
| DELETE | `/employees/:empId/contracts/:contractId` | Delete a contract for employee       |

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

- The home page lists all employees with basic info.

2. **Add a New Employee**

   - Click the **"Add Employee"** button.
   - Fill in the form fields.
   - Click **Save**.

3. **Edit an Employee**

   - Click **"View / Edit"** on any employee in the list.
   - Update details and click **Save**.

4. **Delete an Employee**

   - Open any employee card.
   - Click **Delete**.
   - Confirm in the dialogue.
   - You’ll be returned to the list after deletion.

5. **View Contracts**

   - Inside an employee card, click **View Contracts**.
   - The contracts list shows all contracts for that employee.

6. **Add a Contract**

   - Inside a contract card, click **+ Add Contract**.
   - Fill in the form (type, time, dates, hours, salary).
   - Save to create the contract.

7. **Delete a Contract**
   - Open a contract card.
   - Click **Delete**.
   - Confirm in the dialogue.
   - You’ll be returned to the contracts list.

---

## Tech Stack

- **React**
- **TypeScript**
- **SCSS**
- **Axios**

---
