import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudents } from '../hooks/useStudents.js'; 

export default function AddStudent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();
  const { addStudent } = useStudents(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await addStudent({ name, age: parseInt(age), grade });
      navigate('/'); 
    } catch (error) {
      console.error("Error adding student:", error);
      alert('Failed to add student. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Student</h1>
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
      <button type="submit">Add Student</button>
    </form>
  );
}