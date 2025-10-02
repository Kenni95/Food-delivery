import React from 'react'
import './Order.css'
import axios from 'axios'
import { useState } from 'react';
import {  toast } from 'react-toastify'
import { useEffect } from 'react';
import {assets} from '../../assets/assets.js'

const Order = ({url}) => {
  const [orders,setOrders] = useState([]);
  
  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data)
    }
    else{
     toast.error(Error)
    }
  }

  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status:event.target.value
    })
    if (response.data.success)
      await fetchAllOrders();
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])
  
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <li className="order-list">
      {orders.map((order, index) => {
  return (
    <div key={index} className='order-item'>
      <img src={assets.parcel_icon} alt="" />
      <div>
      <p className='order-item-food'>
        {order.items.map((item, itemIndex) => {
          if (itemIndex === order.items.length - 1) {
            return `${item.name} x ${item.quantity}`;
          } else {
           return item.name + " x " + item.quantity + ", "
          }
        })}
      </p>
      <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
      <div className="order-item-address">
        <p>{order.address.street+","}</p>
        <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
        <p className='order-item-phone'>{order.address.phone}</p>
        </div>
        </div>

        <p>Items : {order.items.length}</p>
        <p>R{order.amount}</p>
        <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
          <option value="Food processing">Food processing</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="delivered">delivered</option>
        </select>
    </div>
  );
})}
      </li>
    </div>
  )
}

export default Order
