# VesuviaSearch 🚂

**VesuviaSearch** is a modern web application that simplifies train schedule searches for the entire EAV railway network in Campania, Italy. Built with Next.js 15 and TypeScript, it provides a fast, responsive, and multilingual experience with real-time train information and enhanced offline capabilities.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-white)](https://www.prisma.io/)

## 🌟 Features

- 🔍 **Complete Network Coverage**: Train schedule lookup across the entire EAV railway network in Campania
- 🚨 **Real-time Information**: Live train data, delays, and cancellation notifications via official EAV API
- 🌐 **Multilingual**: Support for Italian, English, Spanish, Portuguese, French, and German
- 📱 **Glass Morphism UI**: Beautiful, modern interface with seamless glass effects
- 📲 **Enhanced PWA**: Improved offline support with background syncing and notifications
- 🚂 **Smart Filtering**: Filter by Campania Express trains, departure times, and real-time status
- ⏱️ **Live Departures**: Station departure boards with up-to-date timing information
- 🎯 **Advanced Station Search**: Intelligent station search with code, name, and region matching
- 📊 **Complete Journey Details**: Comprehensive route data with intermediate stops and platform information
- 🔄 **Robust Offline Mode**: Enhanced caching system that works reliably without internet connection
- ⚡ **Optimized Performance**: Service worker caching and data prefetching for instant loading

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript 5
- **API Integration**: Official EAV RESTful API for real-time data
- **Styling**: Tailwind CSS with advanced animations and custom glass morphism effects
- **Database**: SQLite with Prisma ORM for local data persistence
- **State Management**: TanStack Query v5 for efficient server state management
- **UI Components**: Radix UI primitives with custom styling and enhanced accessibility
- **Icons**: Lucide React for consistent iconography
- **PWA Features**: Workbox-powered service worker with advanced caching strategies
- **Deployment**: Vercel Edge Functions for optimal global performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/vesuvia-search.git
   cd vesuvia-search
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration (see [Environment Configuration](#environment-configuration))

4. **Set up the database**

   ```bash
   npm run db:setup
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```text
vesuvia-search/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── api/               # API routes
│   │   ├── components/        # Page-specific components
│   │   └── ...               # Pages and layouts
│   ├── components/            # Reusable UI components
│   │   └── ui/               # Base UI components (shadcn/ui)
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utilities and configurations
├── prisma/                   # Database schema and seeds
├── data/                     # CSV data files
├── scripts/                  # Build and utility scripts
└── public/                   # Static assets
```

## 📱 Progressive Web App (PWA)

VesuviaSearch is a fully-featured Progressive Web App that can be installed on your device for a native app-like experience.

### Installation

#### Mobile Devices
1. Open VesuviaSearch in your mobile browser
2. Look for the **"Install App"** button in the navigation
3. Tap to install and add to your home screen

#### Desktop
1. Visit VesuviaSearch in Chrome, Edge, or Safari
2. Click the **"Install App"** button or look for the install icon in the address bar
3. Follow the prompts to install

### PWA Features

- 📲 **Installable**: Add to home screen on mobile and desktop
- 🔄 **Offline Support**: Previously visited pages work without internet
- ⚡ **Fast Performance**: Service worker caching for instant loading
- 🔔 **Native Integration**: Behaves like a native app when installed
- 🔄 **Auto Updates**: Automatic updates when new versions are available

### Technical Implementation

- **Web App Manifest**: `/public/manifest.json`
- **Service Worker**: `/public/sw.js`
- **Icons**: Multiple sizes in `/public/icons/`
- **Offline Page**: Fallback for uncached pages

For detailed PWA documentation, see [docs/PWA_GUIDE.md](docs/PWA_GUIDE.md).

## 🗄️ Database

This project uses SQLite with Prisma for data management:

### Models

- **Station**: Railway stations with codes and names
- **Train**: Train schedules with direction, timing, and categories
- **TrainStop**: Intermediate stops with arrival/departure times

### Available Scripts

```bash
npm run db:generate     # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed database with initial data
npm run db:reset       # Reset and reseed database
npm run db:setup       # Initial database setup
```

## 🌍 Internationalization

VesuviaSearch supports multiple languages with dynamic switching:

- 🇮🇹 Italian (Italiano)
- 🇬🇧 English
- 🇪🇸 Spanish (Español)
- 🇵🇹 Portuguese (Português)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)

Languages are automatically detected from browser settings and persisted in localStorage.

## 🔧 Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_DATABASE_URL="file:./dev.db"

# Analytics (optional)
VERCEL_ANALYTICS_ID="your-analytics-id"

# Production database (for deployment)
POSTGRES_URL="your-postgres-connection-string"
```

## 📝 API Reference

### Endpoints

- `GET /api/stations` - Retrieve all stations
- `GET /api/search` - Search trains between stations
- `GET /api/departures` - Get departures from a station
- `GET /api/trains` - Get all trains

### Example Usage

```javascript
// Search trains from Naples to Sorrento
const response = await fetch('/api/search?from=napoli-porta-nolana&to=caserta&time=14:30');
const data = await response.json();
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an independent project created to help Circumvesuviana travelers. It is not officially affiliated with EAV (Ente Autonomo Volturno) or any official railway operator.

## 🙏 Acknowledgments

- Train schedule data provided by EAV Circumvesuviana
- UI components based on [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

Made with ❤️ for Circumvesuviana travelers
