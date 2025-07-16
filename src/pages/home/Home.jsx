import React, { useEffect } from 'react';
import AboutBuilding from '../../components/home/AboutBuilding';
import Banner from '../../components/home/Banner';
import LocationMap from '../../components/home/LocationMap';
import Coupons from '../../components/home/Coupons';
import PageTitle from '../../components/shared/PageTitle';


const Home = () => {
    useEffect(() => {
        // Check if there's a hash in the URL and scroll to that section
        const hash = window.location.hash;
        if (hash) {
            // Small delay to ensure the component is fully rendered
            const timer = setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className="min-h-screen">
            <PageTitle title="Home" />
            <header>
                <Banner/>
            </header>
            <main>
                <AboutBuilding/>
                <Coupons/>
                <LocationMap/>
            </main>
        </div>
    );
};

export default Home;