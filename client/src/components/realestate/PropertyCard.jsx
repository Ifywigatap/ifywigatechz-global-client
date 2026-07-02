import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toggleSave } from '../../services/realestate';

export default function PropertyCard({ property, isSaved = false, onToggleSave }) {
  const [saved, setSaved] = useState(isSaved);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const newSavedState = await onToggleSave(property.id);
    setSaved(newSavedState);
    setSaving(false);
  };

  return (
    <div className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group bg-white">
      {/* IMAGE + SAVE */}
      <div className="relative h-52 overflow-hidden">
        <Link to={`/realestate/${property.id}`}>
          <img 
            src={property.images?.[0] || property.image || '/placeholder-property.jpg'} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 z-10
                     text-2xl {saved ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500'} 
                     hover:scale-110 active:scale-95 disabled:opacity-50"
          title={saved ? 'Remove from saved' : 'Save property'}
        >
          {saving ? '...' : (saved ? '❤️' : '🤍')}
        </button>

        {/* BADGE: Featured/User */}
        {(property.featured || property.postedAt) && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {property.featured ? 'Featured' : 'New'}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-2">
        <Link to={`/realestate/${property.id}`} className="block hover:text-blue-600 transition-colors">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:underline">{property.title}</h3>
        </Link>
        
        <p className="text-sm text-gray-500">{property.location}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{property.beds || 0} beds</span>
          <span>{property.baths || 0} baths</span>
          <span>{property.area}</span>
        </div>

        <p className="font-bold text-2xl text-blue-600">
          ₦{Number(property.price || 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

