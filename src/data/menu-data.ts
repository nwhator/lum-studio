import { IMenuDT } from "@/types/menu-d-t";

// Use one image from each category for the dropdown
const galleryCategories = [
  {
    title: "Baby Shoot",
    link: "/gallery#cat1",
    img: "/assets/img/inner-project/portfolio-col-2/port-3.jpg",
  },
  {
    title: "Wedding Shoot",
    link: "/gallery#cat2",
    img: "/assets/img/inner-project/portfolio-col-2/port-6.jpg",
  },
  {
    title: "Call to Bar",
    link: "/gallery#cat3",
    img: "/assets/img/inner-project/portfolio-col-2/port-9.jpg",
  },
  {
    title: "Convocation",
    link: "/gallery#cat4",
    img: "/assets/img/inner-project/portfolio-col-2/port-10.jpg",
  },
  {
    title: "Family Portraits",
    link: "/gallery#cat5",
    img: "/assets/img/inner-project/portfolio-col-2/port-13.jpg",
  },
  {
    title: "Maternity Portrait",
    link: "/gallery#cat6",
    img: "/assets/img/inner-project/portfolio-col-2/port-16.jpg",
  },
];

const menu_data: IMenuDT[] = [
  {
    id: 1,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    title: 'About Us',
    link: '/about-us',
  },
  {
    id: 3,
    title: 'Services',
    link: '/service',
  },
  {
    id: 4,
    title: 'Gallery',
    link: '/gallery',
    home_menus: galleryCategories,
  },
  {
    id: 5,
    title: 'Contact',
    link: '/contact',
  },
];

export default menu_data;

// mobile menus 
export const mobile_menu_data = [
  {
    id: 1,
    title: 'Home',
    link: '/',
    dropdown_menus: [],
  },
  {
    id: 2,
    title: 'About Us',
    link: '/about-us',
    dropdown_menus: [],
  },
  {
    id: 3,
    title: 'Services',
    link: '/service',
    dropdown_menus: [],
  },
  {
    id: 4,
    title: 'Gallery',
    link: '/gallery',
    dropdown_menus: [],
  },
  {
    id: 5,
    title: 'Contact',
    link: '/contact',
    dropdown_menus: [],
  },
];