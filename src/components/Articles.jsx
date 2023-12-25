import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link } from "react-router-dom";
import { Card, Row, Col} from 'react-bootstrap';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import '../App.css';


export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);

  const truncateDescription = (id, description, maxLength) => {
    if (description.length > maxLength) {
      const truncatedText = `${description.slice(0, maxLength)}... `;
      return (
        <>
          {truncatedText}
          <Link to={`/article/${id}`} className="read-more-link">
            Read more
          </Link>
        </>
      );
    }
    return description;
  };

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
    <>
      <br />
      <br />
      <>
        <div id='featured-posts'
        className="container mt-5">
    <Row xs={1} md={2} lg={3} className="g-4">
      {articles.map(({ id, imageUrl, createdBy, userId, title, createdAt, description, likes, comments }) => (
        <Col key={id} className="mb-4 ">
          <Card className="h-100 shadow">
            <Link to={`/article/${id}`}>
              <Card.Img
                src={imageUrl}
                alt="Article Cover"
                className="img-fluid rounded"
                style={{ objectFit: 'cover', height: '450px',width:'550px' }}
              />
            </Link>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text style={{color:'gray'}}>{truncateDescription(id, description, 100)}</Card.Text>
              <Row className="mb-3">
                <Col xs={6} style={{color:'gray'}}>
                  {createdBy && <span>@{createdBy}</span>}
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                  {user && user.uid === userId && <DeleteArticle id={id} imageUrl={imageUrl} />}
                </Col>
              </Row>
              <Row className="mb-3 " style={{fontFamily:'sans-serif'}}>
                <Col xs={12}>
                  <p>{createdAt && new Date(createdAt.toDate()).toDateString()}</p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <div className="d-flex justify-content-end align-items-center">
                    {user && <LikeArticle id={id} likes={likes} />}
                    <div className="pe-2">
                      <p>{likes && likes.length} <FaThumbsUp /></p>
                    </div>
                    {comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments.length} <FaComment /></p>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
                    </>
      </>
  );
}
