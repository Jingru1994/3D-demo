import { useRef, useEffect } from 'react'
import './App.css'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as Cesium from 'cesium'

function App() {
  const mapRef = useRef(null)

  let viewer: any = null
  useEffect(() => {
    if (!viewer) {
      console.log(import.meta.env.VITE_CESIUM_BASE_URL)
      ;(window as any).CESIUM_BASE_URL = import.meta.env.VITE_CESIUM_BASE_URL
      const imageryProvider = Cesium.TileMapServiceImageryProvider.fromUrl(
        import.meta.env.VITE_CESIUM_BASE_URL + 'Assets/Textures/NaturalEarthII',
      )
      imageryProvider.then((provider) => {
        const imageryLayer = new Cesium.ImageryLayer(provider)
        viewer = new Cesium.Viewer('map', {
          baseLayer: imageryLayer,
        })
        mapRef.current = viewer
      })
    }
  })

  return (
    <>
      <div id="map" ref={mapRef}></div>
    </>
  )
}

export default App
