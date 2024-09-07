import React, { useState, useEffect } from "react";
import classes from "./Posts.module.css";
import Select from "react-dropdown-select";
import { Col, Container, Row } from "react-bootstrap";
import PostCard from "../../components/PostCard";
import { BaseURL } from "../../assets/helper/Urls";
import axios from "axios";
import NoData from "../../components/NoData";
const options = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "art",
    label: "Art",
  },
  {
    value: "science",
    label: "Science",
  },
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "cinema",
    label: "Cinema",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "food",
    label: "Food",
  },
];
const useDebounce=(search,delay)=>{
  const [value,setValue]=useState('')
  useEffect(() => {
    const interval= setTimeout(() =>{
      setValue(search)
    },delay)
    return ()=>{
      clearInterval(interval)
    }
  }, [search])
  return value
  
}
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [titleSearch, setTitleSearch] = useState("");
  const debounce=useDebounce(titleSearch,500)
  const fetchPosts = async (cat=selectedCategory) => {
    const filters={
      ...(debounce?.trim() !=='' && {search: debounce}),
      ...(cat && cat !=='all' &&  {category: cat})
    }
    const searchParams=new URLSearchParams(filters)
    const apiUrl = BaseURL(`blogs?${searchParams.toString()}`);
    const response = await axios.get(apiUrl);
    if (response) {
      setPosts(response?.data);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [debounce]);
  console.log(selectedCategory)

  return (
    <div className={classes.postSection}>
      <Container>
        <div className={classes.header}>
          <Row>
            <div className={classes.postHeader}>
              <h4>Showing Posts For </h4>
            </div>
            <Col lg={6}>
              <div className={`${classes.inputField} w-100`}>
                <input
                  type="text"
                  className="w-100"
                  placeholder="Search by title"
                  value={titleSearch}
                  onChange={(e) => setTitleSearch(e.target.value)}
                />{" "}
              </div>
            </Col>
            <Col lg={6}>
              <Select
                options={options}
                onChange={(values) => {
                  setSelectedCategory(values[0].value);
                  fetchPosts(values[0].value);
                }}
                placeholder="Select Category"
              />
            </Col>
          </Row>
        </div>
        <div className={classes.postsContainer}>
          <div className={classes.postSection}>
            {posts.length > 0 ? posts?.map((item, index) => (
              <div key={item.id}>
                <PostCard post={item} />
                {index != posts.length - 1 && (
                  <hr className="w-100" style={{ background: "#d5d5d5" }} />
                )}
              </div>
            )):<NoData text={"No blogs found"} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Posts;
