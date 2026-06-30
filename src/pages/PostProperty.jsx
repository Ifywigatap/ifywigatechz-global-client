import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postProperty, updateProperty, getPropertyById } from "../services/realestate";
import PaystackButton from "../components/PaystackButton";
import { paymentService } from "../services/payments.js";

export default function PostProperty() {
const navigate = useNavigate();
  const { id } = useParams();
  const propertyId = id ? Number(id) : null;

  // Load for edit
  useEffect(() => {
    if (propertyId) {
      const property = getPropertyById(propertyId);
      if (property) {
        setForm(property);
        setPreview(property.images || []);
        setIsEditing(true);
      } else {
        navigate('/real-estate');
      }
    }
  }, [propertyId]);

const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    category: "Buy",
    type: "House",
    beds: "",
    baths: "",
    area: "",
    description: "",
    images: [],
    agentName: "",
    agentPhone: "",
    status: "Active",
    lat: null,
    lng: null
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [preview, setPreview] = useState([]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE IMAGES
  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.price || Number(form.price) <= 0) newErrors.price = 'Valid price required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (form.images.length === 0 && !isEditing) newErrors.images = 'At least one image required';
    if (imageCount > 6) newErrors.images = 'Max 6 images';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Geolocation
  const getLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm(prev => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude }));
      },
      () => alert('Could not get location'),
      { enableHighAccuracy: true }
    );
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageCount > 6) {
      alert('Maximum 6 images allowed');
      return;
    }
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreview(prev => [...prev, ...imageUrls]);
    setImageCount(prev => prev + files.length);
    setForm({ ...form, images: [...form.images, ...imageUrls] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        ...form,
        price: Number(form.price),
        beds: Number(form.beds) || 0,
        baths: Number(form.baths) || 0,
        agent: {
          name: form.agentName || "Private Seller",
          phone: form.agentPhone || "",
        },
        postedAt: new Date().toISOString().split('T')[0],
        status: form.status,
      };

      if (isEditing && propertyId) {
        await updateProperty({ ...submitData, id: propertyId });
        alert('Property updated!');
      } else {
        submitData.id = Date.now();
        await postProperty(submitData);
        alert('Property posted successfully!');
      }
      navigate('/real-estate');
    } catch (error) {
      alert('Error saving property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-wide max-w-3xl mx-auto space-y-10 py-12 text-slate-900 dark:text-white transition-colors duration-300">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Property' : 'Post a Property'}</h1>
        <p className="text-slate-600 dark:text-neutral-400">
          Fill in the details to list your property.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 space-y-6 transition-colors duration-300"
      >

        {/* TITLE */}
        <input
          name="title"
          placeholder="Property Title *"
          onChange={handleChange}
          className="input"
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Price (e.g. 50000000)"
          onChange={handleChange}
          className="input w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />

        {/* LOCATION */}
        <input
          name="location"
          placeholder="Location *"
          onChange={handleChange}
          className="input w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />

        {/* CATEGORY + TYPE */}
        <div className="grid grid-cols-2 gap-4">
          <select name="category" onChange={handleChange} className="input w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Buy</option>
            <option>Rent</option>
            <option>Land</option>
          </select>

          <select name="type" onChange={handleChange} className="input w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>House</option>
            <option>Apartment</option>
            <option>Commercial</option>
            <option>Land</option>
          </select>
        </div>

        {/* BEDS / BATHS */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="beds"
            type="number"
            placeholder="Bedrooms"
            onChange={handleChange}
            className="input w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          />
          <input
            name="baths"
            type="number"
            placeholder="Bathrooms"
            onChange={handleChange}
            className="input w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          />
        </div>

        {/* AREA */}
        <input
          name="area"
          placeholder="Area (e.g. 250 sqm)"
          onChange={handleChange}
          className="input"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Property Description"
          onChange={handleChange}
          className="input"
        />

        {/* AGENT */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="agentName"
            placeholder="Agent Name"
            onChange={handleChange}
            className="input"
          />
          <input
            name="agentPhone"
            placeholder="Agent Phone (080...)"
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* IMAGES */}
        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
          />

          <div className="grid grid-cols-3 gap-3 mt-3">
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-24 w-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
          Post Property
        </button>
      </form>
    </section>
  );
}