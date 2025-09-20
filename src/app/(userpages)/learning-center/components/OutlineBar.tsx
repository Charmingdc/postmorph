"use client";

import { Dispatch, SetState } from "react";

type PageProps = {
  isOutlineOpened: boolean;
  setIsOutlineOpened: Dispatch<SetState<boolean>>;
};

const OutlineBar = ({ isOutlineOpened, setIsOutlineOpened }: PageProps) => {
  return (
    isOutlineOpened && (
      <aside className="w-[14rem] h-[63vh] bg-sidebar text-sidebar-foreground border border-sidebar-border rounded-xl mt-2"></aside>
    )
  );
};
export default OutlineBar;
