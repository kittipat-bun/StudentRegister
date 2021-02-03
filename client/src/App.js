import Axios from "axios";
import { useState } from "react";
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [faculty, setFaculty] = useState("");
  const [major, setMajor] = useState("");
  const [newName, setNewName] = useState("");
  


  const [studentList, setStudentList] = useState([]);

  const getStudent = () => {
    Axios.get("http://localhost:3001/student").then((response) => {
      setStudentList(response.data);
    });
  };

  const addStudent = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      faculty: faculty,
      major: major,
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          name: name,
          age: age,
          faculty: faculty,
          major: major,
        },
      ]);
    });
  };

  

  const updateStudentName = (id) => {
    Axios.put("http://localhost:3001/update", { name: newName, id: id }).then(
      (response) => {
        setStudentList(
          studentList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  age: val.age,
                  faculty: val.faculty,
                  major: val.major,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setStudentList(
        studentList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App-container">
      <h1 className="head">Student Information</h1>
      <div className="information">
        <from action="">
          <div className="mb-3">
            <label htmlFor="name" className="from-label">
              Name:
            </label>
            <input
              type="text"
              className="from-control"
              placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="from-label">
              Age:
            </label>
            <input
              type="number"
              className="from-control"
              placeholder="Enter age"
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="faculty" className="from-label">
              Faculty:
            </label>
            <input
              type="text"
              className="from-control"
              placeholder="Enter faculty"
              onChange={(event) => {
                setFaculty(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="major" className="from-label">
              Major:
            </label>
            <input
              type="text"
              className="from-control"
              placeholder="Enter major"
              onChange={(event) => {
                setMajor(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-success" onClick={addStudent}>
            Register
          </button>
        </from>
      </div>
      <hr />
      <div className="register">
        <button className="btn btn-primary" onClick={getStudent}>
          Show Student
        </button>
        <br></br>
        {studentList.map((val, key) => {
          return (
            <div className="student card">
              <div className="card-body  text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Age: {val.age}</p>
                <p className="card-text">Faculty: {val.faculty}</p>
                <p className="card-text">Major: {val.major}</p>
                <div className="d-flex">
                  <input
                    type="text"
                    type="text"
                    placeholder="Change Name"
                    onChange={(event) => {
                      setNewName(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      updateStudentName(val.id);
                    }}
                  >
                    Update
                  </button>
                </div>
                <br></br>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteStudent(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
