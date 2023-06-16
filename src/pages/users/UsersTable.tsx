import React, {useEffect, useState} from 'react';
import {IUser} from "../../types/user";

const UsersTable = (props: { users: IUser[] }) => {
    const [users, setUsers] = useState<IUser[]>(props.users);

    useEffect(() => {
        setUsers(props.users);
    }, [props.users])

    return (
        users.length === 0 ?
            <div>
                <h1>Users not found</h1>
            </div>
            :
            <table className="table">
                <caption>Users</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.phone ? user.phone : "N/A"}</td>
                        <td>{user.address ? user.address : "N/A"}</td>
                        <td>{user.role}</td>
                    </tr>
                )}
                </tbody>
            </table>
    );
};

export default UsersTable;