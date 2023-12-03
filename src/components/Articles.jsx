import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);
  return (
    <div className="container mt-5">
      
      <br />
      <br />
      <br />
      <br />
      
    {articles.map(({ id, imageUrl, createdBy, userId, title, createdAt, description, likes, comments }) => (
      <div className="border p-4 mb-4 bg-light" key={id}>
        <div className="row">
          <div className="col-md-3 col-12 mb-3 mx-auto text-center">
            <Link to={`/article/${id}`}>
              <img
                src={imageUrl}
                alt="Article Cover"
                className="img-fluid rounded"
                style={{ maxWidth: '300px', maxHeight: '300px' }}
              />
            </Link>
          </div>
          <div className="col-md-9 col-12">
            <div className="row mb-3">
              <div className="col-6">
                {createdBy && (
                  <span className="badge bg-primary">{createdBy}</span>
                )}
              </div>
              <div className="col-6 d-flex justify-content-end">
                {user && user.uid === userId && (
                  <DeleteArticle id={id} imageUrl={imageUrl} />
                )}
              </div>
            </div>
            <h3>{title}</h3>
            <p>{createdAt && createdAt.toDate().toDateString()}</p>
            <h5>{description}</h5>
  
            <div className="d-flex justify-content-end align-items-center">
              {user && <LikeArticle id={id} likes={likes} />}
              <div className="pe-2">
                <p>{likes && likes.length} likes</p>
              </div>
              {comments && comments.length > 0 && (
                <div className="pe-2">
                  <p>{comments.length} comments</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  );
}
