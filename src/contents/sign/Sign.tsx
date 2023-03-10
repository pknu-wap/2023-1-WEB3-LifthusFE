import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import Logo from "../../common/components/Logo";

import BlueLink from "../../common/components/links/BlueLink";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";

const Sign = () => {
  const { t, i18n } = useTranslation();

  const { isLoading, mutate } = useMutation(async () => {
    const res = await axios.delete(
      process.env.REACT_APP_HUS_SESSION_REVOKE_ENDPOINT + "",
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      console.log("revoked");
    }
  });

  // execute only once
  useEffect(() => {
    mutate();
  }, []);

  return (
    <GoogleOAuthProvider clientId="199526293983-r0b7tpmbpcc8nb786v261e451i2vihu3.apps.googleusercontent.com">
      <Logo mov={true} absolute={true} />
      <br />
      <br />
      <br />
      <br />
      <br />
      {isLoading ? (
        <BlueSpinner />
      ) : (
        <GoogleLogin
          text="continue_with"
          ux_mode="redirect"
          login_uri={process.env.REACT_APP_HUS_GOOGLE_LOGIN_ENDPOINT}
          onSuccess={(credentialResponse: any) => {
            console.log("authed");
          }}
          auto_select={true}
        />
      )}
      <br />

      <BlueLink to="/sign/in">{t("sign.SignIn")}</BlueLink>
      <BlueLink to="/sign/up">{t("sign.SignUp")}</BlueLink>
      {/* Google One Tab Login */}
    </GoogleOAuthProvider>
  );
};

export default Sign;
