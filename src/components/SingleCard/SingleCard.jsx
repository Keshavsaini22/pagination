import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './SingleCard.css'
import axios from 'axios';



function SingleCard({ name, price, id, setdata, data, desc, category, tag, amount }) {
  const [edit, setedit] = useState(false);
  const navigate = useNavigate();
  const [cate, setCate] = useState(category);
  const [input, setinput] = useState({
    name: name,
    price: price,
    desc: desc,
    tag: tag,
    amount: amount,
  })
  const getdata = (e) => {
    console.log(e.target.name);
    const { value, name } = e.target;
    setinput(() => {
      return { ...input, [name]: value.trim() }
    })
  }

  const handleCardClick = () => {
    navigate(`/user/${id}`)
  }

  const handledelete = async () => {
    try {

      const response = await axios.delete(`http://localhost:5000/deleteproduct?id=${id}`)
      if (response.status === 200) {
        console.log(response)
        const filterdata = data.filter(item => item._id != id)
        setdata(filterdata)
      }
      else {
        console.log("This is error")
      }
    }
    catch (error) {
      alert(error)
      console.error('Error:', error);

    }
  }

  const handleedit = () => setedit(!edit)

  const handlefromsubmit = async (e) => {
    console.log("my formmm")
    e.preventDefault();
    const data = { ...input, category: cate }
    console.log(data)

    try {
      const response = await axios.put(`http://localhost:5000/editproduct?id=${id}`, data);
      console.log("res", response);

      if (response.status === 200) {
        console.log(response.data)

        alert('Successful Editted')
        setinput(data)
        setedit(!edit)
      }

    }
    catch (error) {
      alert(error)
      console.error('Error:', error);

    }




  }


  return (
    <>
      <div className="card"  >
        <div className="name">{input.name}</div>
        <div className="name">{input.price}</div>
        <button onClick={handleCardClick}>All data</button>
        <button onClick={handleedit}>Edit</button>
        <button onClick={handledelete}>DELETE</button>

      </div>
      {edit && <>
        <form onSubmit={handlefromsubmit} >
          <div className="adminpage">
            <div className="dashboard">
              EDIT Dashboard
            </div>
            <div className="productname">
              <div className="info-txt">Product Name</div>
              <input type="text" value={input.name} required name='name' onChange={getdata}
              />
            </div>
            <div className="productprice">
              <div className="info-txt">Product Price</div>
              <input type="text" required name='price' value={input.price} onChange={getdata}
              />
            </div>
            <div className="productdesc">
              <div className="info-txt">Product Description</div>
              <input type="text" required name='desc' value={input.desc} onChange={getdata}
              />
            </div>
            <div className="productcategory">
              <label for="role">Choose a category:</label>

              <select name="category" id="category" onChange={(e) => {
                setCate(e.target.value);
                console.log(category);
              }}>
                <option value="basketball">Basketball</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>
            <div className="tag">
              <div className="info-txt">Product Tag</div>
              <input type="text" required name='tag' value={input.tag} onChange={getdata}
              />
            </div>
            <div className="productstock">
              <div className="info-txt">Amount of product</div>
              <input type='text' required name='amount' value={input.amount} onChange={getdata}
              />
            </div>
            <div className="btn">
            </div>
            <button type="submit">Submit</button>

          </div>
        </form>
      </>}


    </>
  )
}

export default SingleCard