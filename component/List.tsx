import * as React from "react";
import { ToDo } from "../interface/interface";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import MySortableListItem from "./SortableListItem";
import { List } from "@mui/material";
import { useState } from "react";
import ItemList from "./ListItem";

export interface ListProps {
  listToDo: ToDo[];
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onChange: (e: any) => void;
  onEditSubmit: (id: number, e: any) => void;
  onMoveItems: (id1: number, id2: number) => void;
}

export default function CheckboxList({
  listToDo,
  onRemove,
  onToggle,
  onEdit,
  onChange,
  onEditSubmit,
  onMoveItems,
}: ListProps) {
  const handleMoveItems = (id1: number, id2: number) => onMoveItems(id1, id2);
  const handleToggle = (value: number) => onToggle(value);
  const handleRemove = (id: number) => onRemove(id);
  const handleEdit = (id: number) => onEdit(id);
  const handleChange = (e: any) => onChange(e);
  const handleEditSubmit = (id: number, e: any) => onEditSubmit(id, e);
  if (!listToDo?.length) return null;

  const [activeItem, setActiveItem] = useState<ToDo | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  function handleDragStart(event: any) {
    const { active } = event;
    const activeItem = listToDo.find((item) => item.id === active.id);
    if (activeItem) {
      setActiveItem(activeItem);
    }
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      handleMoveItems(active.id, over.id);
    }

    setActiveItem(null);
  }
  return (
    <div className="list">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <List
          sx={{
            py: 2,
          }}
        >
          <SortableContext
            items={listToDo}
            strategy={verticalListSortingStrategy}
          >
            {listToDo.map((item) => (
              <MySortableListItem
                item={item}
                key={item.id}
                onRemove={handleRemove}
                onEdit={handleEdit}
                onChange={handleChange}
                onToggle={handleToggle}
                onEditSubmit={handleEditSubmit}
              />
            ))}
            <DragOverlay>
              {activeItem ? <ItemList item={activeItem} /> : null}
            </DragOverlay>
          </SortableContext>
        </List>
      </DndContext>
    </div>
  );
}
