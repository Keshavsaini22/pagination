import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './SingleCard.css'
import axios from 'axios';



function SingleCard({
  data, setItems, onUpdate
  // name, price, id, setdata, data, desc, category, tag, amount
}) {
  // const [edit, setedit] = useState(false);
  // const navigate = useNavigate();
  // const [cate, setCate] = useState(category);
  // const [input, setinput] = useState({
  //   name: name,
  //   price: price,
  //   desc: desc,
  //   tag: tag,
  //   amount: amount,
  // })
  // const getdata = (e) => {
  //   console.log(e.target.name);
  //   const { value, name } = e.target;
  //   setinput(() => {
  //     return { ...input, [name]: value.trim() }
  //   })
  // }

  // const handleCardClick = () => {
  //   navigate(`/user/${id}`)
  // }

  // const handledelete = async () => {
  //   try {

  //     const response = await axios.delete(`http://localhost:5000/deleteproduct?id=${id}`)
  //     if (response.status === 200) {
  //       console.log(response)
  //       const filterdata = data.filter(item => item._id != id)
  //       setdata(filterdata)
  //     }
  //     else {
  //       console.log("This is error")
  //     }
  //   }
  //   catch (error) {
  //     alert(error)
  //     console.error('Error:', error);

  //   }
  // }

  // const handleedit = () => setedit(!edit)

  // const handlefromsubmit = async (e) => {
  //   console.log("my formmm")
  //   e.preventDefault();
  //   const data = { ...input, category: cate }
  //   console.log(data)

  //   try {
  //     const response = await axios.put(`http://localhost:5000/editproduct?id=${id}`, data);
  //     console.log("res", response);

  //     if (response.status === 200) {
  //       console.log(response.data)

  //       alert('Successful Editted')
  //       setinput(data)
  //       setedit(!edit)
  //     }

  //   }
  //   catch (error) {
  //     alert(error)
  //     console.error('Error:', error);

  //   }
  // }
  const [cate, setCate] = useState(data.cate);

  const handleupdateSubmit = async (e) => {
    console.log(data, 'mydataaaaaa')
    e.preventDefault();

    const updata = { ...data };

    // console.log('idid to update', data._id)
    const id = data._id;
    try {

      const response = await axios.put(`http://localhost:5000/update/${id}`, updata);
      console.log("res", response);
      if (response.status === 200) {
        console.log(response.data)
        onUpdate(updata)
        setItems(null)

      }
    }
    catch (error) {
      alert(error)
      console.error('Error:', error);

    }

  }


  useEffect(() => {
    console.log(data)
  }, [data])

  if (!data) return;
  const handleOnChange = (e) => {

    const value = e.target.value;
    const name = e.target.name;
    console.log('value', value)

    setItems((prevData) => {
      return { ...prevData, [name]: value }
    })

  }




  return (
    <>
      {/* <div className="card"  >
        <div className="name">{input.name}</div>
        <div className="name">{input.price}</div>
        <button onClick={handleCardClick}>All data</button>
        <button onClick={handleedit}>Edit</button>
        <button onClick={handledelete}>DELETE</button>

      </div> */}
      {/* {edit && <> */}

      <form onSubmit={handleupdateSubmit} >
        <div className="adminpage">
          <div className="dashboard">
            EDIT Dashboard
          </div>
          <div className="productname">
            <div className="info-txt">Product Name</div>
            <input type="text" value={data.name} required name='name' onChange={handleOnChange}
            />
          </div>
          <div className="productprice">
            <div className="info-txt">Product Price</div>
            <input type="number" required name='price' value={data.price} onChange={handleOnChange}
            />
          </div>
          <div className="productdesc">
            <div className="info-txt">Product Description</div>
            <input type="text" required name='desc' value={data.desc} onChange={handleOnChange}
            />
          </div>
          <div className="productcategory">
            <label for="role">Choose a category:</label>

            <select name="category" id="category" value={data.category} onChange={handleOnChange}
            >
              <option value="basketball">Basketball</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>
          <div className="tag">
            <div className="info-txt">Product Tag</div>
            <input type="text" required name='tag' value={data.tag} onChange={handleOnChange}
            />
          </div>
          <div className="productstock">
            <div className="info-txt">Amount of product</div>
            <input type='number' required name='amount' value={data.amount} onChange={handleOnChange}
            />
          </div>
          <div className="btn">
          </div>
          <button type="submit">Submit</button>

        </div>
      </form>
      {/* </>} */}


    </>
  )
}

export default SingleCard