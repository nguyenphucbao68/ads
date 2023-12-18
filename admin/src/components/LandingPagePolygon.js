import React, { useState, useRef, useCallback } from 'react'
import { EditingMode, DrawPolygonMode, Editor } from 'react-map-gl-draw'
import ReactMapGL from '@goongmaps/goong-map-react'
import ControlPanel from '../../components/ControlPanel/ControlPanel'
import { RENDER_STATE } from 'react-map-gl-draw'

const API_MAP_KEY = process.env.REACT_APP_ADS_MANAGEMENT_MAP_API_KEY

export function getEditHandleStyle({ feature, state }) {
  switch (state) {
    case RENDER_STATE.SELECTED:
    case RENDER_STATE.HOVERED:
    case RENDER_STATE.UNCOMMITTED:
      return {
        fill: 'rgb(251, 176, 59)',
        fillOpacity: 1,
        stroke: 'rgb(255, 255, 255)',
        strokeWidth: 2,
        r: 7,
      }

    default:
      return {
        fill: 'rgb(251, 176, 59)',
        fillOpacity: 1,
        stroke: 'rgb(255, 255, 255)',
        strokeWidth: 2,
        r: 5,
      }
  }
}

export function getFeatureStyle({ feature, index, state }) {
  switch (state) {
    case RENDER_STATE.SELECTED:
    case RENDER_STATE.HOVERED:
    case RENDER_STATE.UNCOMMITTED:
    case RENDER_STATE.CLOSING:
      return {
        stroke: 'rgb(251, 176, 59)',
        strokeWidth: 2,
        fill: 'rgb(251, 176, 59)',
        fillOpacity: 0.3,
        strokeDasharray: '4,2',
      }

    default:
      return {
        stroke: 'rgb(60, 178, 208)',
        strokeWidth: 2,
        fill: 'rgb(60, 178, 208)',
        fillOpacity: 0.1,
      }
  }
}

function LandingPagePolygon() {
  const [viewport, setViewport] = useState({
    longitude: 105.85119,
    latitude: 21.02727,
    zoom: 12,
  })
  const [mode, setMode] = useState(null)
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null)
  const editorRef = useRef(null)

  const onSelect = useCallback((options) => {
    setSelectedFeatureIndex(options && options.selectedFeatureIndex)
  }, [])

  const onDelete = useCallback(() => {
    if (selectedFeatureIndex !== null && selectedFeatureIndex >= 0) {
      editorRef.current.deleteFeatures(selectedFeatureIndex)
    }
  }, [selectedFeatureIndex])

  const onUpdate = useCallback(({ editType }) => {
    if (editType === 'addFeature') {
      setMode(new EditingMode())
    }
  }, [])

  const drawTools = (
    <div className="mapboxgl-ctrl-top-left">
      <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
        <button
          className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"
          title="Polygon tool (p)"
          onClick={() => setMode(new DrawPolygonMode())}
        />
        <button
          className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
          title="Delete"
          onClick={onDelete}
        />
      </div>
    </div>
  )

  const features = editorRef.current && editorRef.current.getFeatures()
  const selectedFeature =
    features && (features[selectedFeatureIndex] || features[features.length - 1])

  return (
    <>
      <ReactMapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
        goongApiAccessToken={API_MAP_KEY}
        onViewportChange={setViewport}
      >
        <Editor
          ref={editorRef}
          style={{ width: '100%', height: '100%' }}
          clickRadius={12}
          mode={mode}
          onSelect={onSelect}
          onUpdate={onUpdate}
          editHandleShape={'circle'}
          featureStyle={getFeatureStyle}
          editHandleStyle={getEditHandleStyle}
        />
        {drawTools}
      </ReactMapGL>
      <ControlPanel polygon={selectedFeature} />
    </>
  )
}

export default LandingPagePolygon
