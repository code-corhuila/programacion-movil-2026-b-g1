import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.edu.corhuila.w14connect',
  appName: 'Academic Connect',
  webDir: 'dist',
  server: {
    // The demo API runs over plain HTTP on the developer machine (10.0.2.2 from the
    // emulator). Serving the WebView over http avoids mixed-content blocking and
    // `cleartext` allows HTTP traffic. For a production API use HTTPS and remove both.
    androidScheme: 'http',
    cleartext: true,
  },
};

export default config;
