import { useRouteError } from "react-router-dom";
import React, { memo } from "react"
import { Typography } from "@mui/material";

/**
 * Page that displays if a route fails to load. Prints the error.
 * @component
 * @param {Object} props - Unused
 * @returns {JSX.Element}
 */
export const ErrorPage = memo((props) => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Typography component="h1" variant="h5">Oops!</Typography>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
})