// aboutTeams data

import img1 from "../../assets/images/landingPage/aboutTeams/img1.png";
import img2 from "../../assets/images/landingPage/aboutTeams/img2.png";
import img3 from "../../assets/images/landingPage/aboutTeams/img3.png";
import img4 from "../../assets/images/landingPage/aboutTeams/img4.png";
import img5 from "../../assets/images/landingPage/aboutTeams/img5.png";

import type {
  AboutTeams,
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
  Home,
  Briefcase,
  Users,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export const navigationLinks = [
  { name: "Home", icon: Home },
  { name: "Services", icon: Briefcase },
  { name: "Subscriptions", icon: Briefcase },
  { name: "Team", icon: Users },
  { name: "Contact Us", icon: Phone },
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
