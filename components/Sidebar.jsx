'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'
import {
    BarChart3,
    Eye,
    Filter,
    TrendingUp,
    Settings,
    Home
} from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Watchlist', href: '/watchlist', icon: Eye },
    { name: 'Screener', href: '/screener', icon: Filter },
    { name: 'Backtest', href: '/backtest', icon: TrendingUp },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col w-64 bg-card border-r">
            <div className="p-6">
                <h1 className="text-xl font-bold">TradingPro</h1>
            </div>

            <nav className="flex-1 px-4 pb-4">
                <ul className="space-y-2">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    pathname === item.href
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}