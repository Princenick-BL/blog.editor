import React, { useState, useEffect ,Fragment} from "react";
import { renderButton, checkSignedIn } from "../../../middleware/authUtils";
import styles from './index.module.scss'
import Dashboard from './Dashboard/dashboard'
import styled from "styled-components";
import Head from 'next/head'

function Statistics() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => {
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    checkSignedIn()
      .then((signedIn) => {
        console.log(signedIn)
        updateSignin(signedIn);
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin);
      })
      .catch((error) => {

        console.error(error);
      });
  };

  useEffect(() => {
    (async()=>{
      const gapi = await import('gapi-script').then((pack) => pack.gapi);
      gapi.load('client:auth2',init)
    })();
  },[]);

  return (
    <Fragment>
      <Head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </Head>
      <Fragment>
        {!isSignedIn ? (
          <>
            <h1>Google Analytics Dashboard</h1>
            <ButtonContainer>
              <div id="signin-button"></div>
            </ButtonContainer>
          </>
        ) : (
          <Dashboard />
        )}

      </Fragment>
    </Fragment>
  );
}

export default Statistics;

const ButtonContainer = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  padding-top: 10vmin;
  margin-top: 0;
`;
