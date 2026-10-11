export const profile = {
  name: 'Azzura Lazuardy',
  first: 'Azzura',
  last: 'Lazuardy',
  role: 'Mobile & Software Engineer',
  location: 'Pekanbaru, Riau',
  email: 'azzuralazuardy@gmail.com',
  phone: '+6289602730379',
  linkedin: 'https://www.linkedin.com/in/azzura-lazuardy-a88793217/',
}

export const about = [
  "I'm Azzura, an Informatics engineering student at Politeknik Caltex Riau who loves turning messy, paper-based workflows into clean digital products — from Flutter inspection apps and QR-powered field tools to Laravel dashboards.",
  'Beyond writing code, I enjoy the design side of things: mapping user flows in Figma, polishing interfaces, and wiring REST APIs until everything feels effortless. I also explore machine learning, training CNN models that classify images in the browser.',
]

export const stats = [
  { value: 3.67, decimals: 2, label: 'CGPA out of 4.00' },
  { value: 3, label: 'Internships' },
  { value: 8, suffix: '+', label: 'Projects shipped' },
  { value: 5, suffix: '+', label: 'Flutter modules built' },
]

export const heroLabels = ['flutter developer', 'ui/ux design', 'full-stack web', 'machine learning']

export const experience = [
  {
    year: 2026,
    company: 'PT. Bigs Integrasi Teknologi',
    role: 'Mobile Developer Intern',
    period: 'Mar 2026 – Jul 2026',
    blurb: 'Technology company developing healthcare software.',
    points: [
      'Developed a Flutter-based vehicle inspection application, digitizing inspection workflows from document verification to physical vehicle assessment.',
      'Built 5+ inspection modules covering OCR-based document verification, vehicle documents, interior, exterior, engine & transmission, and undercarriage components.',
      'Integrated REST APIs for authentication, task management, dashboard data, and inspection submissions.',
      'Collaborated with backend developers to troubleshoot API integration issues and implement reusable UI components.',
    ],
  },
  {
    year: 2025,
    company: 'PT. Visiontech Indograha',
    role: 'Software Engineering Intern',
    period: 'Aug 2025 – Dec 2025',
    blurb: 'Security systems and IT solutions.',
    points: [
      'Developed web and mobile applications across the software development lifecycle, contributing to frontend, backend, and Flutter-based mobile features.',
      'Designed and improved UI/UX for web and mobile applications, translating user requirements into responsive, user-focused interfaces.',
      'Integrated REST APIs and SQL Server databases to support dynamic data processing between application components.',
    ],
  },
  {
    year: 2021,
    company: 'MI Muhammadiyah 02 Pekanbaru',
    role: 'Frontend Developer Intern',
    period: 'Jul 2021 – Nov 2021',
    blurb: 'Muhammadiyah-based Islamic elementary school.',
    points: [
      'Updated the interface of a desktop-based student tuition fee management application, improving visual consistency and usability.',
      'Managed and maintained interfaces for student financial administration, keeping the system aligned with administrative needs.',
      'Worked with school staff to identify UI requirements and implement improvements based on their workflow.',
    ],
  },
]

export const education = {
  school: 'Politeknik Caltex Riau',
  degree: 'B. Eng in Informatics',
  start: 'Sep 2022',
  end: 'Oct 2026',
  gpa: '3.67',
}

export const featured = {
  title: 'Vehicle Inspection App',
  company: 'PT. Bigs Integrasi Teknologi',
  intro:
    'A Flutter app that digitizes the full inspection journey — from verifying documents to assessing the vehicle itself — with REST APIs handling auth, tasks, dashboards and submissions.',
  modules: [
    { name: 'Document OCR', desc: 'OCR-based document verification to start every inspection.' },
    { name: 'Vehicle Documents', desc: 'Structured records for the vehicle’s paperwork.' },
    { name: 'Interior', desc: 'Inspectors log interior condition digitally.' },
    { name: 'Exterior', desc: 'Body and exterior checks recorded step by step.' },
    { name: 'Engine & Transmission', desc: 'Mechanical assessment captured in one flow.' },
    { name: 'Undercarriage', desc: 'Final component checks before submission.' },
  ],
}

export const projects = [
  {
    title: 'Fire Protection Maintenance',
    subtitle: 'Modul Pemeliharaan Alat Proteksi Kebakaran',
    period: 'May 2025 – Jul 2026',
    kind: 'Mobile App',
    art: 'qr',
    stack: ['Flutter', 'MySQL', 'QR Code'],
    points: [
      'Digitized periodic maintenance and inspection of fire protection equipment — condition, expiration dates, pressure, and nozzle checks.',
      'Implemented QR Code scanning to identify equipment and streamline inspections, reducing manual data lookup in the field.',
      'Designed the interface and inspection workflow to support structured equipment records.',
    ],
  },
  {
    title: 'Cat Breed Classification',
    subtitle: 'Deep learning with CNN',
    period: 'Mar 2025 – May 2025',
    kind: 'ML · Web',
    art: 'cat',
    stack: ['Python', 'TensorFlow/Keras', 'MobileNetV2', 'Flask', 'Tailwind CSS'],
    points: [
      'Built a web-based cat breed classifier using a Convolutional Neural Network across multiple breeds.',
      'Trained and fine-tuned MobileNetV2 on a cat breed dataset, building a pipeline for training and inference.',
      'Deployed the model into a Flask web app where users upload images and receive predictions interactively.',
    ],
  },
  {
    title: 'Retail Inventory & Sales',
    subtitle: 'Mobile app with ML insights',
    period: 'Sep 2024 – Jan 2025',
    kind: 'Mobile · ML',
    art: 'retail',
    stack: ['Kotlin', 'Firebase', 'Machine Learning'],
    points: [
      'Developed a Kotlin app for daily retail operations: product inventory, stock additions, and sales transactions.',
      'Implemented inventory tracking for product availability and stock changes throughout the sales process.',
      'Integrated an ML component to classify and predict sales performance — surfacing fast-moving and low-performing products.',
      'Used Firebase for backend services and data synchronization.',
    ],
  },
  {
    title: 'School Digital Display',
    subtitle: 'Full-stack signage system',
    period: 'Mar 2024 – Jul 2024',
    kind: 'Full-Stack',
    art: 'display',
    stack: ['Laravel', 'PHP', 'MySQL'],
    points: [
      'Built a full-stack display website presenting daily class schedules, subjects, and teachers on school TV screens.',
      'Created an admin interface to manage schedules and announcements without touching the code.',
      'Implemented a dynamic public display that refreshes automatically for students and teachers.',
    ],
  },
  {
    title: 'Inclusive Employment Platform',
    subtitle: 'Connecting job seekers with UMKM',
    period: 'Sep 2023 – Dec 2024',
    kind: 'UI/UX',
    art: 'jobs',
    stack: ['Figma', 'UI/UX', 'Prototyping'],
    points: [
      'Designed a Figma prototype connecting job seekers with UMKM employment opportunities in Pekanbaru.',
      'Mapped user flows for job discovery, workplace selection, and applications through an interactive interface.',
      'Applied user-centered design principles for both job seekers and UMKM owners.',
    ],
  },
  {
    title: 'Cafe Inventory Website',
    subtitle: 'Stock & revenue tracking',
    period: 'Nov 2023 – Dec 2023',
    kind: 'Full-Stack',
    art: 'cafe',
    stack: ['Laravel', 'PHP', 'MySQL'],
    points: [
      'Developed a Laravel website to digitize manual stock recording for a cafe.',
      'Implemented incoming and outgoing stock management for centralized tracking.',
      'Built date-based sales and revenue reports from inventory transactions.',
    ],
  },
  {
    title: 'Student Achievement System',
    subtitle: 'Submission & approval workflow',
    period: 'Mar 2023 – Jul 2023',
    kind: 'Frontend',
    art: 'trophy',
    stack: ['Frontend', 'UI Design'],
    points: [
      'Developed the frontend for students to submit and track academic and non-academic achievements.',
      'Designed flows for submission, review, approval, and rejection for study program coordinators.',
      'Translated functional requirements into a structured, accessible interface.',
    ],
  },
]

export const skillCategories = [
  { id: 'mobile', label: 'Mobile Development', sub: 'Flutter · Kotlin · Firebase', items: ['Flutter', 'Dart', 'Kotlin', 'Android Studio', 'Firebase', 'OCR', 'QR Code'] },
  { id: 'web', label: 'Full-Stack & APIs', sub: 'Laravel · REST · SQL', items: ['Laravel', 'PHP', 'JavaScript', 'Tailwind CSS', 'REST API', 'MySQL', 'SQL Server'] },
  { id: 'ml', label: 'Machine Learning', sub: 'CNN · MobileNetV2 · Flask', items: ['Python', 'TensorFlow/Keras', 'CNN', 'MobileNetV2', 'Flask', 'Deep Learning'] },
  { id: 'tools', label: 'Design & Tools', sub: 'Figma · Git · Postman', items: ['Figma', 'Git/GitHub', 'Postman', 'MySQL Workbench', 'UI/UX', 'Debugging'] },
]

// legends printed on the 3D keyboard, each tied to a category
export const keycaps = [
  ['Flutter', 'mobile'], ['Dart', 'mobile'], ['Kotlin', 'mobile'], ['Firebase', 'mobile'], ['OCR', 'mobile'],
  ['Laravel', 'web'], ['PHP', 'web'], ['JS', 'web'], ['REST', 'web'], ['MySQL', 'web'],
  ['Python', 'ml'], ['CNN', 'ml'], ['Keras', 'ml'], ['Flask', 'ml'], ['SQL', 'web'],
  ['Figma', 'tools'], ['Git', 'tools'], ['Postman', 'tools'], ['Tailwind', 'web'], ['UI/UX', 'tools'],
]

export const softSkills = ['Problem Solving', 'Teamwork', 'Critical Thinking', 'Communication', 'Quick Adaptation']
export const aiTools = ['Claude Code', 'Copilot', 'Antigravity', 'Codex']
export const languages = ['Bahasa Indonesia — Native', 'English — Professional']
