import React, { memo, useState } from "react";

// importing actions
import useAddPost from "../../hooks/useAddPost";

export default memo(function AddPost() {
  const [formData, setFormData] = useState({
    title: "for testing bro",
    images: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    useAddPost(formData);
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
