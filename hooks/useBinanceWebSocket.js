import { useState, useEffect, useRef } from "react";

export const useBinanceWebSocket = (symbol = "btcusdt") => {
    const [klineData, setKlineData] = useState([]);
    const [tickerData, setTickerData] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const wsRef = useRef(null);
    const reconnectRef = useRef(null);

    useEffect(() => {
        const streams = [`${symbol}@kline_1m`, `${symbol}@ticker`];
        const url = `wss://stream.binance.com:9443/stream?streams=${streams.join(
            "/"
        )}`;

        let reconnectAttempts = 0;

        const connect = () => {
            console.log("🔌 Connecting to:", url);
            try {
                wsRef.current = new WebSocket(url);
            } catch (err) {
                console.error("❌ Failed to create WebSocket:", err);
                return;
            }

            wsRef.current.onopen = () => {
                console.log("✅ Binance WebSocket connected");
                setIsConnected(true);
                reconnectAttempts = 0;
            };

            wsRef.current.onmessage = (event) => {
                const payload = JSON.parse(event.data);

                if (payload?.stream?.includes("kline")) {
                    const k = payload.data.k;
                    const newCandle = {
                        time: k.t,
                        open: parseFloat(k.o),
                        high: parseFloat(k.h),
                        low: parseFloat(k.l),
                        close: parseFloat(k.c),
                        volume: parseFloat(k.v),
                    };

                    setKlineData((prev) => {
                        const updated = [...prev];
                        const idx = updated.findIndex((c) => c.time === newCandle.time);
                        if (idx >= 0) updated[idx] = newCandle;
                        else {
                            updated.push(newCandle);
                            if (updated.length > 100) updated.shift();
                        }
                        return updated;
                    });
                }

                if (payload?.stream?.includes("ticker")) {
                    const d = payload.data;
                    setTickerData({
                        symbol: d.s,
                        price: parseFloat(d.c),
                        priceChange: parseFloat(d.P),
                        volume: parseFloat(d.v),
                        high: parseFloat(d.h),
                        low: parseFloat(d.l),
                    });
                }
            };

            wsRef.current.onerror = (event) => {
                console.error("⚠️ WebSocket error:", event);
            };

            wsRef.current.onclose = (event) => {
                setIsConnected(false);
                console.warn(
                    `❌ WebSocket closed: Code=${event.code}, Reason=${event.reason || "No reason"
                    }`
                );

                // Reconnect with backoff
                if (event.code !== 1000) {
                    const timeout = Math.min(10000, 1000 * 2 ** reconnectAttempts);
                    reconnectAttempts++;
                    console.log(`🔄 Reconnecting in ${timeout / 1000}s...`);
                    reconnectRef.current = setTimeout(connect, timeout);
                }
            };
        };

        connect();

        return () => {
            clearTimeout(reconnectRef.current);
            wsRef.current?.close(1000, "Component unmounted");
        };
    }, [symbol]);

    return { klineData, tickerData, isConnected };
};
