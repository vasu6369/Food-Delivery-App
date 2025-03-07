import React, { useContext } from 'react';
import { StoreContext } from '../context/Context';
import { Link } from 'react-router-dom';

import { FaTimes } from 'react-icons/fa';

export default function Cart() {
    const { cartitems, fooditems, addTocart, removefromCart } = useContext(StoreContext);

    const cartItems = fooditems.filter(item => cartitems[item.id] > 0);

    const grandTotal = cartItems.reduce((total, item) => total + (cartitems[item.id] * item.price), 0);

    const clearItemFromCart = (id) => {
        cartitems[id] = 0;
        removefromCart(id);
    };

    return (
        <div className="container mt-5 pt-5">
            <h2 className="text-center mb-4">Your Cart</h2>

            {cartItems.length === 0 ?
                (
                    <p className="text-center">Your cart is empty. Add some items to see them here!</p>
                )
                :
                (
                    <div className="row">
                        {cartItems.map(item => (
                            <div key={item.id} className="col-12 mb-3">
                                <div className="card p-3 d-flex flex-row justify-content-between cart-item">
                                    <div className='d-flex flex-row'>
                                        <img src={item.url} alt={item.name} style={{ height: "80px", width: "80px", objectFit: "cover", borderRadius: "10px", marginRight: "15px" }} />
                                        <div>
                                            <h5 className="mb-1">{item.name}</h5>
                                            <p className="mb-1 text-muted">Price: Rs{item.price}</p>
                                            <p className="mb-0 text-muted">Total: Rs{cartitems[item.id] * item.price}</p>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-row align-items-center'>
                                        <div className="d-flex flex-row  mx-3">
                                            <button className="btn btn-secondary btn-sm" onClick={() => removefromCart(item.id)}>-</button>
                                            <span className="mx-2 fw-bold">{cartitems[item.id]}</span>
                                            <button className="btn btn-secondary btn-sm" onClick={() => addTocart(item.id)}>+</button>
                                        </div>
                                        <button className="btn btn-danger btn-sm" onClick={() => clearItemFromCart(item.id)} style={{ marginLeft: "10px" }} >
                                            <FaTimes />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            {cartItems.length > 0 && (
                <div className="text-end mt-4">
                    <h4 className="fw-bold">Grand Total: Rs{grandTotal}</h4>
                    <Link to='/Buynow' className="btn btn-danger mt-2">Proceed to Checkout</Link>
                </div>
            )}
        </div>
    );
}
