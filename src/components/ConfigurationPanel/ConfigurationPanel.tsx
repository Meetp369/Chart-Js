import React from 'react'
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio,
  Slider
} from '@mui/material'
import {
  ExpandMore,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight
} from '@mui/icons-material'
import useChartConfiguration from '../../hooks/useChartConfiguration'
import { chart } from '../../data/chart'
import { chartTypeId } from '../../utils/constants'
import { ConfigurationPanelProps } from './ConfigurationPanel.type'
import { ChartTypeOptions, Series } from '../../utils/common.type'
import styles from '../../pages/appStyles.module.scss'
import SeriesConfigItem from '../SeriesConfigItem/SeriesConfigItem'

const ConfigurationPanel = ({ options, chartContainer, isEdit }: ConfigurationPanelProps): JSX.Element => {
  const {
    onTitleAlignmentChange,
    onTitleFieldChange,
    onChartTypeChange,
    onSwitchChange,
    onAxisFieldChange,
    onAxisTypeChange,
    onSeriesDataChange,
    onLegendHorizontalPositionChange,
    onLegendVerticalPositionChange,
    onLegendLayoutChange,
    onLegendScrollable,
    dataField,
    onDataFieldChange,
    chartOptions,
    radius,
    onChartRadiusChange,
    onToolBoxHorizontalPositionChange,
    onToolboxChange,
    onToolboxFieldChange,
    onUpdateSeriesField,
    onRemoveSeries,
    onAddSeries,
    legendEnabled,
    onLegendToggle
  } = useChartConfiguration(options)

  return (
    <Grid item xs={1} className={styles.chartConfigurationPanel}>
      <Accordion disableGutters={true} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Chart Styles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={styles.chartFlexStyle}>
            <FormControl className={styles.formFieldWidth} size='small'>
              <InputLabel>Chart Type</InputLabel>
              <Select
                value={chartTypeId[chartOptions.series?.[0].type as ChartTypeOptions] ?? ''}
                label="Chart Type"
                onChange={(e) => {
                  chartContainer?.clear()
                  onChartTypeChange(e)
                }}
                required
              >
                {
                  isEdit ? chart.map(item =>
                    chart.filter(e => e.type === chartOptions.series?.[0].type)[0]?.isAxis === item.isAxis &&
                    (<MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)
                  ) : chart.map(item => (<MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>))
                }
              </Select>
            </FormControl>
            {chartTypeId[chartOptions.series?.[0].type as ChartTypeOptions] === 1 &&
              <FormControlLabel
                value="smooth"
                control={
                  <Switch
                    onChange={(e) => onSwitchChange(e)}
                    color="primary"
                    value="smooth"
                    checked={Boolean(chartOptions?.series?.[0]?.smooth)}
                  />
                }
                label="Smooth"
                labelPlacement="end"
              />
            }
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  onChange={(e) => {
                    if (chartTypeId[chartOptions.series?.[0].type as ChartTypeOptions] !== 3) {
                      onSwitchChange(e, 'axis')
                    } else {
                      onSwitchChange(e, 'item')
                    }
                  }}
                  value="tooltip"
                  checked={Boolean(chartOptions?.tooltip?.trigger)}
                />}
              label="Tool Tip"
              labelPlacement="end"
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters={true} sx={{ marginTop: '10px' }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Title</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={styles.chartFlexStyle}>
            <Box className={styles.titleTextBox}>
              <TextField
                label='Chart Title'
                value={chartOptions?.title?.text ?? ''}
                onChange={onTitleFieldChange}
                name='text'
                size='small'
              />
              <TextField
                label="Subtitle"
                value={chartOptions?.title?.subtext ?? ''}
                onChange={onTitleFieldChange}
                name='subtext'
                size='small'
              />
            </Box>
            <Typography>Alignment</Typography>
            <ToggleButtonGroup
              value={chartOptions?.title?.left ?? 'left'}
              exclusive
              size='small'
              onChange={onTitleAlignmentChange}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeft />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenter />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <FormatAlignRight />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </AccordionDetails>
      </Accordion>

      {chart[chartTypeId[chartOptions.series?.[0].type as ChartTypeOptions] - 1]?.isAxis
        ? <>
          <Accordion disableGutters={true} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>xAxis</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className={styles.chartFlexStyle}>
                <FormControl className={styles.formFieldWidth} size='small'>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={chartOptions?.xAxis?.type ?? ''}
                    label="Type"
                    onChange={onAxisTypeChange}
                    name='xAxis'
                    required
                  >
                    {chart?.[3]?.axisType?.map(item => (<MenuItem key={item} value={item}>{item}</MenuItem>))}
                  </Select>
                </FormControl>
                <TextField
                  label='Axis Data'
                  size='small'
                  className={styles.formFieldWidth}
                  value={chartOptions?.xAxis?.data?.join(',') ?? ''}
                  helperText='enter the comma separated data'
                  name='xAxis data'
                  onChange={onAxisFieldChange}
                />
                <TextField
                  label='Axis Label'
                  size='small'
                  placeholder='Name of Axis'
                  className={styles.formFieldWidth}
                  value={chartOptions?.xAxis?.name ?? ''}
                  name='xAxis name'
                  onChange={onAxisFieldChange}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion disableGutters={true} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>yAxis</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className={styles.chartFlexStyle}>
                <FormControl className={styles.formFieldWidth} size='small'>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={chartOptions?.yAxis?.type ?? ''}
                    label="Type"
                    onChange={onAxisTypeChange}
                    name='yAxis'
                    required
                  >
                    {chart?.[3]?.axisType?.map(item => (<MenuItem key={item} value={item}>{item}</MenuItem>))}
                  </Select>
                </FormControl>
                <TextField
                  label='Axis Label'
                  className={styles.formFieldWidth}
                  value={chartOptions?.yAxis?.name ?? ''}
                  placeholder='Name of Axis'
                  name='yAxis name'
                  onChange={onAxisFieldChange}
                  size='small'
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </>
        : <Accordion disableGutters={true} sx={{ marginTop: '10px' }} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Legend</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className={styles.chartFlexStyle}>
              <Typography>Position</Typography>
              <ToggleButtonGroup
                value={chartOptions?.legend?.left ?? 'left'}
                exclusive
                size='small'
                onChange={onLegendHorizontalPositionChange}
                aria-label="text alignment"
              >
                <ToggleButton value="left" aria-label="left aligned">
                  <FormatAlignLeft />
                </ToggleButton>
                <ToggleButton value="center" aria-label="centered">
                  <FormatAlignCenter />
                </ToggleButton>
                <ToggleButton value="right" aria-label="right aligned">
                  <FormatAlignRight />
                </ToggleButton>
              </ToggleButtonGroup>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={chartOptions?.legend?.top ?? 'top'}
                row
                name="radio-buttons-group"
                onChange={onLegendVerticalPositionChange}
              >
                <FormControlLabel value="top" control={<Radio />} label="Top" />
                <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
              </RadioGroup>
              <Typography>Layout</Typography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={chartOptions?.legend?.orient ?? 'vertical'}
                name="radio-buttons-group"
                onChange={onLegendLayoutChange}
              >
                <FormControlLabel value="vertical" control={<Radio />} label="Vertical" />
                <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
              </RadioGroup>
              <FormControlLabel
                value="scroll"
                control={<Switch checked={chartOptions?.legend?.type === 'scroll' ? true : false} value="scroll" onChange={onLegendScrollable} color="primary" />}
                label="scrollable"
                labelPlacement="end"
              />
            </Box>
          </AccordionDetails>
        </Accordion>

      }
      <Accordion disableGutters={true} sx={{ marginTop: '10px' }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Chart Data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={styles.chartFlexStyle}>
            {
              chartTypeId[chartOptions.series?.[0].type as ChartTypeOptions] !== 3
                ? <>
                {/* <TextField
                  label='Values'
                  className={styles.formFieldWidth}
                  helperText="Values to Generate the Graph"
                  name='series data'
                  onChange={onDataFieldChange}
                  onBlur={(e) => { onSeriesDataChange(e, chartOptions.series?.[0].type as string, false) }}
                  value={dataField ?? ''}
                /> */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={legendEnabled}
                      onChange={onLegendToggle}
                      color="primary"
                    />
                  }
                  label="Enable Legend"
                />
                {chartOptions.series?.map((seriesItem: Series, index: number) => (
                  <SeriesConfigItem
                      key={index}
                      index={index}
                      seriesItem={seriesItem}
                      onUpdateSeriesField={onUpdateSeriesField}
                      onRemoveSeries={onRemoveSeries}
                      showDelete={(chartOptions.series ?? []).length > 1}
                    />
                  // <Box
                  //   key={index}
                  //   mb={3}
                  //   p={2}
                  //   sx={{
                  //     border: '1px solid #ccc',
                  //     borderRadius: 2,
                  //     position: 'relative',
                  //     backgroundColor: '#f9f9f9'
                  //   }}
                  // >
                  //   <Typography variant="subtitle1" mb={1}>
                  //     Series {index + 1}
                  //   </Typography>
                  //   <Grid container spacing={2}>
                  //     <Grid item xs={12} sm={6}>
                  //       <TextField
                  //         label="Name"
                  //         name="name"
                  //         size="small"
                  //         fullWidth
                  //         value={seriesItem.name}
                  //         onChange={(e) => onUpdateSeriesField(index, 'name', e.target.value)}
                  //       />
                  //     </Grid>
                  //     <Grid item xs={12} sm={6}>
                  //       <TextField
                  //         label="Data"
                  //         name="data"
                  //         size="small"
                  //         fullWidth
                  //         value={seriesItem.data ? seriesItem.data.join(',') : ''}
                  //         // onChange={(e) =>
                  //         //   onUpdateSeriesField(index, 'data', e.target.value.split(',').map((v) => parseFloat(v.trim())))
                  //         // }
                  //         onBlur={(e) =>
                  //           onUpdateSeriesField(index, 'data', e.target.value.split(',').map((v) => parseFloat(v.trim())))
                  //         }
                  //         helperText="Comma-separated values"
                  //       />
                  //     </Grid>
                  //     <Grid item xs={12} sm={4}>
                  //       <FormControlLabel
                  //         control={
                  //           <Switch
                  //             checked={Boolean(seriesItem.stack)}
                  //             onChange={(e) => onUpdateSeriesField(index, 'stack', e.target.checked ? 'total' : '')}
                  //           />
                  //         }
                  //         label="Stacked"
                  //       />
                  //     </Grid>
                  //     <Grid item xs={12} sm={4}>
                  //       <FormControlLabel
                  //         control={
                  //           <Switch
                  //             checked={Boolean(seriesItem.label?.show)}
                  //             onChange={(e) =>
                  //               onUpdateSeriesField(index, 'label', { show: e.target.checked })
                  //             }
                  //           />
                  //         }
                  //         label="Show Label"
                  //       />
                  //     </Grid>
                  //     <Grid item xs={12} sm={4}>
                  //       <FormControlLabel
                  //         control={
                  //           <Switch
                  //             checked={seriesItem.emphasis?.focus === 'series'}
                  //             onChange={(e) =>
                  //               onUpdateSeriesField(index, 'emphasis', { focus: e.target.checked ? 'series' : undefined })
                  //             }
                  //           />
                  //         }
                  //         label="Focus on Series"
                  //       />
                  //     </Grid>
                  //   </Grid>
                  //   {chartOptions.series ? chartOptions.series.length > 1  && (
                  //     <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                  //       <button
                  //         onClick={() => onRemoveSeries(index)}
                  //         style={{
                  //           backgroundColor: '#e53935',
                  //           color: 'white',
                  //           border: 'none',
                  //           borderRadius: '4px',
                  //           padding: '4px 8px',
                  //           cursor: 'pointer'
                  //         }}
                  //       >
                  //         Delete
                  //       </button>
                  //     </Box>
                  //   ): null}
                  // </Box>
                ))}
                <Box textAlign="right">
                  <button
                    onClick={() => onAddSeries(chartOptions.series?.[0].type as string)}
                    style={{
                      marginTop: '8px',
                      backgroundColor: '#1976d2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 12px',
                      cursor: 'pointer'
                    }}
                  >
                    + Add Series
                  </button>
                </Box>
                </>
                : <>
                  <Typography>Radius</Typography>
                  <Slider
                    aria-label="Radius"
                    valueLabelDisplay="auto"
                    value={radius}
                    defaultValue={50}
                    onChange={(e, val) => { onChartRadiusChange(e, val, chartOptions.series?.[0].type as string) }}
                  />
                  <Typography mb={2}>Data</Typography>
                  <TextField
                    label='Values'
                    className={styles.formFieldWidth}
                    helperText="Values to Generate the Graph"
                    name='series data'
                    multiline
                    minRows={5}
                    maxRows={50}
                    onChange={onDataFieldChange}
                    onBlur={(e) => { onSeriesDataChange(e, chartOptions.series?.[0].type as string, true) }}
                    value={dataField ?? ''}
                  />
                </>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
      {chartTypeId[chartOptions.series?.[0].type as ChartTypeOptions] !== 3 && (
        <Accordion disableGutters sx={{ marginTop: '10px' }} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Toolbox</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className={styles.chartFlexStyle} >
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    onChange={onToolboxChange}
                    checked={Boolean(chartOptions.toolbox?.show)}
                  />
                }
                label="Show Toolbox"
              />
              {chartOptions.toolbox?.show && (
                <>
                  <Box className={styles.chartFlexStyle}>
                    <Typography>Position</Typography>
                    <ToggleButtonGroup
                      value={chartOptions?.toolbox?.left ?? 'right'}
                      exclusive
                      size='small'
                      onChange={onToolBoxHorizontalPositionChange}
                      aria-label="ToolBox alignment"
                    >
                      <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeft />
                      </ToggleButton>
                      <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenter />
                      </ToggleButton>
                      <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRight />
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={chartOptions.toolbox?.top ?? 'middle'}
                      row
                      name="top"
                      onChange={onToolboxFieldChange}
                    >
                      <FormControlLabel value="top" control={<Radio />} label="Top" />
                      <FormControlLabel value="middle" control={<Radio />} label="middle" />
                      <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
                    </RadioGroup>
                    <Typography>Layout</Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={chartOptions.toolbox?.orient ?? 'vertical'}
                      name="orient"
                      onChange={onToolboxFieldChange}
                    >
                      <FormControlLabel value="vertical" control={<Radio />} label="Vertical" />
                      <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
                    </RadioGroup>
                  </Box>
                  <Typography>Toolbox Features</Typography>
                  <FormControlLabel
                    control={<Switch checked={Boolean(chartOptions.toolbox?.feature?.saveAsImage)} onChange={onToolboxFieldChange} name="saveAsImage" />}
                    label="Save As Image"
                  />
                  <FormControlLabel
                    control={<Switch checked={Boolean(chartOptions.toolbox?.feature?.restore)} onChange={onToolboxFieldChange} name="restore" />}
                    label="Restore"
                  />
                  <FormControlLabel
                    control={<Switch checked={Boolean(chartOptions.toolbox?.feature?.dataView)} onChange={onToolboxFieldChange} name="dataView" />}
                    label="Data View"
                  />
                  <FormControlLabel
                    control={<Switch checked={Boolean(chartOptions.toolbox?.feature?.magicType)} onChange={onToolboxFieldChange} name="magicType" />}
                    label="Magic Type (Convert to Line, Bar, Stack)"
                  />
                </>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Grid>
  )
}
export default ConfigurationPanel
