import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export default function ScreenerPage() {
    return (
        <div className="p-6">
            <div className="text-center py-12">
                <h1 className="text-3xl font-bold mb-4">Market Screener</h1>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Advanced filtering and screening tools coming soon. Filter cryptocurrencies
                    by price action, volume, technical indicators, and more.
                </p>

                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Coming Soon</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="text-sm space-y-2 text-left">
                            <li>• Price and volume filters</li>
                            <li>• Technical indicator screening</li>
                            <li>• Custom filter combinations</li>
                            <li>• Real-time results</li>
                            <li>• Export capabilities</li>
                        </ul>
                        <Button className="w-full" disabled>
                            Coming Soon
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}