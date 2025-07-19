import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudents } from '../hooks/useStudents.js'; 
import '../assets/styles/StudentList.css';

export default function StudentList() {
  const { students, loading, error, deleteStudent, fetchStudents } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (students.length === 0 && !loading && !error) {
      fetchStudents();
    }
  }, [students, loading, error, fetchStudents]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
      } catch (err) {
        alert('Failed to delete student: ' + err.message);
      }
    }
  };

  const filteredStudents = useMemo(() => {
    if (!searchTerm) {
      return students;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        student.grade.toLowerCase().includes(lowerCaseSearchTerm) ||
        String(student.age).includes(lowerCaseSearchTerm)
    );
  }, [students, searchTerm]);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;
  if (filteredStudents.length === 0 && searchTerm === '') return <p>No students found. Add a new student!</p>;
  if (filteredStudents.length === 0 && searchTerm !== '') return <p>No students match your search.</p>;

  const getGradeClass = (grade) => {
    switch (grade.toUpperCase()) {
      case 'A+':
      case 'A':
        return 'grade-a';
      case 'B+':
      case 'B':
        return 'grade-b';
      case 'C+':
      case 'C':
        return 'grade-c';
      case 'D+':
      case 'D':
        return 'grade-d';
      case 'F':
        return 'grade-f';
      default:
        return '';
    }
  };

  return (
    <div className="student-list-container">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by name, age, or grade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              <th>NAME <span className="info-icon" title="Student's Full Name">ⓘ</span></th>
              <th>AGE <span className="info-icon" title="Student's Age">ⓘ</span></th>
              <th>GRADE <span className="info-icon" title="Student's Grade">ⓘ</span></th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td data-label="Name">{student.name}</td>
                <td data-label="Age">{student.age}</td>
                <td data-label="Grade">
                  <span className={`grade-badge ${getGradeClass(student.grade)}`}>
                    {student.grade}
                  </span>
                </td>
                <td data-label="Actions" className="actions-cell">
                  <Link to={`/edit/${student.id}`} className="action-button edit-button">
                    <i className="fas fa-pencil-alt"></i>
                  </Link>
                  <button onClick={() => handleDelete(student.id)} className="action-button delete-button">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}