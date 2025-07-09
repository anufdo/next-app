/**
 * Edge Runtime compatible password hashing using Web Crypto API
 * This replaces bcryptjs which is not compatible with Edge Runtime
 */

// Convert string to Uint8Array
function stringToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str)
}

// Convert Uint8Array to hex string
function uint8ArrayToHex(array: Uint8Array): string {
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

// Convert hex string to Uint8Array
function hexToUint8Array(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16)
  }
  return bytes
}

// Generate a random salt
function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16))
}

// Hash password with PBKDF2
export async function hashPassword(password: string): Promise<string> {
  const salt = generateSalt()
  const passwordBuffer = stringToUint8Array(password)
  
  // Import the password as a key
  const key = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits']
  )
  
  // Derive bits using PBKDF2
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000, // 100k iterations for security
      hash: 'SHA-256'
    },
    key,
    256 // 32 bytes = 256 bits
  )
  
  const hashArray = new Uint8Array(derivedBits)
  
  // Return salt + hash as hex string
  return uint8ArrayToHex(salt) + ':' + uint8ArrayToHex(hashArray)
}

// Verify password against hash
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const [saltHex, hashHex] = hashedPassword.split(':')
    if (!saltHex || !hashHex) {
      return false
    }
    
    const salt = hexToUint8Array(saltHex)
    const originalHash = hexToUint8Array(hashHex)
    const passwordBuffer = stringToUint8Array(password)
    
    // Import the password as a key
    const key = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveBits']
    )
    
    // Derive bits using the same parameters
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      key,
      256
    )
    
    const newHash = new Uint8Array(derivedBits)
    
    // Compare hashes
    if (newHash.length !== originalHash.length) {
      return false
    }
    
    for (let i = 0; i < newHash.length; i++) {
      if (newHash[i] !== originalHash[i]) {
        return false
      }
    }
    
    return true
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}
