'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { TrendingUp, TrendingDown, Plus, X } from 'lucide-react'

const DEFAULT_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'SOLUSDT', 'DOTUSDT', 'LINKUSDT', 'LTCUSDT']

export default function WatchlistPage() {
    const [watchlistData, setWatchlistData] = useState({})
    const [symbols, setSymbols] = useState(DEFAULT_SYMBOLS)
    const [newSymbol, setNewSymbol] = useState('')

    useEffect(() => {
        if (symbols.length === 0) return

        const connectWebSocket = () => {
            const streams = symbols.map(symbol => `${symbol.toLowerCase()}@ticker`).join('/')
            const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`)

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.stream && data.data) {
                    const ticker = data.data
                    setWatchlistData(prev => ({
                        ...prev,
                        [ticker.s]: {
                            symbol: ticker.s,
                            price: parseFloat(ticker.c),
                            priceChange: parseFloat(ticker.P),
                            volume: parseFloat(ticker.v),
                            high: parseFloat(ticker.h),
                            low: parseFloat(ticker.l)
                        }
                    }))
                }
            }

            return () => ws.close()
        }

        const cleanup = connectWebSocket()
        return cleanup
    }, [symbols])

    const addSymbol = () => {
        if (newSymbol && !symbols.includes(newSymbol.toUpperCase())) {
            setSymbols([...symbols, newSymbol.toUpperCase()])
            setNewSymbol('')
        }
    }

    const removeSymbol = (symbol) => {
        setSymbols(symbols.filter(s => s !== symbol))
        setWatchlistData(prev => {
            const updated = { ...prev }
            delete updated[symbol]
            return updated
        })
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Watchlist</h1>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Add symbol (e.g., DOGEUSDT)"
                        value={newSymbol}
                        onChange={(e) => setNewSymbol(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSymbol()}
                        className="w-48"
                    />
                    <Button onClick={addSymbol}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {symbols.map(symbol => {
                    const data = watchlistData[symbol]

                    return (
                        <Card key={symbol}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg">{symbol}</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSymbol(symbol)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {data ? (
                                    <div className="space-y-2">
                                        <div className="text-2xl font-bold font-mono">
                                            ${data.price.toLocaleString()}
                                        </div>
                                        <div className={`flex items-center gap-2 ${data.priceChange >= 0 ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            {data.priceChange >= 0 ?
                                                <TrendingUp className="w-4 h-4" /> :
                                                <TrendingDown className="w-4 h-4" />
                                            }
                                            <span className="font-medium">
                                                {data.priceChange.toFixed(2)}%
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                            <div>
                                                <div>High</div>
                                                <div className="font-mono">${data.high.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <div>Low</div>
                                                <div className="font-mono">${data.low.toLocaleString()}</div>
                                            </div>
                                            <div className="col-span-2">
                                                <div>Volume</div>
                                                <div className="font-mono">{(data.volume / 1000000).toFixed(2)}M</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-muted-foreground">Loading...</div>
                                )}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}