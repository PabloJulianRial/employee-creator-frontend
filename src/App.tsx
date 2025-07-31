import EmployeeList from "./components/employeeList/EmployeeList";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <h1 className="app__title">Employee Directory</h1>
      <EmployeeList />
    </div>
  );
}

export default App;
