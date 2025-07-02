import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Toast, ToastContainer } from "react-bootstrap";
import { AiOutlineMail, AiOutlineEnvironment } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import "./Contact.css";

// CONFIGURATION - Update these with your actual EmailJS credentials
const CONFIG = {
  // EmailJS Configuration
  EMAILJS_SERVICE_ID: "service_mrwlkr5",
  EMAILJS_TEMPLATE_ID: "template_nljb3qb", 
  EMAILJS_PUBLIC_KEY: "tbUz3BNGhg3KStBln",
  
  // Contact Information
  CONTACT: {
    NAME: "Francis Rajagukguk",
    EMAIL: "ebenhaez0201@gmail.com",
    PHONE: "+62 812-3456-7890",
    LOCATION: "Jakarta, Indonesia"
  },
  
  // Social Media Links
  SOCIAL: {
    GITHUB: "https://github.com/zephydrbl90",
    LINKEDIN: "https://www.linkedin.com/in/fracismo-eben-haezer-8a6a0428a/",
    TWITTER: "https://x.com/FMozario20082"
  },
  
  // Settings
  DEBUG_MODE: false,
  FORM_TIMEOUT: 30000, // 30 seconds
  TOAST_DURATION: 5000 // 5 seconds
};

// Initial form state
const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

// Toast types
const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "danger",
  WARNING: "warning",
  INFO: "info"
};

function Contact() {
  // State management
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: TOAST_TYPES.SUCCESS
  });

  // Memoized configuration check
  const isEmailJSConfigured = useMemo(() => {
    const hasRequiredFields = Boolean(
      CONFIG.EMAILJS_PUBLIC_KEY?.trim() && 
      CONFIG.EMAILJS_SERVICE_ID?.trim() && 
      CONFIG.EMAILJS_TEMPLATE_ID?.trim()
    );
    
    const hasValidKeyLength = CONFIG.EMAILJS_PUBLIC_KEY?.length > 10;
    
    const isConfigured = hasRequiredFields && hasValidKeyLength;
    
    if (CONFIG.DEBUG_MODE) {
      console.log('EmailJS Configuration:', {
        hasRequiredFields,
        hasValidKeyLength,
        isConfigured,
        publicKeyLength: CONFIG.EMAILJS_PUBLIC_KEY?.length
      });
    }
    
    return isConfigured;
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    if (isEmailJSConfigured) {
      try {
        emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
        if (CONFIG.DEBUG_MODE) {
          console.log('✅ EmailJS initialized successfully');
        }
      } catch (error) {
        console.error('❌ EmailJS initialization failed:', error);
      }
    } else {
      console.warn('⚠️ EmailJS not properly configured');
    }
  }, [isEmailJSConfigured]);

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Toast notification handler
  const showToast = useCallback((message, variant = TOAST_TYPES.SUCCESS) => {
    setToast({
      show: true,
      message,
      variant
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  // Form validation
  const validateForm = useCallback(() => {
    const errors = [];
    const { name, email, subject, message } = formData;
    
    // Required field validation
    if (!name.trim()) errors.push("Name is required");
    if (!email.trim()) errors.push("Email is required");
    if (!subject.trim()) errors.push("Subject is required");
    if (!message.trim()) errors.push("Message is required");
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email.trim())) {
      errors.push("Please enter a valid email address");
    }
    
    // Length validation
    if (name.trim().length > 100) errors.push("Name must be less than 100 characters");
    if (subject.trim().length > 200) errors.push("Subject must be less than 200 characters");
    if (message.trim().length > 2000) errors.push("Message must be less than 2000 characters");
    
    return errors;
  }, [formData]);

  // Form submission handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate form
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]);
      }

      // Check EmailJS configuration
      if (!isEmailJSConfigured) {
        throw new Error('Email service is not configured. Please contact me directly using the information above.');
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        to_name: CONFIG.CONTACT.NAME,
        reply_to: formData.email.trim()
      };

      if (CONFIG.DEBUG_MODE) {
        console.log('Sending email with params:', templateParams);
      }

      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout. Please try again.')), CONFIG.FORM_TIMEOUT);
      });

      // Send email with timeout
      const emailPromise = emailjs.send(
        CONFIG.EMAILJS_SERVICE_ID,
        CONFIG.EMAILJS_TEMPLATE_ID,
        templateParams
      );

      const result = await Promise.race([emailPromise, timeoutPromise]);

      // Success handling
      setSubmitStatus('success');
      showToast(`Message sent successfully! Thank you ${formData.name.trim()}, I'll get back to you soon!`, TOAST_TYPES.SUCCESS);
      
      // Reset form
      setFormData(INITIAL_FORM_STATE);
      
      if (CONFIG.DEBUG_MODE) {
        console.log('✅ Email sent successfully:', result);
      }

    } catch (error) {
      console.error('❌ Error sending email:', error);
      
      setSubmitStatus('error');
      
      // Enhanced error handling
      let errorMessage = 'Failed to send message. ';
      
      if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (error.status) {
        const statusMessages = {
          400: 'Invalid request. Please check all fields.',
          401: 'Authentication failed. Please try again later.',
          403: 'Access denied. Please try again later.',
          404: 'Service unavailable. Please contact me directly.',
          429: 'Too many requests. Please wait a moment and try again.',
        };
        errorMessage = statusMessages[error.status] || `Server error (${error.status}). Please try again.`;
      } else {
        errorMessage = error.message || 'An unexpected error occurred. Please try again.';
      }
      
      showToast(errorMessage, TOAST_TYPES.ERROR);
      
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting, isEmailJSConfigured, validateForm, showToast]);

  // Test EmailJS function (for debugging)
  const testEmailJS = useCallback(async () => {
    if (!isEmailJSConfigured) {
      showToast('EmailJS is not configured', TOAST_TYPES.ERROR);
      return;
    }

    try {
      const result = await emailjs.send(
        CONFIG.EMAILJS_SERVICE_ID,
        CONFIG.EMAILJS_TEMPLATE_ID,
        {
          from_name: "Test User",
          from_email: "test@example.com",
          subject: "Test Email",
          message: "This is a test message from your contact form.",
          to_name: CONFIG.CONTACT.NAME
        }
      );
      
      showToast('Test email sent successfully!', TOAST_TYPES.SUCCESS);
      console.log('Test email result:', result);
    } catch (error) {
      showToast('Test email failed: ' + error.message, TOAST_TYPES.ERROR);
      console.error('Test email error:', error);
    }
  }, [isEmailJSConfigured, showToast]);

  return (
    <Container fluid className="contact-section">
      {/* Toast Notifications */}
      <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999 }}>
        <Toast 
          show={toast.show} 
          onClose={hideToast}
          bg={toast.variant}
          delay={CONFIG.TOAST_DURATION}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {toast.variant === TOAST_TYPES.SUCCESS ? "Success" : 
               toast.variant === TOAST_TYPES.ERROR ? "Error" : 
               toast.variant === TOAST_TYPES.WARNING ? "Warning" : "Info"}
            </strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          {/* Header Section */}
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
                    <a href={`mailto:${CONFIG.CONTACT.EMAIL}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {CONFIG.CONTACT.EMAIL}
                    </a>
                  </div>
                  <div className="contact-item">
                    <FaLinkedin className="contact-icon" />
                    <span>{CONFIG.CONTACT.NAME}</span>
                  </div>
                  <div className="contact-item">
                    <AiOutlineEnvironment className="contact-icon" />
                    <span>{CONFIG.CONTACT.LOCATION}</span>
                  </div>
                </div>

                <div className="contact-social">
                  <h3>Connect With Me</h3>
                  <div className="social-links">
                    <a 
                      href={CONFIG.SOCIAL.GITHUB} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="GitHub Profile"
                    >
                      <div className="social-link-content">
                        <FaGithub />
                        <span className="social-text">GitHub</span>
                      </div>
                    </a>
                    <a 
                      href={CONFIG.SOCIAL.LINKEDIN} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="LinkedIn Profile"
                    >
                      <div className="social-link-content">
                        <FaLinkedin />
                        <span className="social-text">LinkedIn</span>
                      </div>
                    </a>
                    <a 
                      href={CONFIG.SOCIAL.TWITTER} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="Twitter Profile"
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3>Send Me a Message</h3>
                  {CONFIG.DEBUG_MODE && (
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={testEmailJS}
                      disabled={!isEmailJSConfigured}
                    >
                      Test EmailJS
                    </Button>
                  )}
                </div>
                
                {/* Configuration Status */}
                <div className="mb-3" style={{ fontSize: '0.9em' }}>
                  <strong>Status:</strong> 
                  <span className={isEmailJSConfigured ? 'text-success' : 'text-danger'}>
                    {isEmailJSConfigured ? ' ✅ Email service ready' : ' ❌ Email service not configured'}
                  </span>
                </div>

                {/* Configuration Warning */}
                {!isEmailJSConfigured && (
                  <Alert variant="warning">
                    <strong>Setup Required:</strong> Email service is not properly configured. 
                    Please contact me directly using the information above or check the EmailJS configuration.
                  </Alert>
                )}
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <Alert variant="success">
                    <strong>Success!</strong> Your message has been sent successfully. I'll get back to you soon!
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} className="mt-4" noValidate>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Full Name"
                          required
                          disabled={isSubmitting}
                          maxLength={100}
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
                          onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                      disabled={isSubmitting}
                      maxLength={200}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, question, or just say hello..."
                      required
                      disabled={isSubmitting}
                      maxLength={2000}
                    />
                    <Form.Text className="text-muted">
                      {formData.message.length}/2000 characters
                    </Form.Text>
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      className="contact-submit-btn"
                      disabled={isSubmitting || !isEmailJSConfigured}
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : isEmailJSConfigured ? (
                        'Send Message'
                      ) : (
                        'Email Service Unavailable'
                      )}
                    </Button>
                  </div>
                  
                  {/* Alternative contact suggestion */}
                  <div className="mt-3 text-center" style={{ fontSize: '0.9em', opacity: 0.8 }}>
                    Having trouble? You can also reach me directly at{' '}
                    <a 
                      href={`mailto:${CONFIG.CONTACT.EMAIL}?subject=Contact from Portfolio`} 
                      style={{ color: 'var(--primary-accent)' }}
                    >
                      {CONFIG.CONTACT.EMAIL}
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