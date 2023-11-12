/* eslint-disable react/prop-types */
import BlogItem from "./BlogItem";
import "./styles.css";

const BlogList = ({ blogs }) => {
  // console.log("blogs in map", blogs);
  return (
    <div className="blogList-wrap">
      {blogs &&
        blogs?.posts?.map((blog) => <BlogItem key={blog?.id} blog={blog} />)}
    </div>
  );
};

export default BlogList;
