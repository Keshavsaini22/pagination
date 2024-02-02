import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './UserData.css'

function UserDetail() {
  const [product, setproduct] = useState({});
  let { id } = useParams();
  useEffect(() => {
    async function UserFunc() {
      const response = await User_details();
      console.log(response);
      setproduct(response.data);
    }
    UserFunc();
  }, [])

  const User_details = async () => axios.get('http://localhost:5000/product', {
    params: {
      id: id
    }
  })


  return (
    <>
      <div className="adminpage">
        <div className="dashboard">
          Product info
        </div>
        <div className="productname">
          <div className="info-txt">Product Name  : {product.name}</div>
          {/* <input type="text" required name='name' onChange={getdata} /> */}
        </div>
        <div className="productprice">
          <div className="info-txt">Product Price  : {product.price}</div>
          {/* <input type="text" required name='price' onChange={getdata} /> */}
        </div>
        <div className="productdesc">
          <div className="info-txt">Product Description  : {product.desc}</div>
          {/* <input type="text" required name='desc' onChange={getdata} /> */}
        </div>
        <div className="productcategory">
          <div className="info-txt">Product Category  : {product.category}</div>
        </div>
        <div className="tag">
          <div className="info-txt">Product Tag  : {product.tag}</div>
          {/* <input type="text" required name='tag' onChange={getdata} /> */}
        </div>
        <div className="productstock">
          <div className="info-txt">Amount of product  : {product.amount}</div>
          {/* <input type='text' required name='amount' onChange={getdata} /> */}
        </div>
        <div className="btn">
        </div>

      </div>
      
    </>
  )
}

export default UserDetail