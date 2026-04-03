import { v4 as uuidv4 } from "uuid";

/**
 * Generate a unique registration ID
 * Format: LM-XXXX-XXXX (e.g., LM-A3F2-9B1C)
 */
export function generateRegistrationId() {
  const uuid = uuidv4().replace(/-/g, "").toUpperCase();
  return `LM-${uuid.slice(0, 4)}-${uuid.slice(4, 8)}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/[\s-+]/g, "").replace(/^91/, ""));
}

/**
 * Sanitize input string
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input.trim().replace(/[<>]/g, "");
}

/**
 * Validate registration form data
 */
export function validateRegistration(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.phone || !isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number";
  }
  if (!data.college || data.college.trim().length < 3) {
    errors.college = "Please enter your college name";
  }
  if (!data.eventId) {
    errors.eventId = "Please select an event";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Format currency (INR)
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date
 */
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
