import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Shop.css'; // Reuse the same CSS
import './Checkout.css'; 

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: ''
  });
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [proofFileName, setProofFileName] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  // Mock cart data - in real app, this would come from context/redux
  const mockCart = [
    { id: 1, name: "Premium Dog Food", price: 45.99, quantity: 1 },
    { id: 2, name: "Cat Treats", price: 12.99, quantity: 2 }
  ];

  const total = mockCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    
    // Validate GCash payment has proof of payment
    if (formData.paymentMethod === 'gcash' && !proofOfPayment) {
      alert('Please upload your GCash proof of payment');
      return;
    }

    // Validate payment method is selected
    if (!formData.paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // In a real app, you would send this data to your backend
    console.log('Order submitted:', {
      ...formData,
      proofOfPayment: proofOfPayment ? {
        name: proofFileName,
        size: proofOfPayment.size,
        type: proofOfPayment.type
      } : null
    });
    
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="happy-tails-shop">
        <Container className="happy-tails-shop-container">
          <div className="happy-tails-order-complete">
            <div className="happy-tails-success-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#f53799"/>
                <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="happy-tails-order-title">Order Confirmed!</h2>
            <p className="happy-tails-order-message">
              Thank you for your purchase. 
              {formData.paymentMethod === 'gcash' && ' We will verify your payment proof within 24 hours.'}
            </p>
            <p className="happy-tails-order-number">
              Order #HT{Math.floor(Math.random() * 1000000)}
            </p>
            <Button 
              className="happy-tails-back-to-shop"
              onClick={() => navigate('/shop')}
            >
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
        </div>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Card className="happy-tails-checkout-card">
                <Card.Body>
                  <h4 className="happy-tails-section-title">Shipping Information</h4>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="happy-tails-form-group">
                        <Form.Label>First Name <span style={{color: '#f53799'}}>*</span></Form.Label>
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
                        <Form.Label>Last Name <span style={{color: '#f53799'}}>*</span></Form.Label>
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
                        <Form.Label>Email <span style={{color: '#f53799'}}>*</span></Form.Label>
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
                        <Form.Label>Phone Number <span style={{color: '#f53799'}}>*</span></Form.Label>
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

                  <Form.Group className="happy-tails-form-group">
                    <Form.Label>Address <span style={{color: '#f53799'}}>*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter shipping address"
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="happy-tails-form-group">
                        <Form.Label>City <span style={{color: '#f53799'}}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="happy-tails-form-group">
                        <Form.Label>ZIP Code <span style={{color: '#f53799'}}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="Enter ZIP code"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

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
                      <Form.Group className="happy-tails-form-group">
                        <Form.Label>
                          Upload Proof of Payment <span style={{color: '#f53799'}}>*</span>
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
                              <span className="happy-tails-upload-icon">📎</span>
                              <span className="happy-tails-upload-text">
                                {proofFileName ? proofFileName : 'Click to upload or drag and drop'}
                              </span>
                              <span className="happy-tails-upload-hint">PNG, JPG up to 5MB</span>
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
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="happy-tails-order-summary">
                <Card.Body>
                  <h4 className="happy-tails-section-title">Order Summary</h4>
                  
                  <div className="happy-tails-order-items">
                    {mockCart.map(item => (
                      <div key={item.id} className="happy-tails-order-item">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="happy-tails-order-total">
                    <span>Total</span>
                    <span>₱{total.toFixed(2)}</span>
                  </div>

                  <Button 
                    type="submit"
                    className="happy-tails-place-order-btn"
                    disabled={formData.paymentMethod === 'gcash' && !proofOfPayment}
                  >
                    {formData.paymentMethod === 'gcash' ? 'Submit Order with Payment Proof' : 'Place Order'}
                  </Button>

                  <Button 
                    variant="link"
                    className="happy-tails-back-to-cart"
                    onClick={() => navigate('/shop')}
                  >
                    ← Back to Shop
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