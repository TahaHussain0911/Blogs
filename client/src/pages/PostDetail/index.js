import axios from "axios";
import parse from "html-react-parser";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BaseURL, mediaUrl } from "../../assets/helper/Urls";
import classes from "./PostDetail.module.css";

const PostDetail = () => {
  const { access_token, user } = useSelector((state) => state.authReducer);
  const [postData, setPostData] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchPosts = async () => {
    const apiUrl = BaseURL(`blogs/${id}`);
    const response = await axios.get(apiUrl);
    if (response) {
      setPostData(response?.data?.blog);
      setRelatedPosts(response?.data?.relatedBlogs);
      
    }
  };
  console.log(relatedPosts);
  const handleDelete = async () => {
    const apiUrl = BaseURL(`/blogs/${id}`);
    const response = await axios.delete(
      apiUrl,
      {},
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    console.log(response);
    // navigate("/posts");
  };
  useEffect(() => {
    fetchPosts();
  }, [id]);
  return (
    <>
      <Container>
        <div className={classes.postContainer}>
          <Row>
            <Col lg={8}>
              <div className={classes.postContent}>
                <div className={classes.postImg}>
                  <img src={mediaUrl(postData?.image)} alt="" />
                </div>
                <div className={classes.content}>
                  <div className={classes.header}>
                    <div className={classes.posted}>
                      {/* <img src={postData?.userImg} alt="" /> */}
                      <div className={classes.name}>
                        <h6>{postData?.user?.name}</h6>
                        <p>
                          Posted{" "}
                          {postData?.createdAt
                            ? moment(postData?.createdAt).fromNow()
                            : "Few seconds ago"}
                        </p>
                      </div>
                    </div>
                    {user?._id === postData?.user?._id && (
                      <div className={classes.updateBtns}>
                        <Link
                          className={classes.editBtn}
                          to={"/create-post?edit=2"}
                          state={postData}
                        >
                          <BiEditAlt />
                        </Link>
                        <div
                          className={`${classes.editBtn} ${classes.deletBtn}`}
                          onClick={handleDelete}
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={classes.postDescription}>
                    <h2>{postData?.title}</h2>
                    <div className={classes.description}>
                      {parse(`${postData?.description}`)}
                    </div>{" "}
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className={classes.relatedPosts}>
                <h5>Related Posts</h5>
                {relatedPosts?.map(
                  (post) =>
                    post?._id !== postData?._id && (
                      <div className={classes.post}>
                        <img src={mediaUrl(post?.image)} alt="" />
                        <h6>{post?.title}</h6>
                        <div className={classes.related_description}>
                          {parse(`${post?.description}`)}
                        </div>
                        <div className={classes.readBtn} onClick={()=>navigate(`/posts/${post?._id}`)}>
                          <button>Read More</button>
                        </div>
                      </div>
                    )
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default PostDetail;
