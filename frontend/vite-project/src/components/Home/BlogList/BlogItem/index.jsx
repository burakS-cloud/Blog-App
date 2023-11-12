/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Chip from "../../../common/Chip";
import "./styles.css";

const BlogItem = ({
  blog: {
    body,
    title,
    createdAt,
    author,
    coverImage,
    category,
    subCategory,
    id,
  },
}) => {
  return (
    <div className="blogItem-wrap">
      <img className="blogItem-cover" src={coverImage} alt="cover" />
      <Chip label={category} />
      <Chip subCategory={true} label={subCategory?.join(", ")} />
      <h3>{title}</h3>
      <p className="blogItem-desc">{body}</p>
      <footer>
        <div className="blogItem-author">
          <img src={author?.userAvatar} alt="avatar" />
          <div>
            <h6>{author?.name}</h6>
            <p>{createdAt}</p>
          </div>
        </div>
        <Link className="blogItem-link" to={`/blog/${id}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;
