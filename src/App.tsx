import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/employeeList/EmployeeList.tsx";
import EmployeeCard from "./components/employeeCard/EmployeeCard.tsx";
import "./App.scss";
function App() {
  return (
    <Router>
      <div className="app">
        <h1 className="app__title">Employee Directory</h1>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
