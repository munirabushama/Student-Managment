import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:5000/students';

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data);
    } catch (e) {
      console.error("Failed to fetch students:", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const addStudent = useCallback(async (newStudent) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      if (!response.ok) throw new Error('Failed to add student');
      const addedStudent = await response.json();
      setStudents(prevStudents => [...prevStudents, addedStudent]);
      return addedStudent;
    } catch (e) {
      console.error("Error adding student:", e);
      throw e;
    }
  }, []);

  const updateStudent = useCallback(async (id, updatedStudent) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent),
      });
      if (!response.ok) throw new Error('Failed to update student');
      const data = await response.json();
      setStudents(prevStudents =>
        prevStudents.map(student => (student.id === id ? data : student))
      );
      return data;
    } catch (e) {
      console.error("Error updating student:", e);
      throw e;
    }
  }, []);

  const deleteStudent = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete student');
      setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
    } catch (e) {
      console.error("Error deleting student:", e);
      throw e;
    }
  }, []);

  const getStudentById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (e) {
      console.error("Failed to fetch single student:", e);
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    students,
    loading,
    error,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    setStudents
  };
}