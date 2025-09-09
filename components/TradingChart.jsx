'use client'

import { useEffect, useRef, useState } from 'react'
import { createChart, ColorType } from 'lightweight-charts'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select'
import { Button } from '../components/ui/Button'

export default function TradingChart({ klineData, symbol }) {
    const chartContainerRef = useRef()
    const chart = useRef()
    const candlestickSeries = useRef()
    const volumeSeries = useRef()
    const [timeframe, setTimeframe] = useState('1m')

    useEffect(() => {
        if (!chartContainerRef.current) return

        // Create chart
        chart.current = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#d1d5db',
            },
            grid: {
                vertLines: { color: '#374151' },
                horzLines: { color: '#374151' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        })

        // Add candlestick series
        candlestickSeries.current = chart.current.addCandlestickSeries({
            upColor: '#10b981',
            downColor: '#ef4444',
            borderDownColor: '#ef4444',
            borderUpColor: '#10b981',
            wickDownColor: '#ef4444',
            wickUpColor: '#10b981',
        })

        // Add volume series
        volumeSeries.current = chart.current.addHistogramSeries({
            color: '#374151',
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: '',
        })

        volumeSeries.current.priceScale().applyOptions({
            scaleMargins: {
                top: 0.8,
                bottom: 0,
            },
        })

        // Handle resize
        const handleResize = () => {
            if (chart.current && chartContainerRef.current) {
                chart.current.applyOptions({
                    width: chartContainerRef.current.clientWidth
                })
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (chart.current) {
                chart.current.remove()
            }
        }
    }, [])

    useEffect(() => {
        if (candlestickSeries.current && volumeSeries.current && klineData.length > 0) {
            const candleData = klineData.map(candle => ({
                time: candle.time / 1000,
                open: candle.open,
                high: candle.high,
                low: candle.low,
                close: candle.close,
            }))

            const volumeData = klineData.map(candle => ({
                time: candle.time / 1000,
                value: candle.volume,
                color: candle.close >= candle.open ? '#10b98180' : '#ef444480',
            }))

            candlestickSeries.current.setData(candleData)
            volumeSeries.current.setData(volumeData)
        }
    }, [klineData])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{symbol.toUpperCase()} Chart</CardTitle>
                <div className="flex items-center gap-2">
                    <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1m">1m</SelectItem>
                            <SelectItem value="5m">5m</SelectItem>
                            <SelectItem value="15m">15m</SelectItem>
                            <SelectItem value="1h">1h</SelectItem>
                            <SelectItem value="4h">4h</SelectItem>
                            <SelectItem value="1d">1d</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div ref={chartContainerRef} className="w-full h-96" />
            </CardContent>
        </Card>
    )
}