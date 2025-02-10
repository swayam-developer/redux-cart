import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { add } from "../store/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/ProductSlice";
import  Alert from "react-bootstrap/Alert";
import STATUS_CODE from "../utils/StatusCode";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  //   const [products, getProducts] = useState([]);

  useEffect(() => {
    // dispatch an action to fetch products
    dispatch(getProducts());

    // fetch("https://fakestoreapi.com/products")
    //   .then((data) => data.json())
    //   .then((result) => getProducts(result));
  }, [dispatch]);

  if (status === STATUS_CODE.LOADING) {
    return <p>Loading....</p>;
  }

  if (status === STATUS_CODE.ERROR) {
   return <Alert key="danger" variant="danger">
    Something went wrong! Please try again later....
   </Alert>
  }

  const addToCart = (product) => {
    // dispatch an add action
    dispatch(add(product));
  };

  const cards = products.map((product) => {
    return (
      <div className="col-md-3" style={{ marginBottom: "10px" }}>
        <Card key={product.id} className="h-100">
          <div className="text-center">
            <Card.Img
              variant="top"
              src={product.image}
              style={{ width: "100px", height: "130px" }}
            />
          </div>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>INR: {product.price}</Card.Text>
          </Card.Body>

          <Card.Footer style={{ background: "white" }}>
            <Button variant="primary" onClick={() => addToCart(product)}>
              Add To Cart
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return (
    <div>
      <h1>Product Dashboard</h1>
      <div className="row">{cards}</div>
    </div>
  );
};
export default Product;
