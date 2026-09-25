import { API_BASE_URL } from '../api/apiClient';

/**
 * Returns a fully resolved URL for uploaded images.
 * Handles local backend paths, production backend URLs, absolute URLs, and fallbacks.
 * 
 * @param {string} folder - 'productPics' | 'userPics' | 'profilePics' | 'idPic'
 * @param {string} filename - the stored filename
 * @param {string} fallbackType - 'avatar' | 'product' | 'id'
 * @param {string} productName - optional product name for smart fallback
 * @returns {string} full image source URL
 */
export const getImageUrl = (folder, filename, fallbackType = 'product', productName = '') => {
  if (!filename) {
    return getSmartFallback(fallbackType, productName);
  }

  // Already a complete URL (e.g. Unsplash or Cloudinary)
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }

  // Clean filename
  const cleanName = filename.replace(/^\/+/, '');
  const cleanFolder = folder ? folder.replace(/^\/+|\/+$/g, '') : '';

  return `${API_BASE_URL}/${cleanFolder}/${cleanName}`;
};

/**
 * Smart fallback resolving to high-quality local public assets
 */
export const getSmartFallback = (fallbackType = 'product', productName = '') => {
  if (fallbackType === 'avatar') {
    return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80';
  }

  const name = (productName || '').toLowerCase();
  if (name.includes('bike')) return '/Bike.jpg';
  if (name.includes('camera')) return '/Camera.jpg';
  if (name.includes('car')) return '/Car.jpg';
  if (name.includes('table')) return '/DininngTable.png';
  if (name.includes('desk') || name.includes('book')) return '/BookDesk.png';
  if (name.includes('sofa')) return '/Sofa.png';
  if (name.includes('headphone') || name.includes('audio')) return '/Headphone.jpg';
  if (name.includes('drill') || name.includes('tool')) return '/DrillMachine.jpg';

  return '/img1.png';
};
