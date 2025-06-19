# VesuviaSearch 🚂

**VesuviaSearch** is a modern web application that simplifies train schedule searches for the Circumvesuviana railway line between Naples and Sorrento. Built with Next.js 15 and TypeScript, it provides a fast, responsive, and multilingual experience for travelers.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-white)](https://www.prisma.io/)

## 🌟 Features

- 🔍 **Fast Search**: Quick train schedule lookup between Circumvesuviana stations
- � **Multilingual**: Support for Italian, English, Spanish, Portuguese, French, and German
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- 🚂 **Smart Filtering**: Filter by Campania Express trains and departure times
- ⏱️ **Real-time Schedules**: Up-to-date train timing information
- 🎯 **Station Autocomplete**: Intelligent station search with code and name matching
- 📊 **Detailed Results**: Complete journey information with intermediate stops

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS with custom components
- **Database**: SQLite with Prisma ORM
- **State Management**: TanStack Query for server state
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Deployment**: Vercel (production ready)

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
const response = await fetch('/api/search?from=napoli&to=sorrento&time=14:30');
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
