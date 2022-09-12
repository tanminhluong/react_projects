import React, { useMemo, useState } from "react";
import "./product.css";
import { useLocation } from "react-router-dom";
import Chart from "../../chart/Chart";
// import { productData } from "../../../dummyData";
import PublishIcon from "@mui/icons-material/Publish";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userRequest } from "../../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import { updateProduct } from "../../../redux/apiCalls";

const Product = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const [imgURL, setImgURL] = useState(product.img);
  const [cat, setCat] = useState([]);
  const [catValue, setCatValue] = useState(product.categories.join());
  const [inputs, setInputs] = useState({
    title: product.title,
    desc: product.desc,
    price: product.price,
  });
  const [file, setFile] = useState(null);
  // const [catValue, setCatValue] = useState("")

  const [pStats, setPStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(`/orders/income?pid=${productId}`);
        const list = res.data.sort((a, b) => a._id - b._id);
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS, productId]);

  const onImgChange = (e) => {
    const [f] = e.target.files;
    setFile(f);
    setImgURL(URL.createObjectURL(f));
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
    setCatValue(e.target.value);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updatedProduct = {
              ...inputs,
              img: downloadURL,
              categories: cat,
            };
            updateProduct(productId, updatedProduct, dispatch);
          });
        }
      );
    } else {
      const updateWithoutFile = { ...inputs, categories: cat };
      updateProduct(productId, updateWithoutFile, dispatch);
    }
  };

  return (
    <div className="product">
      <div className="productTitle-container">
        <h1 className="product-title">Product</h1>
      </div>
      <div className="product-top">
        <div className="product-topLeft">
          <Chart data={pStats} title="Sale Performance" dataKey="Sales" />
        </div>
        <div className="product-topRight">
          <div className="productInfo-top">
            <img src={product.img} alt="" className="productInfo-img" />
            <span className="productInfo-name">{product.title}</span>
          </div>
          <div className="productInfo-bottom">
            <div className="productInfo-item">
              <span className="productInfo-key">ID: </span>
              <span className="productInfo-value">{product._id}</span>
            </div>
            <div className="productInfo-item">
              <span className="productInfo-key">Sales: </span>
              <span className="productInfo-value">5123</span>
            </div>
            <div className="productInfo-item">
              <span className="productInfo-key">In stock: </span>
              <span className="productInfo-value">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="product-bottom">
        <form className="product-form">
          <div className="product-formLeft">
            <label>Product Name</label>
            <input
              onChange={handleChange}
              name="title"
              type="text"
              value={inputs.title}
            />
            <label>Product Description</label>
            <input
              onChange={handleChange}
              name="desc"
              type="text"
              value={inputs.desc}
            />
            <label>Product Price</label>
            <input
              onChange={handleChange}
              name="price"
              type="text"
              value={inputs.price}
            />

            <label>Category</label>
            <input type="text" value={catValue} onChange={handleCat} />

            <label>In Stock</label>
            <select onChange={handleChange} name="inStock" id="inStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label>Active</label>
            <select onChange={handleChange} name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="product-formRight">
            <div className="product-upload">
              <img src={imgURL} alt="" className="product-upload-img" />
              <label for="file">
                <PublishIcon />
              </label>
              <input
                onChange={onImgChange}
                type="file"
                id="file"
                style={{ display: "none" }}
              />
            </div>
            <button onClick={handleUpdate} className="product-updateBtn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
