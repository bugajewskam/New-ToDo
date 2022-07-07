import React, { forwardRef } from "react";
import { Divider } from "@mui/material";
import ItemList from "./ListItem";

export const MyListItem = forwardRef(
  ({ item, listeners, style, attributes, ...props }: any, ref) => {
    return (
      <div
        ref={ref}
        {...attributes}
        style={style}
        id={item.id}
        key={item.id}
        className="sortableListItem"
      >
        <ItemList item={item} {...props} listeners={listeners} />
      </div>
    );
  }
);

export default MyListItem;
