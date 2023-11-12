import { useState, useEffect } from "react";
import EmptyList from "../../components/common/EmptyList";
import BlogList from "../../components/Home/BlogList";
import Header from "../../components/Home/Header";
import SearchBar from "../../components/Home/SearchBar";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../queries/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [searchKey, setSearchKey] = useState("");
  const [blogs, setBlogs] = useState(data);

  // Update blogs when data changes
  useEffect(() => {
    setBlogs(data);
  }, [data]);

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const allBlogs = data;
    const filteredBlogs = allBlogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setBlogs(data); // Reset to all blogs
    setSearchKey("");
  };

  console.log("blogs", blogs);

  return (
    <div>
      {/* Page Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {/* Blog List & Empty View */}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
