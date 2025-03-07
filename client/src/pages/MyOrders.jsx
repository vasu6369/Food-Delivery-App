import React, { useContext } from 'react'
import { StoreContext } from '../context/Context';

export default function MyOrders() {

    const {myorders}=useContext(StoreContext);


  return (
    <div>
            <div className="container mt-5 pt-5">
                {myorders.length > 0 ?
                    <>
                        <h1 className='text-center'>My Orders</h1>
                        <div className="row">
                            {myorders.map(item => (
                                <div  key={item.id} className="col-12 col-sm-6 col-md-3 mt-3 mb-2">
                                    <div className="card food-items rounded-4 d-flex flex-row align-items-center p-1">
                                        <img src={item.url} className="card-img-top rounded-4" draggable="false" alt={item.name} style={{ height: "120px",width:'120px', objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text fw-bold fs-5">Rs {item.price}</p>
                                            <p className="card-text">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                    :
                    <>
                    <h4 className='text-center text-muted'>Your Not have any previous orders</h4>
                    </>
                }
            </div>
        </div>
  )
}
