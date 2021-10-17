import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../helpers/api";
import { useHistory } from "react-router-dom";
import { useAuth } from "../helpers/AuthContext";

function Login() {
  const history = useHistory();
  const { authState, setAuthState } = useAuth();
  const [loginError, setLoginError] = useState();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    api.post("/users/login", data).then((resp) => {
      if (resp.data.error) {
        setLoginError(resp.data);
      } else {
        localStorage.setItem("apiKey", resp.data.apiKey);
        setAuthState({
          username: resp.data.username,
          id: resp.data.id,
          authorization: resp.data.authorization,
          status: true,
        });
        history.push("/dashboard");
      }
    });
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <h3>Login</h3>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label>username</label>
            <input
              placeholder="Informe seu usuário"
              {...register(`username`, {
                required: true,
              })}
            />
            {errors?.username && <small>Informe seu nome de usuário</small>}
          </FormGroup>
          <FormGroup>
            <label>password</label>
            <input
              type="password"
              {...register(`password`, {
                required: true,
              })}
            />
            {errors?.username && <small>Informe sua senha</small>}
          </FormGroup>
          {loginError && (
            <>
              <small>{loginError.error}</small>
              <br />
            </>
          )}
          <SubmitButton type="submit">Fazer login</SubmitButton>
        </FormWrapper>
      </LoginContainer>
    </LoginWrapper>
  );
}

export default Login;

const LoginWrapper = styled.div``;
const LoginContainer = styled.div``;
const FormWrapper = styled.form``;
const FormGroup = styled.div``;
const SubmitButton = styled.button``;
