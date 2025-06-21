# PWA Installation Guide

VesuviaSearch is now a Progressive Web App (PWA) that can be installed on your device for a native app-like experience.

## Features

- **Offline Support**: Basic caching for previously visited pages
- **Install Prompt**: Install the app directly from your browser
- **Native Feel**: App behaves like a native mobile or desktop app
- **Fast Loading**: Optimized performance with service worker caching
- **Cross-Platform**: Works on mobile, tablet, and desktop devices

## How to Install

### Mobile Devices (iOS/Android)

1. **Open VesuviaSearch** in your mobile browser (Safari on iOS, Chrome on Android)
2. **Look for the Install Button** in the top navigation bar
3. **Tap "Install App"** when it appears
4. **Follow the prompts** to add the app to your home screen

#### Alternative method:
- **iOS Safari**: Tap the share button → "Add to Home Screen"
- **Android Chrome**: Tap the menu (3 dots) → "Add to Home screen"

### Desktop (Chrome, Edge, Safari)

1. **Visit VesuviaSearch** in your desktop browser
2. **Click the Install Button** in the navigation bar, or
3. **Look for the install icon** in the address bar
4. **Click "Install"** to add the app to your system

## App Benefits

### ✅ Offline Access
- Previously searched routes remain accessible
- Basic functionality works without internet
- Automatic sync when connection is restored

### ✅ Native Performance
- Faster loading times
- Smooth animations
- Optimized for mobile and desktop

### ✅ Enhanced User Experience
- Full-screen mode without browser UI
- Push notifications (future feature)
- Native app integration

## Technical Details

### Manifest Configuration
- **App Name**: VesuviaSearch
- **Theme Color**: Red (#dc2626)
- **Display Mode**: Standalone
- **Orientation**: Portrait (mobile)

### Service Worker Features
- Static asset caching
- API response caching
- Background sync capabilities
- Update notifications

### Icon Sizes
The app includes icons for all device types:
- 72×72, 96×96, 128×128, 144×144
- 152×152, 192×192, 384×384, 512×512

## Browser Support

| Browser | Installation | Offline | Notifications |
|---------|-------------|---------|---------------|
| Chrome (Android) | ✅ | ✅ | ✅ |
| Safari (iOS) | ✅ | ✅ | ⚠️ |
| Chrome (Desktop) | ✅ | ✅ | ✅ |
| Edge (Desktop) | ✅ | ✅ | ✅ |
| Firefox | ⚠️ | ✅ | ✅ |

## Troubleshooting

### Install Button Not Showing?
- Make sure you're using a supported browser
- The site must be served over HTTPS
- Try refreshing the page
- Clear browser cache and try again

### App Not Working Offline?
- Visit pages while online first (to cache them)
- Check if your browser supports service workers
- Some features require internet connection

### Unable to Install?
- Ensure your browser supports PWA installation
- Try using Chrome or Edge for best compatibility
- Check if device storage has enough space

## Development

For developers working on the PWA features:

```bash
# Generate PWA icons
npm run generate-icons

# Build with PWA features
npm run pwa:build

# Test service worker locally
npm run dev
# Then visit http://localhost:3000 and check DevTools > Application > Service Workers
```

## Future Enhancements

Planned PWA features:
- Push notifications for train delays
- Enhanced offline capabilities
- Background sync for real-time data
- App shortcuts for quick searches
- Share target integration

---

*For technical support or PWA-related issues, please open an issue on our GitHub repository.*
