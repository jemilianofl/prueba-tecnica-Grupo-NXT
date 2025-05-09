import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tareas" element={<TaskList />} />
        <Route path="/crear" element={<TaskForm />} />
        <Route path="/editar/:id" element={<TaskForm />} />
      </Routes>
    </Router>
  );
}

export default App;