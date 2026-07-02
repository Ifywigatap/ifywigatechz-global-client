export const COURSE = {
  id: 'web3-cert',
  title: 'Web3 & Blockchain Development',
  price: 250000,
  duration: '10 Weeks',
  level: 'Intermediate to Advanced',
  badge: 'Trending'
};

export const MODULES = [
  {
    id: "01",
    icon: "01",
    title: "Introduction to Blockchain & Web3",
    description: "Understand the fundamentals of decentralized networks, cryptography, and smart contracts.",
    duration: "1 Week",
    badge: "Free preview",
    locked: false,
    videoId: "dQw4w9WgXcQ",
    content: "Dive into the history of Bitcoin, Ethereum, and the transition from Web2 to Web3. Learn about consensus mechanisms, nodes, and how decentralized networks achieve trustless validation."
  },
  {
    id: "02",
    icon: "02",
    title: "Solidity & Smart Contracts",
    description: "Write, test, and deploy smart contracts on Ethereum using Solidity.",
    duration: "3 Weeks",
    badge: "Core module",
    locked: true,
    videoId: "",
    content: "Master Solidity, the programming language for Ethereum. Build custom tokens (ERC-20, ERC-721), handle state variables, mappings, and ensure contract security to prevent reentrancy attacks."
  },
  {
    id: "03",
    icon: "03",
    title: "DApp Development with React & Ethers.js",
    description: "Build front-end interfaces for decentralized applications.",
    duration: "3 Weeks",
    badge: "Core module",
    locked: true,
    videoId: "",
    content: "Connect your React applications to the blockchain using Ethers.js or Web3.js. Implement wallet connections (MetaMask), read contract data, and submit transactions directly from the browser."
  },
];

export const getModules = (user) => {
  const paid = user?.web3CoursePaid;
  return MODULES.map(module => ({
    ...module,
    locked: paid ? false : module.locked
  }));
};

export const OUTCOMES = [
  "Understand blockchain architecture and consensus mechanisms.",
  "Write secure smart contracts using Solidity.",
  "Build full-stack decentralized applications (dApps) using React and Ethers.js.",
  "Deploy contracts to testnets and mainnets (Ethereum, Polygon)."
];