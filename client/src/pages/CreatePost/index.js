import React, { createContext, useContext, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import "./CreatePost.css";
import { Container } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import { BaseURL, mediaUrl } from "../../assets/helper/Urls";
import { useSelector } from "react-redux";
const categories = ["art", "science", "technology", "cinema", "design", "food"];
const CreatePost = () => {
  const { user } = useContext(UserContext);
  const { access_token } = useSelector((state) => state.authReducer);
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(state?.image || null);
  const [category, setCategory] = useState(state?.category || "");
  console.log(category);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    try {
      const params = {
        title,
        description: value,
        ...(file && typeof file === "object" && { image: file }),
        category,
      };
      const formData = new FormData();
      for (let key in params) {
        if (!params[key]) {
          return toast.error(`Provide ${key} field!`);
          break;
        }
        formData.append(key, params[key]);
      }
      const apiUrl = state
        ? BaseURL(`blogs/${state?._id}`)
        : BaseURL("blogs/create");
      const response = !state
        ? await axios.post(apiUrl, formData, {
            headers: { Authorization: `Bearer ${access_token}` },
          })
        : axios.patch(apiUrl, formData, {
            headers: { Authorization: `Bearer ${access_token}` },
          });
      if (response) {
        navigate("/posts");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <div className="add">
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> {state ? "Submitted" : "Pending"}
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="d-flex justify-content-between align-items-end">
              <label className="file flex-1" htmlFor="file" id="fileInput">
                Upload Image
              </label>
              <div className="buttons flex-1">
                <button className="w-100" onClick={handleClick}>
                  Publish
                </button>
              </div>

            </div>
            {file && <div className="uploaded_image">
                <img src={typeof file === 'object' ? URL.createObjectURL(file) : mediaUrl(file)} alt="" />
              </div>}
          </div>
          <div className="item">
            <h1>Category</h1>
            {categories?.map((cat) => (
              <div className="cat">
                <input
                  type="radio"
                  checked={category === cat}
                  name="category"
                  value={cat}
                  id={cat}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor="art">{cat}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreatePost;
