import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import SingleCard from '../../components/SingleCard/SingleCard';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaEdit, FaSearch } from "react-icons/fa";

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
  const [search, setsearch] = useState();
  const [flag, setFlag] = useState('0');
  const [category, setCategory] = useState();


  const handlePageSizeChange = (e) => {
    setSize(parseInt(e.target.value));
    setPage(1);
  };

  useEffect(() => {
    fetchData();
    console.log("useeffectttt")
  }, [page, size, flag, category, search]);

  const handleNextpage = (item) => (
    navigatedetail(`/user/${item._id}`))

  const handleDashboardRequest = () => navigatedash('/')
  const fetchData = async () => {
    try {
      var url = `http://localhost:5000/products?page=${page}&limit=${size}&flag=${flag}`

      if (category) {
        url = url + `&category=${category}`
      }
      if (search) {
        url = url + `&search=${search}`
      }
      const response = await axios.get(url);
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
  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  }

  return (
    <div className='alldatasection'>
      <h1>PRODUCTS DATA</h1>
      <div className="upper">
        <div className="top-bar">
          <div className='setlimit'>
            <label>No. of Data : </label>
            <select className='select' value={size} onChange={handlePageSizeChange}>
              <option value={5}>5</option>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={10}>10</option>
              <option value={15}>15</option>

            </select>
          </div>
          <div className="search">
            <form onSubmit={handleSearch}>
              <input type="text" placeholder='Search......' value={search} onChange={(e) => {
                setsearch(e.target.value)
                console.log(e.target.value)
              }} />
              {/* <button type="submit"><FaSearch /></button> */}
            </form>
          </div>
        </div>
        <div className="top-bar">
          <div className="productcategory">
            <label for="role">Choose a category:</label>
            <select name="category" id="category" value={category} onChange={(e) => {
              setCategory(e.target.value);
              // console.log(e.target.value);
            }}><option value="">All Data</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="basketball">Basketball</option>
            </select>
          </div>
          <div className="setlimit">
            <label for="role">Sort by Price:</label>
            <select name="category" id="category" value={flag} onChange={(e) => {
              setFlag(e.target.value);
            }}>
              <option value="0">Normal</option>
              <option value="1">Ascending</option>
              <option value="-1">Descending</option>

            </select>
          </div>
        </div>
      </div>
      <table className='products-data'>
        <tr>
          <th>Product Name</th>
          <th className='price-cell'>
            <div>Product Price</div>
          </th>
          <th>
            <div>Product Category</div>
          </th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {data.map((item) => (
          <tr key={item._id}>
            <td className='name' onClick={() => handleNextpage(item)}>
              {item.name}
            </td>
            <td className='price'>
              {item.price}
            </td>
            <td >
              {item.category}
            </td>
            <td className='edit' onClick={() => handleUpdate(item)}>
              <FaEdit />

            </td>
            <td className='delete' onClick={() => handleDelete(item)}>
              <MdDelete />
            </td>
          </tr>
        ))}
      </table>

      <div className="lower">
        <div className='lower-tab'>
          <div>
            <button className='btn' disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <span> {page}/{count} </span>
            <button className='btn' disabled={page === count} onClick={() => setPage(page + 1)}>Next</button>
          </div>
          <div><button className='btn' onClick={handleDashboardRequest}>Go to dashboard</button></div>

        </div>
        {items && <SingleCard data={items}
            setItems={setItems}
            onUpdate={handleUpdateCallback} />}

      </div>
    </div>
  )
}

export default Allusers