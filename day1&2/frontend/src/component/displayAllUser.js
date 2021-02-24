import React from 'react';
function DisplayAllUser(props) {
    return (<>
        <p>List of Users</p>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile Number</th>
                    <th>Address</th>
                </tr>

            </thead>
            {props.user.map((item) => {
                return (
                    <tbody>
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.mobile}</td>
                            <td>{item.address}</td>
                        </tr>
                    </tbody>
                )
            })}
        </table>
    </>
    )

}
export default DisplayAllUser;