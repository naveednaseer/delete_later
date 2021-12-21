import React, { useState, useEffect } from 'react'
import { variables } from '../variables.js'

const Employee = () => {


    let [department, setDepartment] = useState([])
    let [employee, setEmployee] = useState([])

    let [values, setValues] = useState({
        departments: [],
        employees: [],
        modalTitle: "",
        employeeId: "",
        employeeName: "",
        department: "IT",
        dateOfJoining: "",
        photoFileName: "default.png",
        photoPath: variables.PHOTO_URL
    })

    useEffect (() => {
        getData()
    }, [])


    let getData = async () => {
        let response_emp = await fetch (variables.API_URL + "employee")
        let data_emp = await response_emp.json()

        setEmployee(data_emp)

        let response_dep = await fetch (variables.API_URL + "department")
        let data_dep = await response_dep.json()

        setDepartment(data_dep)
    }




    let changeEmployeeName = (e) => {
        setValues({...values, 'employeeName': e.target.value})
    }

    let changeDepartment = (e) => {
        setValues({...values, 'department': e.target.value})
    }

    let changeDateOfJoining = (e) => {
        setValues({...values, 'dateOfJoining': e.target.value})
    }



    let addClick = () => {
        setValues({...values, modalTitle:"Add Employee", employeeName: "", employeeId: 0, department: "IT", dateOfJoining: "", photoFileName: "default.png"})
    }

    let editClick = (emp) => {
        setValues({...values,modalTitle:"Edit Employee", employeeName: emp.EmployeeName, employeeId: emp.EmployeeId, department: emp.Department, dateOfJoining: emp.DateOfJoining, photoFileName: emp.PhotoFileName})
    }

    let createClick = () => {
        fetch(variables.API_URL+"employee/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                EmployeeName: values.employeeName, EmployeeId: values.employeeId, Department: values.department, DateOfJoining: values.dateOfJoining, PhotoFileName: values.photoFileName
            })
        })
        .then(res => res.json())
        .then((result) => {
            getData()
            setValues({...values, modalTitle:"Add Employee", employeeName: "", employeeId: 0, department: "IT", DateOfJoining: ""})
        }, (error) => {
        })
    }


    let updateClick = () => {
        fetch(variables.API_URL+"employee/", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                EmployeeId: values.employeeId, 
                EmployeeName: values.employeeName, 
                Department: values.department, 
                DateOfJoining: values.dateOfJoining, 
                PhotoFileName: values.photoFileName
            })
        })
        .then(res => res.json())
        .then((result) => {
            getData()
            console.log(result)
        }, (error) => {
        })
    }


    let deleteClick = (id) => {
        if(window.confirm("Are you sure you want to delete this item?")){
            fetch(variables.API_URL+"employee/"+id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })


            .then(() => {
                getData()
            }, (error) => {
                console.log(error)
            })
    }
    }


    let imagUpload = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name)

        fetch(variables.API_URL+"employee/savefile/", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            setValues({...values, photoFileName: data})
        })
    }


    return (
        <div>

            <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => addClick()}>Add Employee</button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>
                            EmployeeId
                        </th>
                        <th>
                            EmployeeName
                        </th>
                        <th>
                            Department
                        </th>
                        <th>
                            D.O.J
                        </th>
                        <th>
                            Options
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((emp) => 

                        <tr key={emp.EmployeeId}>
                            <td>{emp.EmployeeId}</td>
                            <td>{emp.EmployeeName}</td>
                            <td>{emp.Department}</td>
                            <td>{emp.DateOfJoining}</td>
                            <td>
                                
                                {/* >>>>>>EDIT BUTTON<<<<<< */}
                                <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => editClick(emp)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>

                                {/* >>>>>>>DELETE BUTTON<<<<<<<<<<< */}
                                <button type="button" className="btn btn-light mr-1" onClick={() => deleteClick(emp.EmployeeId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>

                            </td>
                        </tr>
                        )}
                </tbody>
            </table>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{values.modalTitle}</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>

                        </div>

                        <div className="modal-body">

                            <div className="d-flex flex-row bd-highlight mb-3">

                                <div className="p-2 w-50 bd-highlight">
                                    

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Employee Name</span>
                                        <input name = 'employeeName' type="text" className="form-control" value={values.employeeName} onChange={(e) => {changeEmployeeName(e)}} />
                                        {/* <input type="text" className="form-control" value={departmentName} onChange={changeDepartmentName} /> */}
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Department</span>
                                        <select className="form-select" value={values.department} onChange={(e) => {changeDepartment(e)}} >
                                            {department.map((dep) => <option key={dep.DepartmentId}>
                                                {dep.DepartmentName}
                                            </option>)}
                                        </select>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">D.O.J</span>
                                        <input name = 'dateOfJoining' type="date" className="form-control" value={values.dateOfJoining} onChange={(e) => {changeDateOfJoining(e)}} />
                                    </div>

                                </div>

                                <div className="p-2 w-50 bd-highlight">
                                    <img width="250px" height="250px" src={values.photoPath + values.photoFileName} />
                                    <p>{values.photoPath + values.photoFileName}</p>
                                    <input className="m-2" type="file" onChange={(e) => imagUpload(e)} />
                                </div>

                            </div>

                                {values.employeeId == 0 ?
                                    <button type="button" className="btn btn-primary float-start" onClick={() => createClick()}>Create</button> :
                                    null
                                }

                                {values.employeeId != 0 ?
                                    <button type="button" className="btn btn-primary float-start" onClick={() => updateClick()}>Update</button> :
                                    null
                                }

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Employee
