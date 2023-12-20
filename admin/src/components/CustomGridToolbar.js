import React from 'react'

import PropTypes from 'prop-types'
import { Button, Grid } from '@mui/material'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'

function CustomGridToolbar({ addNew }) {
  return (
    <GridToolbarContainer>
      {/* Search Textfield here */}
      <Grid container item xs justifyContent="flex-start">
        <GridToolbarQuickFilter />
      </Grid>

      <Grid container item xs justifyContent="flex-end">
        {/* default buttons */}
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        {addNew !== null && (
          <Button
            variant="text"
            size="small"
            startIcon={<AddIcon />}
            onClick={(event) => {
              addNew && addNew()
            }}
          >
            Thêm
          </Button>
        )}
        <GridToolbarExport />
      </Grid>
    </GridToolbarContainer>
  )
}

CustomGridToolbar.propTypes = {
  addNew: PropTypes.func || null,
}

export default CustomGridToolbar
