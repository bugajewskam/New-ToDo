import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MyListItem from "./MyListItem";

export function MySortableListItem({ item, ...props }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <MyListItem
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
      item={item}
      {...props}
    />
  );
}

export default MySortableListItem;
