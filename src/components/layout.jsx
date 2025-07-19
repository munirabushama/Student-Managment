import { Link } from 'react-router-dom';
import '../assets/styles/Layout.css'; 
export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <header className="app-header">
        <nav className="main-nav">
          <Link to="/" className="nav-button home-button">Home</Link>
          <Link to="/add" className="nav-button add-student-button">Add Student</Link>
        </nav>
        <h1 className="app-title">Student Management</h1>
      </header>
      <main className="app-content">
        {children}
      </main>
    </div>
  );
}