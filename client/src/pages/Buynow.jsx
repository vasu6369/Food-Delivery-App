import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/Context';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Buynow() {

    const { cartitems, fooditems, addTocart, removefromCart,addtomyorders } = useContext(StoreContext);

    const cartItems = fooditems.filter(item => cartitems[item.id] > 0);

    const grandTotal = cartItems.reduce((total, item) => total + (cartitems[item.id] * item.price), 0);

    const navigate=useNavigate();

    const handlePayment=()=>{
        alert("Payment Success");
        addtomyorders();
        navigate("/");
    }

    const clearItemFromCart = (id) => {
        cartitems[id] = 0;
        removefromCart(id);
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row ">
            <h2 className="text-center mb-4 mt-3">CheckOut</h2>
                <div className="col-12 col-md-7 border border rounded-3 p-3 overflow-y-scroll mt-3"style={{maxHeight:'560px'}} >
                {cartItems.length>0?<h1>Your Cart Items</h1>:''}
                    {cartItems.length > 0 ?
                        cartItems.map((item, index) => (
                            <div key={index} className="card d-flex flex-row justify-content-between p-2 mb-2 ">
                                <div className='d-flex'>
                                    <img src={item.url} alt={item.name} style={{ height: "80px", width: "80px", objectFit: "cover", borderRadius: "10px", marginRight: "15px" }} />
                                    <div>
                                        <h5 className="mb-1">{item.name}</h5>
                                        <p className="mb-1 text-muted">Price: Rs{item.price} X {cartitems[item.id]}</p>
                                        <p className="mb-0 text-muted">Total: Rs{cartitems[item.id] * item.price}</p>
                                    </div>
                                </div>
                                <div className='d-flex flex-row align-items-center'>
                                    <div className="d-flex flex-row  mx-3">
                                        <button className="btn btn-secondary btn-sm" onClick={() => removefromCart(item.id)}>-</button>
                                        <span className="mx-2 fw-bold">{cartitems[item.id]}</span>
                                        <button className="btn btn-secondary btn-sm" onClick={() => addTocart(item.id)}>+</button>
                                    </div>
                                    <button className="btn btn-danger btn-sm ml-5" onClick={() => clearItemFromCart(item.id)} >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        ))
                        :
                        <p className='text-center text-muted'>your cart is empty</p>
                    }
                </div>

                <div className="col-12 col-md-5">
                    <div className="card mb-3 mt-3">
                        <div className="card-body">
                            <h5 className="card-title">Delivery Details</h5>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input type="text" className="form-control" id="name" name="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Phone
                                    </label>
                                    <input type="tel" className="form-control" id="phone" name="phone"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">
                                        Address
                                    </label>
                                    <textarea className="form-control" id="address" name="address" rows="3"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>


                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Payment Summary</h5>
                            <p className="mb-1">Total Items: {cartItems.length}</p>
                            <p className="mb-3">Total Cost: <strong>${grandTotal}</strong></p>
                            <button
                                className={`btn btn-danger w-50 m-auto ${cartItems.length==0?'disabled':''}`}
                                onClick={handlePayment}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}
