'use client'

import { useState } from 'react'
import TradingChart from '../../components/TradingChart'
import TechnicalIndicators from '../../components/TechnicalIndicators'
import Watchlist from '../../components/Watchlist'
import { useBinanceWebSocket } from '../../hooks/useBinanceWebSocket'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react'

export default function DashboardPage() {
    const [selectedSymbol, setSelectedSymbol] = useState('btcusdt')
    const { klineData, tickerData, isConnected } = useBinanceWebSocket(selectedSymbol)

    const handleSymbolSelect = (symbol) => {
        setSelectedSymbol(symbol)
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Current Price</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {tickerData ? `${tickerData.price.toLocaleString()}` : '-'}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            {tickerData && tickerData.priceChange >= 0 ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span className="text-sm text-muted-foreground">24h Change</span>
                        </div>
                        <div className={`text-2xl font-bold ${tickerData && tickerData.priceChange >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}>
                            {tickerData ? `${tickerData.priceChange.toFixed(2)}%` : '-'}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">24h Volume</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {tickerData ? `${(tickerData.volume / 1000000).toFixed(2)}M` : '-'}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-sm text-muted-foreground">Connection</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {isConnected ? 'Live' : 'Offline'}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Chart Area */}
                <div className="lg:col-span-3 space-y-6">
                    <TradingChart klineData={klineData} symbol={selectedSymbol} />
                    <TechnicalIndicators klineData={klineData} />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Watchlist
                        onSymbolSelect={handleSymbolSelect}
                        selectedSymbol={selectedSymbol}
                    />
                </div>
            </div>
        </div>
    )
}
