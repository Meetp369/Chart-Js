import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControlLabel, Switch, Typography } from '@mui/material'
import { SeriesConfigItemProps } from '../ConfigurationPanel/ConfigurationPanel.type'

const SeriesConfigItem: React.FC<SeriesConfigItemProps> = ({ index, seriesItem, onUpdateSeriesField, onRemoveSeries, showDelete }) => {
  const [tempData, setTempData] = useState((seriesItem.data ?? []).join(','))

  useEffect(() => {
    setTempData((seriesItem.data ?? []).join(','))
  }, [seriesItem.data])

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 12, borderRadius: 8 }}>
      <Typography variant="subtitle1">Series {index + 1}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            size="small"
            fullWidth
            value={seriesItem.name}
            onChange={(e) => onUpdateSeriesField(index, 'name', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Data"
            size="small"
            fullWidth
            value={tempData}
            onChange={(e) => setTempData(e.target.value)}
            onBlur={() => {
              const parsed = tempData
                .split(',')
                .map((v) => parseFloat(v.trim()))
                .filter((n) => !isNaN(n))
              onUpdateSeriesField(index, 'data', parsed)
            }}
            helperText="Comma-separated values"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(seriesItem.stack)}
                onChange={(e) => onUpdateSeriesField(index, 'stack', e.target.checked ? 'total' : '')}
              />
            }
            label="Stacked"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(seriesItem.label?.show)}
                onChange={(e) =>
                  onUpdateSeriesField(index, 'label', { show: e.target.checked })
                }
              />
            }
            label="Show Label"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Switch
                checked={seriesItem.emphasis?.focus === 'series'}
                onChange={(e) =>
                  onUpdateSeriesField(index, 'emphasis', { focus: e.target.checked ? 'series' : undefined })
                }
              />
            }
            label="Focus on Series"
          />
        </Grid>
        {showDelete && (
          <Grid item xs={12}>
            <button
              onClick={() => onRemoveSeries(index)}
              style={{
                backgroundColor: '#e53935',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default SeriesConfigItem
