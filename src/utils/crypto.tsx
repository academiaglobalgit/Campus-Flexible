const decodeBase64 = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Clave secreta (debería estar en variables de entorno en producción)
const SECRET_KEY = decodeBase64(import.meta.env.VITE_AES_KEY);
const SECRET_IV  = decodeBase64(import.meta.env.VITE_AES_IV);

// Convertir clave a formato CryptoKey
const getCryptoKey = async (): Promise<CryptoKey> => {
  return await crypto.subtle.importKey(
    "raw",
    SECRET_KEY,
    { name: "AES-CBC" },  // Equivalente a CryptoJS.mode.CBC
    false,
    ["encrypt", "decrypt"]
  );
};

// Encriptar datos
export const encryptData = async (data: unknown): Promise<string> => {
  try {
    const cryptoKey = await getCryptoKey();
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(data));

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: SECRET_IV },
      cryptoKey,
      encodedData
    );
    
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  } catch (error) {
    console.error('Error encriptando:', error);
    throw new Error('Error en encriptación');
  }
};

// Desencriptar datos
export const decryptData = async (encryptedData: string): Promise<any> => {
  try {
    const cryptoKey = await getCryptoKey();
    const buffer = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: SECRET_IV },
      cryptoKey,
      buffer
    );

    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (error) {
    console.error('Error desencriptando:', error);
    throw new Error('Error en desencriptación');
  }
};

