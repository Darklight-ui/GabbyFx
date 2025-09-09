'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Switch } from '../components/ui/Switch'

export default function Header() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true'
        setIsDark(isDarkMode)
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleDarkMode = () => {
        const newMode = !isDark
        setIsDark(newMode)
        localStorage.setItem('darkMode', newMode.toString())
        if (newMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return (
        <header className="border-b bg-card">
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Trading Analysis Platform</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <Switch checked={isDark} onCheckedChange={toggleDarkMode} />
                        <Moon className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </header>
    )
}