import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebaseConfig";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [randomProfileImage, setRandomProfileImage] = useState(null);

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
          /> <strong>RandomPosts</strong>
        </Link>
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addarticle">
                Add Articles
              </Link>
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
