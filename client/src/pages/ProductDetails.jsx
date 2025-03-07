import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/Context";
import { reviews } from "../assets/fooditems";

export default function ProductDetails() {
    const { id } = useParams();
    const { fooditems, addTocart, cartitems, removefromCart } = useContext(StoreContext);
    const product = fooditems.find(item => item.id === id);
    const incart = cartitems[id]>0;

    const clearItemFromCart = (id) => {
        cartitems[id] = 0;
        removefromCart(id);
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row">

                <div className="col-md-6">
                    <img src={product.url} alt={product.name} className="img-fluid rounded-3" />
                </div>


                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <p className="fw-bold fs-4">₹ {product.price}</p>
                    <p>{product.description}</p>
                    <p className="fw-bold">⭐ 4/5</p>
                    {!incart ?
                        <button className="btn btn-primary mt-3" onClick={() => addTocart(product.id)}>Add to Cart</button>
                        :
                        <div className="d-flex gap-2 align-items-center">
                            <div>
                                <button className="btn btn-secondary text-white btn-sm" onClick={() => removefromCart(product.id)}>-</button>
                                <span className="mx-2 fw-bold">{!cartitems[product.id] ? 0 : cartitems[product.id]}</span>
                                <button className="btn btn-secondary text-white btn-sm" onClick={() => addTocart(product.id)} >+</button>
                            </div>
                            <button className="btn btn-danger" onClick={() => clearItemFromCart(product.id)}>Remove From cart</button>
                        </div>

                    }
                </div>


                <div className="col-12 mt-4">
                    <h3>Customer Reviews</h3>
                    {
                        reviews.map((review, index) => (
                            <div key={index} className="border p-3 mb-2 rounded">
                                <h5>👤 {review.user}</h5>
                                <p className="m-0">Rating:  {review.rating}</p>
                                <p className="m-0">{review.comment}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    );
}
