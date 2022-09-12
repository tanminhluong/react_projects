import React, { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import { format } from "date-fns";

const WidgetLg = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders");
        setOrders(res.data);
      } catch (err) {}
    };
    getOrders();
  });
  const Button = ({ type }) => {
    return <button className={"widgetLg-btn " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLg-title">Latest transactions</h3>
      <table className="widgetLg-table">
        <tr className="widgetLg-tr">
          <th className="widgetLg-th">Customer</th>
          <th className="widgetLg-th">Date</th>
          <th className="widgetLg-th">Amount</th>
          <th className="widgetLg-th">Status</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLg-tr" key={order._id}>
            <td className="widgetLg-user">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Blake_Shelton_July_2017_%28cropped%29.jpg/800px-Blake_Shelton_July_2017_%28cropped%29.jpg"
                alt=""
                className="widgetLg-img"
              />
              <span className="widgetLg-name">{order.userId}</span>
            </td>
            <td className="widgetLg-date">
              {format(new Date(order.createdAt), "dd-MM-yyyy")}
            </td>
            <td className="widgetLg-amount">${order.amount}</td>
            <td className="widgetLg-status">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default WidgetLg;
