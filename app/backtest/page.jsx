import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export default function BacktestPage() {
    return (
        <div className="p-6">
            <div className="text-center py-12">
                <h1 className="text-3xl font-bold mb-4">Strategy Backtesting</h1>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Test your trading strategies against historical data. Analyze performance
                    metrics, optimize parameters, and validate your approach before going live.
                </p>

                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Coming Soon</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="text-sm space-y-2 text-left">
                            <li>• Historical data backtesting</li>
                            <li>• Strategy builder interface</li>
                            <li>• Performance analytics</li>
                            <li>• Risk metrics calculation</li>
                            <li>• Portfolio simulation</li>
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