import React, { useEffect, useRef, useState } from "react";
import MetaData from "../layout/MetaData";
import Adminlayout from "../layout/Adminlayout";
import {useNavigate,  useParams } from "react-router-dom";
import { useGetProductDetailsQuery, useUploadProductImagesMutation } from "../../redux/api/productApi";
import toast from "react-hot-toast"
const UplaodImages = () => {
  const params = useParams();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { data } = useGetProductDetailsQuery(params?.id);
  const [uploadProductImages, {isLoading, isSuccess, error}] = useUploadProductImagesMutation();
 
  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images);
    }
    if(error){
      toast.error(error?.data?.message)
    }
    if(isSuccess){
      toast.success("Images Uploaded Successfully")
      setImagesPreview([]);
      navigate("/admin/products")
    }
  }, [data, error, isSuccess, navigate]);

  const handleOnchange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleResetFileInput = () => {
    if(fileInputRef.current){
      fileInputRef.current.value = ""
    }
  }

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter(img => img !== image)

    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  }
  
  const submitHandler = async (e) => {
    e.preventDefault();
    await uploadProductImages({id : params?.id, body : {images}})
  }

  return (
    <Adminlayout>
      <MetaData title={"Upload Images"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8 mt-5 mt-lg-0">
          <form
            className="shadow rounded bg-body"
            enctype="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Upload Product Images</h2>

            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">
                Choose Images
              </label>

              <div className="custom-file">
                <input
                ref={fileInputRef}
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  multiple
                  onChange={handleOnchange}
                  onClick={handleResetFileInput}
                />
              </div>
              {imagesPreview?.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-warning">New Images:</p>
                  <div className="row mt-4">
                    {imagesPreview?.map((img) => (
                      <div className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={img}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            type="button"
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            onClick={() => handleImagePreviewDelete(img)}
                          >
                            <i className="fa fa-times" onClick={handleImagePreviewDelete}></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                )}
                {uploadedImages?.length > 0 && (

                  <div className="uploaded-images my-4">
                <p className="text-success">Product Uploaded Images:</p>
                <div className="row mt-1">
                  {uploadedImages?.map((img) => (
                    <div className="col-md-3 mt-2">
                      <div className="card">
                        <img
                          src={img?.url}
                          alt="Card"
                          className="card-img-top p-2"
                          style={{ width: "100%", height: "80px" }}
                        />
                        <button
                          style={{
                            backgroundColor: "#dc3545",
                            borderColor: "#dc3545",
                          }}
                          className="btn btn-block btn-danger cross-button mt-1 py-0"
                          disabled="true"
                          type="button"
                          >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}
            </div>

            <button
            id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </Adminlayout>
  );
};

export default UplaodImages;
