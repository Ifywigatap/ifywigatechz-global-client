export const COURSE = {
  id: 'microsoft-cert',
  title: 'Microsoft 365 & Azure Fundamentals Professional Training',
  price: 95000,
  duration: '85 modules, self-paced',
  level: 'Beginner to Pro',
  badge: 'High Demand'
};

const moduleDefinitions = [
  { title: 'Excel Formulas and Functions A-Z', description: 'VLOOKUP, INDEX MATCH, SUMIFS, XLOOKUP mastery.' },
  { title: 'Pivot Tables Advanced Analysis', description: 'Dynamic pivot tables with slicers and timelines.' },
  { title: 'Power Query Data Transformation', description: 'ETL processes, merge queries, custom columns.' },
  { title: 'Excel Data Validation Rules', description: 'Dropdown lists, custom formulas, input restrictions.' },
  { title: 'Conditional Formatting Advanced', description: 'Formula-based rules, color scales, data bars.' },
  { title: 'Charts and Sparklines Pro', description: 'Combo charts, dynamic titles, sparkline types.' },
  { title: 'PowerPoint Master Slide Design', description: 'Slide master, layouts, theme customization.' },
  { title: 'Advanced Animations Timeline', description: 'Motion paths, trigger animations, timing control.' },
  { title: 'Morph Transition Effects', description: 'Smooth object morphing between slides.' },
  { title: 'PowerPoint Designer AI Features', description: 'Intelligent layout suggestions and content.' },
  { title: 'Word Styles and Templates Pro', description: 'Style inheritance, table of contents automation.' },
  { title: 'Mail Merge Complete Workflow', description: 'Excel/Outlook integration for bulk documents.' },
  { title: 'Advanced Find and Replace', description: 'Wildcards, formatting search, regex patterns.' },
  { title: 'Track Changes Collaboration', description: 'Reviewing pane, accepting/rejecting changes.' },
  { title: 'Macros and VBA Introduction', description: 'Recording macros, simple VBA editing.' },
  { title: 'Teams Channel Management', description: 'Private channels, membership, permissions.' },
  { title: 'Teams Planner Integration', description: 'Task assignment, bucket organization.' },
  { title: 'Live Events Production', description: 'Event setup, attendee management, Q&A.' },
  { title: 'Teams Admin Center Deep Dive', description: 'Policies, meeting settings configuration.' },
  { title: 'SharePoint Lists and Libraries', description: 'Versioning, metadata, content types.' },
  { title: 'Power BI Desktop Complete', description: 'DAX measures, calculated columns, time intelligence.' },
  { title: 'Power BI Service Publishing', description: 'Workspaces, app publishing, sharing.' },
  { title: 'Power BI Dataflows and Datasets', description: 'Gateway setup, incremental refresh.' },
  { title: 'Azure Portal Navigation', description: 'Resource groups, RBAC permissions.' },
  { title: 'Virtual Machines Provisioning', description: 'Marketplace images, sizing selection.' },
  { title: 'Storage Accounts Configuration', description: 'Blob, file, queue storage types.' },
  { title: 'Azure AD Users and Groups', description: 'Hybrid identity, MFA enforcement.' },
  { title: 'Azure Monitor and Alerts', description: 'Log Analytics, metric alerts setup.' },
  { title: 'Excel Power Pivot Data Model', description: 'Relationships, calculated columns, measures.' },
  { title: 'Dynamic Array Formulas', description: 'FILTER, SORT, UNIQUE, SEQUENCE functions.' },
  { title: 'Excel Lambda Functions', description: 'Custom reusable functions, LAMBDA helper.' },
  { title: 'Power Query M Language Basics', description: 'Custom functions, error handling.' },
  { title: 'Excel Table Structured References', description: 'Formula intelligence, dynamic ranges.' },
  { title: 'Forecasting and What-If Analysis', description: 'Goal Seek, Solver, Scenario Manager.' },
  { title: 'PowerPoint Section Management', description: 'Presentation organization, navigation.' },
  { title: 'Slide Zoom Navigation', description: 'Interactive presentations, summary zoom.' },
  { title: 'PowerPoint Video Editing', description: 'Trim, fade, bookmark timeline editing.' },
  { title: 'Custom Show Creation', description: 'Multiple presentation versions from master.' },
  { title: 'Word Master Documents', description: 'Long document management, subdocuments.' },
  { title: 'Advanced Table Automation', description: 'Table styles, nested tables, formulas.' },
  { title: 'Cross-Reference Mastery', description: 'Figures, tables, headings linking.' },
  { title: 'Word Field Codes Pro', description: 'Document automation, mail merge fields.' },
  { title: 'Outlook Rules and Automation', description: 'Server-side rules, Quick Steps creation.' },
  { title: 'Shared Mailbox Management', description: 'Delegate access, permissions setup.' },
  { title: 'Teams External Guest Access', description: 'B2B collaboration, guest lifecycle.' },
  { title: 'Teams Phone System', description: 'Direct routing, calling plans setup.' },
  { title: 'Meeting Recording Policies', description: 'Storage location, transcription settings.' },
  { title: 'SharePoint Syntex AI', description: 'Document classification, form processing.' },
  { title: 'Power Automate Desktop RPA', description: 'UI flows, desktop automation.' },
  { title: 'Power BI Paginated Reports', description: 'Pixel-perfect reporting, parameters.' },
  { title: 'Power BI AI Visuals', description: 'Key influencers, decomposition tree.' },
  { title: 'Azure SQL Database Basics', description: 'Serverless, Hyperscale, vCore models.' },
  { title: 'Azure App Service Deployment', description: 'Web apps, slots, custom domains.' },
  { title: 'Azure Functions Serverless', description: 'HTTP triggers, durable functions.' },
  { title: 'Azure Cosmos DB NoSQL', description: 'Partition keys, indexing policies.' },
  { title: 'Azure Key Vault Secrets', description: 'Managed identities, access policies.' },
  { title: 'Azure Logic Apps Integration', description: 'Workflow automation, connectors.' },
  { title: 'Power Apps Canvas Apps', description: 'Formula-driven apps, galleries.' },
  { title: 'Power Apps Model-Driven Apps', description: 'Dataverse, business process flows.' },
  { title: 'Power Virtual Agents Chatbots', description: 'Topics, entities, analytics.' },
  { title: 'Azure DevOps Pipelines', description: 'YAML pipelines, multi-stage deployments.' },
  { title: 'Azure Boards Agile Planning', description: 'Sprints, backlogs, delivery plans.' },
  { title: 'GitHub Actions for Azure', description: 'CI/CD workflows, secrets management.' },
  { title: 'Microsoft Defender for Cloud', description: 'Security posture, threat protection.' },
  { title: 'Azure Sentinel SIEM', description: 'KQL queries, workbooks, incidents.' },
  { title: 'Azure Policy and Blueprints', description: 'Compliance governance, initiatives.' },
  { title: 'Azure Cost Management', description: 'Budgets, forecasts, cost analysis.' },
  { title: 'Azure Backup and Site Recovery', description: 'Recovery plans, vault management.' },
  { title: 'Microsoft Endpoint Manager', description: 'Intune co-management, autopilot.' },
  { title: 'Azure AD Conditional Access', description: 'Risk-based policies, MFA contexts.' },
  { title: 'Microsoft 365 Compliance Center', description: 'Retention policies, eDiscovery.' },
  { title: 'Power Platform Admin Center', description: 'Environments, DLP policies setup.' },
  { title: 'AZ-900 Azure Fundamentals Prep', description: 'Exam domains review and practice.' },
  { title: 'MS-900 Microsoft 365 Prep', description: 'Cloud concepts, pricing models.' },
  { title: 'PL-900 Power Platform Prep', description: 'Low-code fundamentals exam prep.' },
  { title: 'DP-900 Azure Data Prep', description: 'Relational, non-relational data.' },
  { title: 'Enterprise Microsoft 365 Deployment', description: 'FastTrack, adoption scorecards.' },
  { title: 'Microsoft Partner Certification', description: 'Solutions Partner assessment preparation.' }
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
  const paid = user?.microsoftCoursePaid;
  return MODULES.map(module => ({
    ...module,
    locked: paid ? false : module.locked
  }));
};

export const CERT_LIST = [
  ['AZ-900 Azure Fundamentals', 'Microsoft', 'Entry Level', 'Free Exam Prep'],
  ['PL-900 Power Platform', 'Microsoft', 'Entry Level', 'Included'],
  ['MS-900 Microsoft 365', 'Microsoft', 'Entry Level', 'Included'],
  ['DP-900 Azure Data Fundamentals', 'Microsoft', 'Entry Level', 'Bonus']
];

export const CATEGORIES = ['Office Productivity', 'Data Analysis', 'Cloud Fundamentals', 'Admin'];

export const OUTCOMES = [
  'Master Microsoft 365 suite for enterprise productivity',
  'Build professional Power BI dashboards from real data',
  'Prepare and pass AZ-900 Azure Fundamentals certification',
  'Automate business processes with Power Automate'
];

export const INSTRUCTOR = {
  name: 'Michael Okafor',
  role: 'Microsoft Certified Trainer | Azure Admin',
  students: '400+ certified',
  rating: 4.8,
  avatar: '/courses/microsoft-office.jpg',
  bio: 'Michael has certified 400+ professionals in Microsoft 365 and Azure. Expert in Power BI, Azure Fundamentals, and enterprise productivity solutions.'
};

export const TESTIMONIALS = [
  {
    quote: 'Passed AZ-900 on first try thanks to Michaels practical Azure labs!',
    author: 'Aisha Bello, IT Admin',
    rating: 5
  },
  {
    quote: 'Power BI modules alone worth the price. Transformed our reporting.',
    author: 'Emeka Nwosu, Analyst',
    rating: 5
  },
  {
    quote: 'Excel and Power BI combo changed how I analyze data at work.',
    author: 'Chioma Eze, Data Analyst',
    rating: 5
  },
  {
    quote: 'Perfect balance of theory and hands-on Azure labs.',
    author: 'Peter Okon', 
    rating: 5
  }
];

export const FAQS = [
  {
    q: 'Do I need Microsoft 365 subscription?',
    a: 'Free trials + student versions provided. 30-day trials for all apps.'
  },
  {
    q: 'Is AZ-900 exam voucher included?',
    a: 'Prep course included. Official voucher available separately for ₦25k discount.'
  },
  {
    q: 'Can I use this for Microsoft certification?',
    a: 'Yes - full exam prep for AZ-900, MS-900, PL-900 included.'
  },
  {
    q: 'What if I have no IT background?',
    a: 'Perfect starting point. No prior experience required.'
  }
];
