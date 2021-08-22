import React from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";

const mainMenuItems = [
  {
    text: "Blog",
    to: Routes.BLOG,
  },
  {
    text: "Servicios",
    to: Routes.SERVICES,
  },
  {
    text: "Donaciones",
    to: "/#donation",
  },
  {
    text: "Nosotros",
    to: "/#about-us",
  },
  {
    text: "Contáctanos",
    to: "/#contact-us",
  },
];

const useStyles = makeStyles((theme) => ({
  link: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: "rgb(0, 0, 0, 0)",
      borderRadius: theme.border.default,
      transform: "scale(1.1)",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

const NavItems = () => {
  const classes = useStyles();

  return (
    <div className={classes.sectionDesktop}>
      {mainMenuItems.map((item, index) => (
        <Link href={item.to} key={"desktop" + index}>
          <MenuItem className={classes.link}>{item.text}</MenuItem>
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
