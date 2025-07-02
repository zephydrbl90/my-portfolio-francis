import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Toast, ToastContainer } from "react-bootstrap";
import { AiOutlineMail, AiOutlineEnvironment } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [lastSentData, setLastSentData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  // EmailJS configuration - REPLACE THESE WITH YOUR ACTUAL VALUES
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_mrwlkr5';
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_nljb3qb';
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_ACTUAL_PUBLIC_KEY_HERE';

  // Check if EmailJS is properly configured - FIXED with useCallback
  const isEmailJSConfigured = useCallback(() => {
    return EMAILJS_PUBLIC_KEY && 
           EMAILJS_PUBLIC_KEY !== 'YOUR_ACTUAL_PUBLIC_KEY_HERE' && 
           EMAILJS_PUBLIC_KEY.length > 10; // Basic validation
  }, [EMAILJS_PUBLIC_KEY]); // Dependencies: only EMAILJS_PUBLIC_KEY

  // Initialize EmailJS on component mount
  useEffect(() => {
    if (isEmailJSConfigured()) {
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS initialized successfully');
        setDebugInfo('EmailJS initialized successfully');
      } catch (error) {
        console.error('EmailJS initialization failed:', error);
        setDebugInfo('EmailJS initialization failed: ' + error.message);
      }
    } else {
      console.warn('EmailJS not configured properly');
      setDebugInfo('EmailJS configuration missing or invalid');
    }
  }, [EMAILJS_PUBLIC_KEY, isEmailJSConfigured]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showNotification = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.subject.trim()) errors.push("Subject is required");
    if (!formData.message.trim()) errors.push("Message is required");
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setIsSubmitting(true);
    setSubmitStatus(null);
    setDebugInfo(null);

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setSubmitStatus('error');
      setDebugInfo(validationErrors.join(', '));
      setIsSubmitting(false);
      showNotification(validationErrors[0], "danger");
      return;
    }

    // Check EmailJS configuration
    if (!isEmailJSConfigured()) {
      setSubmitStatus('error');
      setDebugInfo('EmailJS not configured properly. Please add your EmailJS credentials.');
      setIsSubmitting(false);
      showNotification("Email service not configured. Please contact me directly using the information above.", "danger");
      return;
    }

    console.log('=== EmailJS Debug Info ===');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', EMAILJS_TEMPLATE_ID);
    console.log('Public Key configured:', EMAILJS_PUBLIC_KEY ? 'Yes' : 'No');
    console.log('Form data:', formData);

    // Template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Francis Rajagukguk',
      reply_to: formData.email
    };

    console.log('Template parameters:', templateParams);

    try {
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout after 30 seconds')), 30000);
      });

      const emailPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      const result = await Promise.race([emailPromise, timeoutPromise]);

      console.log('✅ Email sent successfully!');
      console.log('EmailJS Response:', result);
      
      // Store the sent data for preview
      setLastSentData({...formData});
      
      setSubmitStatus('success');
      setDebugInfo(`Email sent successfully! Status: ${result.status}, Text: ${result.text}`);
      
      // Show success notification
      showNotification(`Message sent successfully! Thank you ${formData.name}, I'll get back to you soon!`, "success");
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      console.error('❌ Error sending email:', error);
      
      setSubmitStatus('error');
      
      // Improved error handling
      let errorMessage = 'Failed to send email. ';
      
      if (error.message === 'Request timeout after 30 seconds') {
        errorMessage = 'Request timed out. Please check your internet connection and try again.';
      } else if (error.status) {
        switch (error.status) {
          case 400:
            errorMessage += 'Invalid request. Please check your EmailJS template variables.';
            break;
          case 401:
            errorMessage += 'Authentication failed. Please check your EmailJS public key.';
            break;
          case 403:
            errorMessage += 'Access denied. Please check service permissions in EmailJS dashboard.';
            break;
          case 404:
            errorMessage += 'Service or template not found. Please check your EmailJS IDs.';
            break;
          case 429:
            errorMessage += 'Too many requests. Please try again later.';
            break;
          default:
            errorMessage += `Server error (${error.status}). Please try again.`;
        }
      } else if (error.text) {
        errorMessage += error.text;
      } else {
        errorMessage += error.message || 'Unknown error occurred.';
      }
      
      setDebugInfo(errorMessage);
      showNotification("Failed to send message. You can contact me directly using the information above.", "danger");
      
    } finally {
      // Always reset loading state
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="contact-section">
      {/* Toast Notification */}
      <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          bg={toastVariant}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastVariant === "success" ? "Success" : "Alert"}
            </strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Get In <strong className="purple">Touch</strong>
            </h1>
            
            {/* Intro Quote */}
            <Card className="quote-card-view">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    "I'm always excited to connect with fellow developers, potential collaborators, 
                    and anyone interested in technology. Whether you have a project in mind, 
                    a question to ask, or just want to say hello, I'd love to hear from you!"
                  </p>
                  <footer className="blockquote-footer mt-3">
                    Let's build something <cite title="Source Title">amazing together</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col md={5} style={{ paddingTop: "120px", paddingBottom: "50px" }}>
            <Card className="contact-card-view">
              <Card.Body>
                <h3>Contact Information</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <AiOutlineMail className="contact-icon" />
                    <span>ebenhaez0201@gmail.com</span>
                  </div>
                  <div className="contact-item">
                    <FaLinkedin className="contact-icon" />
                    <span>Francis Eben Haezer Rajagukguk</span>
                  </div>
                  <div className="contact-item">
                    <AiOutlineEnvironment className="contact-icon" />
                    <span>Jakarta, Indonesia</span>
                  </div>
                </div>

                <div className="contact-social">
                  <h3>Connect With Me</h3>
                  <div className="social-links">
                    <a 
                      href="https://github.com/zephydrbl90" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <div className="social-link-content">
                        <FaGithub />
                        <span className="social-text">GitHub</span>
                      </div>
                    </a>
                    <a 
                      href="www.linkedin.com/in/fracismo-eben-haezer-8a6a0428a" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <div className="social-link-content">
                        <FaLinkedin />
                        <span className="social-text">LinkedIn</span>
                      </div>
                    </a>
                    <a 
                      href="https://x.com/FMozario20082" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <div className="social-link-content">
                        <FaTwitter />
                        <span className="social-text">Twitter</span>
                      </div>
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col md={7} style={{ paddingBottom: "50px" }}>
            <Card className="contact-card-view">
              <Card.Body>
                <h3>Send Me a Message</h3>
                
                {/* Configuration Warning */}
                {!isEmailJSConfigured() && (
                  <Alert variant="warning" className="mt-3">
                    <strong>Setup Required:</strong> 
                    <ul className="mb-0 mt-2">
                      <li>Add your EmailJS public key to environment variables or directly in code</li>
                      <li>Verify your service ID and template ID are correct</li>
                      <li>For now, please contact me directly using the information above</li>
                    </ul>
                  </Alert>
                )}
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <Alert variant="success" className="mt-3">
                    <strong>Success!</strong> Your message has been sent successfully. I'll get back to you soon!
                    {lastSentData && (
                      <div className="mt-2" style={{ fontSize: '0.9em' }}>
                        Message from: <strong>{lastSentData.name}</strong> ({lastSentData.email})
                      </div>
                    )}
                  </Alert>
                )}
                
                {submitStatus === 'error' && (
                  <Alert variant="danger" className="mt-3">
                    <strong>Error!</strong> {debugInfo}
                  </Alert>
                )}

                {/* Configuration Status */}
                <div className="mt-3" style={{ fontSize: '0.9em', opacity: 0.7 }}>
                  <strong>Status:</strong> EmailJS is {isEmailJSConfigured() ? '✅ configured' : '❌ not configured'}
                </div>

                {/* Debug Information (only in development) */}
                {process.env.NODE_ENV === 'development' && debugInfo && (
                  <details style={{ marginTop: '10px' }}>
                    <summary>Debug Information</summary>
                    <div>
                      <pre style={{ fontSize: '0.8em', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                        Service ID: {EMAILJS_SERVICE_ID}
                        Template ID: {EMAILJS_TEMPLATE_ID}
                        Public Key: {EMAILJS_PUBLIC_KEY ? 'Set' : 'Not set'}
                        Is Configured: {isEmailJSConfigured() ? 'Yes' : 'No'}
                        
                        {debugInfo}
                      </pre>
                    </div>
                  </details>
                )}

                <Form onSubmit={handleSubmit} className="mt-4">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Full Name"
                          required
                          disabled={isSubmitting}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          disabled={isSubmitting}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject *</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      disabled={isSubmitting}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, question, or just say hello..."
                      required
                      disabled={isSubmitting}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={isSubmitting || !isEmailJSConfigured()}
                  >
                    {isSubmitting ? 'Sending...' : isEmailJSConfigured() ? 'Send Message' : 'Email Not Configured'}
                  </Button>
                  
                  {/* Alternative contact suggestion */}
                  <div className="mt-3 text-center" style={{ fontSize: '0.9em', opacity: 0.8 }}>
                    Having trouble? You can also reach me directly at{' '}
                    <a href="mailto:ebenhaez0201@gmail.com" style={{ color: 'var(--primary-accent)' }}>
                      ebenhaez0201@gmail.com
                    </a>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;