import React from "react";
import PageNotFound from './page404_LI.jpg';
export const NotFound: React.FunctionComponent<any> = () => {
  return (<div>
    <img src={PageNotFound} alt='Page not found'/>
    </div>);
};
