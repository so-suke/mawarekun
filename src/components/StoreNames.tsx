import React from "react";
import { TypeStoreName } from "../types";
import { SELECT_STORE_TITLE } from "../constants/main";

export function StoreNames(props: { storeNames: TypeStoreName[] }) {
  const $doms = [
    <option key={"defaultValue"} value="" disabled hidden>
      {SELECT_STORE_TITLE}
    </option>,
  ];
  const $storeNames = props.storeNames.map((store: TypeStoreName) => {
    return (
      <option key={store} value={store}>
        {store}
      </option>
    );
  });

  const $domsConcated = [$doms, ...$storeNames];

  return <>{$domsConcated}</>;
}
