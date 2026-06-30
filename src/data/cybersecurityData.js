export const COURSE = {
  id: 'cyber-cert',
  title: 'Cybersecurity Fundamentals: Beginner to Pro',
  price: 180000, // NGN
  duration: '90 modules, self-paced',
  level: 'Beginner to Pro',
  badge: 'High Demand'
};

const moduleDefinitions = [
    // Foundational Concepts
    { title: 'Introduction to Cybersecurity', description: 'Core concepts, threats, vulnerabilities, and risk management.' },
    { title: 'Cybersecurity Career Paths', description: 'Exploring roles like Analyst, Engineer, Penetration Tester, etc.' },
    { title: 'The CIA Triad', description: 'Confidentiality, Integrity, and Availability principles.' },
    { title: 'Security Governance and Compliance', description: 'Understanding frameworks like NIST, ISO 27001, and GDPR.' },
    { title: 'Essential Terminology', description: 'Glossary of key cybersecurity terms and acronyms.' },

    // Networking Fundamentals
    { title: 'Networking Basics for Hackers', description: 'OSI and TCP/IP models, packets, and frames.' },
    { title: 'IP Addressing & Subnetting', description: 'IPv4, IPv6, and subnet mask calculations.' },
    { title: 'Common Protocols (HTTP, DNS, FTP, SSH)', description: 'How they work and their security implications.' },
    { title: 'Network Hardware (Routers, Switches, Firewalls)', description: 'Functions and basic configurations.' },
    { title: 'Wireless Networking & Security', description: 'WEP, WPA2, WPA3 standards and common attacks.' },
    { title: 'Using Wireshark for Packet Analysis', description: 'Capturing and analyzing network traffic.' },

    // Operating Systems Security
    { title: 'Windows Security Fundamentals', description: 'User accounts, permissions, UAC, and BitLocker.' },
    { title: 'Linux Security Fundamentals', description: 'File permissions, user management, and sudo.' },
    { title: 'Command Line for Security Pros', description: 'Essential Bash and PowerShell commands.' },
    { title: 'Hardening Operating Systems', description: 'Disabling unnecessary services and applying security baselines.' },
    { title: 'Virtualization with VirtualBox/VMware', description: 'Setting up a safe lab environment.' },

    // Cryptography
    { title: 'Introduction to Cryptography', description: 'Symmetric vs. Asymmetric encryption, hashing.' },
    { title: 'Public Key Infrastructure (PKI)', description: 'Certificates, CAs, and trust models.' },
    { title: 'SSL/TLS in Action', description: 'Securing web traffic with HTTPS.' },
    { title: 'Common Encryption Algorithms', description: 'AES, RSA, and their use cases.' },
    { title: 'Steganography & Obfuscation', description: 'Hiding data in plain sight.' },

    // Offensive Security (Ethical Hacking)
    { title: 'Ethical Hacking Methodology', description: 'The 5 phases: Recon, Scanning, Gaining Access, Maintaining Access, Covering Tracks.' },
    { title: 'Information Gathering (Reconnaissance)', description: 'Passive and active recon techniques (OSINT, Whois, DNS enumeration).' },
    { title: 'Scanning Networks with Nmap', description: 'Port scanning, service and OS detection.' },
    { title: 'Vulnerability Scanning with Nessus/OpenVAS', description: 'Identifying known vulnerabilities in systems.' },
    { title: 'Introduction to Metasploit Framework', description: 'Exploiting vulnerabilities and managing sessions.' },
    { title: 'Password Attacks', description: 'Brute-force, dictionary attacks, and rainbow tables.' },
    { title: 'Web Application Hacking: OWASP Top 10', description: 'SQL Injection, XSS, CSRF explained.' },
    { title: 'Hacking Web Servers', description: 'Directory traversal, file inclusion vulnerabilities.' },
    { title: 'Social Engineering Tactics', description: 'Phishing, pretexting, and baiting.' },
    { title: 'Wireless Network Attacks', description: 'Cracking WPA2, Evil Twin attacks.' },
    { title: 'Post-Exploitation Techniques', description: 'Privilege escalation, pivoting, and data exfiltration.' },

    // Defensive Security (Blue Team)
    { title: 'Security Operations Center (SOC) Overview', description: 'Roles, responsibilities, and tools.' },
    { title: 'Intrusion Detection & Prevention Systems (IDS/IPS)', description: 'Signature-based vs. anomaly-based detection.' },
    { title: 'Security Information and Event Management (SIEM)', description: 'Introduction to Splunk/ELK Stack for log analysis.' },
    { title: 'Firewall Configuration and Management', description: 'Stateful vs. stateless firewalls, ACLs.' },
    { title: 'Endpoint Detection and Response (EDR)', description: 'Protecting workstations and servers.' },
    { title: 'Incident Response Process', description: 'Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.' },
    { title: 'Digital Forensics Fundamentals', description: 'Chain of custody, evidence collection, and analysis.' },
    { title: 'Malware Analysis Basics', description: 'Static and dynamic analysis of malicious software.' },
    { title: 'Threat Hunting Concepts', description: 'Proactively searching for threats in the network.' },

    // Cloud Security
    { title: 'Introduction to Cloud Computing', description: 'IaaS, PaaS, SaaS models.' },
    { title: 'Cloud Security Shared Responsibility Model', description: 'Who is responsible for what in the cloud.' },
    { title: 'Identity and Access Management (IAM) in AWS/Azure', description: 'Users, roles, and policies.' },
    { title: 'Securing Cloud Networks (VPCs, NSGs)', description: 'Isolating resources in the cloud.' },
    { title: 'Container Security (Docker & Kubernetes)', description: 'Securing container images and runtimes.' },
    { title: 'Serverless Security', description: 'Security challenges with AWS Lambda/Azure Functions.' },

    // Career & Certification Prep
    { title: 'Building a Cybersecurity Portfolio', description: 'Showcasing your skills with projects and write-ups.' },
    { title: 'Writing a Cybersecurity Resume', description: 'Tailoring your resume for security roles.' },
    { title: 'Cybersecurity Interview Preparation', description: 'Common technical and behavioral questions.' },
    { title: 'CompTIA Security+ (SY0-601) Prep 1: Threats & Attacks', description: 'Exam domain review.' },
    { title: 'CompTIA Security+ (SY0-601) Prep 2: Architecture & Design', description: 'Exam domain review.' },
    { title: 'CompTIA Security+ (SY0-601) Prep 3: Implementation', description: 'Exam domain review.' },
    { title: 'CompTIA Security+ (SY0-601) Prep 4: Operations & Incident Response', description: 'Exam domain review.' },
    { title: 'CompTIA Security+ (SY0-601) Prep 5: Governance, Risk & Compliance', description: 'Exam domain review.' },
    { title: 'Capstone Project: Penetration Test Report', description: 'Perform a mock pentest and write a professional report.' },
];

export const MODULES = moduleDefinitions.map((item, index) => ({
  id: String(index + 1).padStart(2, '0'),
  icon: String(index + 1).padStart(2, '0'),
  title: item.title,
  description: item.description,
  badge: index === 0 ? 'Free preview' : 'Core module',
  locked: index !== 0,
  videoId: index === 0 ? '3QpU8X_3lX4' : '', // Example video
  duration: `${25 + (index % 6) * 4} min`,
  content: item.description,
}));

export const getModules = (user) => {
  const paid = user?.cybersecurityCoursePaid;
  return MODULES.map(module => ({
    ...module,
    locked: paid ? false : module.locked
  }));
};

export const CYBER_CONCEPTS = [
    ['Ethical Hacking', 'Legally breaking into systems to find vulnerabilities.'],
    ['Threat Intelligence', 'Data-driven insights about cyber threats and attackers.'],
    ['Incident Response', 'The process of responding to and managing a security breach.'],
    ['Digital Forensics', 'Investigating cybercrimes and recovering digital evidence.'],
    ['Zero Trust Architecture', 'A security model that trusts no one by default.'],
];

export const OUTCOMES = [
  'Master the fundamentals of networking, operating systems, and cryptography.',
  'Learn to think like a hacker and perform ethical hacking techniques.',
  'Understand defensive security operations within a Security Operations Center (SOC).',
  'Prepare for industry-recognized certifications like CompTIA Security+.',
  'Build a hands-on portfolio with practical lab exercises and a capstone project.'
];

export const INSTRUCTOR = {
  name: 'Amina Yusuf',
  role: 'Certified Ethical Hacker (CEH) & Security Analyst',
  students: '800+ trained',
  rating: 4.9,
  avatar: 'https://res.cloudinary.com/dufcon4jl/image/upload/v1776690565/herosection_zoojoq.png', // Placeholder
  bio: 'Amina is a CEH with extensive experience in penetration testing and security operations. She is passionate about mentoring the next generation of cybersecurity professionals in Africa.'
};

export const TESTIMONIALS = [
  {
    quote: 'This course is the real deal. The hands-on labs are incredible for learning.',
    author: 'Tunde Adebayo, Aspiring Pentester',
    rating: 5
  },
  {
    quote: 'I passed my Security+ exam after taking this course. The content is perfectly aligned.',
    author: 'Fatima Sani, IT Specialist',
    rating: 5
  }
];

export const FAQS = [
  {
    q: 'Do I need a powerful computer for the labs?',
    a: 'No. We will use virtual machines (VirtualBox) and cloud labs which can run on most modern laptops with at least 8GB of RAM.'
  },
  {
    q: 'Is this course enough to get a job?',
    a: 'This course provides the foundational knowledge and hands-on skills required for entry-level cybersecurity roles. Combined with the portfolio you will build, it makes you a strong candidate.'
  },
  {
    q: 'Are certification exam vouchers included?',
    a: 'The course prepares you for certifications like CompTIA Security+, but the exam vouchers themselves are not included in the course fee.'
  }
];