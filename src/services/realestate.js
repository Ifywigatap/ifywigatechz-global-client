import { apiService } from './api';
import { realEstateData } from '../data/realestateData';

const USER_PROPERTIES_KEY = 'userProperties';
const SAVED_PROPERTIES_KEY = 'savedProperties';

export const getProperties = async () => {
  try {
    const userPropsRes = await apiService.get('/realestate/properties');
    const staticProps = realEstateData;
    const userProps = userPropsRes.data || [];
    return [...staticProps, ...userProps];
  } catch (error) {
    console.error('Failed to fetch user properties:', error);
    const staticProps = realEstateData;
    const fallbackProps = JSON.parse(localStorage.getItem('userProperties') || '[]');
    return [...staticProps, ...fallbackProps];
  }
};

// Get single property by id
export const getPropertyById = (id) => {
  const allProps = getProperties();
  return allProps.find(p => p.id === Number(id));
};

// Post new property
export const postProperty = (newProperty) => {
  if (newProperty.featured && !newProperty.paymentRef) {
    console.warn('Featured property requires payment reference');
    newProperty.featured = false;
  }
  console.log('Saving property with featured:', newProperty.featured, 'ref:', newProperty.paymentRef);
  const existing = JSON.parse(localStorage.getItem(USER_PROPERTIES_KEY)) || [];
  const updated = [newProperty, ...existing];
  localStorage.setItem(USER_PROPERTIES_KEY, JSON.stringify(updated));
  return newProperty;
};

// Update property (for edit)
export const updateProperty = (updatedProperty) => {
  if (updatedProperty.featured && !updatedProperty.paymentRef) {
    console.warn('Featured property requires payment reference');
    updatedProperty.featured = false;
  }
  console.log('Updating property with featured:', updatedProperty.featured, 'ref:', updatedProperty.paymentRef);
  let existing = JSON.parse(localStorage.getItem(USER_PROPERTIES_KEY)) || [];
  existing = existing.map(p => p.id === updatedProperty.id ? updatedProperty : p);
  localStorage.setItem(USER_PROPERTIES_KEY, JSON.stringify(existing));
  return updatedProperty;
};

// Delete property
export const deleteProperty = (id) => {
  let existing = JSON.parse(localStorage.getItem(USER_PROPERTIES_KEY)) || [];
  existing = existing.filter(p => p.id !== id);
  localStorage.setItem(USER_PROPERTIES_KEY, JSON.stringify(existing));
};

// Toggle save
export const toggleSave = (id) => {
  const saved = JSON.parse(localStorage.getItem(SAVED_PROPERTIES_KEY)) || [];
  const isSaved = saved.includes(id);
  const updated = isSaved 
    ? saved.filter(i => i !== id)
    : [...saved, id];
  localStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(updated));
  return !isSaved;
};

// Get saved properties
export const getSavedProperties = () => {
  const allProps = getProperties();
  const savedIds = JSON.parse(localStorage.getItem(SAVED_PROPERTIES_KEY)) || [];
  return allProps.filter(p => savedIds.includes(p.id));
};

console.log('RealEstate service initialized');

