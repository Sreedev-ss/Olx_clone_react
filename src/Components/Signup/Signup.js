import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const auth = getAuth();
  const history = useHistory();
  const [userName, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
   createUserWithEmailAndPassword(auth, email, password).then((result) => {
      updateProfile(auth.currentUser, { displayName: userName, phoneNumber: phone }).then(async() => {
        const docRef = await addDoc(collection(db, "users"),{
          id: result.user.uid,
          user: userName,
          mobile: phone,
          email: email
        }).then(() => {
          history.push("/login")
        })
      })
    }).catch((err) => {
      console.log(err.message, "ErrMessage");
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img className='image' width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
