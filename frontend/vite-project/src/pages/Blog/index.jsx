import { useEffect, useState } from "react";
import { useParams } from "react-router";
// import { blogList } from "../../config/data";
import Chip from "../../components/common/Chip";
import EmptyList from "../../components/common/EmptyList";
import "./styles.css";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../queries/queries";

const Blog = () => {
  const { id } = useParams();
  console.log("id from params:", id);
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: id },
  });
  // const [blog, setBlog] = useState(data?.post);

  // useEffect(() => {
  //   // let blog = blogList.find((blog) => blog.id === parseInt(id));
  //   if (data) {
  //     setBlog(data?.post);
  //   }
  // }, []);

  console.log("data in detail:", data);
  console.log(data?.post?.createdAt);

  function formatTimestampToDate(timestamp) {
    const timestampNumber = Number(timestamp);

    if (isNaN(timestampNumber)) {
      return "Invalid timestamp";
    }

    const isInSeconds = timestamp.toString().length === 10;
    const date = new Date(
      isInSeconds ? timestampNumber * 1000 : timestampNumber
    );

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // console.log("formattedDate:", formatTimestampToDate(data?.post?.createdAt));

  return (
    <>
      <Link className="blog-goBack" to="/">
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {data?.post ? (
        <div className="blog-wrap">
          <header>
            <p className="blog-date">
              Published on {formatTimestampToDate(data?.post?.createdAt)}
            </p>
            <h1>{data?.post.title}</h1>
            <div className="blog-subCategory">
              {data?.post.subCategory.map((category, i) => (
                <div key={i}>
                  <Chip label={category} />
                </div>
              ))}
            </div>
          </header>
          <img src={data?.post.coverImage} alt="cover" />
          <p className="blog-desc">{data?.post.body}</p>
        </div>
      ) : (
        <p>Deneme</p>
      )}
    </>
  );
};

export default Blog;
