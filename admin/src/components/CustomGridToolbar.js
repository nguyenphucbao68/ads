import React from 'react'

import PropTypes from 'prop-types'
import { Button, Grid, TextField } from '@mui/material'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'

function CustomGridToolbar({ addNew, searchByKeyword }) {
  return (
    <GridToolbarContainer>
      {/* Search Textfield here */}
      <Grid container item xs justifyContent="flex-start">
        <TextField
          id="outlined-basic"
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          onChange={searchByKeyword}
          sx={{ width: '400px', margin: '5px 0' }}
        />
      </Grid>

      <Grid container item xs justifyContent="flex-end">
        {/* default buttons */}
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
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
        <GridToolbarExport />
      </Grid>
    </GridToolbarContainer>
  )
}

CustomGridToolbar.propTypes = {
  addNew: PropTypes.func,
  searchByKeyword: PropTypes.func,
}

export default CustomGridToolbar
