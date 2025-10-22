export const portfolioData = {
  personal: {
    name: "Debashish Ram",
    title: "Lead Frontend Engineer",
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
      company: "The Sparks Foundation",
      role: "Data Science and Business Analyst Intern",
      duration: "December 2020 – January 2021",
      achievements: [
        "Conducted exploratory data analysis on sales data",
        "Generated insights and identified KPIs for data-driven decision-making"
      ],
      techStack: ["Python", "Data Analysis", "Power BI"]
    },
    {
      id: 2,
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
      title: "Dynamic Multi-Country Platform",
      company: "PepsiCo",
      description: "Schema-driven form generation system adaptable to regional requirements with minimal code changes",
      techStack: ["React JS", "JSONForms", "TypeScript", "Material UI"],
      metrics: {
        countries: 3,
        reduction: "60% code reduction"
      }
    },
    {
      id: 2,
      title: "Admin Web Portal & Dashboards",
      company: "PepsiCo",
      description: "Dynamic web-based dashboards for consumer insights and campaign performance metrics",
      techStack: ["React JS", "Material UI", "GraphQL", "Power BI"],
      metrics: {
        dashboards: 8,
        users: "200+ users"
      }
    },
    {
      id: 3,
      title: "Market Research & Product Development",
      company: "IIT Madras",
      description: "Comprehensive market research and prototype evaluation for product-market fit",
      techStack: ["Market Research", "Data Analysis", "Product Management"],
      metrics: {
        surveys: "500+ responses",
        insights: "15+ key insights"
      }
    }
  ],
  
  skills: {
    frontend: [
      { name: "React JS", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Material UI", level: 90 },
      { name: "Tailwind CSS", level: 85 }
    ],
    backend: [
      { name: "GraphQL", level: 80 },
      { name: "SQL", level: 75 },
      { name: "Python", level: 70 }
    ],
    tools: [
      { name: "GitHub Copilot", level: 90 },
      { name: "Cursor", level: 85 },
      { name: "Claude AI", level: 90 },
      { name: "Power BI", level: 80 },
      { name: "Windsurf", level: 85 }
    ],
    other: [
      { name: "Product Management", level: 75 },
      { name: "Agile", level: 85 },
      { name: "UI/UX Design", level: 80 },
      { name: "Data Analysis", level: 75 }
    ]
  },
  
  extracurricular: [
    {
      id: 1,
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
      id: 2,
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