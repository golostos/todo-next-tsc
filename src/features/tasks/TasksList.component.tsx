import { useAppDispatch, useAppSelector } from "../../hooks"
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
// import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, fetchTasks } from "./tasksSlice";
import { useEffect } from "react";

export const TasksList: React.FC = () => {
    const tasks = useAppSelector(state => state.tasks.tasks)
    const dispatch = useAppDispatch()
    const tasksStatus = useAppSelector(state => state.tasks.status)
    // debugger
    useEffect(() => {
      if (tasksStatus === 'idle') {
        // debugger
        dispatch(fetchTasks())
      }
    }, [])

    return (
    <List sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
    {tasks.map((task) => {
        const labelId = `checkbox-list-label-${task.id}`;

        return (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" 
                onClick={() => {
                    dispatch(deleteTask(task.id!))
                }}>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>              
              <ListItemText id={labelId} primary={task.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    )
}




// export default function CheckboxList() {

//   return (
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       {[0, 1, 2, 3].map((value) => {
//         const labelId = `checkbox-list-label-${value}`;

//         return (
//           <ListItem
//             key={value}
//             secondaryAction={
//               <IconButton edge="end" aria-label="comments">
//                 <DeleteIcon />
//               </IconButton>
//             }
//             disablePadding
//           >
//             <ListItemButton role={undefined} dense>
              
//               <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
//             </ListItemButton>
//           </ListItem>
//         );
//       })}
//     </List>
//   );
// }