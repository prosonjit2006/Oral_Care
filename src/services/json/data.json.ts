// aboutTeams data

import img1 from "../../assets/images/landingPage/aboutTeams/img1.png";
import img2 from "../../assets/images/landingPage/aboutTeams/img2.png";
import img3 from "../../assets/images/landingPage/aboutTeams/img3.png";
import img4 from "../../assets/images/landingPage/aboutTeams/img4.png";
import img5 from "../../assets/images/landingPage/aboutTeams/img5.png";

import type {
  AboutTeams,
  DentalService,
  OurServices,
  Plan,
  ReviewsData,
} from "../../type/interface/global.interface";

export const aboutTeams: AboutTeams[] = [
  {
    name: "Jack Jones",
    position: "Lorem Ipsam",
    rating: 4.9,
    reviews: "750+ Reviews",
    img: img1,
  },
  {
    name: "William Jones",
    position: "Lorem Ipsam",
    rating: 4.8,
    reviews: "650+ Reviews",
    img: img2,
  },
  {
    name: "Cameron Wills",
    position: "Lorem Ipsam",
    rating: 5.0,
    reviews: "950+ Reviews",
    img: img3,
  },
  {
    name: "Anatoli Black",
    position: "Lorem Ipsam",
    rating: 4.8,
    reviews: "850+ Reviews",
    img: img4,
  },
  {
    name: "Merry Jones",
    position: "Lorem Ipsam",
    rating: 4.5,
    reviews: "980+ Reviews",
    img: img5,
  },
];

// reviews data

import rev_img1 from "../../assets/images/landingPage/reviews/rev_img1.png";
import rev_img2 from "../../assets/images/landingPage/reviews/rev_img2.png";
import rev_img3 from "../../assets/images/landingPage/reviews/rev_img3.png";

import avatar1 from "../../assets/images/landingPage/reviews/avatar1.png";
import avatar2 from "../../assets/images/landingPage/reviews/avatar2.png";
import avatar3 from "../../assets/images/landingPage/reviews/avatar3.png";
import avatar4 from "../../assets/images/landingPage/reviews/avatar4.png";
import avatar5 from "../../assets/images/landingPage/reviews/avatar5.png";

export const reviewsRowOne: ReviewsData[] = [
  {
    id: 1,
    type: "text",
    title: "Love the Services",
    description:
      "I love how they treat every patients. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor, or randomized words which don't look even slightly believable. ",
    name: "Ban Nowicki",
    role: "Patients",
    avatar: avatar1,
  },
  {
    id: 2,
    type: "image",
    image: rev_img1,
  },
  {
    id: 3,
    type: "text",
    title: "Love the Services",
    description:
      "I love how they treat every patients. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor, or randomized words which don't look even slightly believable. ",
    name: "Nicolette Moore",
    role: "Patients",
    avatar: avatar2,
  },
  {
    id: 4,
    type: "image",
    image: rev_img2,
  },
];

export const reviewsRowTwo: ReviewsData[] = [
  {
    id: 5,
    type: "text",
    title: "Had a Great Experience",
    description:
      "I love how they treat every patients. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor, or randomized words which don't look even slightly believable. ",
    name: "Ban Nowicki",
    role: "Patients",
    avatar: avatar3,
  },
  {
    id: 6,
    type: "image",
    image: rev_img3,
  },
  {
    id: 7,
    type: "text",
    title: "Love the Services",
    description:
      "I love how they treat every patients. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor, or randomized words which don't look even slightly believable. ",
    name: "Ban Nowicki",
    role: "Patients",
    avatar: avatar4,
  },
  {
    id: 8,
    type: "text",
    title: "Love the Services",
    description:
      "I love how they treat every patients. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor, or randomized words which don't look even slightly believable. ",
    name: "Ban Nowicki",
    role: "Patients",
    avatar: avatar5,
  },
];

// footer data part

import {
  // for footer part
  Home,
  Bolt,
  CreditCard,
  Users,
  BookUser,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,

  // for ourservice part
  Stethoscope,
  HandHeart,
  History,
  HeartHandshake,
  GraduationCap,
  Star,
} from "lucide-react";

export const navigationLinks = [
  { name: "Home", icon: Home },
  { name: "Services", icon: Bolt },
  { name: "Subscriptions", icon: CreditCard },
  { name: "Team", icon: Users },
  { name: "Contact Us", icon: BookUser },
];

export const contactLinks = [
  { name: "oralcare@mail.com", icon: Mail },
  { name: "+28352032032-940", icon: Phone },
];

export const socialLinks = [
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "Twitter", icon: Twitter },
];

export const bottomLinks = [
  "Offers",
  "Offers",
  "Privacy Policy",
  "Cookie Settings",
];

// dentalservices slider data part

import ds_img1 from "../../assets/images/landingPage/dentalServices/img1.png";
import ds_img2 from "../../assets/images/landingPage/dentalServices/img2.png";
import ds_img3 from "../../assets/images/landingPage/dentalServices/img3.png";
import ds_img4 from "../../assets/images/landingPage/dentalServices/img4.png";

export const dentalServices: DentalService[] = [
  {
    id: 1,
    title: "General Checkups",
    image: ds_img1,
  },
  {
    id: 2,
    title: "Teeth Whitening",
    image: ds_img2,
  },
  {
    id: 3,
    title: "Root Canal & Surgery",
    image: ds_img3,
  },
  {
    id: 4,
    title: "Kids Dental Care",
    image: ds_img4,
  },
];

// our services part

export const OurServiceData: OurServices[] = [
  {
    id: 1,
    title: "Experienced Specialists",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
    icon: Stethoscope,
    bgColor: "bg-purple-200",
    height: "h-72",
  },
  {
    id: 2,
    title: "Personalized Care",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
    icon: HandHeart,
    bgColor: "bg-blue-200",
    height: "h-56",
  },
  {
    id: 3,
    title: "24/7 Services",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
    icon: History,
    bgColor: "bg-blue-200",
    height: "h-56",
  },
  {
    id: 4,
    title: "State-of-the-Art Facility",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.",
    icon: HeartHandshake,
    bgColor: "bg-purple-200",
    height: "h-72",
  },
];

// OurDentalService

export const services = [
  { id: "01", title: "General Check-ups" },
  { id: "02", title: "Cosmetic Dentistry" },
  { id: "03", title: "Root Canal & Surgery" },
  { id: "04", title: "Kids' Dental Care" },
];

// special offer

export const offers = [
  {
    id: 1,
    title: "Family Discounts",
    description:
      "Enroll 3+ family members and save a flat 15% on your total monthly or annual bill.",
    icon: Users,
  },
  {
    id: 2,
    title: "Student Discount",
    description:
      "Student with valid ID get an extra whitening session annually and flexible payment terms.",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Referral Reward",
    description:
      "Get a free professional cleaning for every friend you refer who sign up for an annual plan.",
    icon: Star,
  },
];

// team members image data

import teamImg1 from "../../assets/images/teamPage/teamMembers/img1.png";
import teamImg2 from "../../assets/images/teamPage/teamMembers/img2.png";
import teamImg3 from "../../assets/images/teamPage/teamMembers/img3.png";
import teamImg4 from "../../assets/images/teamPage/teamMembers/img4.png";
import teamImg5 from "../../assets/images/teamPage/teamMembers/img5.png";

export const teamImages = [teamImg1, teamImg2, teamImg3, teamImg4, teamImg5];

// team picture wall part images

import wallImg1 from "../../assets/images/teamPage/photoWall/img1.png";
import wallImg2 from "../../assets/images/teamPage/photoWall/img2.png";
import wallImg3 from "../../assets/images/teamPage/photoWall/img3.png";
import wallImg4 from "../../assets/images/teamPage/photoWall/img4.png";
import wallImg5 from "../../assets/images/teamPage/photoWall/img5.png";
import wallImg6 from "../../assets/images/teamPage/photoWall/img6.png";
import wallImg7 from "../../assets/images/teamPage/photoWall/img7.png";
import wallImg8 from "../../assets/images/teamPage/photoWall/img8.png";
import wallImg9 from "../../assets/images/teamPage/photoWall/img9.png";
import wallImg10 from "../../assets/images/teamPage/photoWall/img10.png";

export const photoWall = [
  wallImg1,
  wallImg2,
  wallImg3,
  wallImg4,
  wallImg5,
  wallImg6,
  wallImg7,
  wallImg8,
  wallImg9,
  wallImg10,
];

// team bonus tips part images

import tipsImg1 from "../../assets/images/teamPage/bonusTips/img1.png";
import tipsImg2 from "../../assets/images/teamPage/bonusTips/img2.png";
import tipsImg3 from "../../assets/images/teamPage/bonusTips/img3.png";
import tipsImg4 from "../../assets/images/teamPage/bonusTips/img4.png";

export const tipsImages = [
  {
    id: 1,
    img: tipsImg1,
    desc: "There are many variations of passages of Lorem Ipsum.",
  },
  {
    id: 2,
    img: tipsImg2,
    desc: "Available, but the majority have suffered alteration.",
  },
  {
    id: 3,
    img: tipsImg3,
    desc: "There are many variations of passages of Lorem Ipsum.",
  },
  {
    id: 4,
    img: tipsImg4,
    desc: "Available, but the majority have suffered alteration.",
  },
];

// landing page plans part

export const plans: Plan[] = [
  {
    id: "monthly",
    title: "Monthly",
    price: 29,
    durationLabel: "/mo",
    description: "Perfect for maintaining dental health.",
    features: [
      { id: "f1", label: "Basic Check-up access" },
      { id: "f2", label: "1x-ray per year" },
      { id: "f3", label: "5% off basic fillings" },
    ],
  },
  {
    id: "quarterly",
    title: "Quarterly",
    price: 129,
    durationLabel: "/mo",
    description: "Regular care for a brighter smile.",
    features: [
      { id: "f1", label: "Free Check-up every 3 months" },
      { id: "f2", label: "20% off on medicine" },
      { id: "f3", label: "10% off on treatments" },
      { id: "f4", label: "Fluoride treatment included" },
    ],
  },
  {
    id: "yearly",
    title: "Yearly",
    price: 239,
    durationLabel: "/mo",
    description: "Comprehensive coverage & priority.",
    isRecommended: true,
    features: [
      { id: "f1", label: "Free Check-up quarterly" },
      { id: "f2", label: "20% off on treatments" },
      { id: "f3", label: "Emergency priority Schedule" },
    ],
  },
];