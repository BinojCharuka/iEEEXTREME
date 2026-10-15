import type { XtremeEvent } from "@/lib/vtools";

/**
 * Official IEEE Region 10 (Asia-Pacific) Flagship Events and Major Activities
 * Extracted and updated directly from the official portal: https://www.ieeer10.org/
 * Including TENCON 2026, TENSYMP 2026, R10 HTC 2026, R10 SYWL Congress, R10Talk, and Regional Programs.
 */
export const OFFICIAL_R10_EVENTS: XtremeEvent[] = [
  {
    id: "tencon-2026",
    title: "IEEE TENCON 2026 – Bali, Indonesia",
    theme: "Intelligent Systems for a Resilient and Sustainable Society",
    description:
      "TENCON 2026 is the premier flagship international technical conference of IEEE Region 10 (Asia-Pacific), held in Bali, Indonesia. As an in-person, onsite gathering of researchers, educators, students, and practitioners, TENCON 2026 explores cutting-edge innovations in intelligent systems, machine learning, sustainable energy, resilient communications, robotics, and cyber-physical infrastructure.\n\nSince 1980, TENCON has served as IEEE Region 10's paramount platform for global scientific interchange, bridging academia and industry to elevate technologies for the betterment of society. All accepted and presented papers will be submitted for inclusion in IEEE Xplore.",
    photo: "https://tencon2026.ieee.id/wp-content/uploads/2025/08/tencon26_3.png",
    registerUrl: "https://edas.info/r34833",
    websiteUrl: "https://tencon2026.ieee.id/",
    hashtags: ["#IEEE", "#IEEER10", "#TENCON2026", "#Bali", "#Indonesia", "#IntelligentSystems"],
    section: "IEEE Indonesia Section",
    studentBranch: "IEEE Region 10",
    region: "R10",
    startTime: "2026-10-10T09:00:00.000Z",
    endTime: "2026-10-13T18:00:00.000Z",
    location: "InterContinental Bali Resort, Jimbaran, Bali, Indonesia",
    isVirtual: false,
    category: "Conference",
    tracks: [
      "Artificial Intelligence, Machine Learning & Intelligent Robotics",
      "Resilient Communications, 5G/6G & Network Systems",
      "Power, Energy Systems & Smart Grids for Sustainable Society",
      "Biomedical Engineering, Biosensors & Healthcare Systems",
      "Computer Architecture, Cloud Computing & Cybersecurity",
      "R10 Student Innovation Poster Competition"
    ],
    importantDates: [
      { label: "Paper Submission Deadline", date: "May 15, 2026" },
      { label: "Notification of Acceptance", date: "July 15, 2026" },
      { label: "Camera-Ready Final Paper", date: "August 15, 2026" },
      { label: "Conference Dates", date: "October 10 – 13, 2026" }
    ],
    coChairs: [
      "General Co-Chairs: IEEE Indonesia Section & R10 Conference Committee",
      "Technical Program Chairs: IEEE R10 Technical Activities"
    ]
  },
  {
    id: "tensymp-2026",
    title: "IEEE TENSYMP 2026 – Penang, Malaysia",
    theme: "Shaping The Future: Unleashing Innovation to Elevate Technologies for The Betterment of Humanity",
    description:
      "IEEE Region 10 Symposium (TENSYMP 2026) is the official mid-year flagship symposium of IEEE Region 10, proudly hosted in the vibrant island of Penang, Malaysia. Guided by the theme 'Shaping The Future: Unleashing Innovation to Elevate Technologies for The Betterment of Humanity', TENSYMP 2026 gathers top academic researchers and industrial practitioners across the Asia-Pacific region.\n\nThe symposium features high-impact keynotes, technical oral paper presentations, specialized tracks, and signature satellite workshops including the IEEE Malaysia Conference Quality Management and Compliance Workshop and 'Engineering in Motions: Shaping Future Professionals'.",
    photo: "https://ieeemy.org/tensymp2026/wp-content/uploads/2026/01/penang.jpg",
    registerUrl: "https://edas.info/r34849",
    websiteUrl: "https://ieeemy.org/tensymp2026/",
    hashtags: ["#IEEE", "#IEEER10", "#TENSYMP2026", "#Penang", "#Malaysia", "#Innovation"],
    section: "IEEE Malaysia Section",
    studentBranch: "IEEE Region 10",
    region: "R10",
    startTime: "2026-06-29T08:30:00.000Z",
    endTime: "2026-07-01T17:30:00.000Z",
    location: "PSDC (Penang Skills Development Centre), Penang, Malaysia",
    isVirtual: false,
    category: "Symposium",
    tracks: [
      "Computational Intelligence & Emerging Computing Architectures",
      "Sustainable Energy, Smart Grids & Green Tech Solutions",
      "IoT, Sensor Networks & Smart City Infrastructure",
      "Semiconductor Technology, Microelectronics & Industry 4.0",
      "Engineering Education, SAC & Professional Development"
    ],
    importantDates: [
      { label: "Pre-Symposium Workshops", date: "June 28, 2026" },
      { label: "Opening Ceremony & Keynotes", date: "June 29, 2026" },
      { label: "Technical Tracks & Gala Dinner", date: "June 30, 2026" },
      { label: "Industry Day & Closing", date: "July 1, 2026" }
    ],
    coChairs: [
      "General Chair: IEEE Malaysia Section Executive Committee",
      "Organizing Committee: Penang Skills Development Centre (PSDC)"
    ]
  },
  {
    id: "r10-htc-2026",
    title: "IEEE R10 HTC 2026 – Bangkok, Thailand",
    theme: "Empowering Humanity Through Emerging Technology & Innovation",
    description:
      "The 2026 IEEE Region 10 Humanitarian Technology Conference (R10-HTC 2026) is the premier annual cross-disciplinary conference hosted by IEEE Region 10, IEEE Thailand Section, Chulalongkorn University, and University of Phayao. Held at The Berkeley Hotel Pratunam in Bangkok, Thailand, R10-HTC bridges technology and humanitarian challenges.\n\nThe conference unites engineers, scientists, technologists, investors, and representatives from NGOs, governments, and multilateral organizations. Special features include the Pre-University Grand Challenge in Humanitarian Technology and the Medical AI Next Generation Accelerator Pitching Day.",
    photo: "https://attend.ieee.org/r10-htc/wp-content/uploads/sites/795/htc-banner2-1024x439.png",
    registerUrl: "https://event.happenn.com/ieee/htc-2026",
    websiteUrl: "https://attend.ieee.org/r10-htc/",
    hashtags: ["#IEEE", "#IEEER10", "#R10HTC2026", "#Bangkok", "#Thailand", "#HumanitarianTech"],
    section: "IEEE Thailand Section",
    studentBranch: "Chulalongkorn University / Univ. of Phayao",
    region: "R10",
    startTime: "2026-10-26T09:00:00.000Z",
    endTime: "2026-10-28T18:00:00.000Z",
    location: "The Berkeley Hotel Pratunam, Bangkok, Thailand",
    isVirtual: false,
    category: "Conference",
    tracks: [
      "Disaster Management and Resilience Technologies",
      "Healthcare Technologies for Underserved Communities",
      "Sustainable Development and Environmental Technologies",
      "Humanitarian Logistics and Supply Chain Technologies",
      "Education and Capacity Building Through Technology",
      "Digital Inclusion and Connectivity for All"
    ],
    importantDates: [
      { label: "Paper Submission Deadline", date: "June 15, 2026" },
      { label: "Acceptance Notification", date: "August 15, 2026" },
      { label: "Final Manuscript Due", date: "September 15, 2026" },
      { label: "Conference Dates", date: "October 26 – 28, 2026" }
    ],
    coChairs: [
      "Prof. Supavadee Aramvith (CUEE, Chulalongkorn University)",
      "Prof. Samur Thanoi (Vice President Research & Innovation, University of Phayao)"
    ]
  },
  {
    id: "r10-sywl-congress",
    title: "IEEE Region 10 SYWL Congress – Asia-Pacific",
    theme: "Connecting Leaders, Inspiring Change & Shaping the Future of IEEE",
    description:
      "The IEEE Region 10 Student-Young Professional-Women in Engineering-Life Member Congress (SYWLC) is the grand biennial gathering of volunteer leaders across the entire Asia-Pacific Region. Bringing together more than 1,250 Student Branches, Young Professional affinity groups, WIE affinity groups, and Life Members.\n\nThe congress delivers a vital forum for cross-cultural networking, strategic leadership training, global competitions, collaborative ideation, and defining the future roadmap for IEEE engagement in Region 10.",
    photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    registerUrl: "https://www.ieeer10.org/r10-flagship-events/",
    websiteUrl: "https://www.ieeer10.org/r10-flagship-events/",
    hashtags: ["#IEEE", "#IEEER10", "#SYWL", "#SAC", "#WIE", "#YoungProfessionals", "#Leadership"],
    section: "IEEE Region 10 Congress Committee",
    studentBranch: "IEEE R10 SAC & YP",
    region: "R10",
    startTime: "2026-11-15T09:00:00.000Z",
    endTime: "2026-11-18T18:00:00.000Z",
    location: "Asia-Pacific Region (Biennial Flagship)",
    isVirtual: false,
    category: "Congress",
    tracks: [
      "Student Branch Leadership, Membership Growth & Hackathons",
      "Young Professionals: Engineering Career Transformation & Tech Leadership",
      "Women in Engineering: Breaking Barriers & Driving STEM Impact",
      "Life Members Mentorship & Decades of Engineering Wisdom"
    ],
    importantDates: [
      { label: "Delegate Nominations Open", date: "August 1, 2026" },
      { label: "Section Travel Grant Approvals", date: "September 15, 2026" },
      { label: "Congress Assembly", date: "November 15 – 18, 2026" }
    ],
    coChairs: [
      "IEEE Region 10 Student Activities Committee (SAC)",
      "IEEE Region 10 Young Professionals (YP) & WIE Chairs"
    ]
  },
  {
    id: "r10-agm-kitakyushu",
    title: "IEEE Region 10 Annual General Meeting – Kitakyushu, Japan",
    theme: "Collaborative Leadership for Region 10 Future Direction",
    description:
      "The 2026 IEEE Region 10 Annual General Meeting (AGM) was successfully convened in Kitakyushu, Japan, hosted by the IEEE Japan Council, IEEE Fukuoka Section, and Kitakyushu City. Section delegates, Council leaders, and Executive Committee volunteers from North Asia, South Asia, and the Pacific assembled for two days of strategic deliberations.\n\nRegion 10 Director Takako Hashimoto reaffirmed the Region's shared commitment to member value, industrial engagement, student chapter empowerment, and innovative cross-sectional programs in an evolving technological landscape.",
    photo: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000",
    registerUrl: "https://www.ieeer10.org/2026/04/10/message-from-the-r10-director-following-the-2026-ieee-region-10-annual-general-meeting-at-kitakyushu/",
    websiteUrl: "https://www.ieeer10.org/",
    hashtags: ["#IEEE", "#IEEER10", "#AGM", "#Kitakyushu", "#Japan", "#Governance", "#Leadership"],
    section: "IEEE Fukuoka Section & Japan Council",
    studentBranch: "IEEE Region 10 EXCOM",
    region: "R10",
    startTime: "2026-03-28T09:00:00.000Z",
    endTime: "2026-03-29T17:00:00.000Z",
    location: "Kitakyushu International Conference Center, Kitakyushu, Japan",
    isVirtual: false,
    category: "Congress",
    tracks: [
      "Region 10 Director Strategic Report & Annual Review",
      "Sections & Council Performance Ratifications",
      "Awards & Recognition Ceremony for Outstanding Volunteers",
      "Executive Committee 2026–2027 Action Plan Formulation"
    ],
    importantDates: [
      { label: "EXCOM Strategy Session", date: "March 27, 2026" },
      { label: "Annual General Meeting Day 1", date: "March 28, 2026" },
      { label: "Annual General Meeting Day 2 & Awards", date: "March 29, 2026" }
    ],
    coChairs: [
      "Takako Hashimoto (IEEE Region 10 Director)",
      "IEEE Japan Council & IEEE Fukuoka Section Leadership"
    ]
  },
  {
    id: "r10-talk-webinars",
    title: "IEEE R10Talk: Global Knowledge Sharing & Technical Webinars",
    theme: "Uniting Distinguished Academicians & Industry Leaders Across Asia-Pacific",
    description:
      "R10Talk is IEEE Region 10's signature webinar series providing members with direct access to distinguished IEEE Fellows, global researchers, and technology pioneers across the Asia-Pacific region.\n\nThe series features in-depth technical discussions on emerging horizons including Generative AI, 6G Wireless Architecture, Quantum Computing, Microgrids, and Ethical AI Systems, with live interactive Q&A sessions and archived video broadcasts.",
    photo: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=1000",
    registerUrl: "https://www.youtube.com/playlist?list=PLyQ82661dpMy749McZWs6oKWWGhj_FUMy",
    websiteUrl: "https://www.youtube.com/playlist?list=PLyQ82661dpMy749McZWs6oKWWGhj_FUMy",
    hashtags: ["#IEEE", "#IEEER10", "#R10Talk", "#Webinars", "#TechnicalActivities", "#AI", "#6G"],
    section: "IEEE Region 10 Technical Activities",
    studentBranch: "IEEE R10 Educational Activities",
    region: "R10",
    startTime: "2026-05-15T10:00:00.000Z",
    endTime: "2026-12-31T12:00:00.000Z",
    location: "Virtual / YouTube Live & Webex",
    isVirtual: true,
    category: "Webinar",
    tracks: [
      "Frontiers in Artificial Intelligence & Foundation Models",
      "Next-Generation Telecommunications & Terahertz 6G Networks",
      "Sustainable Energy Transition & Renewable Grid Integration",
      "Academic Publishing & IEEE Author Center Masterclasses"
    ],
    importantDates: [
      { label: "Monthly Session 1", date: "Third Friday of every month" },
      { label: "Interactive Live Q&A", date: "Streamed via YouTube & Webex" }
    ],
    coChairs: [
      "IEEE Region 10 Technical Activities Committee",
      "Distinguished Lecture Coordinator: R10 Educational Activities"
    ]
  },
  {
    id: "r10-prof-cert-grant",
    title: "IEEE Region 10 Professional Certification Grant",
    theme: "Empowering Engineers with Global Professional Certifications & Upskilling",
    description:
      "The IEEE Region 10 Professional Activities Committee announces the 2026 Call for Expressions of Interest for the IEEE Region 10 Professional Certification Grant.\n\nThis grant provides financial sponsorship, mentorship circles, and exam preparation resources for IEEE members across Region 10 seeking accredited industry certifications in Cloud Computing (AWS/GCP/Azure), Cybersecurity (CISSP/CEH), Data Science, and Project Management (PMP).",
    photo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
    registerUrl: "https://www.ieeer10.org/2026/04/19/call-for-expression-of-interest-2026-ieee-region-10-professional-certification-grant/",
    websiteUrl: "https://www.ieeer10.org/",
    hashtags: ["#IEEE", "#IEEER10", "#ProfessionalGrant", "#Upskilling", "#Certification", "#PAC"],
    section: "IEEE Region 10 Professional Activities",
    studentBranch: "IEEE R10 Young Professionals",
    region: "R10",
    startTime: "2026-04-19T00:00:00.000Z",
    endTime: "2026-06-30T23:59:00.000Z",
    location: "Virtual Application / Asia-Pacific Sections",
    isVirtual: true,
    category: "Grant",
    tracks: [
      "Cloud Architect & DevOps Professional Certifications",
      "Cybersecurity & Information Defense Credentials",
      "Data Engineering & Artificial Intelligence Credentials",
      "Agile, Scrum & Technical Project Management Certifications"
    ],
    importantDates: [
      { label: "Expression of Interest Opens", date: "April 19, 2026" },
      { label: "Application Deadline", date: "June 30, 2026" },
      { label: "Grant Awards Announced", date: "July 20, 2026" }
    ],
    coChairs: [
      "IEEE Region 10 Professional Activities Committee Chair",
      "Industry Relations Committee Coordinator"
    ]
  },
  {
    id: "ieeextreme-r10",
    title: "IEEE Xtreme 24-Hour Programming Competition (Region 10)",
    theme: "24 Hours of Pure Code, Algorithmic Mastery & Global Camaraderie",
    description:
      "IEEE Xtreme is the world-renowned 24-hour virtual competitive programming competition where student branches and teams of IEEE members worldwide compete against the clock to solve complex algorithmic problems. Region 10 stands as the world's most competitive and enthusiastic region in IEEE Xtreme, producing international top-rank champions every year.\n\nForm a team of up to three IEEE student members, locate an official IEEE Proctor at your Student Branch or Section, and compete for global bragging rights, certificates, and prizes.",
    photo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    registerUrl: "https://ieeextreme.org/",
    websiteUrl: "https://ieeextreme.org/",
    hashtags: ["#IEEE", "#IEEER10", "#IEEEXtreme", "#Coding", "#Algorithm", "#CompetitiveProgramming"],
    section: "IEEE Region 10 SAC",
    studentBranch: "IEEE Student Branches Worldwide",
    region: "R10",
    startTime: "2026-10-24T00:00:00.000Z",
    endTime: "2026-10-25T00:00:00.000Z",
    location: "Virtual Competition & Section Proctor Hubs across R10",
    isVirtual: true,
    category: "Competition",
    tracks: [
      "Algorithms, Dynamic Programming & Graph Theory",
      "Mathematical Modelling, Combinatorics & Numerical Systems",
      "Data Structures, Optimization & Computational Geometry",
      "Proctored 24-Hour Non-stop Collaborative Sprint"
    ],
    importantDates: [
      { label: "Registration & Proctor Endorsement Opens", date: "August 2026" },
      { label: "Practice Hackathon & Platform Orientation", date: "September 2026" },
      { label: "24-Hour Challenge Kickoff", date: "October 24, 2026" }
    ],
    coChairs: [
      "IEEE Xtreme Global Steering Committee",
      "IEEE Region 10 Student Activities Committee (SAC)"
    ]
  }
];
