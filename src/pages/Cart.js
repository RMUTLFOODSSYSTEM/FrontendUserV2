import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { cartStore } from "../store/cartstore.js"; // เพิ่ม .js

import "./Cart.css"; // หรือชื่อไฟล์ CSS ที่คุณใช้

const Cart = observer(() => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(""); // สำหรับแสดงข้อความผิดพลาด

  // ใช้ useEffect เพื่อดึงข้อมูลจาก cartStore
  useEffect(() => {
    setCart(cartStore.cart); // ดึงข้อมูลจาก MobX store
  }, [cartStore.cart]); // เพิ่ม cartStore.cart ใน dependencies

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  // ฟังก์ชันเพิ่มจำนวนสินค้า
  const increaseQuantity = (item) => {
    cartStore.updateQuantity(item.id, item.quantity + 1); // ปรับปรุงจำนวนสินค้าผ่าน MobX
  };

  // ฟังก์ชันลดจำนวนสินค้า
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      cartStore.updateQuantity(item.id, item.quantity - 1); // ปรับปรุงจำนวนสินค้าผ่าน MobX
    }
  };

  // ฟังก์ชันเพิ่มจำนวน addOn
  const increaseAddOn = (item, addOn) => {
    cartStore.updateAddOnQuantity(item.id, addOn.name, addOn.quantity + 1);
  };

  // ฟังก์ชันลดจำนวน addOn
  const decreaseAddOn = (item, addOn) => {
    if (addOn.quantity > 1) {
      cartStore.updateAddOnQuantity(item.id, addOn.name, addOn.quantity - 1);
    }
  };

  // ฟังก์ชันลบสินค้าจากตะกร้า
  const handleRemoveItem = (itemId) => {
    cartStore.removeFromCart(itemId); // ลบสินค้าออกจากตะกร้า
  };

  // ฟังก์ชันสำหรับตรวจสอบว่าตะกร้ามีสินค้าอื่นจากร้านอื่นหรือไม่
  const isValidStore = (newItemStore) => {
    if (cart.length === 0) {
      return true; // ถ้าตะกร้าว่าง สามารถเพิ่มได้
    }
    // ตรวจสอบว่ามีร้านที่ไม่ตรงกับร้านที่เลือกในตะกร้าหรือไม่
    const storeName = cart[0].storeName; // ใช้ storeName ของสินค้าชิ้นแรก
    return storeName === newItemStore; // ถ้าร้านเดียวกันสามารถเพิ่มได้
  };

  // ฟังก์ชันเพิ่มสินค้าในตะกร้า
  const handleAddToCart = (item) => {
    if (isValidStore(item.storeName)) {
      cartStore.addToCart(item); // เพิ่มสินค้าในตะกร้า
    } else {
      setError("คุณสามารถสั่งได้แค่จากร้านเดียวเท่านั้น");
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">ตะกร้าของคุณ</h1>
      {error && <p className="error-message">{error}</p>} {/* แสดงข้อความผิดพลาด */}
      {cart.length === 0 ? (
        <p className="empty-cart">ตะกร้าของคุณยังไม่มีสินค้า</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <p>
                <strong>{item.name}</strong> - {item.price} บาท
              </p>
              {item.addOn && item.addOn.length > 0 && (
                <div className="addOn-section">
                  <h4>Add-ons:</h4>
                  {item.addOn.map((addOn, addOnIndex) => (
                    <div key={addOnIndex} className="addOn-item">
                      <p>
                        <strong>{addOn.name}</strong> - {addOn.price} บาท
                      </p>
                      <div className="quantity-controls">
                        <button
                          onClick={() => decreaseAddOn(item, addOn)}
                          className="quantity-button"
                        >
                          -
                        </button>
                        <span>{addOn.quantity}</span>
                        <button
                          onClick={() => increaseAddOn(item, addOn)}
                          className="quantity-button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item)} className="quantity-button">
                  -
                </button>
                <span>{item.quantity || 1}</span>
                <button onClick={() => increaseQuantity(item)} className="quantity-button">
                  +
                </button>
              </div>
              <p>ราคารวม: {item.totalPrice} บาท</p>

              {/* ปุ่มลบสินค้า */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="remove-item-button"
              >
                ลบ
              </button>
            </div>
          ))}
          <p className="cart-total">รวม: {calculateTotal()} บาท</p>
        </div>
      )}

      {/* ปุ่มไปที่หน้าชำระเงิน */}
      <Link to="/payment">
        <button className="checkout-button">ชำระเงิน</button>
      </Link>
    </div>
  );
});

export default Cart;
