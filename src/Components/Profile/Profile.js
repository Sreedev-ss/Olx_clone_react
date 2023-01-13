import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import {AuthContext} from '../../store/Context'
import {getAuth,updateProfile} from 'firebase/auth'
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { useHistory } from 'react-router-dom'

function Profile() {
    
    useEffect(()=>{
        setName(user?.displayName)
        setEmail(user?.email)
    })

    const {user } = useContext(AuthContext)
    
    const [name,setName]  = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")

    console.log(user,"user");

    const auth = getAuth()
    const storage = getStorage()
    const storageRef = ref(storage,`/profile/${image.name}`)
    const history = useHistory()

    const handleSumbit = (e) => {
        e.preventDefault();

        uploadBytes(storageRef,image).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then(async(url)=>{
                try {
                    updateProfile(auth.currentUser,{
                        photoURL:url
                    }).then(()=>{
                        history.push('/')
                    })
                } catch (error) {
                    alert(`Error: ${error.message}`)
                }
            }).catch (error => {
                alert(`Error: ${error.message}`)
            })
        }).catch (error => {
            alert(`Error: ${error.message}`)
        })
    }

    return (
        <div>
            <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

            <div className="wrapper">
                <div className="left">
                    <img
                        width="150px"
                        height="150px"
                        src={image ? URL.createObjectURL(image) : user?.photoURL }
                         />
                    <h4>{name}</h4>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                    <br />
                </div>
                <div className="right">
                    <div className="info">
                        <h3>Information</h3>
                        <div className="info_data">
                            <div className="data">
                                <h4>User Name</h4>
                                <p>{name}</p>
                            </div>
                            <div className="data">
                                <h4>Email</h4>
                                <p>{email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="info">
                        <button className='button' onClick={handleSumbit} >Save</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile
