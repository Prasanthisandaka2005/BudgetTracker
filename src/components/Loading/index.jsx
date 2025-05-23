import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ThreeDots height="80" width="80" radius="9" color="#3706b5" ariaLabel="three-dots-loading" visible={true} />
        </div>
    );
};
export default Loading;
