import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const handleHome = () => navigate('/')
    return (
        <div className='flex flex-col justify-center items-center p-2 gap-4'>

            <h2 className='font-bold text-xl'>OOps!</h2>
            <p>Page you're looking for is not found</p>
            <button className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition' onClick={handleHome}>Go Home</button>
        </div>
    )
}

export default NotFound