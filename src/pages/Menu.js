import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { cartStore } from "../store/cartstore.js";
import "./Menu.css";

// ตัวอย่างข้อมูลเมนูของร้านแต่ละร้าน
const menus = {
  1: [
    { id: 1, name: "Menu1", price: 30 },
    { id: 2, name: "Menu2", price: 35 },
    { id: 3, name: "Menu3", price: 40 },
  ],
  2: [
    { id: 4, name: "Special1", price: 50 },
    { id: 5, name: "Special2", price: 55 },
  ],
  3: [
    { id: 6, name: "Special3", price: 60 },
    { id: 7, name: "Special4", price: 65 },
  ],
};

// รายการ Add-on สำหรับแต่ละร้าน
const addOns = {
  1: [
    { id: 3, name: "พิเศษ", price: 5 },
  ],
  2: [
    { id: 1, name: "ไข่ดาว", price: 7 },
    { id: 3, name: "พิเศษ", price: 5 },
  ],
  3: [
    { id: 2, name: "ไข่ต้ม", price: 6 },
    { id: 1, name: "ไข่ดาว", price: 7 },
    { id: 3, name: "พิเศษ", price: 5 },
  ],
};

const Menu = observer(() => {
  const { shopId } = useParams();
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const shopMenu = menus[shopId] || [];
  const availableAddOns = addOns[shopId] || [];

  const handleAddOnChange = (itemId, addon) => {
    setSelectedAddOns((prev) => {
      const currentAddOns = prev[itemId] || [];
      if (addon === null) {
        return { ...prev, [itemId]: [] }; // เคลียร์การเลือก Add-on ถ้าเลือก "ไม่มี"
      }

      if (currentAddOns.some((selected) => selected.id === addon.id)) {
        const newAddOns = currentAddOns.filter(
          (selected) => selected.id !== addon.id
        );
        return { ...prev, [itemId]: newAddOns };
      } else {
        const newAddOns = [...currentAddOns, addon];
        return { ...prev, [itemId]: newAddOns };
      }
    });
  };

  const addToCart = (item, selectedAddOns) => {
    // ตรวจสอบว่ามีสินค้าในตะกร้าจากร้านอื่นแล้วหรือไม่
    const otherShopItems = cartStore.cart.filter(
      (cartItem) => cartItem.shopId !== shopId
    );
    if (otherShopItems.length > 0) {
      alert("สามารถสั่งจากร้านเดียวกันเท่านั้น");
      return;
    }

    cartStore.addToCart({
      ...item,
      addOn: selectedAddOns,
      totalPrice: item.price + selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0),
      shopId: shopId, // เก็บข้อมูลร้านในตะกร้า
    });
  };

  if (!shopMenu.length) {
    return <div>เมนูของร้านนี้ไม่พบ</div>;
  }

  return (
    <div className="menu-container">
      <h1>ร้าน {shopId}</h1>
      <div className="menu-items">
        {shopMenu.map((item) => {
          const selectedAddOn = selectedAddOns[item.id] || [];

          return (
            <div key={item.id} className="menu-item">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price} บาท</span>
              </div>

              <div className="addon-container">
                <span>เลือก Add-on: </span>
                {availableAddOns.map((addon) => (
                  <label key={addon.id} className="addon-label">
                    <input
                      type="checkbox"
                      name={`addon-${item.id}`}
                      onChange={() => handleAddOnChange(item.id, addon)}
                      checked={selectedAddOn.some((selected) => selected.id === addon.id)}
                      aria-label={`Add ${addon.name} to ${item.name}`}
                    />
                    {addon.name} ({addon.price} บาท)
                  </label>
                ))}
                <label className="addon-label">
                  <input
                    type="checkbox"
                    name={`addon-${item.id}`}
                    onChange={() => handleAddOnChange(item.id, null)} // เลือก "ไม่มี"
                    checked={selectedAddOn.length === 0}
                    aria-label={`No add-on for ${item.name}`}
                  />
                  ไม่มี
                </label>
              </div>

              <button
                className="add-button"
                onClick={() => addToCart(item, selectedAddOn)}
              >
                เพิ่ม
              </button>
            </div>
          );
        })}
      </div>

      <Link to="/Cart">
        <button className="go-to-cart">
          ไปยังตะกร้า ({cartStore.cart.length} รายการ)
        </button>
      </Link>
    </div>
  );
});

export default Menu;
