import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppwriteService from "../appwrite/config";
import { Container, PostForm } from "../components";

function EditPages() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      AppwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
        <Container>
            <PostForm post={post} />
        </Container>

    </div>
  ) : null;
}

export default EditPages;
