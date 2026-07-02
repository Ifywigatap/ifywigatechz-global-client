export const COURSE = {
  id: 'graphic-cert',
  title: 'Professional Graphic Design & UI Certification Training',
  price: 120500,
  duration: '85 modules, self-paced',
  level: 'Beginner to Pro',
  badge: 'Bestseller'
};

const moduleDefinitions = [
  { title: 'Figma Interface & Design Principles', description: 'Workspace navigation, frames, artboards, basic shapes and tools.' },
  { title: 'Typography Fundamentals in Figma', description: 'Font pairing, kerning, leading, text styles creation.' },
  { title: 'Color Theory Complete Guide', description: 'Color harmony, palettes, accessibility contrast checker.' },
  { title: 'Components and Variants System', description: 'Reusable components, states, properties setup.' },
  { title: 'Auto Layout Mastery', description: 'Responsive design systems, nested layouts.' },
  { title: 'Prototyping and Interactions', description: 'Click, drag, hover states, micro-interactions.' },
  { title: 'Figma Variables and Modes', description: 'Semantic tokens for light/dark theme switching.' },
  { title: 'Advanced Prototyping Flows', description: 'Conditional logic, swapping prototypes.' },
  { title: 'Figma Plugins Essential Toolkit', description: 'Iconify, Figmotion, Content Reel usage.' },
  { title: 'Design Tokens Implementation', description: 'Design system token organization and export.' },
  { title: 'Photoshop Interface & Layers', description: 'Layer organization, smart objects, layer comps.' },
  { title: 'Selection and Masking Techniques', description: 'Pen tool, quick selections, refine edge.' },
  { title: 'Adjustment Layers Mastery', description: 'Curves, levels, color lookup tables.' },
  { title: 'Non-Destructive Editing Workflow', description: 'Smart filters, smart objects best practices.' },
  { title: 'Photoshop for Web Graphics', description: 'Export settings, SVG optimization.' },
  { title: 'Pattern Creation and Textures', description: 'Seamless patterns, displacement maps.' },
  { title: '3D Layer Basics in Photoshop', description: '3D extrusions, materials and lighting.' },
  { title: 'Batch Processing Actions', description: 'Recorder actions, droplet creation.' },
  { title: 'Camera Raw Advanced Editing', description: 'Non-destructive RAW processing techniques.' },
  { title: 'Photoshop Performance Optimization', description: 'GPU acceleration, scratch disk management.' },
  { title: 'Illustrator Pen Tool Mastery', description: 'Bezier curves, anchor point precision.' },
  { title: 'Vector Shape Builder Techniques', description: 'Live paint, Pathfinder operations.' },
  { title: 'Type on Path and Warping', description: 'Creative text effects and layouts.' },
  { title: 'Gradient Meshes and Blends', description: 'Smooth color transitions, blend tool.' },
  { title: 'Illustrator Patterns Advanced', description: 'Pattern options, brick by row offset.' },
  { title: 'Graphic Styles and Appearance', description: 'Multiple fills/strokes, effects stacking.' },
  { title: 'Illustrator Symbols Library', description: '9-slice scaling, symbol editing modes.' },
  { title: 'Variable Data Printing Prep', description: 'Data merge setup for print production.' },
  { title: 'UI Icon Design System', description: 'Grid-based icon creation workflow.' },
  { title: 'Logo Design Process Complete', description: 'Discovery, sketching, refinement, delivery.' },
  { title: 'Brand Identity Guidelines', description: 'Style guide document creation.' },
  { title: 'Advanced Figma: Dev Mode & Handoff', description: 'Code inspection, CSS extraction, Zeplin alternatives.' },
  { title: 'Figma File Organization Pro', description: 'Branching, version history, team libraries.' },
  { title: 'Design Systems at Scale', description: 'Tokens, components, documentation pages.' },
  { title: 'Accessibility in UI Design', description: 'WCAG 2.1, color contrast, keyboard navigation.' },
  { title: 'Responsive Design Breakpoints', description: 'Mobile-first layouts, constraint systems.' },
  { title: 'Microcopy Writing for UX', description: 'Button text, error messages, onboarding flows.' },
  { title: 'User Journey Mapping in Figma', description: 'Flow diagrams, empathy maps, personas.' },
  { title: 'Photoshop Neural Filters', description: 'AI smart portrait, skin smoothing, landscape mixer.' },
  { title: 'Advanced Layer Comps Workflow', description: 'State management for client presentations.' },
  { title: 'Photoshop Scripts and Automation', description: 'ExtendScript basics, batch renaming scripts.' },
  { title: 'Frequency Separation Retouching', description: 'Skin retouching without losing texture.' },
  { title: 'Liquify Tool Precision Control', description: 'Face reshaping, body correction techniques.' },
  { title: 'Dodge Burn Master Techniques', description: 'Non-destructive luminosity masking.' },
  { title: 'Photoshop Mockup Creation', description: 'Smart object mockups, perspective matching.' },
  { title: 'Illustrator Isometric Design', description: '3D mockups from 2D vectors.' },
  { title: 'Guides and Grids Advanced', description: 'Smart guides, perspective grid, rulers.' },
  { title: 'Clipping Masks Pro Techniques', description: 'Complex shape clipping, opacity masks.' },
  { title: 'Illustrator Brushes Custom Set', description: 'Scatter, art brushes, pattern brushes.' },
  { title: 'Variable Fonts Implementation', description: 'Font variations, weight axis control.' },
  { title: 'Packaging and 3D Effects', description: 'Extrude, revolve, inflate effects.' },
  { title: 'Motion Graphics Prep for After Effects', description: 'Shape layers, expressions basics.' },
  { title: 'UI Animation Principles', description: 'Easing functions, timing, stagger effects.' },
  { title: 'Lottie Animation Export', description: 'Figma to After Effects to Lottie workflow.' },
  { title: 'Print Design Specifications', description: 'CMYK, bleed, trim marks setup.' },
  { title: 'Packaging Design Templates', description: 'Die lines, 3D mockup integration.' },
  { title: 'Large Format Production', description: 'Banners, posters, resolution calculations.' },
  { title: 'Color Management for Print', description: 'ICC profiles, proof setup.' },
  { title: 'Business Card Design System', description: 'Modular designs, foil stamping specs.' },
  { title: 'Portfolio Website Design', description: 'Case study layouts, process documentation.' },
  { title: 'Client Presentation Templates', description: 'Pitch decks, style tile presentations.' },
  { title: 'Freelance Contract Essentials', description: 'Scope of work, revision policies.' },
  { title: 'Pricing Strategies for Designers', description: 'Value-based pricing, retainer models.' },
  { title: 'Client Onboarding Process', description: 'Questionnaires, mood boards, kickoff calls.' },
  { title: 'Project Management Tools', description: 'Notion, Trello, Linear for design teams.' },
  { title: 'Feedback and Revision Loops', description: 'Structured feedback collection.' },
  { title: 'Invoice and Payment Systems', description: 'Freshbooks, Stripe invoicing.' },
  { title: 'Social Media Content Design', description: 'Templates for Instagram, LinkedIn.' },
  { title: 'NFT and Digital Art Marketplaces', description: 'OpenSea, Foundation metadata prep.' },
  { title: '3D Design Intro in Blender', description: 'Modeling basics, texture painting.' },
  { title: 'AR/VR Design Considerations', description: 'Spatial interactions, gaze-based UI.' },
  { title: 'Voice UI Design Patterns', description: 'Conversational flows, Alexa skills.' },
  { title: 'Advanced Color Science', description: 'Perceptual uniformity, color spaces.' },
  { title: 'Type Specimen Creation', description: 'Showcase font families professionally.' },
  { title: 'Custom Illustration Pipeline', description: 'From sketch to vector to animation.' },
  { title: 'Design Career Advancement', description: 'Senior designer skills, team leadership.' },
  { title: 'Design Critique Frameworks', description: 'Constructive feedback methodologies.' },
  { title: 'Teaching Design Workshops', description: 'Curriculum building, student mentoring.' },
  { title: 'Design Studio Operations', description: 'Hiring creatives, client acquisition.' },
  { title: 'Freelance Business Mastery', description: 'Complete client acquisition and portfolio system.' }
];

export const MODULES = moduleDefinitions.map((item, index) => ({
  id: String(index + 1),
  icon: String(index + 1).padStart(2, '0'),
  title: item.title,
  description: item.description,
  badge: index === 0 ? 'Free preview' : 'Core module',
  locked: index !== 0,
  videoId: index === 0 ? 'dQw4w9WgXcQ' : '',
  duration: `${18 + (index % 4) * 2} min`,
  content: item.description,
}));

/**
 * Get dynamic modules with user access
 * @param {object} user - from useAuth
 * @returns {array} modules with updated locked status
 */
export const getModules = (user) => {
  const paid = user?.graphicCoursePaid;
  return MODULES.map(module => ({
    ...module,
    locked: paid ? false : module.locked
  }));
};

export const TOOL_LIST = [
  ['Figma', 'Free', 'Prototyping & UI Design', 'figma.com'],
  ['Adobe Photoshop', '₦15,000/mo', 'Raster Editing', 'adobe.com'],
  ['Adobe Illustrator', '₦15,000/mo', 'Vector Graphics', 'adobe.com'],
  ['Canva Pro', '₦4,000/mo', 'Quick Designs', 'canva.com'],
  ['Adobe XD', '₦15,000/mo', 'Prototyping', 'adobe.com']
];

export const CATEGORIES = ['Digital Illustration', 'UI Design', 'Branding', 'Print Design', 'Motion'];

export const OUTCOMES = [
  'Master Figma, Photoshop, Illustrator for production-ready designs',
  'Build complete branding packages from logo to marketing materials',
  'Create pixel-perfect UI designs with developer handoff specifications',
  'Launch profitable freelance graphic design business with client acquisition strategies'
];

export const INSTRUCTOR = {
  name: 'Sarah Adebayo',
  role: 'Lead Designer @ Ifywigatechz, 7+ years experience',
  students: '500+ trained',
  rating: 4.9,
  avatar: '/courses/graphic-design.jpg',
  bio: 'Sarah is a lead designer with over 7 years of experience, specializing in UI/UX and brand identity. She has trained over 500 designers to build professional portfolios and launch successful freelance careers.'
};

export const TESTIMONIALS = [
  {
    quote: "Sarah's course took my designs from amateur to professional.",
    author: 'Chinedu Okeke, Freelance Designer',
    rating: 5
  },
  {
    quote: 'Best investment in my career. The Figma + Photoshop combo modules are gold.',
    author: 'Fatima Ibrahim',
    rating: 5
  },
  {
    quote: 'Real-world projects helped me build a killer portfolio.',
    author: 'Amina Yusuf, UI Designer',
    rating: 5
  },
  {
    quote: 'From zero to freelance-ready in 3 months. Amazing!',
    author: 'Tunde Ade, Graphic Artist',
    rating: 5
  },
  {
    quote: 'Comprehensive and practical. Now confident handing off designs to developers.',
    author: 'David Mensah',
    rating: 5
  }
];

export const FAQS = [
  {
    q: 'Do I need to buy Adobe software before starting?',
    a: 'No! Course starts with free Figma + Canva. Adobe trials provided. All links included.'
  },
  {
    q: 'What if Im a complete beginner?',
    a: '100% beginner-friendly. We start from zero design knowledge with guided projects.'
  },
  {
    q: 'Will I get a certificate?',
    a: 'Yes! IFYWIGATECHZ Professional Graphic Design Certification upon completion.'
  },
  {
    q: 'Can I access on mobile?',
    a: 'Full responsive course player works on phone, tablet, desktop.'
  },
  {
    q: 'Lifetime access or expiry?',
    a: 'Lifetime access + all future updates included at no extra cost.'
  }
];
