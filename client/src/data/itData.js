export const COURSE = {
  id: 'it-fundamentals-cert',
  title: 'IT Support & Fundamentals Professional Certification',
  price: 85000,
  duration: '85 modules, self-paced',
  level: 'Beginner to Pro',
  badge: 'Entry Level IT'
};

const moduleDefinitions = [
  { title: 'Computer Hardware Components', description: 'Understand CPU, RAM, storage devices and motherboard basics.' },
  { title: 'PC Assembly and Disassembly', description: 'Safe hardware installation and troubleshooting procedures.' },
  { title: 'Peripherals and Connectivity Ports', description: 'USB, HDMI, DisplayPort, audio jacks and cable types.' },
  { title: 'Power Supplies and Cooling Systems', description: 'PSU wattage calculations and thermal management.' },
  { title: 'Laptop vs Desktop Differences', description: 'Mobile hardware limitations and upgrade options.' },
  { title: 'Printers and Scanners Setup', description: 'Driver installation and network printing configuration.' },
  { title: 'Display Technologies Overview', description: 'LCD, LED, OLED monitors and resolution settings.' },
  { title: 'Storage Devices: HDD vs SSD', description: 'Capacity, speed, and lifespan comparisons.' },
  { title: 'Windows 10/11 Installation', description: 'Clean install, upgrade, and recovery media creation.' },
  { title: 'Windows User Accounts Management', description: 'Local vs Microsoft accounts, permissions setup.' },
  { title: 'File System and Partitioning', description: 'NTFS formatting, disk management tools usage.' },
  { title: 'Windows Registry Basics', description: 'Safe navigation and common troubleshooting keys.' },
  { title: 'Control Panel and Settings App', description: 'System configuration and personalization options.' },
  { title: 'Task Manager and Resource Monitor', description: 'Process monitoring and performance analysis.' },
  { title: 'Windows Update Troubleshooting', description: 'Service restart, SFC/DISM repair commands.' },
  { title: 'Device Manager Deep Dive', description: 'Driver rollback, unsigned driver installation.' },
  { title: 'Group Policy Editor Basics', description: 'Local policies for user and computer settings.' },
  { title: 'Windows Defender Configuration', description: 'Real-time protection and scan scheduling.' },
  { title: 'Networking Fundamentals - OSI Model', description: '7 layers explanation and common protocols.' },
  { title: 'IP Addressing and Subnetting', description: 'IPv4 structure, CIDR notation, subnet calculations.' },
  { title: 'Ethernet and WiFi Standards', description: '802.3, 802.11ax, cable categories comparison.' },
  { title: 'TCP/IP Protocol Suite', description: 'TCP, UDP, ICMP, ARP protocol functions.' },
  { title: 'DHCP and DNS Configuration', description: 'Server setup, client reservation, record types.' },
  { title: 'Router and Switch Basics', description: 'Layer 2/3 switching, NAT configuration.' },
  { title: 'Wireless Network Security', description: 'WPA3, guest networks, MAC filtering.' },
  { title: 'VLAN and Trunking Introduction', description: 'Port-based VLANs, inter-VLAN routing basics.' },
  { title: 'Network Cable Termination', description: 'RJ45 crimping, T568B standard wiring.' },
  { title: 'Common Windows Boot Issues', description: 'Blue screen analysis, safe mode entry.' },
  { title: 'Hardware Diagnostic Tools', description: 'Memtest86, CrystalDiskInfo, HWMonitor usage.' },
  { title: 'Slow Performance Troubleshooting', description: 'RAM, CPU, disk usage analysis procedures.' },
  { title: 'Malware Removal Procedures', description: 'Safe Mode with Networking, multiple scanner use.' },
  { title: 'Printer and Scanner Issues', description: 'Driver conflicts, spooler service reset.' },
  { title: 'Wireless Connectivity Problems', description: 'Driver reinstall, channel interference analysis.' },
  { title: 'BSOD Analysis and Resolution', description: 'Minidump reading, common stop codes.' },
  { title: 'Remote Desktop Troubleshooting', description: 'Firewall rules, licensing issues resolution.' },
  { title: 'Email Client Configuration Issues', description: 'IMAP/POP3 settings, SSL certificate errors.' },
  { title: 'VPN Connection Problems', description: 'IKEv2, OpenVPN protocol switching.' },
  { title: 'Application Crash Diagnosis', description: 'Event Viewer analysis, dependency checker.' },
  { title: 'Data Recovery Techniques', description: 'Recuva, TestDisk usage for file recovery.' },
  { title: 'BIOS/UEFI Firmware Updates', description: 'Safe flash procedures and rollback methods.' },
  { title: 'Overclocking Safety Basics', description: 'CPU/RAM overclock stability testing.' },
  { title: 'Physical Hardware Repairs', description: 'Cable replacement, connector cleaning.' },
  { title: 'Thermal Paste Application', description: 'CPU cooler removal/installation procedure.' },
  { title: 'Password Reset Methods', description: 'Offline NT password editor usage.' },
  { title: 'Windows Activation Issues', description: 'KMS, MAK key troubleshooting.' },
  { title: 'Multiple Monitor Setup', description: 'Display settings optimization.' },
  { title: 'Audio/Video Sync Problems', description: 'Driver timestamp issues resolution.' },
  { title: 'Power Management Configuration', description: 'Sleep/hibernation troubleshooting.' },
  { title: 'User Profile Corruption Fix', description: 'New profile creation, data migration.' },
  { title: 'Safe Mode Advanced Usage', description: 'Driver loading control, system restore.' },
  { title: 'Windows Firewall Rules', description: 'Inbound/outbound rule creation.' },
  { title: 'Remote Assistance Setup', description: 'Easy Connect and saved credentials.' },
  { title: 'System Restore Points', description: 'Manual creation and verification.' },
  { title: 'Startup Optimization', description: 'msconfig and Task Manager analysis.' },
  { title: 'Third Party Antivirus Removal', description: 'Complete uninstall procedures.' },
  { title: 'CompTIA A+ Core 1 Exam Prep', description: 'Hardware and networking review.' },
  { title: 'Troubleshooting Methodology', description: 'Identify, establish theory, test hypothesis.' },
  { title: 'Windows Security Best Practices', description: 'UAC, Defender Exploit Guard configuration.' },
  { title: 'Basic Scripting with PowerShell', description: 'Get-Process, Stop-Process commands.' },
  { title: 'Linux Command Line Basics', description: 'ls, cd, grep, sudo essential commands.' },
  { title: 'Virtual Machine Creation', description: 'VirtualBox, VMware Workstation setup.' },
  { title: 'Docker Container Introduction', description: 'Container vs VM, docker run basics.' },
  { title: 'Scripted OS Deployment', description: 'LiteTouch, MDT basic deployment.' },
  { title: 'Group Policy Advanced', description: 'GPO inheritance, loopback processing.' },
  { title: 'Active Directory Users', description: 'OU structure, delegation of control.' },
  { title: 'PowerShell Remoting', description: 'Enable-PSRemoting, Invoke-Command.' },
  { title: 'Event Log Analysis', description: 'Advanced filtering and correlation.' },
  { title: 'Performance Monitor Setup', description: 'Data collector sets, report generation.' },
  { title: 'WSUS Server Management', description: 'Update approvals, computer groups.' },
  { title: 'Exchange Online Basics', description: 'Mailbox permissions, mail flow rules.' },
  { title: 'Azure AD Connect', description: 'Hybrid identity synchronization.' },
  { title: 'Intune Device Management', description: 'Compliance policies deployment.' },
  { title: 'Microsoft Endpoint Manager', description: 'Co-management with ConfigMgr.' },
  { title: 'CompTIA A+ Core 2 Exam Prep', description: 'Operating systems and security review.' },
  { title: 'IT Career Development', description: 'Certifications roadmap planning.' },
  { title: 'Customer Service Excellence', description: 'Technical communication skills.' },
  { title: 'Remote Support Best Practices', description: 'ScreenConnect, TeamViewer usage.' },
  { title: 'Documentation Standards', description: 'ITIL change management basics.' },
  { title: 'Helpdesk Ticketing Systems', description: 'Zendesk, ServiceNow workflows.' },
  { title: 'Vendor Support Escalation', description: 'RMA processes and communication.' },
  { title: 'Disaster Recovery Planning', description: 'Backup verification procedures.' },
  { title: 'IT Asset Inventory', description: 'Spiceworks, Lansweeper deployment.' },
  { title: 'Security Incident Response', description: 'Containment and eradication steps.' }
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

/**
 * Get dynamic modules with user access
 * @param {object} user - from useAuth
 * @returns {array} modules with updated locked status
 */
export const getModules = (user) => {
  const paid = user?.itCoursePaid;
  return MODULES.map(module => ({
    ...module,
    locked: paid ? false : module.locked
  }));
};

export const NETWORK_LIST = [
  ['LAN Setup', 'Local', 'Basic Connectivity', 'Ethernet Cables'],
  ['WiFi Troubleshooting', 'Wireless', 'Common Issues', 'Router Reset'],
  ['VPN Configuration', 'Remote Access', 'Secure Connection', 'OpenVPN'],
  ['DNS Issues', 'Network Resolution', 'Speed Problems', 'Flush DNS']
];

export const CATEGORIES = ['Hardware', 'Software', 'Networking', 'Security', 'Cloud'];

export const OUTCOMES = [
  'Diagnose and fix common hardware/software problems',
  'Setup and troubleshoot networks for small businesses',
  'Implement basic cybersecurity measures for clients',
  'Provide professional IT support with clear communication'
];

export const INSTRUCTOR = {
  name: 'David Chukwu',
  role: 'CompTIA A+ Certified | IT Support Specialist',
  students: '300+ trained',
  rating: 4.9,
  avatar: '/courses/it-support.jpg',
  bio: 'David has trained 300+ students in IT fundamentals, helping career changers land their first IT support roles. CompTIA A+ certified with 5+ years field experience.'
};

export const TESTIMONIALS = [
  {
    quote: 'David made complex networking concepts simple. Now running my own IT support business!',
    author: 'Blessing Okoro, IT Tech',
    rating: 5
  },
  {
    quote: 'Perfect for career changers. Landed junior IT role immediately after.',
    author: 'Grace Adebayo',
    rating: 5
  }
];

export const FAQS = [
  {
    q: 'Do I need any hardware to practice?',
    a: 'No - use virtual machines and online simulators. Home PC recommended.'
  },
  {
    q: 'Will this prepare me for CompTIA A+?',
    a: 'Yes - covers 80% of A+ exam topics with practice questions included.'
  },
  {
    q: 'Is this for complete beginners?',
    a: 'Yes - starts from turning on computer basics through professional support.'
  }
];
