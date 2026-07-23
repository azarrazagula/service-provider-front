import doctorImg from '../assets/Cardiologist (Heart).webp';
import electricianImg from '../assets/Electrician.webp';
import plumberImg from '../assets/Plumber.webp';

export const mainCategories = [
  {
    id: 'doctor',
    title: 'Doctor Healthcare',
    badge: 'Medical Specialists',
    description: 'Verified cardiologists, general physicians, pediatricians & consultants.',
    image: doctorImg,
    count: '250+ Doctors',
    rating: 4.9,
    reviews: '1,420+'
  },
  {
    id: 'electrician',
    title: 'Electrician Services',
    badge: 'Electrical Experts',
    description: 'Certified electricians for house wiring, breaker repairs & appliance setup.',
    image: electricianImg,
    count: '180+ Electricians',
    rating: 4.8,
    reviews: '980+'
  },
  {
    id: 'plumber',
    title: 'Plumber Services',
    badge: 'Piping & Plumbing',
    description: 'Expert plumbers for leak detection, pipe fitting & bathroom installation.',
    image: plumberImg,
    count: '150+ Plumbers',
    rating: 4.9,
    reviews: '1,150+'
  }
];

export const topRatedCategories = [
  {
    categoryId: 'doctor',
    categoryTitle: 'Doctor Specialists',
    iconName: 'Stethoscope',
    defaultImage: doctorImg,
    providers: [
      {
        id: 'doc-1',
        name: 'Dr. Arul S. Nathan',
        specialty: 'Senior Cardiologist',
        qualification: 'MBBS, MD, DM (Cardiology)',
        experience: '14+ Yrs Exp',
        rating: 4.95,
        reviews: 420,
        fee: '₹799',
        badge: 'Heart Care',
        image: doctorImg,
        location: 'Chennai'
      },
      {
        id: 'doc-2',
        name: 'Dr. Priya Ramachandran',
        specialty: 'General Physician',
        qualification: 'MBBS, DNB (Medicine)',
        experience: '10+ Yrs Exp',
        rating: 4.90,
        reviews: 680,
        fee: '₹499',
        badge: 'General Care',
        image: doctorImg,
        location: 'Coimbatore'
      },
      {
        id: 'doc-3',
        name: 'Dr. Rajesh Kannan',
        specialty: 'Senior Pediatrician',
        qualification: 'MBBS, MD (Pediatrics)',
        experience: '12+ Yrs Exp',
        rating: 4.88,
        reviews: 310,
        fee: '₹599',
        badge: 'Child Care',
        image: doctorImg,
        location: 'Madurai'
      },
      {
        id: 'doc-4',
        name: 'Dr. Deepa Subash',
        specialty: 'Consultant Neurologist',
        qualification: 'MBBS, DM (Neurology)',
        experience: '16+ Yrs Exp',
        rating: 4.96,
        reviews: 540,
        fee: '₹899',
        badge: 'Brain & Spine',
        image: doctorImg,
        location: 'Trichy'
      }
    ]
  },
  {
    categoryId: 'electrician',
    categoryTitle: 'Electrician Experts',
    iconName: 'Zap',
    defaultImage: electricianImg,
    providers: [
      {
        id: 'elec-1',
        name: 'Selvam Electricals',
        specialty: 'House Wiring & Short Circuit',
        qualification: 'Certified Master Electrician',
        experience: '9+ Yrs Exp',
        rating: 4.90,
        reviews: 380,
        fee: '₹299',
        badge: 'Doorstep',
        image: electricianImg,
        location: 'Chennai'
      },
      {
        id: 'elec-2',
        name: 'K. Ramesh Kumar',
        specialty: 'AC & Appliance Wiring',
        qualification: 'Industrial Electrical Diploma',
        experience: '7+ Yrs Exp',
        rating: 4.82,
        reviews: 290,
        fee: '₹349',
        badge: 'Quick Service',
        image: electricianImg,
        location: 'Salem'
      },
      {
        id: 'elec-3',
        name: 'Karthik & Co Electricals',
        specialty: '3-Phase & Fuse Box Specialist',
        qualification: 'Licensed Tech Pro',
        experience: '11+ Yrs Exp',
        rating: 4.94,
        reviews: 410,
        fee: '₹399',
        badge: '24/7 Available',
        image: electricianImg,
        location: 'Coimbatore'
      },
      {
        id: 'elec-4',
        name: 'S. Vijay Electrical Services',
        specialty: 'Smart Home & LED Setup',
        qualification: 'Certified Smart Home Expert',
        experience: '8+ Yrs Exp',
        rating: 4.86,
        reviews: 215,
        fee: '₹449',
        badge: 'Top Rated',
        image: electricianImg,
        location: 'Madurai'
      }
    ]
  },
  {
    categoryId: 'plumber',
    categoryTitle: 'Plumber Experts',
    iconName: 'Droplet',
    defaultImage: plumberImg,
    providers: [
      {
        id: 'plum-1',
        name: 'P. Murugan Plumbing',
        specialty: 'Pipeline Leak & Water Pressure',
        qualification: 'Master Plumbing Technician',
        experience: '12+ Yrs Exp',
        rating: 4.92,
        reviews: 490,
        fee: '₹299',
        badge: 'Leak Expert',
        image: plumberImg,
        location: 'Chennai'
      },
      {
        id: 'plum-2',
        name: 'A. Kumar Plumbing Works',
        specialty: 'Bathroom & Kitchen Fittings',
        qualification: 'Sanitary & Piping Pro',
        experience: '8+ Yrs Exp',
        rating: 4.85,
        reviews: 330,
        fee: '₹249',
        badge: 'Fast Repair',
        image: plumberImg,
        location: 'Coimbatore'
      },
      {
        id: 'plum-3',
        name: 'Dinesh Tank & Drain Care',
        specialty: 'Underground Pipe & Tank Clean',
        qualification: 'Hydro-Pressure Expert',
        experience: '10+ Yrs Exp',
        rating: 4.91,
        reviews: 275,
        fee: '₹399',
        badge: 'High Quality',
        image: plumberImg,
        location: 'Madurai'
      },
      {
        id: 'plum-4',
        name: 'Prakash Commercial Plumbing',
        specialty: 'Water Heater & Complex Piping',
        qualification: 'Commercial Piping Specialist',
        experience: '9+ Yrs Exp',
        rating: 4.88,
        reviews: 310,
        fee: '₹499',
        badge: 'Verified Pro',
        image: plumberImg,
        location: 'Trichy'
      }
    ]
  }
];
