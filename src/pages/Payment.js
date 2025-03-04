import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { cartStore } from '../store/cartstore.js';
import { QRCodeSVG } from 'qrcode.react';  // นำเข้า QRCodeSVG
import './Payment.css';  // นำเข้าไฟล์ CSS

const Payment = observer(() => {
  const [paymentProof, setPaymentProof] = useState(null); // สถานะสำหรับเก็บไฟล์หลักฐานการโอนเงิน

  const totalPrice = cartStore.cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handlePayment = () => {
    if (!paymentProof) {
      alert("กรุณาแนบหลักฐานการโอนเงิน");
      return;
    }
    alert("การชำระเงินสำเร็จ!");
    cartStore.clearCart(); // ล้างตะกร้าหลังชำระเงิน
  };

  const qrCodeData = `totalPrice=${totalPrice}`;

  // ฟังก์ชันสำหรับจัดการการเลือกไฟล์
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProof(file); // เก็บไฟล์ที่เลือก
    }
  };

  return (
    <div className="payment-container">
      <h1>หน้าชำระเงิน</h1>
      {cartStore.cart.length > 0 ? (
        <div>
          <ul>
            {cartStore.cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.totalPrice} บาท
              </li>
            ))}
          </ul>
          <h3>ราคารวม: {totalPrice} บาท</h3>

          <div className="qr-container">
            <h4>QR Code สำหรับการชำระเงิน:</h4>
            <QRCodeSVG value={qrCodeData} size={256} className="qr-code" />
          </div>

          {/* ฟอร์มการแนบหลักฐานการโอนเงิน */}
          <div className="payment-proof">
            <label htmlFor="paymentProof">แนบหลักฐานการโอนเงิน:</label>
            <input
              type="file"
              id="paymentProof"
              onChange={handleFileChange}
              accept="image/*"
            />
            {paymentProof && (
              <div className="proof-preview">
                <p>หลักฐานการโอนเงิน: {paymentProof.name}</p>
                <img
                  src={URL.createObjectURL(paymentProof)}
                  alt="หลักฐานการโอน"
                  className="proof-image"
                />
              </div>
            )}
          </div>

          <button onClick={handlePayment}>ชำระเงิน</button>
        </div>
      ) : (
        <p className="empty-cart-message">คุณยังไม่ได้เพิ่มสินค้าในตะกร้า</p>
      )}
    </div>
  );
});

export default Payment;
