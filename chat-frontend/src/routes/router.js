import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {RouteItems} from "routes/router-options";

const SlackPublicRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        {RouteItems.map(Item => {
          return (
            <Route
              key={`${Item.path}_${Item.id}`}
              path={Item.path}
              element={<Item.Component/>}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default SlackPublicRoutes;