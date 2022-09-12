import React, { useEffect } from "react";
import "./productsList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { productRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../../../redux/apiCalls";
const ProductsList = () => {
  // const [data, setData] = useState(productRows);
  const products = useSelector((state) => state.product.products);
  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useeffect called");
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProducts(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productList-item">
            <img src={params.row.img} alt="" className="productList-img" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },

    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.row._id}`}>
              <button className="productList-edit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productList-delete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
      <Link to="/newproduct">
        <button className="product-addBtn">Create new product</button>
      </Link>
      {products && (
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      )}
    </div>
  );
};

export default ProductsList;
