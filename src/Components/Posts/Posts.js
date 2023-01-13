import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';
import Heart from '../../assets/Heart';
import './Post.css';
import { postContext } from '../../store/postContext';
import { useHistory } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([])
  const { setPostDetails } = useContext(postContext)
  const history = useHistory()

  useEffect(() => {
    getDocs(collection(db, "products")).then((querySnapshot) => {
      const allProducts = querySnapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allProducts)
    })
  }, [])


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => {
            console.log(product);
            return <div className="card" onClick={() => {
              setPostDetails(product)
              history.push('/view')
            }}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.product}</p>
              </div>
              <div className="date">
                <span>Tue May 04 2021</span>
              </div>
            </div>

          })}
        </div>

      </div>
    </div>
  );
}

export default Posts;
