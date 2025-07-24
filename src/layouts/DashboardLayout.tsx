import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Navigation } from '../components/Navigation'

const DashboardLayout = () => {
    return (
        <div className='flex flex-col h-[100dvh]'>
            <Header />
            <div className="px-4 flex flex-1 justify-center">
                <Outlet />
            </div>
            <Navigation />
        </div>
    )
}

export default DashboardLayout