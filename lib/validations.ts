export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long")
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push("Password must contain at least one number")
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateForm(data: {
  email: string
  password: string
  name?: string
  confirmPassword?: string
}): {
  isValid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}
  
  if (!data.email) {
    errors.email = "Email is required"
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address"
  }
  
  if (!data.password) {
    errors.password = "Password is required"
  } else {
    const passwordValidation = validatePassword(data.password)
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0]
    }
  }
  
  if (data.confirmPassword !== undefined && data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }
  
  if (data.name !== undefined && !data.name.trim()) {
    errors.name = "Name is required"
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
