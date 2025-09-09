export default function Footer() {
    return (
        <footer className="border-t bg-card">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        © 2024 Trading Analysis Platform. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Privacy
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Terms
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Support
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}