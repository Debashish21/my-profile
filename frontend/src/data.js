// Portfolio data organized by sections for easy editing
export const portfolioData = {
  personal: {
    name: "Debashish Ram",
    title: "Software Engineer 1",
    location: "Hyderabad",
    email: "debashishram@gmail.com",
    phone: "7661909552",
    tagline: "Building scalable, intuitive web experiences with modern AI tools",
    bio: "Technically grounded professional with 2+ years of experience in the product development lifecycle, specializing in frontend engineering and cross-functional collaboration. Leverages modern AI tools (GitHub Copilot, Windsurf, Cursor, Claude) to enhance productivity, streamline workflows, and support data-informed decision-making."
  },

  experience: [
    {
      id: 1,
      company: "PepsiCo",
      role: "Lead Engineer",
      location: "Hyderabad",
      duration: "April 2024 – Present",
      startDate: "2024-04",
      current: true,
      achievements: [
        "Implemented dynamic UI architecture using JSONForms with ReactJS for schema-driven form generation",
        "Developed reusable React JS components for multi-country implementations",
        "Successfully launched Turkey market module",
        "Established scalable framework for onboarding 2 additional countries"
      ],
      techStack: ["React JS", "JSONForms", "Material UI", "TypeScript"],
      impact: "150% faster country onboarding"
    },
    {
      id: 2,
      company: "PepsiCo",
      role: "Assistant Analyst",
      location: "Hyderabad",
      duration: "July 2022 – April 2024",
      startDate: "2022-07",
      endDate: "2024-04",
      current: false,
      achievements: [
        "Designed and developed Admin Web Portal using React JS and Material UI",
        "Led development of key dashboards for D2C Mexico project",
        "Drove data-driven decision-making through consumer insights dashboards",
        "Enhanced operational efficiency and user engagement"
      ],
      techStack: ["React JS", "Material UI", "Power BI", "GraphQL"],
      impact: "40% improved operational efficiency"
    }
  ],

  internships: [
    {
      id: 1,
      company: "The Climber - MyCaptain",
      role: "Marketing and Sales Intern",
      duration: "July 2020 – August 2020",
      achievements: [
        "Developed strategies to build brand awareness",
        "Expanded marketing network"
      ],
      techStack: ["Marketing Strategy", "Market Research"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Market Research & Product Development",
      company: "IIT Madras",
      description: "Comprehensive market research and prototype evaluation for product-market fit",
      techStack: ["Market Research", "Data Analysis", "Product Management"],
      metrics: {  
        surveys: "300+ responses",
        insights: "12+ key insights"
      }
    },
    {
      id: 2,
      title: "Custom Design Library MCP Server",
      company: "Independent Project",
      description: "Model Context Protocol server for seamless design system integration with AI coding assistants, enabling direct component replacement and vibe-based coding workflows",
      techStack: ["MCP", "TypeScript", "python", "AI Integration"],
      metrics: {
        integration: "Real-time component fetching",
        workflow: "Direct component replacement"
      }
    },
    {
      id: 3,
      title: "Interactive Voice & Gesture Gaming Platform for Marketing",
      company: "Hackathon",
      description: "Micro-frontend gaming platform featuring voice and gesture-controlled classics (Pac-Man, Flappy Bird, Snake) designed for branded kiosk experiences. Enables brands to create engaging customer experiences at high-traffic venues with customizable in-game brand elements for experiential marketing",
      techStack: ["Next.js", "React", "TensorFlow.js", "Speech Recognition", "OpenCV", "Micro-frontends"],
      metrics: {
        games: "3 AI-powered games",
        controls: "Voice & gesture interaction",
        deployment: "Plug-and-play architecture"
      }
    },

  ],

  skills: {
    technical: [
      { name: "React JS"},
      { name: "JavaScript" },
      { name: "Material UI" },
      { name: "HTML5/CSS3" },
      { name: "SQL"},
      { name: "GitHub Copilot" },
      { name: "Cursor" },
      { name: "Claude AI" },
      { name: "Windsurf" }
    ],
    productManagement: [
      { name: "Product Roadmap" },
      { name: "GTM Strategy" },
      { name: "Product Lifecycle Management" },
      { name: "Competitive Analysis" },
      { name: "Stakeholder Management" },
      { name: "Agile" },
      { name: "UI/UX Design" },
      { name: "Data Analysis" }
    ],
    marketing: [
      { name: "Market Research" },
      { name: "Branding Strategy" },
      { name: "Digital Marketing" },
      { name: "Content Strategy" },
      { name: "Customer Segmentation" },
      { name: "Campaign Management" },
      { name: "Social Media Marketing" },
      { name: "Marketing Analytics" }
    ]
  },

  extracurricular: [
    {
      id: 1,
      organization: "PepsiCo Global DPA Hackathon 2025",
      role: "Winner",
      duration: "2025",
      achievements: [
        "Winner in Theme 1: AI-based Customer Engagement tool or web interface",
        "Runner-up in Theme 2: AI-based state-of-the-art tech tool to optimize business process"
      ]
    },
    {
      id: 2,
      organization: "IIT Madras - GDC Centre",
      role: "Entrepreneur Lead",
      duration: "December 2021 – March 2022",
      achievements: [
        "Conducted comprehensive market research",
        "Evaluated product-market fit",
        "Implemented data-driven modifications based on customer feedback"
      ]
    },
    {
      id: 3,
      organization: "DreamMerchants Business Club",
      role: "Core Committee Member & Board Representative",
      duration: "February 2019 – February 2021",
      achievements: [
        "Increased event participation by 150% through social media campaigns",
        "Managed sponsorships and event planning",
        "Led team of 15+ members"
      ]
    }
  ],

  education: {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Vellore Institute of Technology, Vellore",
    duration: "July 2018 – April 2022"
  }
};