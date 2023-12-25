import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-2">
    
      <p>&copy; 2023-2024 <a href="https://instagram.com/varunsingh_09/" target="_blank" rel="noopener noreferrer">RandomPosts.</a> All rights reserved. <Link to='/termsconditions'>Terms And Conditions</Link></p>
    
  </footer>
  
  );
};

export default Footer;
