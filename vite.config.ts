import { UserConfig, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { createHtmlPlugin } from 'vite-plugin-html'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig((context: any): UserConfig => {
  const mode = context.mode
  const isProd = mode === 'prod'
  const base = './'
  const envDir = 'env'
  const server = {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  }
  const plugins = [
    react(),
    viteExternalsPlugin(
      {
        cesium: 'Cesium',
      },
      {
        disableInServe: true,
      },
    ),
    createHtmlPlugin({
      inject: {
        data: {
          injectScript: `<script src='libs/cesium/Cesium.js'></script>`,
        },
      },
    }),
  ]
  if (isProd) {
    plugins.push(
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/cesium/Build/Cesium/Cesium.js',
            dest: 'libs/Cesium/',
          },
          {
            src: 'node_modules/cesium/Build/Cesium/Assets/',
            dest: 'libs/Cesium/',
          },
          {
            src: 'node_modules/cesium/Build/Cesium/ThirdParty/',
            dest: 'libs/Cesium/',
          },
          {
            src: 'node_modules/cesium/Build/Cesium/Workers/',
            dest: 'libs/Cesium/',
          },
          {
            src: 'node_modules/cesium/Build/Cesium/Widgets/',
            dest: 'libs/Cesium/',
          },
        ],
      }),
    )
  }
  return {
    base,
    envDir,
    plugins,
    server,
  }
})
// export default defineConfig({
//   base: './',
//   envDir: resolve(__dirname, './env'),
//   plugins: [
//     react(),
//     viteExternalsPlugin(
//       {
//         cesium: 'Cesium',
//       },
//       {
//         disableInServe: true,
//       },
//     ),
//     viteStaticCopy({
//       targets: [
//         {
//           src: 'node_modules/cesium/Build/Cesium/Cesium.js',
//           dest: 'libs/Cesium/',
//         },
//         {
//           src: 'node_modules/cesium/Build/Cesium/Assets/',
//           dest: 'libs/Cesium/Assets/',
//         },
//         {
//           src: 'node_modules/cesium/Build/Cesium/ThirdParty/',
//           dest: 'libs/Cesium/ThirdParty/',
//         },
//         {
//           src: 'node_modules/cesium/Build/Cesium/Workers/',
//           dest: 'libs/Cesium/Workers/',
//         },
//         {
//           src: 'node_modules/cesium/Build/Cesium/Widgets/',
//           dest: 'libs/Cesium/Widgets/',
//         },
//       ],
//     }),
//     createHtmlPlugin({
//       inject: {
//         data: { injectScript: `<script src='libs/cesium/Cesium.js'></script>` },
//       },
//     }),
//   ],
//   server: {
//     host: '0.0.0.0',
//     port: 3000,
//     open: true,
//   },
// })
