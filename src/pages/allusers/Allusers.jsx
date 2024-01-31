import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import SingleCard from '../../components/SingleCard/SingleCard';


function Allusers() {
  const [data, setdata] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState();

  const [limit, setlimit] = useState(3);

  useEffect(() => { getPaginatedUsers() }, [])


  const handlePageClick = async (e) => {
console.log(e)
  }


  const getPaginatedUsers = async () => {
    try {
      // console.log(limit,currentPage,"deep");
      const response = await axios.get(`http://localhost:5000/products?page=${currentPage}&limit=${currentPage}`);
      // http://localhost:5000/products?page=1&limit=4

      console.log("res", response);

      if (response.status === 200) {
        console.log(response.data.results.pageCount,"keshav")
        setdata(response.data.results)
        console.log(data)
        setPageCount(data.pageCount)
        // console.log(data.totalUser)
        // alert('Successful SignIn')

      }
      else{
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
      <SingleCard />

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
        // forcePage={currentPage.current - 1}

      />
      
    </>
  )
}

export default Allusers