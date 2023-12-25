import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import LikeArticle from "./LikeArticle";
import Comment from './Comment';
import { FaThumbsUp, FaComment } from 'react-icons/fa';


export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      {article && (
         <section class="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-md">
          <div className="justify-content-center center d-flex">
            <img
              src={article.imageUrl}
              alt={article.title}
                className="img-fluid rounded-lg"
                style={{width:'full',height:'450px'}}
              />
          </div>
          <div className="">
            <h2>{article.title}</h2>
            <h5>Author: {article.createdBy}</h5>
            <div> Posted on: {article.createdAt.toDate().toDateString()}</div>
            <hr />
            <h4>{article.description}</h4>

            <div className="d-flex flex-row-reverse">
                {user && <LikeArticle id={id} likes={article.likes} />}
                <div className="pe-2">
                      <div className="btn"><FaThumbsUp /></div>
                    </div>
              <div className="pe-2">
                <p>{article.likes.length}</p>
              </div>
            </div>
            <Comment id={article.id} />
          </div>
        </section>
      )}
    </div>
      </>
  );
}
