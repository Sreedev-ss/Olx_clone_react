import React, { useContext, useEffect, useRef, useState } from 'react';
import { postContext } from '../../store/postContext';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase/config';
import './View.css';

function View() {
  const {postDetails}  = useContext(postContext)
  const [userDetails,setUserDetails] = useState()
  useEffect(()=>{
    const {userId} = postDetails
    getDocs(query(collection(db, 'users'), where('id', '==', userId))).then((res) => {
      res.forEach(doc => {
        setUserDetails(doc.data());
      })
    })
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.product}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.user}</p>
          <p>{userDetails.mobile}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
