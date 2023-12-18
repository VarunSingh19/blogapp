import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebaseConfig";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [randomProfileImage, setRandomProfileImage] = useState(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    const fetchRandomUser = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=1");
        const data = await response.json();

        // Extract the profile image URL from the API response
        const imageUrl =
          data.results[0]?.picture?.thumbnail || "default-image-url.jpg";

        setRandomProfileImage(imageUrl);
      } catch (error) {
        console.error("Error fetching random user:", error);
      }
    };

    // Fetch random user data when the component mounts
    fetchRandomUser();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container ">
        <Link className="navbar-brand" to="/">
          <img
            src="https://webstockreview.net/images/1-clipart-article.png"
            width={30}
            height={30}
            alt="logo"
            className="ms-5"
          />
          <strong>RandomPosts</strong>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse mx-auto`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active-link"
                exact
                to="/"
              >
                All Posts
              </NavLink>
              
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active-link"
                to="/addarticle"
              >
                Add a new Post
              </NavLink>
              
            </li>
          </ul>

          {user && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item pe-4 d-flex align-items-center">
                Signed in as {user.displayName || user.email}
                <img
                  src={randomProfileImage}
                  width={30}
                  height={30}
                  alt="logo"
                  className="ms-3 rounded-circle"
                />
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    alert("Are you sure, you want to log out?")
                    signOut(auth);
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
