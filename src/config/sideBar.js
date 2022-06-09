import Roles from "./roles";

const SideBarConfig = [
  /* {
    to: "/panel/dashboard",
    title: "DASHBOARD",
    icon: "fa-solid fa-gauge",
    permission: [Roles.USER, Roles.ADMIN],
  }, */
  {
    to: "/panel/sell",
    title: "VENTAS",
    icon: "fa-solid fa-cart-shopping",
    permission: [Roles.USER, Roles.ADMIN],
  },
  {
    to: "/panel/invoices",
    title: "FACTURAS",
    icon: "fa-solid fa-file-invoice-dollar",
    permission: [Roles.USER, Roles.ADMIN],
  },
  {
    to: "/panel/customers",
    title: "CLIENTES",
    icon: "fa-solid fa-user",
    permission: [Roles.USER, Roles.ADMIN],
  },
  {
    to: "/panel/products",
    title: "INVENTARIO",
    icon: "fa-solid fa-box",
    permission: [Roles.ADMIN],
  },
  {
    to: "/panel/users",
    title: "USUARIOS",
    icon: "fa-solid fa-user-tie fa-xl",
    permission: [Roles.ADMIN],
  },
];

export const SideBarRol = (menu, rol) => {
  return menu.filter((item) => item.permission.includes(rol));
};

export default SideBarConfig;
