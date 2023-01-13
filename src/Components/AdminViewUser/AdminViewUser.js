import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { getDocs, collection, setDoc, doc, deleteDoc } from 'firebase/firestore'
import './AdminViewUser.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';

function AdminViewUser() {
    const [user, setUsers] = useState([])
    const [searchUser, setSearchUser] = useState([])
    const [editUser, setEditUser] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editName, setEditName] = useState()
    const [editEmail, setEditEmail] = useState()
    const [editMobile, setEditMobile] = useState()

    const history = useHistory()


    useEffect(() => {
        getDocs(collection(db, "users")).then((querySnapshot) => {
            const allUser = querySnapshot.docs.map((users) => {
                return {
                    ...users.data(),
                    id: users.id
                }
            })
            setUsers(allUser)
            setSearchUser(allUser)
        })
    }, [])

    const searchHandler = (e) => {
        e.preventDefault();
        let value = e.target.value.trim().toLowerCase()
        setSearchUser(user.filter((user) => {
            if (user.user.toLowerCase().includes(value)) {
                return user;
            }
        }))
    }

    const handleEdit = (users) => {
        handleShow()
        setEditUser(users)
    }

    const updateData = (e) => {
        e.preventDefault();
        const id = editUser.id

        try {
            setDoc(doc(db, "users", id), {
                user: editName ? editName : editUser.user,
                email: editEmail ? editEmail : editUser.email,
                mobile: editMobile ? editMobile : editUser.mobile,
                id: id
            }).then(() => history.go(0)).catch((err) => alert(`Error: ${err.message}`))
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = (user) => {
        const id = user.id
        deleteDoc(doc(db, "users", id)).then(() => {
            alert('Data Deleted successfully')
        }).catch((err)=>console.log(err.message,'signIn'))


    }


    return (
        <div>
            <h2 className='userMgmt' style={{ float: 'left' }}>User Management</h2>
            <input type="search"
                name=""
                placeholder=' Search for user '
                id=""
                style={{ float: 'right', width: 400, height: 40, margin: 20 }}
                onChange={searchHandler}
            />

            <table>
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {searchUser.map(users => {


                        return <tr>
                            <td data-label="Account">{users.user}</td>
                            <td data-label="Due Date">{users.mobile}</td>
                            <td data-label="Due Date">{users.email}</td>
                            <td data-label="Amount"><span style={{ cursor: 'pointer' }} onClick={() => handleEdit(users)}>Edit</span></td>
                            <td data-label="Amount"><span style={{ cursor: 'pointer' }} onClick={() => handleDelete(users)}>Delete</span></td>
                        </tr>
                    })}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editUser?.user}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="name@example.com"
                                autoFocus
                                defaultValue={editUser?.user}
                                onChange={(e) => {
                                    setEditName(e.target.value)
                                }}
                            />
                            <Form.Label className="mt-2">Email</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                defaultValue={editUser?.email}
                                onChange={(e) => {
                                    setEditEmail(e.target.value)
                                }}
                            />
                            <Form.Label className="mt-2">Mobile</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                defaultValue={editUser?.mobile}
                                onChange={(e) => {
                                    setEditMobile(e.target.value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}






export default AdminViewUser
