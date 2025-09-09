'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { TrendingUp, TrendingDown } from 'lucide-react'

const WATCHLIST_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'SOLUSDT']

export default function Watchlist({ onSymbolSelect, selectedSymbol }) {
    const [watchlistData, setWatchlistData] = useState({})

    useEffect(() => {
        const connectWebSocket = () => {
            const streams = WATCHLIST_SYMBOLS.map(s => `${s.toLowerCase()}@ticker`).join('/')
            const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`)

            ws.onmessage = (event) => {
                const payload = JSON.parse(event.data)
                if (payload?.data) {
                    const ticker = payload.data
                    setWatchlistData(prev => ({
                        ...prev,
                        [ticker.s]: {
                            symbol: ticker.s,
                            price: parseFloat(ticker.c),
                            priceChange: parseFloat(ticker.P),
                            volume: parseFloat(ticker.v),
                        }
                    }))
                }
            }

            ws.onclose = () => {
                console.log("Watchlist WebSocket closed")
            }

            return () => ws.close()
        }

        const cleanup = connectWebSocket()
        return cleanup
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Watchlist</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-1">
                    {WATCHLIST_SYMBOLS.map(symbol => {
                        const data = watchlistData[symbol]
                        const isSelected = selectedSymbol === symbol.toLowerCase()

                        return (
                            <div
                                key={symbol}
                                className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors border-l-2 ${isSelected ? 'border-l-primary bg-muted/30' : 'border-l-transparent'
                                    }`}
                                onClick={() => onSymbolSelect(symbol.toLowerCase())}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">{symbol}</div>
                                        {data && (
                                            <div className="text-sm text-muted-foreground">
                                                Vol: {(data.volume / 1_000_000).toFixed(2)}M
                                            </div>
                                        )}
                                    </div>
                                    {data && (
                                        <div className="text-right">
                                            <div className="font-mono">
                                                ${data.price.toLocaleString()}
                                            </div>
                                            <div
                                                className={`flex items-center gap-1 text-sm ${data.priceChange >= 0 ? 'text-green-500' : 'text-red-500'
                                                    }`}
                                            >
                                                {data.priceChange >= 0 ? (
                                                    <TrendingUp className="w-3 h-3" />
                                                ) : (
                                                    <TrendingDown className="w-3 h-3" />
                                                )}
                                                {data.priceChange.toFixed(2)}%
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
