import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Pagination from "../components/Pagination";
//import gif from "../assets/source.gif";

const Blog = () => {
  const [nextId, disableNext] = useState(false);
  const [previousId, disablePrevious] = useState(false);
  const [postsPerPage, setPostPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  useEffect(() => {
    const pageId = localStorage.getItem("pageId");
    const perPage = localStorage.getItem("perPage");
    if (pageId) setCurrentPage(parseInt(pageId));
    if (perPage) setPostPerPage(parseInt(perPage));

    return () => {
      localStorage.removeItem("pageId");
      localStorage.removeItem("perPage");
    };
  }, []);
  useEffect(() => {
    var url = 'https://newsapi.org/v2/everything?sources=techcrunch&apiKey=7065079046804e7e8d69745630fe7bd6';

var req = new Request(url);

    console.log("useEffect is called");
    fetch(req)
      .then(res =>res.json())
      .then(data => {
        console.log(data.articles)
        setPosts(data.articles);
      });
  }, []); // [] means it called only once
  useEffect(() => {
    if (totalPages) {
      const pagination = [];
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(i);
        setPages(pagination);
        if (pagination[0] === currentPage) {
          disablePrevious(true);
        } else {
          disablePrevious(false);
        }
        if (pagination.length === currentPage) {
          disableNext(true);
        } else {
          disableNext(false);
        }
      }
    }
  }, [totalPages]);
  useEffect(() => {
    if (posts.length) {
      const totalPages = Math.ceil(posts.length / postsPerPage);
      setTotalPages(totalPages);
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
      setCurrentPosts(currentPosts);
    }
  }, [currentPage, posts, postsPerPage]);

  const handleClick = data => {
    localStorage.setItem("pageId", data);
    setCurrentPage(parseInt(data));
    if (pages[0] === data) {
      disablePrevious(true);
    } else {
      disablePrevious(false);
    }
    if (pages.length === data) {
      disableNext(true);
    } else {
      disableNext(false);
    }
  };
  const setPageNumber = ({ target }) => {
    localStorage.setItem("perPage", target.value);
    setPostPerPage(parseInt(target.value));
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", flex: 1 }}>
      {currentPosts.map(post => (
        <Card style={{ flex: "1 46%", boxSizing: "border-box" }} key={post.title}>
        <img
            src={'../assets/images/techcrunch.png'}
            alt={post.title}
          />
          <div style={{fontSize:'14px', fontWeight:'bold'}}>{post.title}</div>
          <div style={{fontSize:'12px', padding:'20px 0 20px 0'}}>{post.source.name}</div>
          <img
            src={post.urlToImage}
            alt={post.title}
            style={{ width: "100%", height: "300px" }}
          />
          <p style={{fontSize:'14px'}}>{post.content}</p >
          <p>{post.body}</p>
        </Card>
      ))}
      <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
        <Pagination
          pagesData={pages}
          handleClick={handleClick}
          setPageNumber={setPageNumber}
          selectedPostsPerPage={postsPerPage}
          activePage={currentPage}
          posts={posts}
          previousId={previousId}
          nextId={nextId}
        ></Pagination>
      </div>
    </div>
  );
};

export default Blog;
