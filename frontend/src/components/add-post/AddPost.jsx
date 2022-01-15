import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";

// importing components
import Swal from "sweetalert2";

// importing actions
import useAddPost from "../../hooks/useAddPost";

export default memo(function AddPost() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "for testing bro",
    images: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await useAddPost(formData);

    if (response.status >= 400) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Post can't be added this could be because you didn't add title or image.",
      });
    } else {
      // if success then push to home page
      Swal.fire({
        icon: "success",
        title: "Post added!",
        text: `Your post has been successfully created!`,
        confirmButtonText: "Save",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 mb-3">
          <h2>Have something to share?</h2>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData((prevData) => {
                    return {
                      ...prevData,
                      title: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="images" className="form-label">
                Password
              </label>
              <input
                id="images"
                className="form-control"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={(e) => {
                  setFormData((prevData) => {
                    return {
                      ...prevData,
                      images: [...prevData.images, ...e.target.files],
                    };
                  });
                }}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Add Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});
