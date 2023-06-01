import { Drawer, List, ListItem, ListItemText } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

import React, { useState } from "react"

export default function DrawerComp() {
    const [openDrawer, setOpenDrawer] = useState(false)

    return <>
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    <ListItem>
                        <ListItemText primary="Login" />
                    </ListItem>
                </List>

            </Drawer>

            <IconButton aria-label="Menu" onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>


        </React.Fragment>
    </>
}