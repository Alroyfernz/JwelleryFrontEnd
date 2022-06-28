import React from 'react';
import { AiOutlineCloseSquare } from "react-icons/ai";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { BiRupee } from "react-icons/bi";

export default function AddToCartDrawer({ isOpen, onClose, onOpen }) {
    const btnRef = React.useRef();
    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent style={{ background: "#6b1aa6" }}>
                {/* <DrawerCloseButton /> */}

                <DrawerBody style={{ padding: 6 }}>
                    <div
                        style={{
                            padding: "3%",
                            background: "rgba(0,0,0,.5)",
                            color: "#fff",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 5,
                        }}
                    >
                        <div
                            style={{
                                borderBottom: "1px solid #fff",
                                display: "flex",
                                flexDirection: "column",
                                paddingBottom: 8,
                            }}
                        >
                            <AiOutlineCloseSquare
                                style={{
                                    fontSize: 18,
                                    alignSelf: "flex-end",
                                    float: "right",
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="https://storage.sg.content-cdn.io/cdn-cgi/image/width=100,height=100,quality=75,format=auto,fit=cover,g=top/in-resources/d7048855-742a-406c-a67d-5c2962e69e5e/Images/ProductImages/Source/DNCKL27_1.jpg"
                                    alt=""
                                    width="55"
                                    height="55"
                                />
                                <div
                                    style={{
                                        marginLeft: 8,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <span style={{ fontSize: 14 }}>
                                        Twin Marquise Diamond Necklace
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            fontSize: 13,
                                            alignItems: "center",
                                        }}
                                    >
                                        <BiRupee /> 11,00
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                borderBottom: "1px solid #fff",
                                display: "flex",
                                flexDirection: "column",
                                paddingBottom: 8,
                                marginTop: 6,
                            }}
                        >
                            <AiOutlineCloseSquare
                                style={{
                                    fontSize: 18,
                                    alignSelf: "flex-end",
                                    float: "right",
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="https://storage.sg.content-cdn.io/cdn-cgi/image/width=100,height=100,quality=75,format=auto,fit=cover,g=top/in-resources/d7048855-742a-406c-a67d-5c2962e69e5e/Images/ProductImages/Source/1000593039.jpg"
                                    alt=""
                                    width="55"
                                    height="55"
                                />
                                <div
                                    style={{
                                        marginLeft: 8,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <span style={{ fontSize: 14 }}>
                                        Twin Marquise Diamond Necklace
                                    </span>
                                    <span
                                        style={{
                                            display: "flex",
                                            fontSize: 13,
                                            alignItems: "center",
                                        }}
                                    >
                                        <BiRupee /> 11,00
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span style={{ fontSize: 12 }}>
                            (Packaging/Distribution and GST will be included at the time of
                            check-out)
                        </span>
                        <button
                            style={{
                                alignSelf: "flex-end",
                                background: "#6b1aa6",
                                padding: "2px 8px",
                                width: "fit-content",
                                color: "#fff",
                                fontSize: 12,
                                textTransform: "uppercase",
                                marginTop: 15,
                                borderRadius: 5,
                            }}
                            onClick={onClose}
                        >
                            checkout
                        </button>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}
