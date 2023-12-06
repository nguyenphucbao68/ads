import React from 'react'

import PropTypes from 'prop-types'
import { Button, Grid } from '@mui/material'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'

function CustomGridToolbar({ addNew }) {
  return (
    <GridToolbarContainer>
      <Grid container item xs>
        {/* default buttons */}
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Grid>

      <Grid>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          //   onClick={(event: MouseEvent<HTMLButtonElement>) => {
          //     setAnchorElMenu(event.currentTarget)
          //   }}
          onClick={(event) => {
            addNew && addNew()
          }}
        >
          Thêm
        </Button>

        {/* <Menu
          id="menu-options"
          anchorEl={anchorElMenu}
          open={openMenu}
          onClose={() => {
            setAnchorElMenu(null)
          }}
        >
          <MenuItem /> //Clipped
          <MenuItem /> //Clipped
          <MenuItem /> //Clipped
        </Menu> */}
      </Grid>
    </GridToolbarContainer>
  )
}

CustomGridToolbar.propTypes = {
  addNew: PropTypes.func,
}

export default CustomGridToolbar
