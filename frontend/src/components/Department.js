import React, { useState, useEffect } from 'react'
import { variables } from '../variables.js'

const Department = () => {


    let [department, setDepartment] = useState([])
let [filteredDepartments, setFilteredDepartment] = useState([])
let [values, setValues] = useState({
    modalTitle: '',
    departmentName: '',
    departmentId: 0,

    departmentIdFilter: "",
    departmentNameFilter: "",
    departmentsWithoutFilter: [],
})

useEffect (() => {
    getDepartments()
}, [])

useEffect (()=>{
      setFilteredDepartment(department)}, [department])

useEffect(()=>{
    filterFn()},[values])

let filterFn = () =>{
    let departmentIdFilter = values.departmentIdFilter
    let departmentNameFilter = values.departmentNameFilter

    values.departmentsWithoutFilter = [...department]

    let filteredData = values.departmentsWithoutFilter.filter(
        function(el){
            return el.DepartmentId.toString().toLowerCase().includes(
                departmentIdFilter.toString().trim().toLowerCase()
            ) &&
            el.DepartmentName.toString().toLowerCase().includes(
                departmentNameFilter.toString().trim().toLowerCase()
            )

        }
    )
    setFilteredDepartment(filteredData)

}


let changeDepartmentIdFilter = (e) => {
    setValues({...values, 'departmentIdFilter': e.target.value})
}


let changeDepartmentNameFilter = (e) => {
    console.log(e.target.value)
    setValues({...values, 'departmentNameFilter': e.target.value})
}


let getDepartments = async () => {
    let response = await fetch (variables.API_URL + "department")
    let data = await response.json()
}


let changeDepartmentName = (e) => {
    setValues({...values, 'departmentName': e.target.value})
}

let addClick = () => {
    setValues({...values,modalTitle:"Add Department", departmentName: "", departmentId: "0"})
}

let editClick = (dep) => {
    setValues({...values,modalTitle:"Edit Department", departmentName: dep.DepartmentName, departmentId: dep.DepartmentId})
    console.log('default values', values)
    console.log(dep.DepartmentId)
}

let createClick = () => {
    fetch(variables.API_URL+"department/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            DepartmentName: values.departmentName
        })
    })
    .then(res => res.json())
    .then((result) => {
        getDepartments()
        console.log(result)
        setValues({...values, departmentName: "", departmentId: "0"})
    }, (error) => {
        console.log(error)
    })
}


let updateClick = () => {
    fetch(variables.API_URL+"department/", {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            DepartmentId: values.departmentId,
            DepartmentName: values.departmentName
        })
    })
    .then(res => res.json())
    .then((result) => {
        getDepartments()
        console.log(result)
        setValues({...values, departmentName: "", departmentId: "0"})
    }, (error) => {
        console.log(error)
    })
}


let deleteClick = (id) => {
    if(window.confirm("Are you sure you want to delete this item?")){
        fetch(variables.API_URL+"department/"+id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })


        .then(() => {
            getDepartments()
        }, (error) => {
            console.log(error)
        })
}
}

return (
    <div>

        <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => addClick()}>Add Department</button>

        <table className="table table-striped">
            <thead>
                <tr>
                    <th>
                        <input className="form-control m-2" onChange={(e) => {changeDepartmentIdFilter(e)}} placeholder='Filter' />
                        DepartmentId
                    </th>
                    <th>
                        <input className="form-control m-2" onChange={(e) => {changeDepartmentNameFilter(e)}} placeholder='Filter' />
                        DepartmentName
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredDepartments.map((dep) => 

                    <tr key={dep.DepartmentId}>
                        <td>{dep.DepartmentId}</td>
                        <td>{dep.DepartmentName}</td>
                        <td>
                            
                            {/* >>>>>>EDIT BUTTON<<<<<< */}
                            <button type="button" className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => editClick(dep)}>
                                
                            </button>

                            {/* >>>>>>>DELETE BUTTON<<<<<<<<<<< */}
                            <button type="button" className="btn btn-light mr-1" onClick={() => deleteClick(dep.DepartmentId)}>
                                
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
                        <div className="input-group mb-3">
                            <span className="input-group-text">Department Name</span>
                            <input name = 'departmentName' type="text" className="form-control" value={values.departmentName} onChange={(e) => {changeDepartmentName(e)}} />
                            {/* <input type="text" className="form-control" value={departmentName} onChange={changeDepartmentName} /> */}
                        </div>

                        {values.departmentId == 0 ?
                            <button type="button" className="btn btn-primary float-start" onClick={() => createClick()}>Create</button> :
                            null
                        }

                        {values.departmentId != 0 ?
                            <button type="button" className="btn btn-primary float-start" onClick={() => updateClick()}>Edit</button> :
                            null
                        }

                    </div>

                </div>
            </div>
        </div>

    </div>
)
                    }

function App() {
  return (
    <Department/>
  );
}

export default App;
