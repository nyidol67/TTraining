import React, { useState } from 'react';
import axios from 'axios';
const deleteUrl = 'http://localhost:8900/deleteUser';

function DisplayAllUser(props) {
    
    function handleDeleteClick(userId){
        console.log(userId);
        axios.delete(deleteUrl,{params:{_id: userId}})
        .then((response)=>console.log(response.data));
        props.display();
    }
    return (<>
        <div className="container">
            <h3 style={{ color: "grey" }}><center>List of Users</center></h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Address</th>
                        <th>Function</th>
                    </tr>

                </thead>
                {props.user.map((item) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.mobile}</td>
                                <td>{item.address}</td>
                                <td>
                                    <ul className="list-inline m-0">
                                        <li className="list-inline-item">
                                            <button className="btn btn-danger btn-sm rounded-0" value={item._id} onClick={(e)=>{handleDeleteClick(e.currentTarget.value)}}><i class="fa fa-trash"></i></button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                        </tbody>
                    )
                })}
            </table>

        </div>
    </>
    )

}
export default DisplayAllUser;