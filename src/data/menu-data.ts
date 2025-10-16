import { IMenuDT } from "@/types/menu-d-t";

// Use one image from each category for the dropdown
const galleryCategories = [
  {
    title: "Baby Shoot",
    link: "/packages/baby-shoot",
  },
  {
    title: "Wedding Shoot",
    link: "/packages/wedding",
  },
  {
    title: "Call to Bar",
    link: "/packages/call-to-bar",
  },
  {
    title: "Convocation",
    link: "/packages/convocation",
  },
  {
    title: "Family Portraits",
    link: "/packages/family-portraits",
  },
  {
    title: "Maternity Portrait",
    link: "/packages/maternity",
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