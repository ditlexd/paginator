import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  originalList: any[];
  setVisibleList: Dispatch<SetStateAction<any[]>>;
  itemsPerPage: number;
};

const DEFAULT_VISIBLE_BUTTONS = 5;

export default function Paginator({
  originalList,
  setVisibleList,
  itemsPerPage,
}: Props) {
  const numberOfPages = Math.ceil(originalList.length / itemsPerPage);
  const initialNumberOfButtons = Math.min(
    numberOfPages,
    DEFAULT_VISIBLE_BUTTONS
  );
  const [pageNo, setPageNo] = useState(0);
  const [visibleButtons, setVisibleButtons] = useState(initialNumberOfButtons);

  useEffect(() => {
    setVisibleList(originalList.slice(pageNo, itemsPerPage));
  }, []);

  function updateVisibleList(pageNo: number) {
    setPageNo(pageNo);
    setVisibleList(
      originalList.slice(pageNo * itemsPerPage, (pageNo + 1) * itemsPerPage)
    );
  }

  function toggleAllButtonsVisible() {
    visibleButtons > DEFAULT_VISIBLE_BUTTONS
      ? setVisibleButtons(DEFAULT_VISIBLE_BUTTONS)
      : setVisibleButtons(Math.ceil(originalList.length / itemsPerPage));
  }

  return (
    <nav className={"flex gap-3 w-full justify-center py-20 px-10"}>
      <button
        disabled={pageNo === 0}
        className={"border-black border p-2 disabled:border-gray-200"}
        onClick={() => updateVisibleList(pageNo - 1)}
      >
        Back
      </button>
      <div className={"flex gap-3 flex-wrap"}>
        {Array(visibleButtons)
          .fill(1)
          .map((_, i) => (
            <button
              key={i}
              onClick={() => updateVisibleList(i)}
              className={
                "px-4 border-b border-gray-500 gap-3 shadow shadow-2xl"
              }
            >
              {i + 1}
            </button>
          ))}
        {Math.ceil(originalList.length / itemsPerPage) >
          DEFAULT_VISIBLE_BUTTONS && (
          <button
            onClick={toggleAllButtonsVisible}
            className={"px-4 border-b border-gray-800 gap-3 shadow shadow-2xl"}
          >
            {visibleButtons > DEFAULT_VISIBLE_BUTTONS ? "<-" : "  ..."}
          </button>
        )}
      </div>
      <button
        disabled={(pageNo + 1) * itemsPerPage >= originalList.length}
        className={"border-black border p-2 disabled:border-gray-200"}
        onClick={() => updateVisibleList(pageNo + 1)}
      >
        Next
      </button>
    </nav>
  );
}
