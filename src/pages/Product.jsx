import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    flexDirection: "column",
    padding: "10px",
  })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({
    height: "30vh",
  })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({
    padding: "10px",
  })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0px;
  ${mobile({
    width: "100%",
  })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  margin-right: 15px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 10px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    width: "100%",
  })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 1px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      const res = await publicRequest.get(`/products/find/${id}`);
      setProduct(res.data);
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor onClick={() => setColor(c)} color={c} key={c} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
