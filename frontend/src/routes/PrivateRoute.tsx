// // src/routes/PrivateRoute.tsx
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { RootState } from "../store"; // adjust this if needed

// interface Props {
//   element: JSX.Element;
//   allowedRoles: string[];
// }

// const PrivateRoute = ({ element, allowedRoles }: Props) => {
//   const token = useSelector((state: RootState) => state.auth.token);
//   const role = useSelector((state: RootState) => state.auth.role);

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/" replace />;
//   }

//   return element;
// };

// export default PrivateRoute;
import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store"; // adjust if needed

interface Props {
  element: React.ReactElement;
  allowedRoles: string[];
}

const PrivateRoute = ({ element, allowedRoles }: Props) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);

  if (!token || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
