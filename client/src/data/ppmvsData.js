export const OUTCOMES = [
  'Apply NAPPMED and PPMVS compliance standards with confidence.',
  'Guide customers safely through patent medicine selection and dosage.',
  'Maintain accurate inventory, expiry, and batch records.',
  'Deliver professional customer care and ethical retail practice.'
]

export const COURSE = {
  id: 'nappmed-ppmvs-training',
  name: 'NAPPMED PPMVS Training',
  price: 150500,
  description:
    'Formal NAPPMED and PPMVS training for patent medicine dealers, retail pharmacy operators, and health product retailers.',
  image: '/images/nappmed-ppmvs-cover.jpg',
  duration: '85 modules, self-paced',
  level: 'Beginner to Professional'
}

const moduleDefinitions = [
  { title: 'NAPPMED Foundations and PPMVS Standards', description: 'Understand the mission, code of conduct, and regulatory requirements for patent medicine vendors.' },
  { title: 'Understanding Patent Medicine Products', description: 'Learn common categories of patent medicines and their appropriate retail use.' },
  { title: 'Professional Ethics and Customer Respect', description: 'Build trust through ethical service, honesty, and respectful customer interactions.' },
  { title: 'Customer Communication Basics', description: 'Use clear language, active listening, and empathy when advising customers.' },
  { title: 'Basic Symptom Assessment', description: 'Identify common symptoms and determine appropriate over-the-counter responses.' },
  { title: 'Safe Dispensing Practices', description: 'Dispense products accurately with proper dosage, frequency, and use instructions.' },
  { title: 'Dosing and Administration Guidance', description: 'Explain dosage calculations, timing, and safe administration to clients.' },
  { title: 'Labeling and Packaging Standards', description: 'Create clear, compliant labels for products and advice given to customers.' },
  { title: 'Expiry Date Management', description: 'Track expiry dates and remove expired stock before it reaches customers.' },
  { title: 'Storage and Temperature Control', description: 'Store products correctly to preserve potency and safety.' },
  { title: 'Hygiene and Shop Cleanliness', description: 'Maintain a clean shop environment to protect customers and products.' },
  { title: 'Record Keeping Essentials', description: 'Keep accurate inventory, sales, and customer records for accountability.' },
  { title: 'Documentation for Purchases', description: 'Capture supplier invoices, batch numbers, and product details systematically.' },
  { title: 'Handling Customer Complaints', description: 'Resolve issues professionally and learn from customer feedback.' },
  { title: 'OTC Pain Management Solutions', description: 'Advise on analgesics and pain relief products safely for mild symptoms.' },
  { title: 'Cough and Respiratory Remedies', description: 'Recommend appropriate cough syrups and respiratory products responsibly.' },
  { title: 'Digestive Health Products', description: 'Support customers with safe options for upset stomachs, heartburn, and indigestion.' },
  { title: 'Rehydration and Electrolyte Solutions', description: 'Guide customers on oral rehydration and fluid replacement.' },
  { title: 'Topical Skin and Wound Care', description: 'Provide wound care ointments, antiseptics, and skin treatments correctly.' },
  { title: 'Vitamins and Mineral Supplements', description: 'Explain supplement usage, benefits, and when to recommend them.' },
  { title: 'Herbal and Traditional Remedies', description: 'Advise on herbal products with awareness of efficacy and safety.' },
  { title: 'Product Quality Inspection', description: 'Inspect stock for damage, tampering, or counterfeit indicators.' },
  { title: 'Counterfeit Prevention Practices', description: 'Know how to identify and remove fake products from inventory.' },
  { title: 'Customer Safety Advice', description: 'Counsel customers on side effects, drug interactions, and storage.' },
  { title: 'Sales Tracking and Inventory Control', description: 'Monitor stock movement and reorder effectively to avoid shortages.' },
  { title: 'Stock Rotation Practices', description: 'Use first-expiry-first-out to minimize waste and ensure safety.' },
  { title: 'Supplier Relationships and Procurement', description: 'Source products reliably and manage supplier quality.' },
  { title: 'Pricing and Profit Margin Management', description: 'Set prices that are fair, compliant, and sustainable for the shop.' },
  { title: 'Insurance and Health Scheme Awareness', description: 'Understand available schemes and how they affect customer purchases.' },
  { title: 'Shop Layout and Product Display', description: 'Organize products clearly for safe access and good customer service.' },
  { title: 'Personal Protective Equipment Use', description: 'Use PPE during handling of medicines and hygiene-critical tasks.' },
  { title: 'Basic First Aid Support', description: 'Offer basic first aid advice and products for minor injuries.' },
  { title: 'Managing Controlled Products', description: 'Recognize restricted products and follow proper handling procedures.' },
  { title: 'Child and Infant Medicine Guidance', description: 'Provide safe advice for products meant for children and babies.' },
  { title: 'Womens Health and Hygiene', description: 'Support women with safe products and appropriate guidance.' },
  { title: 'Mens Health and Wellness Products', description: 'Offer discreet, correct advice for mens health concerns.' },
  { title: 'Disease Prevention Messaging', description: 'Educate customers on prevention of common illnesses.' },
  { title: 'Health Promotion and Education', description: 'Promote wellness through hygiene, nutrition, and preventive care.' },
  { title: 'Referral to Health Professionals', description: 'Know when to refer customers to pharmacists, nurses, or doctors.' },
  { title: 'Legal Responsibilities and Compliance', description: 'Follow the laws that govern patent medicine retail practice.' },
  { title: 'Shop Security and Loss Prevention', description: 'Protect inventory and customers with appropriate security measures.' },
  { title: 'Handling Adverse Reactions', description: 'Respond appropriately when customers report reactions to products.' },
  { title: 'Antibiotic Stewardship Awareness', description: 'Avoid inappropriate antibiotic recommendations and educate customers.' },
  { title: 'Safe Disposal of Medicines', description: 'Dispose of expired or unwanted products safely and legally.' },
  { title: 'Emergency Response Planning', description: 'Prepare for emergencies and know how to act quickly.' },
  { title: 'Customer Records Privacy', description: 'Respect customer information and keep records confidential.' },
  { title: 'Professional Appearance and Demeanor', description: 'Present yourself professionally to inspire trust.' },
  { title: 'Stress Management for Retail Staff', description: 'Manage busy shop days without compromising customer care.' },
  { title: 'Team Training and Mentorship', description: 'Train shop assistants to follow proper NAPPMED practices.' },
  { title: 'Communication in Local Languages', description: 'Use simple language that customers understand clearly.' },
  { title: 'Digital Records and Inventory Tools', description: 'Use digital tools to track stock and sales securely.' },
  { title: 'Payment Options and Receipt Management', description: 'Provide clear receipts and manage payments accurately.' },
  { title: 'Seasonal Product Planning', description: 'Plan stock for seasonal health needs and demand shifts.' },
  { title: 'Promotional Compliance and Ethics', description: 'Run promotions responsibly without misrepresenting products.' },
  { title: 'Building Repeat Customer Trust', description: 'Deliver consistency to keep customers returning.' },
  { title: 'Pricing Transparency and Ethics', description: 'Communicate costs and avoid hidden charges.' },
  { title: 'Understanding Symptoms vs Conditions', description: 'Differentiate customer symptoms from underlying conditions.' },
  { title: 'Safe Product Substitutions', description: 'Recommend substitutes only when appropriate and safe.' },
  { title: 'Claims and Advertising Rules', description: 'Avoid unapproved claims about product cures or benefits.' },
  { title: 'Managing Electronic Sales', description: 'Handle online orders with the same care as in-shop sales.' },
  { title: 'Pharmacovigilance Basics', description: 'Report suspected adverse events and keep watch for safety signals.' },
  { title: 'Cold Chain Product Handling', description: 'Keep temperature-sensitive products properly refrigerated.' },
  { title: 'Eye and Ear Care Products', description: 'Advise on safe use of drops and topical products for eyes and ears.' },
  { title: 'Oral Hygiene and Dental Care', description: 'Recommend toothpaste, mouthwash, and oral care safely.' },
  { title: 'Skin Allergy and Sensitivity Management', description: 'Help customers manage allergies and avoid irritants.' },
  { title: 'Wound Dressing and Bandaging', description: 'Choose the right wound care items and instruct customers on use.' },
  { title: 'Burns and Scald Care', description: 'Advise on first steps for minor burns and safe treatments.' },
  { title: 'Insect Bite and Sting Care', description: 'Offer relief products and safety advice for bites and stings.' },
  { title: 'Basic Nutrition Advice', description: 'Support healthy eating habits that complement medicine use.' },
  { title: 'Healthy Aging Product Guidance', description: 'Advise older customers on safe product choices.' },
  { title: 'Blood Pressure and Heart Health Support', description: 'Provide supportive products and referral guidance.' },
  { title: 'Diabetes Support and Monitoring', description: 'Help diabetic customers with safe over-the-counter choices.' },
  { title: 'Respiratory Symptom Counseling', description: 'Offer appropriate advice for mild respiratory complaints.' },
  { title: 'Sleep and Relaxation Aids', description: 'Recommend sleep support options responsibly.' },
  { title: 'Pain Management Alternatives', description: 'Present non-medication support and safe pain relief options.' },
  { title: 'Travel Health and Vaccination Advice', description: 'Prepare customers for travel-related health needs.' },
  { title: 'Workplace Safety and Hygiene', description: 'Encourage safe habits for workers and small businesses.' },
  { title: 'Market Trends in Patent Medicine', description: 'Stay aware of demand shifts and product trends.' },
  { title: 'Continuous Professional Development', description: 'Keep learning and updating your knowledge regularly.' },
  { title: 'Certification Preparation and Review', description: 'Prepare for formal training certification and assessment.' },
  { title: 'Mock Assessments and Practice Reviews', description: 'Practice quiz scenarios and review training material.' },
  { title: 'Customer Feedback and Improvement', description: 'Gather feedback to improve service and product selection.' },
  { title: 'Quality Improvement Practices', description: 'Refine shop processes for better safety and efficiency.' },
  { title: 'Future Growth and Professional Goals', description: 'Plan your next steps as a certified patent medicine vendor.' },
];

export const MODULES = moduleDefinitions.map((item, index) => ({
  id: String(index + 1),
  icon: String(index + 1).padStart(2, '0'),
  title: item.title,
  description: item.description,
  badge: index === 0 ? 'Free preview' : 'Core module',
  locked: index !== 0,
  videoId: index === 0 ? 'your_real_video_id_here' : '',
  duration: `${18 + (index % 4) * 2} min`,
  content: item.description,
}));

export const DRUG_LIST = [
  {
    name: 'Cough Relief Syrup',
    category: 'Respiratory',
    dose: '10ml every 8 hours',
    status: 'Core',
    note: 'Use with clear instructions for adults and children.'
  },
  {
    name: 'Stomach Comfort Capsules',
    category: 'Digestive',
    dose: '1 capsule after meals',
    status: 'Core',
    note: 'Provide advice for use with or without food.'
  },
  {
    name: 'Pain Relief Tablets',
    category: 'Pain Management',
    dose: '1 tablet every 6 hours',
    status: 'Core',
    note: 'Warn against exceeding the daily limit.'
  },
  {
    name: 'Herbal Immunity Tonic',
    category: 'Wellness',
    dose: '15ml once daily',
    status: 'Optional',
    note: 'Recommend as a supportive product, not a cure.'
  },
  {
    name: 'First Aid Ointment',
    category: 'Topical',
    dose: 'Apply thinly twice daily',
    status: 'Core',
    note: 'Teach proper wound cleanliness before application.'
  },
  {
    name: 'Hydration Saline',
    category: 'Rehydration',
    dose: 'Mix with water per packet instructions',
    status: 'Core',
    note: 'Explain preparation and storage after mixing.'
  }
]

export const CATEGORIES = ['All', 'Respiratory', 'Digestive', 'Pain Management', 'Wellness', 'Topical', 'Rehydration']

export const INSTRUCTOR = {
  name: 'Mrs. Joy Okafor',
  role: 'NAPPMED Training Specialist',
  rating: 4.8,
  avatar: '/images/instructor-joy.jpg',
  bio: 'Mrs. Okafor supports patent medicine dealers with formal training on compliance, product safety, and customer care in line with NAPPMED standards.',
  students: '1000+ certified'
}

export const TESTIMONIALS = [
  { name: 'Musa Ibrahim', text: 'This training helped me run my medicine shop with confidence and remain compliant with NAPPMED rules.', rating: 5 },
  { name: 'Fatima Bello', text: 'The course made record keeping and customer advice much clearer for our team.', rating: 5 },
  { name: 'Emeka Uche', text: 'I now feel more professional when recommending products and explaining proper use.', rating: 4.7 }
]

export const FAQS = [
  { q: 'What is NAPPMED PPMVS training?', a: 'It is a structured program for patent medicine dealers to learn regulatory compliance, safe dispensing, and professional customer care.' },
  { q: 'Who should take this course?', a: 'Retail patent medicine vendors, pharmacy assistants, and health product retailers seeking to align with NAPPMED standards.' },
  { q: 'How long will it take to complete?', a: 'The training is self-paced and can be completed over 4-6 weeks depending on the trainee’s schedule.' },
  { q: 'Will I receive a certificate?', a: 'Yes, successful completion includes a certificate of NAPPMED/PPMVS training readiness.' }
]
