import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react({
      // Use automatic JSX runtime for React 19
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      // Add React 19 compatibility fixes
      babel: {
        plugins: [
          // Ensure React is properly imported
          ['@babel/plugin-transform-react-jsx', {
            runtime: 'automatic',
            importSource: 'react'
          }]
        ]
      },
      // Add React 19 compatibility fixes
      include: ['**/*.{js,jsx,ts,tsx}']
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    cssCodeSplit: true,
    commonjsOptions: {
      include: [/node_modules/]
    },
    // Add React 19 compatibility fixes for Vercel
    rollupOptions: {
      external: [],
      output: {
        // Ensure proper chunking for React 19
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // Keep all React-related packages together
            if (id.includes('react') || id.includes('react-dom') || id.includes('react/jsx-runtime') || id.includes('react-is')) {
              return 'react-vendor'
            }
            if (id.includes('@tanstack')) {
              return 'tanstack-vendor'
            }
            if (id.includes('@radix-ui')) {
              return 'radix-vendor'
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            if (id.includes('recharts')) {
              return 'charts-vendor'
            }
            return 'vendor'
          }
          
          // Feature chunks
          if (id.includes('/features/')) {
            const feature = id.split('/features/')[1]?.split('/')[0]
            if (feature) {
              return `feature-${feature}`
            }
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            if (facadeModuleId.includes('/features/')) {
              return `features/[name]-[hash].js`
            }
          }
          return 'assets/[name]-[hash].js'
        }
      },
    },
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false
    }
  },
  preview: {
    port: 3000,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@tanstack/react-router',
      '@tanstack/react-query',
      'lucide-react',
      'framer-motion',
      'recharts'
    ],
    exclude: ['@tanstack/react-router-devtools']
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'global': 'globalThis'
  }
})
