import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/Context';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

const Create = () => {
  const history = useHistory()
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const storage = getStorage();
  const storageRef = ref(storage, `/image/${image.name}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        console.log(url);
        try {
          addDoc(collection(db, "products"), {
            product,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: new Date().toDateString()
          }).then(() => {
            let timerInterval
            Swal.fire({
              icon:'success',
              title: 'Product added succesfully',
              html: 'I will close in <b></b> milliseconds.',
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
              history.push('/')
            })

          })
        } catch (error) {
          alert(`Error:${error.message}`)
        }
      }).catch((err)=>{
        alert(err.message)
      })
    }).catch((err)=>{
      alert(err.message)
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input"
              type="number"
              id="fname"
              name="Price" />
            <br />

            <br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file" />
            <br />
            <button className="uploadBtn">Upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
