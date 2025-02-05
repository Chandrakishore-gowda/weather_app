import React, { useEffect, useState } from 'react';
import './navbar.css'; // Custom CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const [scrollingDown, setScrollingDown] = useState(false);
  let previousScrollPosition = 0;

  const isScrollingDown = () => {
    const scrolledPosition = window.pageYOffset;
    const isScrollDown = scrolledPosition > previousScrollPosition;
    previousScrollPosition = scrolledPosition;
    return isScrollDown;
  };

  const handleNavScroll = () => {
    if (isScrollingDown()) {
      setScrollingDown(true);
    } else {
      setScrollingDown(false);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Add scroll event listener
    const handleScroll = () => {
      if (!mediaQuery.matches) {
        handleNavScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={scrollingDown ? 'scroll-down' : 'scroll-up'}>
      <div className="logo">Logo</div>
      <div className="links">
        <Link to="/MyMap">MAP</Link> {/* Use Link for navigation */}
        <Link to="/page1">Link 2</Link>  {/* Link to Page 2 */}
        <Link to="">Link 3</Link>  {/* Link to Page 3 */}
      </div>
    </nav>
  );
};

export default Navbar;
