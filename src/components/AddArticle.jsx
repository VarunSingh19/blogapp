import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "./../firebaseConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

export default function AddArticle() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy:user.displayName,
            userId:user.uid,
            likes:[],
            comments:[]
          })
            .then(() => {
              toast("Article added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error adding article", { type: "error" });
            });
        });
      }
    );
  };

  return (
    <>
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
    <div className="card p-4 shadow text-center" style={{ maxWidth: "500px" }}>
      {!user ? (
        <>
          <h2 className="mb-4">Login to Create an Post</h2>
          <Link to="/signin" className="btn btn-primary mb-3">
            Log in
          </Link>
          <p className="text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Sign Up
            </Link>
          </p>
        </>
      ) : (
        <>
          <h2 className="mb-4">Create Article</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
  
          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />
          </div>
  
          {/* Image */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="form-control"
              onChange={(e) => handleImageChange(e)}
              />
          </div>
  
          {progress > 0 && (
            <div className="mb-3">
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped"
                  style={{ width: `${progress}%` }}
                >
                  {`Uploading Image: ${progress}%`}
                </div>
              </div>
            </div>
          )}
  
          <button
            className="btn btn-primary"
            onClick={handlePublish}
            disabled={progress > 0}
            >
            {progress > 0 ? "Publishing..." : "Publish"}
          </button>
        </>
      )}
    </div>
  </div>
  

            </>

  );
}