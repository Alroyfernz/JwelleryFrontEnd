import { useState } from "react";

export default function useModal(Component) {
  const [show, setShow] = useState(false);
  const [navbarData, setNavbarData] = useState([]);
  const [hoveredId, setHoveredId] = useState();
  const toggle = () => setShow(!show);
  const Modal = (props) => <Component {...props} />;

  return {
    Modal,
    show,
    toggle,
    setShow,
    navbarData,
    setNavbarData,
    hoveredId,
    setHoveredId,
  };
}
