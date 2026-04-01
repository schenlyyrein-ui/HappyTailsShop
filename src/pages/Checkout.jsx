import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { DEFAULT_FULFILLMENT, SHIPPING_OPTIONS, getShippingFee } from '../constants/fulfillment';
import gcashQr from '../assets/gcashqr.jpg';
import './Shop.css';
import './Checkout.css';

const PET_MENU_CATEGORIES = new Set(['pet-treats', 'frozen-treats', 'for-dogs', 'for-cats']);

const formatCurrency = (amount) => `PHP ${Number(amount || 0).toFixed(2)}`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, getCartTotal, checkoutPreferences, updateCheckoutPreferences } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: '',
    fulfillmentMethod: checkoutPreferences.fulfillmentMethod || DEFAULT_FULFILLMENT.fulfillmentMethod,
    shippingOption: checkoutPreferences.shippingOption || DEFAULT_FULFILLMENT.shippingOption
  });
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [proofFileName, setProofFileName] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  const cartInsights = useMemo(() => {
    const hasPetMenu = cart.some((item) => PET_MENU_CATEGORIES.has(item.category));
    const hasShopSupplies = cart.some((item) => !PET_MENU_CATEGORIES.has(item.category));

    return { hasPetMenu, hasShopSupplies };
  }, [cart]);

  const subtotal = getCartTotal();
  const selectedShipping = SHIPPING_OPTIONS.find((option) => option.value === formData.shippingOption);
  const shippingFee = getShippingFee(formData.fulfillmentMethod, formData.shippingOption);
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: value
      };

      if (name === 'fulfillmentMethod' && value === 'pickup') {
        next.shippingOption = '';
      }

      if (name === 'fulfillmentMethod' || name === 'shippingOption') {
        updateCheckoutPreferences({
          fulfillmentMethod: name === 'fulfillmentMethod' ? value : next.fulfillmentMethod,
          shippingOption: name === 'shippingOption' ? value : next.shippingOption
        });
      }

      return next;
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofOfPayment(file);
      setProofFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    if (!formData.paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    if (formData.fulfillmentMethod === 'delivery') {
      if (!formData.shippingOption) {
        alert('Please select a shipping area to preview the delivery fee.');
        return;
      }

      if (!formData.address || !formData.city || !formData.zipCode) {
        alert('Please complete the delivery address details.');
        return;
      }
    }

    if (formData.paymentMethod === 'gcash' && !proofOfPayment) {
      alert('Please upload your GCash proof of payment.');
      return;
    }

    console.log('Order submitted:', {
      customer: formData,
      cart,
      subtotal,
      shippingFee,
      total,
      proofOfPayment: proofOfPayment
        ? {
            name: proofFileName,
            size: proofOfPayment.size,
            type: proofOfPayment.type
          }
        : null
    });

    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="happy-tails-shop happy-tails-order-complete-page">
        <Container className="happy-tails-shop-container">
          <div className="happy-tails-order-complete">
            <div className="happy-tails-success-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#f53799" />
                <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="happy-tails-order-title">Order Confirmed!</h2>
            <p className="happy-tails-order-message">
              Thank you for your purchase.
              {formData.fulfillmentMethod === 'pickup'
                ? ' Your pet menu and supplies will be prepared for pickup.'
                : ' We will prepare your order for delivery based on the selected shipping area.'}
              {formData.paymentMethod === 'gcash' && ' We will verify your payment proof within 24 hours.'}
            </p>
            <p className="happy-tails-order-number">Order #HT{Math.floor(Math.random() * 1000000)}</p>
            <Button className="happy-tails-back-to-shop" onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="happy-tails-shop">
      <Container className="happy-tails-shop-container">
        <div className="happy-tails-shop-header">
          <h1 className="happy-tails-shop-title">Checkout</h1>
          <p className="happy-tails-checkout-subtitle">
            Choose whether you want store pickup or delivery for your pet menu and supplies.
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Card className="happy-tails-checkout-card">
                <Card.Body>
                  {cart.length === 0 ? (
                    <Alert variant="warning" className="happy-tails-empty-alert">
                      Your cart is empty right now. Add items from the shop or pet menu before checkout.
                    </Alert>
                  ) : (
                    <>
                      <h4 className="happy-tails-section-title">Fulfillment Method</h4>
                      <div className="happy-tails-fulfillment-options">
                        <Form.Check
                          type="radio"
                          id="pickup-option"
                          name="fulfillmentMethod"
                          value="pickup"
                          label="Store Pickup"
                          checked={formData.fulfillmentMethod === 'pickup'}
                          onChange={handleInputChange}
                          className="happy-tails-fulfillment-check"
                        />
                        <Form.Check
                          type="radio"
                          id="delivery-option"
                          name="fulfillmentMethod"
                          value="delivery"
                          label="Delivery"
                          checked={formData.fulfillmentMethod === 'delivery'}
                          onChange={handleInputChange}
                          className="happy-tails-fulfillment-check"
                        />
                      </div>

                      <div className="happy-tails-fulfillment-note">
                        {formData.fulfillmentMethod === 'pickup'
                          ? 'Pickup is free. We recommend this option for pet menu orders that you want to claim directly.'
                          : 'Select a shipping area below to preview the estimated delivery fee.'}
                      </div>

                      {formData.fulfillmentMethod === 'delivery' && (
                        <Form.Group className="happy-tails-form-group">
                          <Form.Label>Shipping Area <span style={{ color: '#f53799' }}>*</span></Form.Label>
                          <Form.Select
                            name="shippingOption"
                            value={formData.shippingOption}
                            onChange={handleInputChange}
                            required={formData.fulfillmentMethod === 'delivery'}
                          >
                            {SHIPPING_OPTIONS.map((option) => (
                              <option key={option.value || 'placeholder'} value={option.value}>
                                {option.label}{option.fee ? ` - ${formatCurrency(option.fee)}` : ''}
                              </option>
                            ))}
                          </Form.Select>
                          {selectedShipping?.description && (
                            <small className="happy-tails-shipping-hint">{selectedShipping.description}</small>
                          )}
                        </Form.Group>
                      )}

                      <h4 className="happy-tails-section-title">Customer Information</h4>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="happy-tails-form-group">
                            <Form.Label>First Name <span style={{ color: '#f53799' }}>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="Enter first name"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="happy-tails-form-group">
                            <Form.Label>Last Name <span style={{ color: '#f53799' }}>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Enter last name"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="happy-tails-form-group">
                            <Form.Label>Email <span style={{ color: '#f53799' }}>*</span></Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter email address"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="happy-tails-form-group">
                            <Form.Label>Phone Number <span style={{ color: '#f53799' }}>*</span></Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Enter phone number"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <h4 className="happy-tails-section-title">
                        {formData.fulfillmentMethod === 'pickup' ? 'Pickup Notes' : 'Delivery Information'}
                      </h4>

                      {formData.fulfillmentMethod === 'pickup' ? (
                        <div className="happy-tails-pickup-box">
                          <p className="mb-2"><strong>Pickup Fee:</strong> Free</p>
                          <p className="mb-0">Customers can choose store pickup for pet menu and supplies, then wait for order confirmation before claiming.</p>
                        </div>
                      ) : (
                        <>
                          <Form.Group className="happy-tails-form-group">
                            <Form.Label>Address <span style={{ color: '#f53799' }}>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="Enter delivery address"
                              required={formData.fulfillmentMethod === 'delivery'}
                            />
                          </Form.Group>

                          <Row>
                            <Col md={6}>
                              <Form.Group className="happy-tails-form-group">
                                <Form.Label>City <span style={{ color: '#f53799' }}>*</span></Form.Label>
                                <Form.Control
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  placeholder="Enter city"
                                  required={formData.fulfillmentMethod === 'delivery'}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="happy-tails-form-group">
                                <Form.Label>ZIP Code <span style={{ color: '#f53799' }}>*</span></Form.Label>
                                <Form.Control
                                  type="text"
                                  name="zipCode"
                                  value={formData.zipCode}
                                  onChange={handleInputChange}
                                  placeholder="Enter ZIP code"
                                  required={formData.fulfillmentMethod === 'delivery'}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </>
                      )}

                      <h4 className="happy-tails-section-title">Payment Method</h4>
                      <Form.Group className="happy-tails-form-group">
                        <Form.Select
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleInputChange}
                          className="happy-tails-payment-select"
                          required
                        >
                          <option value="">Select Payment Method</option>
                          <option value="cash">Cash</option>
                          <option value="gcash">GCash</option>
                        </Form.Select>
                      </Form.Group>

                      {formData.paymentMethod === 'gcash' && (
                        <div className="happy-tails-gcash-section">
                          <div className="happy-tails-gcash-qr-card">
                            <p className="happy-tails-gcash-qr-title">Scan the GCash QR code first</p>
                            <img
                              src={gcashQr}
                              alt="Happy Tails GCash QR code"
                              className="happy-tails-gcash-qr-image"
                            />
                            <p className="happy-tails-gcash-qr-note">
                              After sending your payment, upload your proof of payment below.
                            </p>
                          </div>
                          <Form.Group className="happy-tails-form-group">
                            <Form.Label>
                              Upload Proof of Payment <span style={{ color: '#f53799' }}>*</span>
                            </Form.Label>
                            <div className="happy-tails-file-upload">
                              <Form.Control
                                type="file"
                                accept="image/*,.pdf"
                                onChange={handleFileUpload}
                                required={formData.paymentMethod === 'gcash'}
                                className="happy-tails-file-input"
                                id="proof-of-payment"
                              />
                              <label htmlFor="proof-of-payment" className="happy-tails-file-label">
                                <div className="happy-tails-file-content">
                                  <span className="happy-tails-upload-icon">Upload</span>
                                  <span className="happy-tails-upload-text">
                                    {proofFileName || 'Click to upload or drag and drop'}
                                  </span>
                                  <span className="happy-tails-upload-hint">PNG, JPG, or PDF up to 5MB</span>
                                </div>
                              </label>
                            </div>
                            {proofFileName && (
                              <div className="happy-tails-file-name mt-2">
                                <small>
                                  <strong>Selected file:</strong> {proofFileName}
                                </small>
                              </div>
                            )}
                          </Form.Group>
                        </div>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="happy-tails-order-summary">
                <Card.Body>
                  <h4 className="happy-tails-section-title">Order Summary</h4>

                  <div className="happy-tails-order-items">
                    {cart.length === 0 ? (
                      <p className="happy-tails-empty-summary">No items in cart yet.</p>
                    ) : (
                      cart.map((item) => (
                        <div key={`${item.id}-${item.variantId}`} className="happy-tails-order-item">
                          <div>
                            <span>{item.name} x {item.quantity}</span>
                            {item.variantName && item.variantName !== 'Standard' && (
                              <small className="happy-tails-order-variant">{item.variantName}</small>
                            )}
                          </div>
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="happy-tails-order-breakdown">
                    <div className="happy-tails-breakdown-row">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="happy-tails-breakdown-row">
                      <span>Shipping Fee</span>
                      <span>{formData.fulfillmentMethod === 'pickup' ? 'Free' : formatCurrency(shippingFee)}</span>
                    </div>
                  </div>

                  <div className="happy-tails-order-total">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>

                  <Button
                    type="submit"
                    className="happy-tails-place-order-btn"
                    disabled={cart.length === 0 || (formData.paymentMethod === 'gcash' && !proofOfPayment)}
                  >
                    {formData.paymentMethod === 'gcash' ? 'Submit Order with Payment Proof' : 'Place Order'}
                  </Button>

                  <Button
                    variant="link"
                    className="happy-tails-back-to-cart"
                    onClick={() => navigate('/shop')}
                  >
                    Back to Shop
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Checkout;
