import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/employeeList/EmployeeList";
import EmployeeCard from "./components/EmployeeCard/EmployeeCard";
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
