import React, { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import SingleCard from '../../components/SingleCard/SingleCard';
import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';


function Allusers() {
const navigate=useNavigate();
  const [data, setdata] = useState([]);
  // const [currentPage, setcurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState();

  const [limit, setLimit] = useState(4);
  const currentPage = useRef();
  useEffect(() => {
    currentPage.current = 1
    getPaginatedUsers()
  }, [])

const handleDashboardRequest=()=> navigate('/') 
  const handlePageClick = async (e) => {
    console.log(e)
    currentPage.current = e.selected + 1;
    console.log(currentPage, "currentpage")
    getPaginatedUsers()
  }
  function changeLimit() {
    currentPage.current = 1;
    getPaginatedUsers();
  }

  const getPaginatedUsers = async () => {
    try {
      console.log("gggggggggggggggggggggggggggggggggggggdeep");
      const response = await axios.get(`http://localhost:5000/products?page=${currentPage.current}&limit=${limit}`);
      // http://localhost:5000/products?page=1&limit=4

      // console.log("res", response);

      if (response.status === 200) {
        console.log(response.data.results.pageCount, "keshav")
        setPageCount(response.data.results.pageCount)
        setdata(response.data.results.result)
        console.log(data)
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

  return (
    <>
      {data.map((i) => {
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
      forcePage={currentPage.current - 1}

      />
      <input placeholder="Limit" onChange={e => setLimit(e.target.value)} />
      <button onClick={changeLimit}>Set Limit</button>
      <div><button onClick={handleDashboardRequest}>Go to dashboard</button></div>
    </>
  )
}

export default Allusers