import React, { useContext } from "react";
import ElementEval from "./ElementEval";
import Context from "../Context";
import { UseGroupFromParamId } from "../Hooks/useGroupFromParamId";

export default function GroupEval() {
  const { skaters } = useContext(Context);
  const group = UseGroupFromParamId();
  const groupSkaters = skaters.filter((skater) =>
    group.skaters.includes(skater.id)
  );

  return <ElementEval skaters={groupSkaters} />;
}
