import { useRouter } from "next/router";
import Loading from "../components/Loading";
import {Fragment} from 'react'
import jwtDecode from 'jwt-decode';

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = localStorage.getItem("access_token");
      if(accessToken){
        var decodedToken = jwtDecode(accessToken, {complete: true});
        var dateNow =  Math.floor(Date.now() / 1000)
        // If there is no access token we redirect to "/" page.
      }
      if (!accessToken || decodedToken.exp < dateNow) {
        Router.push(`/auth/login?redirect=${window?.location?.href}`);
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return (
          <Fragment>
              <WrappedComponent {...props} />
          </Fragment>
      );
    }

    // If we are on server, return null
    return <Loading/>;
  };
};

export default withAuth;
