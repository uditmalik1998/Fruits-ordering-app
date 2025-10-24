import React, {use} from "react";
import "./index.css";

const CartPopup = ({ isOpen, onClose, items, onPlaceOrder }) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.itemAdded,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <>
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={onClose}></div>

      {/* Popup */}
      <div className="cart-popup-container">
        <div className="cart-card">
          {/* Header */}
          <div className="cart-header">
            <div className="cart-title">
              🛒 <h2>Your Cart</h2>
            </div>
            <button onClick={onClose} className="cart-close-btn">
              ✖
            </button>
          </div>

          {/* Items List */}
          <div className="cart-items">
            {items.length === 0 ? (
              <p className="cart-empty">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div key={item._id} className="cart-item">
                  <img
                    src={item.img_url || "/placeholder.png"}
                    alt={item.item_name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.item_name}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-item-footer">
                      <span className="cart-item-qty">
                        Qty: {item.itemAdded}
                      </span>
                      <span className="cart-item-total">
                        ₹{(item.price * item.itemAdded).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Tax (10%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="cart-actions">
            <button onClick={onClose} className="cart-btn outline">
              Continue Shopping
            </button>
            <button onClick={onPlaceOrder} className="cart-btn primary">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPopup;
