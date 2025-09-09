// components/ui/button.jsx

// components/ui/card.jsx

// components/ui/switch.jsx

// components/ui/select.jsx

// hooks/useBinanceWebSocket.js

// components/TradingChart.jsx

// components/TechnicalIndicators.jsx

// components/Watchlist.jsx

// components/Sidebar.jsx

// components/Header.jsx

// components/Footer.jsx

// app/layout.jsx

// app/page.jsx

// app/dashboard/layout.jsx

// app/dashboard/page.jsx

// app/watchlist/page.jsx

// app/screener/page.jsx

// app/backtest/page.jsx

// next.config.js

// README.md

# Trading Analysis Platform

A professional-grade cryptocurrency trading analysis platform built with Next.js, featuring real-time market data, advanced charting, and technical indicators.

## Features

### Current (MVP)

- **Real-time Market Data**: Live price feeds via Binance WebSocket API
- **Advanced Charts**: Interactive candlestick charts with volume
- **Technical Indicators**: SMA, RSI, MACD with real-time calculations
- **Watchlist**: Track multiple cryptocurrency pairs
- **Responsive Design**: Dark/light mode with modern UI
- **Professional Layout**: Dashboard with sidebar navigation

### Coming Soon

- **Market Screener**: Advanced filtering and discovery tools
- **Strategy Backtesting**: Historical performance testing
- **User Authentication**: Personalized watchlists and settings
- **Premium Features**: Advanced indicators and alerts
- **Database Integration**: TimescaleDB for historical data storage

## Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **UI Components**: shadcn/ui, Radix UI primitives
- **Charts**: Lightweight Charts (TradingView), Recharts
- **Data**: Binance WebSocket API for live market data
- **Styling**: Tailwind CSS with CSS variables for theming
- **Icons**: Lucide React

## Project Structure

```
/
├── app/                    # Next.js 13+ app directory
│   ├── dashboard/         # Main trading dashboard
│   ├── watchlist/         # Watchlist management
│   ├── screener/          # Market screener (placeholder)
│   ├── backtest/          # Strategy backtesting (placeholder)
│   └── page.jsx           # Landing page
├── components/            # Reusable UI components
│   ├── ui/                # shadcn/ui base components
│   ├── TradingChart.jsx   # Advanced candlestick chart
│   ├── TechnicalIndicators.jsx  # Indicator calculations & display
│   ├── Watchlist.jsx      # Symbol tracking component
│   └── ...                # Layout components
├── hooks/                 # Custom React hooks
│   └── useBinanceWebSocket.js  # WebSocket data management
└── lib/                   # Utilities and configurations
    └── utils.js           # Class name utilities
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd trading-analysis-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## API Integration

The platform uses Binance's public WebSocket API for real-time data:

- **Kline/Candlestick Data**: `wss://stream.binance.com:9443/ws/{symbol}@kline_1m`
- **24hr Ticker Data**: `wss://stream.binance.com:9443/ws/{symbol}@ticker`

No API keys required for public market data.

## Technical Indicators

### Currently Implemented

- **SMA (Simple Moving Average)**: 20-period default
- **RSI (Relative Strength Index)**: 14-period default
- **MACD**: 12/26/9 configuration with signal line

### Calculation Features

- Real-time updates with new candle data
- Configurable periods and parameters
- Efficient sliding window calculations
- Visual representation with Recharts

## Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
```

### Docker

```bash
# Build container
docker build -t trading-platform .

# Run container
docker run -p 3000:3000 trading-platform
```

## Future Enhancements

### Database Layer (Planned)

- TimescaleDB for OHLCV historical data
- User preferences and watchlist persistence
- Strategy backtest result storage

### Authentication System (Planned)

- NextAuth.js
