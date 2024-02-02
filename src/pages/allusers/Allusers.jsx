import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import SingleCard from '../../components/SingleCard/SingleCard';
import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
import './Allusers.css'

function Allusers() {
  const navigatedash = useNavigate();
  const navigatedetail = useNavigate();

  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState();
  const [items, setItems] = useState(null);

  const[flag,setFlag]=useState('');



  const handlePageSizeChange = (e) => {
    setSize(parseInt(e.target.value));
    setPage(1);
  };

  useEffect(() => {
    fetchData();
    console.log("useeffectttt")
  }, [page, size,flag]);

  const handlesortChange = (e) => {
    setFlag(e.target.value);
    console.log(flag)
    
  };

  const handleDashboardRequest = () => navigatedash('/')
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products?page=${page}&limit=${size}&flag=${flag}`);
      console.log('response.data.Info:', response.data.Info)
      setdata(response.data.Info);
      setCount(Math.ceil(response.data.Count / size))
      // console.log('data to show', data[0]._id)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = (item) => {
     setItems(item);
    console.log('itemmsss', items)

  }


  const handleDelete = async (item) => {
    const id = item._id;
    console.log('id delete', id)
    try {
      const response = await axios.delete(`http://localhost:5000/deleteproduct?id=${id}`);
      console.log("res", response);
      if (response.status === 200) {
        fetchData();
        const deletedData = data.filter((del) => del._id === id);
        setdata(deletedData)
        // setItems(null);
      }
    }
    catch (error) {
      alert(error)
      console.error('Error:', error);

    }
  }


  const handleUpdateCallback = (updatedData) => {
    setdata((prevData) => {
      const index = prevData.findIndex((item) => item._id === updatedData._id);
      const updatarray = [...prevData];
      updatarray[index] = updatedData;
      return updatarray;
    })
  }

  const handleNextpage=(item)=>(
    navigatedetail(`/user/${item._id}`))


  return (
    <>
      <div className='setlimit'>
        <label>No. of Data : </label>
        <select className='select' value={size} onChange={handlePageSizeChange}>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>

        </select>
      </div>

      <div className='setlimit'>
        <label>sort by : </label>
        <select className='select' value={flag} onChange={handlesortChange}>
          <option value='1' >Salary </option>
          <option value='0'>Name</option>

        </select>
      </div>
      <table>
        <tr>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Category</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {data.map((item) => (
          <tr key={item._id}>
            <td className='linkto' onClick={() => handleNextpage(item)}>
              {item.name}
            </td>
            <td >
              {item.price}
            </td>
            <td >
              {item.category}
            </td>
            <td className='linkto' onClick={() => handleUpdate(item)}>
              Edit
            </td>
            <td className='linkto' onClick={() => handleDelete(item)}>
              Delete
            </td>

          </tr>
        ))}
      </table>

      <div>

        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span> Page {page} </span>
        <button disabled={page === count} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {items && <SingleCard data={items}
        setItems={setItems}
        onUpdate={handleUpdateCallback} />}



      <div><button onClick={handleDashboardRequest}>Go to dashboard</button></div>
    </>
  )
}

export default Allusers