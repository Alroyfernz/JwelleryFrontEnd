import React from "react";
import styles from "./Sidebar.module.scss";
import { NavItems } from "./../Navbar/NavbarData";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Link from "next/link";

const DecideIcon = ({ isExpanded }) =>
  isExpanded ? (
    <AiOutlineMinus fontSize="12px" />
  ) : (
    <AiOutlinePlus fontSize="12px" />
  );

export default function Sidebar({ isOpen, onOpen, onClose }) {
  const user = useSelector((state) => state.user);
  console.log(NavItems);
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <div className={styles.Sidebar}>
          <div className={styles.SidebarButtons}>
            {user.isLoggedIn ? (
              <>
                <a href="/myaccount/details">
                  <button className={styles.SidebarButtonsStyles}>
                    PROFILE
                  </button>
                </a>{" "}
                <a href="/cart">
                  {" "}
                  <button className={styles.SidebarButtonsStyles}>CART</button>
                </a>
              </>
            ) : (
              <>
                {" "}
                <a href="/newuser">
                  <button className={styles.SidebarButtonsStyles}>
                    NEW USER
                  </button>
                </a>
                <a href="/signin">
                  <button className={styles.SidebarButtonsStyles}>LOGIN</button>{" "}
                </a>
              </>
            )}
          </div>
          <div className={styles.SidebarAccordian}>
            <Accordion allowToggle className={styles.AccordianStyle}>
              {NavItems.map((n) => (
                <AccordionItem key={n.id} className={styles.AccordianItem}>
                  {({ isExpanded }) => (
                    <>
                      {/* <h2> */}
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <a href={n.link}>{n.name}</a>
                        </Box>
                        <DecideIcon isExpanded={isExpanded} />
                      </AccordionButton>
                      {/* </h2> */}
                      <AccordionPanel pb={4} className={styles.AccordianPanel}>
                        <Accordion
                          allowToggle
                          className={styles.AccordianStyle}
                        >
                          {n.data?.map((f) => (
                            <AccordionItem
                              key={f.id}
                              className={styles.AccordianItem}
                            >
                              {({ isExpanded }) => (
                                <>
                                  {/* <h2> */}
                                  <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                      <a href={f.link}>{f.name}</a>
                                    </Box>
                                    {(n.id !== 1 || 4) && (
                                      <DecideIcon isExpanded={isExpanded} />
                                    )}
                                  </AccordionButton>
                                  {/* </h2> */}
                                  {(n.id !== 1 || 4) && (
                                    <AccordionPanel
                                      pb={4}
                                      className={styles.AccordianPanel}
                                    >
                                      <Accordion
                                        allowToggle
                                        className={styles.AccordianStyle}
                                      >
                                        {f.data?.map((g) => (
                                          <AccordionItem
                                            key={g.id}
                                            className={styles.AccordianItem}
                                          >
                                            {/* <h2> */}
                                            <AccordionButton>
                                              <Box flex="1" textAlign="left">
                                                <a href={g.link}>{g.name}</a>
                                              </Box>
                                            </AccordionButton>
                                            {/* </h2> */}
                                          </AccordionItem>
                                        ))}
                                      </Accordion>
                                    </AccordionPanel>
                                  )}
                                </>
                              )}
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
