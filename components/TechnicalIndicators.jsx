'use client'

import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

// Technical indicator calculations
const calculateSMA = (data, period = 20) => {
    const result = []
    for (let i = period - 1; i < data.length; i++) {
        const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.close, 0)
        result.push({
            time: data[i].time,
            value: sum / period
        })
    }
    return result
}

const calculateRSI = (data, period = 14) => {
    if (data.length < period + 1) return []

    const gains = []
    const losses = []

    for (let i = 1; i < data.length; i++) {
        const change = data[i].close - data[i - 1].close
        gains.push(change > 0 ? change : 0)
        losses.push(change < 0 ? Math.abs(change) : 0)
    }

    const result = []
    for (let i = period - 1; i < gains.length; i++) {
        const avgGain = gains.slice(i - period + 1, i + 1).reduce((a, b) => a + b) / period
        const avgLoss = losses.slice(i - period + 1, i + 1).reduce((a, b) => a + b) / period

        const rs = avgGain / (avgLoss || 1)
        const rsi = 100 - (100 / (1 + rs))

        result.push({
            time: data[i + 1].time,
            value: rsi
        })
    }
    return result
}

const calculateMACD = (data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) => {
    if (data.length < slowPeriod) return { macd: [], signal: [], histogram: [] }

    const emaFast = calculateEMA(data, fastPeriod)
    const emaSlow = calculateEMA(data, slowPeriod)

    const macdLine = []
    const minLength = Math.min(emaFast.length, emaSlow.length)

    for (let i = 0; i < minLength; i++) {
        macdLine.push({
            time: emaFast[i].time,
            value: emaFast[i].value - emaSlow[i].value
        })
    }

    const signalLine = calculateEMAFromValues(macdLine, signalPeriod)
    const histogram = []

    for (let i = 0; i < Math.min(macdLine.length, signalLine.length); i++) {
        histogram.push({
            time: macdLine[i].time,
            value: macdLine[i].value - signalLine[i].value
        })
    }

    return { macd: macdLine, signal: signalLine, histogram }
}

const calculateEMA = (data, period) => {
    const multiplier = 2 / (period + 1)
    const result = []

    if (data.length === 0) return result

    result.push({ time: data[0].time, value: data[0].close })

    for (let i = 1; i < data.length; i++) {
        const ema = (data[i].close - result[i - 1].value) * multiplier + result[i - 1].value
        result.push({ time: data[i].time, value: ema })
    }

    return result
}

const calculateEMAFromValues = (data, period) => {
    const multiplier = 2 / (period + 1)
    const result = []

    if (data.length === 0) return result

    result.push({ time: data[0].time, value: data[0].value })

    for (let i = 1; i < data.length; i++) {
        const ema = (data[i].value - result[i - 1].value) * multiplier + result[i - 1].value
        result.push({ time: data[i].time, value: ema })
    }

    return result
}

export default function TechnicalIndicators({ klineData }) {
    const indicators = useMemo(() => {
        if (klineData.length < 50) return { sma: [], rsi: [], macd: { macd: [], signal: [], histogram: [] } }

        return {
            sma: calculateSMA(klineData, 20),
            rsi: calculateRSI(klineData, 14),
            macd: calculateMACD(klineData, 12, 26, 9)
        }
    }, [klineData])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* SMA */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">SMA (20)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={indicators.sma}>
                                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* RSI */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">RSI (14)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={indicators.rsi}>
                                <YAxis domain={[0, 100]} />
                                <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* MACD */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">MACD</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={indicators.macd.macd}>
                                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}