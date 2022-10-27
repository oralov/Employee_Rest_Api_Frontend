import React from "react";
import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
    CALL_API: 'call-api',
    SUCCESS: 'success',
    ERROR: 'error',
    DELETE: 'delete'
};

const employeesDetailsReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.CALL_API: {
            return {
                ...state,
                loading: true,
            };
        }
        case ACTIONS.SUCCESS: {
            return {
                ...state,
                loading: false,
                employeesDetails: action.data,
            };
        }
        case ACTIONS.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case ACTIONS.DELETE: {
            return{
                ...state,
                loading: false,
                employeesDetails: action.data,
            }
        }
        
    }
    
};

const initialState = {
    employeesDetails: [],
    loading: false,
    error: null,
};

const Employees = () => {
    const [state, dispatch] = useReducer(employeesDetailsReducer, initialState);
    const { employeesDetails, loading, error } = state;

    useEffect(() => {
        dispatch({ type: ACTIONS.CALL_API });
        const getEmployees = async () => {
            let response = await axios.get('http://applb-1964551127.us-east-2.elb.amazonaws.com/api/v1/employees/');
            if (response.status == 200) {
                dispatch({ type: ACTIONS.SUCCESS, data: JSON.parse(response.data)});
                return;

            }
            dispatch({ type: ACTIONS.ERROR, error: "Something went wrong" });
        };

        getEmployees();
    }, []);

     function deleteItem (id){
    const arr = employeesDetails.filter((x) => x.Id !== id )
    dispatch({type: ACTIONS.DELETE, data: arr } )
   let res = axios.delete(`http://applb-1964551127.us-east-2.elb.amazonaws.com/api/v1/employees/${id}`)
     }


    return (
        <div>
            {loading ? (
                <p>loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table>
                    <tbody>
                    <tr>
                    <th>employee_id</th>
                    <th>employee_name</th>
                    <th>employee_age</th>
                    <th>employee_salary</th>
                    <th></th>
                    </tr>
                    
                    {employeesDetails.map((emp) => (
                        <tr key={emp.Id}>
                        <td key={1}>{emp.Id}</td>
                        <td key={2}>{emp.Name}</td>
                        <td key={3}>{emp.Age}</td>
                        <td key={4} >{emp.Salary}</td>
                        <td key={5} ><button onClick={() => deleteItem(emp.Id)} >Delete</button></td>
                        </tr>
                    ))}
                    
                    </tbody>
                </table>
                   
            )}
        </div>
    );
};

export default Employees;