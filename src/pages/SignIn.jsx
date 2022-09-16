import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;
const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`/auth/signin`, { name, password });
      dispatch(loginSuccess(res.data));
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post(`/auth/google`, {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/auth/signup`, { name, password, email });
      console.log(res.data);
    } catch (error) {}
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue</SubTitle>
        <Input
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>Or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>Or</Title>
        <Input
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Sign up</Button>
      </Wrapper>
      <More>
        English(NA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Term of services</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
