import Link from 'next/link'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BarChart3, TrendingUp, Eye, Filter } from 'lucide-react'

export default function HomePage() {
    const features = [
        {
            icon: BarChart3,
            title: 'Real-time Charts',
            description: 'Advanced candlestick charts with live market data from Binance'
        },
        {
            icon: TrendingUp,
            title: 'Technical Indicators',
            description: 'SMA, RSI, MACD and more technical analysis tools'
        },
        {
            icon: Eye,
            title: 'Watchlist',
            description: 'Track your favorite cryptocurrencies in one place'
        },
        {
            icon: Filter,
            title: 'Market Screener',
            description: 'Filter and discover trading opportunities'
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="container mx-auto px-6 py-24">
                    <div className="text-center space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Professional Trading
                            <span className="text-primary"> Analysis Platform</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Get real-time market data, advanced charts, and technical indicators
                            to make informed trading decisions. Start analyzing the markets today.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button asChild size="lg">
                                <Link href="/dashboard">Start Trading Analysis</Link>
                            </Button>
                            <Button variant="outline" size="lg">
                                View Features
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-6 py-24">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl font-bold">Everything you need to trade</h2>
                        <p className="text-xl text-muted-foreground">
                            Professional-grade tools for cryptocurrency trading analysis
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature) => (
                            <Card key={feature.title}>
                                <CardHeader>
                                    <feature.icon className="w-8 h-8 mb-2 text-primary" />
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-muted/50 py-24">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to start analyzing?</h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of traders using our platform to make better trading decisions
                        </p>
                        <Button asChild size="lg">
                            <Link href="/dashboard">Launch Dashboard</Link>
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}