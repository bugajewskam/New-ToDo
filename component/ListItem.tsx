import {
  ListItem,
  Button,
  ListItemIcon,
  Checkbox,
  Box,
  TextField,
  ListItemText,
  IconButton,
} from "@mui/material";
import { ToDo } from "../interface/interface";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import ReorderIcon from "@mui/icons-material/Reorder";
import React, { useRef, useImperativeHandle } from "react";
import { useDrag } from "react-dnd";

interface ItemProps {
  item: ToDo;
  onRemove?: (id: number) => void;
  onToggle?: (id: number) => void;
  onEdit?: (id: number) => void;
  onChange?: (e: any) => void;
  onEditSubmit?: (id: number, e: any) => void;
  listeners?: any;
}

export default function ItemList({
  item,
  onChange,
  onEdit,
  onEditSubmit,
  onRemove,
  onToggle,
  listeners,
}: ItemProps) {
  const handleToggle = (value: number) => () => onToggle && onToggle(value);
  const handleRemove = (id: number) => () => onRemove && onRemove(id);
  const handleEdit = (id: number) => () => onEdit && onEdit(id);
  const handleChange = (e: any) => () => onChange && onChange(e);
  const handleEditSubmit = (id: number) => (e: any) =>
    onEditSubmit && onEditSubmit(id, e);
  if (!item) return null;

  return (
    <>
      <ListItem key={item.id}>
        <Button onClick={handleToggle(item.id)}>
          <ListItemIcon>
            <Checkbox
              icon={
                <Box
                  sx={{
                    borderRadius: "24px",
                    width: 24,
                    height: 24,
                    border: "1px solid gray",
                  }}
                />
              }
              checkedIcon={
                <CheckIcon
                  sx={{
                    borderRadius: "24px",
                    background:
                      "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
                    padding: "4px",
                    color: "#fff",
                  }}
                />
              }
              edge="start"
              checked={item.isDone}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
        </Button>

        {item.isEditing ? (
          <form onSubmit={handleEditSubmit(item.id)}>
            <TextField
              fullWidth
              sx={{ width: "100%", maxWidth: "500px" }}
              defaultValue={item.toDo}
              onChange={handleChange}
              name="toDo"
            />
          </form>
        ) : (
          <>
            <ListItemText
              primary={item.toDo}
              sx={item.isDone ? { textDecoration: "line-through" } : {}}
            />

            <IconButton
              sx={{ width: 24, marginLeft: 3 }}
              onClick={handleEdit(item.id)}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
            </IconButton>
            <IconButton
              sx={{ width: 24, marginLeft: 3, marginRight: 0 }}
              onClick={handleRemove(item.id)}
            >
              <ListItemIcon>
                <ClearIcon />
              </ListItemIcon>
            </IconButton>

            <IconButton
              sx={{ width: 24, marginLeft: 3, marginRight: 0 }}
              {...listeners}
              className={"lockPointerEvents"}
            >
              <ListItemIcon>
                <ReorderIcon />
              </ListItemIcon>
            </IconButton>
          </>
        )}
      </ListItem>
    </>
  );
}
