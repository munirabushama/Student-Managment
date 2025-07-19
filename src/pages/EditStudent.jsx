import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudents } from '../hooks/useStudents.js'; 

export default function EditStudent() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();
  const { getStudentById, updateStudent } = useStudents(); // Destructure from the hook

  useEffect(() => {
    const fetchCurrentStudent = async () => {
      try {
        const data = await getStudentById(id); // Use getStudentById from the hook
        if (data) {
          setName(data.name);
          setAge(data.age);
          setGrade(data.grade);
        } else {
          // Handle case where student not found, e.g., navigate back or show error
          alert('Student not found.');
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching student for edit:", error);
        alert('Failed to load student data. Please try again.');
        navigate('/');
      }
    };
    fetchCurrentStudent();
  }, [id, getStudentById, navigate]); // Added getStudentById and navigate to dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the updateStudent function from the hook
      await updateStudent(id, { name, age: parseInt(age), grade });
      navigate('/'); // Navigate after successful update
    } catch (error) {
      console.error("Error updating student:", error);
      alert('Failed to update student. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Student</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <input
        type="text"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        placeholder="Grade"
        required
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}