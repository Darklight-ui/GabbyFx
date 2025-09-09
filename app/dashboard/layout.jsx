import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 min-h-[calc(100vh-4rem)]">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    )
}