"use client";

import { Dispatch, SetState } from "react";
import { PanelRightOpen, PanelLeftOpen } from "lucide-react";

type PageProps = {
  isOutlineOpened: boolean;
  setIsOutlineOpened: Dispatch<SetState<boolean>>;
};

const Navbar = ({ isOutlineOpened, setIsOutlineOpened }: PageProps) => {
  return (
    <div className="w-full flex items-center justify-start">
      <button
        className="bg-secondary text-secondary-foreground p-2 rounded-lg transition-text duration-300 hover:text-primary"
        onClick={() => setIsOutlineOpened(!isOutlineOpened)}
      >
        {isOutlineOpened ? <PanelRightOpen /> : <PanelLeftOpen />}
      </button>
    </div>
  );
};

export default Navbar;
