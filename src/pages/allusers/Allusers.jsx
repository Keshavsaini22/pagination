import React, { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import SingleCard from '../../components/SingleCard/SingleCard';
import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';


function Allusers() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState();
  const handlePageSizeChange = (e) => {
    setSize(parseInt(e.target.value));
    setPage(1);
  };

  useEffect(() => {
    fetchData();
  }, [page, size]);


  const handleDashboardRequest = () => navigate('/')
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products?page=${page}&limit=${size}`);
      console.log('response.data.Info:', response.data.Info)
      setdata(response.data.Info);
      setCount(Math.ceil(response.data.Count / size))
      // console.log('data to show', data[0]._id)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //   const handlePageClick = async (e) => {
  //     console.log(e)
  //     currentPage.current = e.selected + 1;
  //     console.log(currentPage, "currentpage")
  //     getPaginatedUsers()
  //   }
  //   function changeLimit() {
  //     currentPage.current = 1;
  //     getPaginatedUsers();
  //   }

  // const getPaginatedUsers = async () => {
  //   try {
  //     console.log("gggggggggggggggggggggggggggggggggggggdeep");
  //     const response = await axios.get(`http://localhost:5000/products?page=${currentPage.current}&limit=${limit}`);
  //     // http://localhost:5000/products?page=1&limit=4

  //     // console.log("res", response);

  //     if (response.status === 200) {
  //       console.log(response.data.results.pageCount, "keshav")
  //       setPageCount(response.data.results.pageCount)
  //       setdata(response.data.results.result)
  //       console.log(data)
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
      <table>
        <tr>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {data.map((item) => (
          <tr key={item._id}>
            <td className='linkto' >
              {item.name}
            </td>
            <td >
              {item.price}
            </td>
            <td className='linkto'>
              Edit
            </td>
            <td className='linkto' >
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

      {
        /* {data.map((i) => {
          return (<SingleCard data={data} setdata={setdata} key={i._id} name={i.name} price={i.price} desc={i.desc} category={i.category} tag={i.tag} amount={i.amount} id={i._id}/>)
        })}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        forcePage={currentPage.current - 1}/>
        <input placeholder="Limit" onChange={e => setLimit(e.target.value)} />
        <button onClick={changeLimit}>Set Limit</button> */
      }

      <div><button onClick={handleDashboardRequest}>Go to dashboard</button></div>
    </>
  )
}

export default Allusers