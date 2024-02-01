import React, { useState } from 'react'
import './DashboardPage.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function DashboardPage() {
    const navigate = useNavigate();
    const [category, setCategory] = useState('basketball');
    const [input, setinput] = useState({
        // firstname: "",
        // lastname: "",
        // email: "",
        // role:"",
        password: "",
        name: "",
        price: "",
        desc: "",
        tag: "",
        amount: "",
    })
    const getdata = (e) => {
        console.log(e.target.name);
        const { value, name } = e.target;
        setinput(() => {
            return { ...input, [name]: value.trim() }
        })
    }


    const addData = async (e) => {
        console.log("adddata")

        e.preventDefault();
        const data = { ...input, category: category }
        try {
            const response = await axios.post('http://localhost:5000/productinfo', data);
            console.log("res", response);

            if (response.status === 200) {
                console.log(response.data)
                setinput({password: "",
                name: "",
                price: "",
                desc: "",
                tag: "",
                amount: ""})
                alert('Successfully Added')

            }

        }
        catch (error) {
            alert(error)
            console.error('Error:', error);

        }

    }
    return (

        <>
            <form action="" onSubmit={addData}>
                <div className="adminpage">
                    <div className="dashboard">
                        Admin Dashboard
                    </div>
                    <div className="productname">
                        <div className="info-txt">Product Name</div>
                        <input type="text" required name='name' value={input.name} onChange={getdata} />
                    </div>
                    <div className="productprice">
                        <div className="info-txt">Product Price</div>
                        <input type="text" required name='price' value={input.price} onChange={getdata} />
                    </div>
                    <div className="productdesc">
                        <div className="info-txt">Product Description</div>
                        <input type="text" required name='desc' onChange={getdata} value={input.desc}/>
                    </div>
                    <div className="productcategory">
                        <label for="role">Choose a category:</label>

                        <select name="category" id="category" onChange={(e) => {
                            setCategory(e.target.value);
                            console.log(category);
                        }}>
                            <option value="basketball">Basketball</option>
                            <option value="lifestyle">Lifestyle</option>
                        </select>
                    </div>
                    <div className="tag">
                        <div className="info-txt">Product Tag</div>
                        <input type="text" required name='tag' onChange={getdata}  value={input.tag}/>
                    </div>
                    <div className="productstock">
                        <div className="info-txt">Amount of product</div>
                        <input type='text' required name='amount' onChange={getdata} value={input.amount}/>
                    </div>
                    <div className="btn">
                    </div>
                    <button type="submit">Submit</button>

                </div>
            </form>
            <div className="button">
                <button onClick={() => {
                    navigate('/allusers')
                }}>All Users</button>
            </div>
        </>
    )
}

export default DashboardPage