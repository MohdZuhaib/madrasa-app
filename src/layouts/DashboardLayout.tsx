import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Navigation } from '../components/Navigation'

const DashboardLayout = () => {
    return (
        <div>
            <Header />
            <div className="px-4 ">
                <Outlet />
            </div>
            <Navigation />
        </div>
    )
}

export default DashboardLayout