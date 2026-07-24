import doctorImg from "../assets/Cardiologist (Heart).webp";
import electricianImg from "../assets/Ecltric.webp";
import plumberImg from "../assets/Plumbers.webp";

export const mainCategories = [
  {
    id: "doctor",
    title: "Doctor Healthcare",
    badge: "Medical Specialists",
    description:
      "Verified cardiologists, general physicians, pediatricians & consultants.",
    image: doctorImg,
    count: "250+ Doctors",
    rating: 4.9,
    reviews: "1,420+",
  },
  {
    id: "electrician",
    title: "Electrician Services",
    badge: "Electrical Experts",
    description:
      "Certified electricians for house wiring, breaker repairs & appliance setup.",
    image: electricianImg,
    count: "180+ Electricians",
    rating: 4.8,
    reviews: "980+",
  },
  {
    id: "plumber",
    title: "Plumber Services",
    badge: "Piping & Plumbing",
    description:
      "Expert plumbers for leak detection, pipe fitting & bathroom installation.",
    image: plumberImg,
    count: "150+ Plumbers",
    rating: 4.9,
    reviews: "1,150+",
  },
];
