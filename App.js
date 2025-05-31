import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, ScrollView, useColorScheme, TextInput, Switch, StyleSheet, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// === Contexts ===
const ThemeContext = createContext();
const BookmarkContext = createContext();

// === Sample Data ===
const notes = [
  {
    chapter: '1: Introduction to Entrepreneurship',
    subtopics: [
      {
        title: 'Definition of Entrepreneurship',
        content: 'Entrepreneurship is the process of scanning the environment to identify business opportunities, gathering resources, taking calculated risks, and creating a profit-making venture under conditions of uncertainty.'
      },
      {
        title: 'Key Terms in Entrepreneurship',
        content: '- Entrepreneur: A person who introduces innovations and organizes resources to exploit opportunities.\n- Intrapreneur: An employee who uses entrepreneurial skills within an organization.\n- Enterprise: A business organization that provides goods or services.\n- Invention: Creation of something entirely new.\n- Innovation: Improvement of existing ideas, goods, or services.'
      },
      {
        title: 'Self vs Salaried Employment',
        content: 'Self-employment involves starting and running one’s own business with freedom and flexibility, but with higher risk and workload. Salaried employment involves working for another with fixed responsibilities and regular income.\n\nAdvantages of Self-employment:\n- Personal satisfaction\n- Independence\n- Enjoyment of profits\n- Job security\n- Social status\n\nDisadvantages:\n- Long hours\n- High risk\n- Uncertainty\n- Routine chores\n\nAdvantages of Salaried Employment:\n- Steady income\n- Fixed working hours\n- Benefits and perks\n\nDisadvantages:\n- Less freedom\n- Fixed income\n- Limited creativity'
      },
      {
        title: 'Contribution to National Development',
        content: '- Job creation\n- Wealth distribution\n- Utilization of local resources\n- Promotion of local technology\n- Economic stimulation\n- Encouraging innovation\n- Dispersal of economic activities\n- Raising productivity levels'
      }
    ]
  },
  {
    chapter: '2: Evolution of Entrepreneurship',
    subtopics: [
      {
        title: 'History of Entrepreneurship',
        content: 'Entrepreneurship dates back to ancient times. Early economists like Cantillon and Say emphasized the role of the entrepreneur in economic development. During industrialization, entrepreneurs helped create wealth. In Kenya, entrepreneurship gained traction in the 1990s, supported by ILO, KTTC, and JKUAT.'
      },
      {
        title: 'Myths about Entrepreneurship',
        content: '- Entrepreneurs are born, not made\n- Must be wealthy to start\n- Must invent something\n- Banks won’t lend to start-ups\n- Entrepreneurship is easy\n- Only young people succeed\n- Most start-ups succeed\n- Experience is mandatory'
      },
      {
        title: 'Theories of Entrepreneurship',
        content: '- Economic Theory: Entrepreneurs emerge due to favorable economic conditions (Schumpeter’s innovation theory).\n- Psychological Theory: Focuses on traits like need for achievement (McClelland).\n- Sociological Theory: Emphasizes influence of culture, values, and societal expectations (Max Weber).'
      },
      {
        title: 'Importance of Theories',
        content: '- Explains entrepreneurial behavior\n- Helps identify what drives entrepreneurs\n- Shows how environment and upbringing influence success\n- Demonstrates both innate and learned aspects of entrepreneurship'
      },
      {
        title: 'Entrepreneurial Environment',
        content: 'Entrepreneurial success is influenced by factors such as political stability, economic infrastructure, legal systems, and social acceptance. Poor infrastructure and political uncertainty can limit entrepreneurship.'
      }
    ]
  },
  {
    chapter: '3: The Entrepreneur',
    subtopics: [
      {
        title: 'Types of Entrepreneurs',
        content: '- Craft: Skilled laborers starting businesses in their trade\n- Opportunistic: Seek and act on business opportunities\n- Egoistic: Driven by personal fulfillment\n- Innovating: Introduce new goods, services, or production methods\n- Imitative: Copy others’ innovations (common in developing nations)\n- Fabian: Reluctant to change; adapt only when necessary\n- Drone: Refuse to change, even at a loss\n- Forced: Enter entrepreneurship out of necessity (e.g. job loss)\n- Lifestyle: Seek independence and fulfillment over wealth\n- Growth, Researcher, Internet-based, Franchise, Home-based'
      },
      {
        title: 'Qualities of an Entrepreneur',
        content: '- Risk-taking\n- Creativity and innovation\n- Independence\n- Internal locus of control\n- High need for achievement\n- Time consciousness\n- Persistence\n- Integrity\n- Decision-making ability\n- Organizational skills\n- Self-confidence\n- Problem-solving skills\n- Flexibility'
      },
      {
        title: 'Role of the Entrepreneur in the Enterprise',
        content: '- Initiator: Originates the business idea\n- Director: Engages partners and resources\n- Manager: Designs structure and manages activities\n- Financier: Mobilizes capital and manages investments'
      },
      {
        title: 'Ways of Becoming an Entrepreneur',
        content: '- Inheriting a business\n- Buying an existing business\n- Starting from scratch\n- Franchising\n- Merging or expanding a business'
      }
    ]
  },
  {
    chapter: '4: Creativity and Innovation',
    subtopics: [
      {
        title: 'Definitions',
        content: '- Creativity: Generating new ideas\n- Innovation: Applying those ideas in new or improved ways\n- Invention: Creating something new\n- Discovery: Finding something that already exists but was unknown'
      },
      {
        title: 'Creativity & Innovation Process',
        content: '- Germination: Idea arises\n- Preparation: Gathering knowledge\n- Incubation: Thinking deeply\n- Illumination: Insight appears\n- Verification: Testing the idea\n- Implementation: Bringing idea to market'
      },
      {
        title: 'SCAMPER Technique',
        content: '- Substitute\n- Combine\n- Adapt\n- Modify\n- Put to other uses\n- Eliminate\n- Rearrange/Reverse'
      },
      {
        title: 'Importance of Creativity and Innovation',
        content: '- Increases productivity\n- Enhances competitiveness\n- Drives diversification\n- Boosts employee morale\n- Improves customer satisfaction'
      },
      {
        title: 'Barriers to Creativity',
        content: '- Negative attitudes\n- Fear of failure\n- Stress\n- Strict rule-following\n- Over-reliance on logic\n- Lack of time\n- High cost of R&D\n- Lack of protection (patents)'
      },
      {
        title: 'Managing Creativity Barriers',
        content: '- Budgeting for R&D\n- Rewarding innovation\n- Training in creativity\n- Promoting flexibility and open-mindedness\n- Focusing on results'
      }
    ]
  },
 {
    chapter: '5: Entrepreneurial Culture',
    subtopics: [
      {
        title: 'Concept of Entrepreneurial Culture',
        content: 'Entrepreneurial culture is a system of shared values, beliefs, and norms that support innovation, risk-taking, and value creation in a society or organization.'
      },
      {
        title: 'Elements of Entrepreneurial Culture',
        content: '- Empowerment-focused people\n- Innovation and value creation\n- Hands-on management\n- Commitment and personal responsibility\n- Tolerance of failure\n- Attention to detail\n- Focus on the future'
      },
      {
        title: 'Cultural Habits that Promote Development',
        content: '- Money orientation\n- Future orientation\n- Independence\n- Time consciousness\n- Direct involvement\n- Risk taking\n- Willingness to fail\n- Hard work\n- Honesty and trust\n- Strong social relationships'
      },
      {
        title: 'Factors Inhibiting Entrepreneurial Development',
        content: '- Religion\n- Language barriers\n- Negative attitude toward innovation\n- Poor networking\n- Lack of motivation\n- Resistance to delegation\n- Technophobia\n- Personal or family restrictions'
      },
      {
        title: 'Ways to Manage Inhibiting Factors',
        content: '- Provide relevant training\n- Improve marketing and research\n- Employ qualified staff\n- Join business networks\n- Encourage teamwork\n- Promote time management\n- Adopt appropriate technology'
      }
    ]
  },
  {
    chapter: '6: Entrepreneurial Opportunities',
    subtopics: [
      {
        title: 'Definition of Business Opportunity',
        content: 'A business opportunity is an idea with commercial potential that addresses market needs and can generate returns.'
      },
      {
        title: 'Characteristics of a Good Opportunity',
        content: '- Real demand\n- Return on investment\n- Competitive advantage\n- Meets entrepreneur’s goals\n- Feasibility with available resources\n- Legal and socially acceptable'
      },
      {
        title: 'Sources of Business Ideas',
        content: '- Hobbies and interests\n- Skills and experiences\n- Franchises\n- Media\n- Customer complaints\n- Social changes\n- Brainstorming\n- Exhibitions\n- Observations\n- Surveys and interviews'
      },
      {
        title: 'Methods of Generating Business Ideas',
        content: '- Market research\n- Identifying community needs\n- Brainstorming sessions\n- Creativity and innovation\n- Feedback from family/friends'
      },
      {
        title: 'Evaluating Business Ideas (Screening)',
        content: '- Match with personal goals and strengths\n- Market potential\n- Resource availability\n- Legal and political environment\n- Competition analysis\n- SWOT analysis\n- Time sensitivity (window of opportunity)'
      },
      {
        title: 'Protecting Business Ideas',
        content: '- Patents: Protect inventions for 20 years\n- Trademarks: Protect symbols/logos\n- Copyright: Protect creative work\n- Legal registration: Ensures ownership and protection'
      }
    ]
  },
  {
    chapter: '7: Entrepreneurial Motivation',
    subtopics: [
      {
        title: 'Definition and Nature of Motivation',
        content: 'Motivation is the internal drive that influences individuals to take action. It’s a continuous process shaped by needs and goals.'
      },
      {
        title: 'Maslow’s Hierarchy of Needs',
        content: '- Physiological (food, water)\n- Safety (security, stability)\n- Love and belonging (relationships)\n- Esteem (respect, recognition)\n- Self-actualization (achieving potential)'
      },
      {
        title: 'McClelland’s Theory of Motivation',
        content: '- Need for Achievement (nAch): Strive for success\n- Need for Affiliation (nAff): Build relationships\n- Need for Power (nPow): Influence others\n\nThese are learned through life experience and culture.'
      },
      {
        title: 'Importance of Motivation in Entrepreneurship',
        content: '- Drives goal-oriented behavior\n- Enhances creativity and persistence\n- Helps entrepreneurs take calculated risks\n- Builds resilience and adaptability'
      }
    ]
  },
  {
    chapter: '8: Entrepreneurial Competencies',
    subtopics: [
      {
        title: 'Definition of Entrepreneurial Competencies',
        content: 'Entrepreneurial competencies are key characteristics, skills, and knowledge areas that enable success in business activities.'
      },
      {
        title: 'Types of Competencies',
        content: '- Strategic thinking\n- Opportunity recognition\n- Risk management\n- Decision making\n- Innovation and creativity\n- Planning and organizing\n- Financial literacy\n- Marketing\n- Leadership and communication\n- Networking'
      },
      {
        title: 'Importance of Entrepreneurial Competencies',
        content: '- Enables successful planning and execution\n- Enhances problem-solving ability\n- Improves business performance\n- Supports growth and competitiveness\n- Attracts investors and partners'
      }
    ]
  },
 {
    chapter: '9: Starting a Small Business',
    subtopics: [
      {
        title: 'Procedure of Starting a Business',
        content: '- Identify a business idea\n- Conduct market research\n- Prepare a business plan\n- Mobilize resources\n- Register the business\n- Set up infrastructure\n- Launch the business'
      },
      {
        title: 'Factors to Consider When Starting a Business',
        content: '- Capital availability\n- Market demand\n- Legal requirements\n- Location\n- Skills and knowledge\n- Business structure\n- Competition'
      },
      {
        title: 'Forms of Business Ownership',
        content: '- Sole proprietorship\n- Partnership\n- Limited companies\n- Cooperatives\n- Franchises\n- Joint ventures'
      },
      {
        title: 'Challenges Faced When Starting a Small Enterprise',
        content: '- Lack of capital\n- Inadequate market information\n- Poor infrastructure\n- High competition\n- Legal and regulatory hurdles\n- Lack of entrepreneurial skills'
      },
      {
        title: 'Business Life Cycle',
        content: '- Introduction\n- Growth\n- Maturity\n- Decline\n\nEach stage requires specific strategies to survive and thrive.'
      },
      {
        title: 'Support Services for Small Businesses',
        content: '- Business advisory services\n- Financial institutions\n- Government support programs\n- Business incubators\n- Trade associations'
      }
    ]
  },
  {
    chapter: '10: Business Enterprise Management',
    subtopics: [
      {
        title: 'Definition of Management',
        content: 'Management is the process of planning, organizing, staffing, leading, and controlling business resources to achieve specific goals efficiently and effectively.'
      },
      {
        title: 'Functions of Management',
        content: '- Planning: Setting goals and strategies\n- Organizing: Arranging resources and activities\n- Staffing: Hiring and training personnel\n- Directing: Guiding and supervising staff\n- Controlling: Monitoring performance and making adjustments'
      },
      {
        title: 'Inventory Management Methods',
        content: '- Just-In-Time (JIT): Items ordered when needed\n- First-In-First-Out (FIFO): Oldest items sold first\n- Last-In-First-Out (LIFO): Newest items sold first\n- ABC Analysis: Categorizing inventory by value'
      }
    ]
  },
  {
    chapter: '11: Financial Management',
    subtopics: [
      {
        title: 'Definition of Financial Management',
        content: 'Financial management involves planning, organizing, controlling, and monitoring financial resources to achieve business goals.'
      },
      {
        title: 'Sources of Business Finance',
        content: '- Personal savings\n- Loans (banks, microfinance)\n- Grants\n- Venture capital\n- Trade credit\n- Leasing\n- Retained earnings'
      },
      {
        title: 'Types of Business Records',
        content: '- Income statement (Profit & Loss Account)\n- Balance sheet\n- Cash book\n- Petty cash book\n- Inventory records'
      },
      {
        title: 'Importance of Budgeting',
        content: '- Guides spending\n- Helps monitor performance\n- Aids in decision making\n- Prevents overspending\n- Sets financial targets'
      }
    ]
  },
  {
    chapter: '12: Marketing',
    subtopics: [
      {
        title: 'Definition and Importance',
        content: 'Marketing is the process of identifying, anticipating, and satisfying customer needs profitably. It plays a vital role in increasing sales, building brand awareness, and achieving business success.'
      },
      {
        title: 'Marketing Strategies',
        content: '- Market penetration\n- Market development\n- Product development\n- Diversification\n- Relationship marketing\n- Niche marketing'
      },
      {
        title: 'Components of Marketing (4Ps)',
        content: '- Product: Goods/services offered\n- Price: Value charged to customers\n- Place: Distribution channels\n- Promotion: Advertising and sales activities'
      },
      {
        title: 'Process of Marketing',
        content: '- Market research\n- Targeting customer segments\n- Positioning the brand\n- Creating value\n- Communicating value\n- Delivering value'
      }
    ]
  },
  {
    chapter: '13: Enterprise Social Responsibility',
    subtopics: [
      {
        title: 'Definition and Meaning',
        content: 'Enterprise Social Responsibility refers to the ethical obligation of businesses to contribute positively to society, beyond profit-making. It includes being accountable to employees, consumers, the environment, and the community.'
      },
      {
        title: 'Types of ESR',
        content: '- Environmental responsibility\n- Philanthropic responsibility\n- Ethical responsibility\n- Economic responsibility'
      },
      {
        title: 'Importance of ESR',
        content: '- Builds a positive business image\n- Strengthens customer loyalty\n- Attracts talent\n- Ensures compliance with regulations\n- Enhances community support'
      },
      {
        title: 'Ethical Behavior in Business',
        content: '- Fair pricing and competition\n- Honesty and transparency\n- Respect for labor rights\n- Environmental stewardship\n- Avoiding corruption'
      }
    ]
  },
  {
    chapter: '14: Business Plan',
    subtopics: [
      {
        title: 'Definition of a Business Plan',
        content: 'A business plan is a formal written document that outlines the goals of a business, the strategy to achieve them, and the timeframe for execution.'
      },
      {
        title: 'Components of a Business Plan',
        content: '- Executive summary\n- Company description\n- Market analysis\n- Organizational structure\n- Product/service line\n- Marketing and sales strategies\n- Funding request (if any)\n- Financial projections\n- Appendices (licenses, permits, etc.)'
      },
      {
        title: 'Uses of a Business Plan',
        content: '- Guiding business operations\n- Attracting investors\n- Securing loans and grants\n- Tracking growth and performance\n- Communicating vision to stakeholders'
      }
    ]
  },
  {
    chapter: '15: ICT in Enterprise Management',
    subtopics: [
      {
        title: 'Definition of ICT',
        content: 'Information and Communication Technology (ICT) refers to tools and systems used to handle information and facilitate communication in businesses.'
      },
      {
        title: 'Benefits of ICT in Business',
        content: '- Enhances efficiency and productivity\n- Improves customer service\n- Facilitates remote work and communication\n- Enables data storage and retrieval\n- Promotes informed decision-making'
      },
      {
        title: 'Uses of ICT Equipment',
        content: '- Computers for accounting and record-keeping\n- Internet for research and communication\n- Printers and scanners for documentation\n- Software for inventory, sales, and human resource management'
      }
    ]
  },
  {
    chapter: '16: Emerging Issues and Trends in Entrepreneurship',
    subtopics: [
      {
        title: 'Definition',
        content: 'Emerging issues are new challenges or changes in the entrepreneurial environment that affect business operations and strategy.'
      },
      {
        title: 'Emerging Issues and Trends',
        content: '- Technological advancement\n- Globalization\n- Green entrepreneurship\n- Social media marketing\n- Changing consumer behavior\n- Remote working\n- Digital payments'
      },
      {
        title: 'Challenges Posed by Emerging Trends',
        content: '- Cybersecurity threats\n- Increased competition\n- Regulatory changes\n- Skill gaps\n- Market unpredictability'
      }
    ]
  }
];



const quizzes = {
  '1: Introduction to Entrepreneurship': [
    {
      question: '1. What is the best definition of entrepreneurship?',
      options: [
        'Working for a salary',
        'Scouting opportunities and creating a business under risk',
        'Buying and selling shares',
        'Government funding program'
      ],
      answer: 1
    },
    {
      question: '2. Which of the following is an advantage of self-employment?',
      options: ['Fixed salary', 'High job security from employer', 'Personal satisfaction', 'No risk at all'],
      answer: 2
    },
    {
      question: '3. Entrepreneurship contributes to national development through:',
      options: [
        'Reducing taxes',
        'Job creation and innovation',
        'Importing goods',
        'Government employment only'
      ],
      answer: 1
    },
    {
      question: '4. What is an entrepreneur according to Cantillon?',
      options: [
        'One who avoids risks',
        'A buyer of products',
        'Someone who sells at fixed prices',
        'One who buys at certain prices and sells at uncertain prices'
      ],
      answer: 3
    },
    {
      question: '5. Which term refers to improving existing ideas or products?',
      options: ['Invention', 'Creativity', 'Innovation', 'Imagination'],
      answer: 2
    }
  ],
  '2: Evolution of Entrepreneurship': [
    {
      question: '1. Which economist associated entrepreneurs with innovation?',
      options: ['Cantillon', 'McClelland', 'Schumpeter', 'Keynes'],
      answer: 2
    },
    {
      question: '2. Which of the following is a myth about entrepreneurship?',
      options: [
        'It requires a lot of money to start',
        'It creates jobs',
        'Entrepreneurs take calculated risks',
        'Anyone can learn entrepreneurship'
      ],
      answer: 0
    },
    {
      question: '3. The psychological theory of entrepreneurship emphasizes:',
      options: ['Economic gain', 'Social class', 'High need for achievement', 'Government support'],
      answer: 2
    },
    {
      question: '4. Entrepreneurship education in Kenya was pioneered through:',
      options: [
        'Private universities',
        'ILO and KTTC projects',
        'NGO workshops',
        'Ministry of Youth'
      ],
      answer: 1
    },
    {
      question: '5. The sociological theory highlights entrepreneurship is shaped by:',
      options: [
        'Only economic conditions',
        'Environmental values and beliefs',
        'Religious rites',
        'Weather conditions'
      ],
      answer: 1
    }
  ],
  '3: The Entrepreneur': [
    {
      question: '1. Which type of entrepreneur starts a business based on existing skills?',
      options: ['Opportunistic', 'Craft', 'Innovative', 'Egoistic'],
      answer: 1
    },
    {
      question: '2. A drone entrepreneur is characterized by:',
      options: [
        'High innovation',
        'Use of modern tech',
        'Refusal to change methods',
        'High risk-taking'
      ],
      answer: 2
    },
    {
      question: '3. What is a key trait of successful entrepreneurs?',
      options: [
        'Fear of failure',
        'Following orders',
        'Creativity and risk-taking',
        'Waiting for opportunities'
      ],
      answer: 2
    },
    {
      question: '4. Which of the following is a role of an entrepreneur?',
      options: ['Tax inspector', 'Initiator and manager', 'HR officer', 'Shop attendant'],
      answer: 1
    },
    {
      question: '5. Lifestyle entrepreneurs are mainly motivated by:',
      options: ['Wealth', 'Recognition', 'Fame', 'Personal fulfillment'],
      answer: 3
    }
  ],
  '4: Creativity and Innovation': [
    {
      question: '1. Which is the correct order of creativity stages?',
      options: [
        'Germination, Execution, Illumination',
        'Incubation, Germination, Illumination',
        'Germination, Preparation, Incubation, Illumination, Verification',
        'Verification, Illumination, Preparation'
      ],
      answer: 2
    },
    {
      question: '2. Innovation refers to:',
      options: [
        'Copying products',
        'Creating something from nothing',
        'Improving existing products or services',
        'Finding gold'
      ],
      answer: 2
    },
    {
      question: '3. Which method is used to encourage creativity in groups?',
      options: ['Solo thinking', 'Logic puzzles', 'Brainstorming', 'Instruction reading'],
      answer: 2
    },
    {
      question: '4. Which is NOT a barrier to creativity?',
      options: [
        'Fear of failure',
        'Executive stress',
        'Positive attitude',
        'Over-reliance on logic'
      ],
      answer: 2
    },
    {
      question: '5. SCAMPER technique helps in:',
      options: [
        'Hiring staff',
        'Generating innovative ideas',
        'Evaluating employees',
        'Financial planning'
      ],
      answer: 1
    }
  ]
};
Object.assign(quizzes, {
  '5: Entrepreneurial Culture': [
    {
      question: '1. What is entrepreneurial culture?',
      options: [
        'Formal dress code in business',
        'Shared values that support innovation and risk-taking',
        'A government tax system',
        'An accounting policy'
      ],
      answer: 1
    },
    {
      question: '2. Which of the following promotes entrepreneurial culture?',
      options: [
        'Fear of failure',
        'Resistance to change',
        'Time consciousness and independence',
        'Following routine without question'
      ],
      answer: 2
    },
    {
      question: '3. Which habit inhibits entrepreneurial development?',
      options: [
        'Hard work',
        'Positive attitude',
        'Poor pricing policy',
        'Creativity'
      ],
      answer: 2
    },
    {
      question: '4. How can we manage barriers to entrepreneurial culture?',
      options: [
        'Ignore market needs',
        'Discourage teamwork',
        'Apply marketing and research skills',
        'Reduce training opportunities'
      ],
      answer: 2
    },
    {
      question: '5. One element of entrepreneurial culture is:',
      options: [
        'Fear of growth',
        'Hands-on management',
        'Fixed hierarchy',
        'Avoiding risk'
      ],
      answer: 1
    }
  ],
  '6: Entrepreneurial Opportunities': [
    {
      question: '1. A business opportunity is best described as:',
      options: [
        'Any product in the market',
        'A chance to make profit by meeting a market need',
        'An online advertisement',
        'A customer complaint'
      ],
      answer: 1
    },
    {
      question: '2. Which is NOT a source of business ideas?',
      options: [
        'Brainstorming',
        'Hobbies',
        'Observation',
        'Waiting passively'
      ],
      answer: 3
    },
    {
      question: '3. Good business opportunities should be:',
      options: [
        'Illegal and secretive',
        'Quick and random',
        'Viable, legal, and have market demand',
        'Copied blindly'
      ],
      answer: 2
    },
    {
      question: '4. Which of the following protects creative work?',
      options: [
        'Loan agreement',
        'Copyright',
        'Trade license',
        'Salary agreement'
      ],
      answer: 1
    },
    {
      question: '5. The purpose of screening business ideas is to:',
      options: [
        'Reject all ideas',
        'Pick the most viable opportunity',
        'Avoid all risks',
        'Start immediately without thought'
      ],
      answer: 1
    }
  ],
  '7: Entrepreneurial Motivation': [
    {
      question: '1. What is motivation?',
      options: [
        'Government funding',
        'A drive that causes goal-oriented behavior',
        'An external condition only',
        'Getting paid to do a task'
      ],
      answer: 1
    },
    {
      question: '2. Which of the following is NOT part of Maslow’s hierarchy?',
      options: [
        'Safety needs',
        'Belonging',
        'Corruption',
        'Self-actualization'
      ],
      answer: 2
    },
    {
      question: '3. According to McClelland, which is a key entrepreneurial motivator?',
      options: [
        'Need for achievement',
        'Need for sleep',
        'Need for rules',
        'Need for comfort'
      ],
      answer: 0
    },
    {
      question: '4. Motivated entrepreneurs tend to:',
      options: [
        'Avoid responsibility',
        'Take initiative and risks',
        'Wait for instructions',
        'Always copy others'
      ],
      answer: 1
    },
    {
      question: '5. What is the last level in Maslow’s hierarchy of needs?',
      options: [
        'Esteem',
        'Belonging',
        'Physiological',
        'Self-actualization'
      ],
      answer: 3
    }
  ],
  '8: Entrepreneurial Competencies': [
    {
      question: '1. What are entrepreneurial competencies?',
      options: [
        'Physical strength tests',
        'Business-related skills and behaviors',
        'Marketing tricks',
        'Government duties'
      ],
      answer: 1
    },
    {
      question: '2. Which is an example of a core competency?',
      options: [
        'Avoiding feedback',
        'Strategic thinking',
        'Procrastination',
        'Staying isolated'
      ],
      answer: 1
    },
    {
      question: '3. Why are entrepreneurial competencies important?',
      options: [
        'To increase stress',
        'To avoid planning',
        'To manage a business successfully',
        'To stop business growth'
      ],
      answer: 2
    },
    {
      question: '4. Which of the following is a soft skill for entrepreneurs?',
      options: [
        'Product pricing only',
        'Excellent communication',
        'Bricklaying',
        'Security training'
      ],
      answer: 1
    },
    {
      question: '5. What is the role of financial literacy?',
      options: [
        'Avoiding taxes',
        'Tracking and managing money wisely',
        'Confusing customers',
        'Advertising products'
      ],
      answer: 1
    }
  ],
'9: Starting a Small Business': [
    {
      question: '1. What is the first step in starting a business?',
      options: [
        'Registering the name',
        'Hiring employees',
        'Identifying a viable business idea',
        'Opening a shop'
      ],
      answer: 2
    },
    {
      question: '2. Which of the following is a challenge in starting a small business?',
      options: [
        'Strong government support',
        'Easy access to capital',
        'High competition and limited skills',
        'Global partnerships'
      ],
      answer: 2
    },
    {
      question: '3. What should be included in a startup plan?',
      options: [
        'Wedding plans',
        'Relocation budget',
        'Business goals, resources, and market analysis',
        'Tour guide services'
      ],
      answer: 2
    },
    {
      question: '4. Which form of business has unlimited liability?',
      options: [
        'Sole proprietorship',
        'Limited company',
        'Franchise',
        'Cooperative'
      ],
      answer: 0
    },
    {
      question: '5. The business lifecycle stage where profits peak is:',
      options: [
        'Decline',
        'Growth',
        'Maturity',
        'Startup'
      ],
      answer: 2
    }
  ],
  '10: Business Enterprise Management': [
    {
      question: '1. What is the first function of management?',
      options: ['Directing', 'Planning', 'Controlling', 'Staffing'],
      answer: 1
    },
    {
      question: '2. Which management function involves arranging tasks and resources?',
      options: ['Planning', 'Controlling', 'Organizing', 'Evaluating'],
      answer: 2
    },
    {
      question: '3. A Just-In-Time (JIT) inventory system:',
      options: [
        'Stores items for years',
        'Orders stock only when needed',
        'Sells last items first',
        'Uses expensive warehouses only'
      ],
      answer: 1
    },
    {
      question: '4. Which is a tool for controlling business performance?',
      options: ['Brainstorming', 'Cash book', 'Advertising', 'Partnership deed'],
      answer: 1
    },
    {
      question: '5. Effective management leads to:',
      options: [
        'Poor customer service',
        'Business confusion',
        'Business growth and productivity',
        'No effect'
      ],
      answer: 2
    }
  ],
  '11: Financial Management': [
    {
      question: '1. Financial management helps a business to:',
      options: [
        'Avoid planning',
        'Spend carelessly',
        'Manage resources efficiently',
        'Run promotions'
      ],
      answer: 2
    },
    {
      question: '2. Which document shows profit or loss?',
      options: ['Cash book', 'Budget', 'Income statement', 'Balance sheet'],
      answer: 2
    },
    {
      question: '3. One source of business finance is:',
      options: ['Exams', 'Hobbies', 'Loans and personal savings', 'Games'],
      answer: 2
    },
    {
      question: '4. Why is budgeting important?',
      options: [
        'It wastes time',
        'It helps track expenses and income',
        'To avoid making decisions',
        'For relaxing entrepreneurs'
      ],
      answer: 1
    },
    {
      question: '5. A balance sheet shows:',
      options: [
        'Profit only',
        'Cash in hand only',
        'Assets, liabilities, and capital',
        'Sales and discounts'
      ],
      answer: 2
    }
  ],
  '12: Marketing': [
    {
      question: '1. Marketing involves:',
      options: [
        'Only production',
        'Giving away free items',
        'Identifying and satisfying customer needs profitably',
        'Hiring managers'
      ],
      answer: 2
    },
    {
      question: '2. The 4Ps of marketing include all EXCEPT:',
      options: ['Product', 'Place', 'Promotion', 'Perfection'],
      answer: 3
    },
    {
      question: '3. What is product development?',
      options: [
        'Changing employees',
        'Creating or improving a product',
        'Closing a business',
        'Building houses'
      ],
      answer: 1
    },
    {
      question: '4. Why is market research important?',
      options: [
        'To entertain customers',
        'To identify trends and customer needs',
        'To increase costs',
        'To avoid customers'
      ],
      answer: 1
    },
    {
      question: '5. Which strategy focuses on building long-term relationships with customers?',
      options: [
        'Niche marketing',
        'Promotional selling',
        'Relationship marketing',
        'Mass advertising'
      ],
      answer: 2
    }
  ],
  '13: Enterprise Social Responsibility': [
    {
      question: '1. What does Enterprise Social Responsibility (ESR) mean?',
      options: [
        'Avoiding taxes',
        'Selling more products',
        'Doing business ethically and contributing to society',
        'Firing staff often'
      ],
      answer: 2
    },
    {
      question: '2. Which of the following is a type of ESR?',
      options: [
        'Social bullying',
        'Philanthropic responsibility',
        'Marketing responsibility',
        'Workplace gossip'
      ],
      answer: 1
    },
    {
      question: '3. Why should businesses engage in ESR?',
      options: [
        'To decrease profits',
        'To mislead consumers',
        'To build trust and support communities',
        'To compete unfairly'
      ],
      answer: 2
    },
    {
      question: '4. Ethical business behavior includes:',
      options: [
        'Exploiting workers',
        'Fair pricing and honesty',
        'Bribing inspectors',
        'Ignoring customers'
      ],
      answer: 1
    },
    {
      question: '5. Which of these is a benefit of ESR?',
      options: [
        'Reduced customer loyalty',
        'Positive business image',
        'Higher taxes',
        'Employee conflicts'
      ],
      answer: 1
    }
  ],
  '14: Business Plan': [
    {
      question: '1. What is a business plan?',
      options: [
        'A list of items to buy',
        'A written guide for running and growing a business',
        'A memo from an employee',
        'A tax form'
      ],
      answer: 1
    },
    {
      question: '2. Which is part of a business plan?',
      options: [
        'Wedding list',
        'Marketing and financial projections',
        'Daily meal schedule',
        'TV programs'
      ],
      answer: 1
    },
    {
      question: '3. A business plan helps in:',
      options: [
        'Wasting resources',
        'Avoiding responsibilities',
        'Guiding operations and attracting investors',
        'Firing employees'
      ],
      answer: 2
    },
    {
      question: '4. The executive summary in a business plan:',
      options: [
        'Contains full employee records',
        'Gives a brief overview of the entire plan',
        'Lists stock items',
        'Summarizes customer complaints'
      ],
      answer: 1
    },
    {
      question: '5. Which of these is NOT a reason for writing a business plan?',
      options: [
        'To confuse banks',
        'To secure funding',
        'To clarify goals',
        'To track performance'
      ],
      answer: 0
    }
  ],
  '15: ICT in Enterprise Management': [
    {
      question: '1. What does ICT stand for?',
      options: [
        'International Corporate Taxes',
        'Information and Communication Technology',
        'Internal Company Transactions',
        'Internet Control Tools'
      ],
      answer: 1
    },
    {
      question: '2. ICT helps businesses by:',
      options: [
        'Causing delays',
        'Making decisions harder',
        'Improving efficiency and communication',
        'Reducing internet use'
      ],
      answer: 2
    },
    {
      question: '3. Which of the following is an ICT tool?',
      options: [
        'Television drama',
        'Smartphones and computers',
        'Pens and paper',
        'Concrete blocks'
      ],
      answer: 1
    },
    {
      question: '4. Using email in business improves:',
      options: [
        'Sleeping time',
        'Communication speed',
        'Paper waste',
        'Payroll deductions'
      ],
      answer: 1
    },
    {
      question: '5. ICT supports enterprise success by:',
      options: [
        'Blocking data flow',
        'Increasing physical storage needs',
        'Promoting informed decision-making',
        'Avoiding planning'
      ],
      answer: 2
    }
  ],
  '16: Emerging Issues and Trends': [
    {
      question: '1. An example of an emerging issue in business is:',
      options: [
        'Typewriters',
        'Cybersecurity',
        'Horse transport',
        'Manual filing'
      ],
      answer: 1
    },
    {
      question: '2. Globalization affects entrepreneurship by:',
      options: [
        'Limiting trade',
        'Encouraging isolation',
        'Increasing competition and access to markets',
        'Reducing innovation'
      ],
      answer: 2
    },
    {
      question: '3. Green entrepreneurship focuses on:',
      options: [
        'Planting more businesses',
        'Environmental sustainability',
        'Reducing salaries',
        'Building walls'
      ],
      answer: 1
    },
    {
      question: '4. Which trend affects customer behavior the most today?',
      options: [
        'Yellow pages',
        'Digital and mobile technologies',
        'Chalkboards',
        'Landline phones'
      ],
      answer: 1
    },
    {
      question: '5. A challenge of emerging trends includes:',
      options: [
        'Lack of interest',
        'Cybersecurity threats and skill gaps',
        'Too much local support',
        'Cheaper marketing only'
      ],
      answer: 1
    }
  ]
});



// === Home / Notes Screen ===
function highlightText(text, keyword, isDark) {
  if (!keyword) return <Text style={{ color: isDark ? '#ccc' : '#333' }}>{text}</Text>;
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  return (
    <Text style={{ color: isDark ? '#ccc' : '#333' }}>
      {parts.map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <Text key={index} style={{ backgroundColor: 'yellow', color: '#000' }}>{part}</Text>
        ) : (
          <Text key={index}>{part}</Text>
        )
      )}
    </Text>
  );
}

function HomeScreen() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({});
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  const theme = useContext(ThemeContext);
  const isDark = theme.isDark;

  const filteredNotes = notes.map(chapter => ({
    ...chapter,
    subtopics: chapter.subtopics.filter(sub =>
      sub.title.toLowerCase().includes(search.toLowerCase()) ||
      sub.content.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(chap => chap.subtopics.length > 0);

  const toggleBookmark = (subtopic) => {
    const entry = `${subtopic.title}|||${subtopic.content}`;
    setBookmarks(prev =>
      prev.includes(entry) ? prev.filter(b => b !== entry) : [...prev, entry]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff' }}>
      <View style={{ padding: 10 }}>
        <TextInput
          style={{
            backgroundColor: isDark ? '#333' : '#eee',
            padding: 10,
            borderRadius: 8,
            color: isDark ? '#fff' : '#000',
            fontSize: 18
          }}
          placeholder="Search notes..."
          placeholderTextColor={isDark ? '#aaa' : '#555'}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {filteredNotes.map((chapter, i) => (
          <View key={i} style={{ marginBottom: 15 }}>
            <TouchableOpacity onPress={() =>
              setExpanded(prev => ({ ...prev, [chapter.chapter]: !prev[chapter.chapter] }))
            }>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E90FF' }}>
                {expanded[chapter.chapter] ? '▼' : '▶'} {chapter.chapter}
              </Text>
            </TouchableOpacity>

            {expanded[chapter.chapter] && chapter.subtopics.map((sub, j) => (
              <View key={j} style={{
                marginLeft: 10,
                marginTop: 8,
                backgroundColor: isDark ? '#222' : '#f9f9f9',
                borderRadius: 6,
                padding: 10
              }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {highlightText(sub.title, search, isDark)}
                </Text>
                <Text style={{ marginVertical: 5, fontSize: 17 }}>
                  {highlightText(sub.content, search, isDark)}
                </Text>
                <TouchableOpacity onPress={() => toggleBookmark(sub)}>
                  <Text style={{ fontSize: 16, color: '#28a745' }}>
                    {bookmarks.includes(`${sub.title}|||${sub.content}`) ? 'Remove Bookmark' : 'Bookmark'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
// === Quiz Screen ===
function QuizScreen() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState({});
  const [search, setSearch] = useState('');
  const scrollRef = useRef(null); // Reference for ScrollView
  const theme = useContext(ThemeContext);
  const isDark = theme.isDark;

  const handleSelect = (chapter, qIndex, optionIndex, correctIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [`${chapter}-${qIndex}`]: optionIndex
    }));

    setScore(prev => ({
      ...prev,
      [`${chapter}-${qIndex}`]: optionIndex === correctIndex
    }));
  };

  const filteredChapters = Object.keys(quizzes).filter(chapter =>
    chapter.toLowerCase().includes(search.toLowerCase())
  );

  const highlightMatch = (text, search) => {
    if (!search) return <Text style={{ color: '#1E90FF', fontWeight: 'bold', fontSize: 18 }}>{text}</Text>;

    const index = text.toLowerCase().indexOf(search.toLowerCase());
    if (index === -1) {
      return <Text style={{ color: '#1E90FF', fontWeight: 'bold', fontSize: 18 }}>{text}</Text>;
    }

    const before = text.substring(0, index);
    const match = text.substring(index, index + search.length);
    const after = text.substring(index + search.length);

    return (
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        <Text style={{ color: '#1E90FF' }}>{before}</Text>
        <Text style={{ backgroundColor: 'yellow', color: '#000' }}>{match}</Text>
        <Text style={{ color: '#1E90FF' }}>{after}</Text>
      </Text>
    );
  };

  // Scroll to top on search change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [search]);

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff' }}>
      <View style={{ padding: 10 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search chapters..."
          placeholderTextColor={isDark ? '#aaa' : '#555'}
          style={{
            backgroundColor: isDark ? '#333' : '#eee',
            padding: 10,
            borderRadius: 8,
            color: isDark ? '#fff' : '#000',
            fontSize: 16
          }}
        />
      </View>

      <ScrollView ref={scrollRef} style={{ flex: 1, paddingHorizontal: 10 }}>
        {filteredChapters.map((chapter, cIdx) => (
          <View key={cIdx} style={{ marginBottom: 20 }}>
            {highlightMatch(chapter, search)}
            {quizzes[chapter].map((q, qIndex) => (
              <View
                key={qIndex}
                style={{
                  marginTop: 10,
                  backgroundColor: isDark ? '#1e1e1e' : '#f0f0f0',
                  padding: 10,
                  borderRadius: 8
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: '600', color: isDark ? '#fff' : '#000' }}>
                  {q.question}
                </Text>
                {q.options.map((opt, optIndex) => {
                  const selected = selectedAnswers[`${chapter}-${qIndex}`] === optIndex;
                  const isCorrect = q.answer === optIndex;
                  return (
                    <TouchableOpacity
                      key={optIndex}
                      onPress={() => handleSelect(chapter, qIndex, optIndex, q.answer)}
                      style={{
                        backgroundColor: selected
                          ? isCorrect
                            ? '#28a745'
                            : '#dc3545'
                          : isDark
                          ? '#333'
                          : '#ddd',
                        padding: 8,
                        borderRadius: 6,
                        marginTop: 5
                      }}
                    >
                      <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 16 }}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
                {score.hasOwnProperty(`${chapter}-${qIndex}`) && (
                  <Text
                    style={{
                      marginTop: 5,
                      color: score[`${chapter}-${qIndex}`] ? 'green' : 'red',
                      fontSize: 16
                    }}
                  >
                    {score[`${chapter}-${qIndex}`]
                      ? 'Correct!'
                      : `Correct Answer: ${q.options[q.answer]}`}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


// === Bookmarks Screen ===
function BookmarksScreen() {
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  const theme = useContext(ThemeContext);
  const isDark = theme.isDark;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff', padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: isDark ? '#fff' : '#000' }}>Bookmarked Topics</Text>
      {bookmarks.length === 0 ? (
        <Text style={{ color: isDark ? '#ccc' : '#555', fontSize: 17 }}>No bookmarks yet.</Text>
      ) : (
        bookmarks.map((entry, i) => {
          const [title, content] = entry.split('|||');
          return (
            <View key={i} style={{ backgroundColor: isDark ? '#222' : '#eee', padding: 10, borderRadius: 6, marginBottom: 8 }}>
              <Text style={{ color: isDark ? '#fff' : '#000', fontWeight: 'bold', fontSize: 17 }}>{title}</Text>
              <Text style={{ color: isDark ? '#ccc' : '#333', fontSize: 16 }}>{content}</Text>
              <TouchableOpacity onPress={() => setBookmarks(prev => prev.filter(t => t !== entry))}>
                <Text style={{ color: '#dc3545', fontSize: 16 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

// === Settings Screen ===
function SettingsScreen() {
  const theme = useContext(ThemeContext);
  const isDark = theme.isDark;
  return (
 <View style={[styles.center, { alignItems: 'flex-start', backgroundColor: isDark ? '#121212' : '#fff', padding: 20 }]}>
  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: isDark ? '#aaa' : '#333' }}>About App:</Text>
  <Text style={{ fontSize: 16, marginBottom: 10, color: isDark ? '#aaa' : '#333' }}>EpBrief — an app designed to help students revise entrepreneurship content effectively. It features organized notes by chapter, quizzes, bookmarks and search — making it a powerful tool for exam prep and quick review.</Text>

  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: isDark ? '#aaa' : '#333' }}>Contact:</Text>
  <Text style={{ fontSize: 16, marginBottom: 10, color: isDark ? '#aaa' : '#333' }}>For more info and updates call or whatsapp +254799144429</Text>

  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 15, color: isDark ? '#fff' : '#000' }}>Dark Mode</Text>
    <Switch value={isDark} onValueChange={theme.toggleTheme} style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }} />
  </View>
</View>


  );
}

// === App Wrapper ===
const Tab = createBottomTabNavigator();

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let icon;
                if (route.name === 'Home') icon = 'book';
                else if (route.name === 'Quiz') icon = 'help-circle';
                else if (route.name === 'Bookmarks') icon = 'bookmark';
                else if (route.name === 'Settings') icon = 'settings';
                return <Ionicons name={icon} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Quiz" component={QuizScreen} />
            <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </BookmarkContext.Provider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20
  }
});
