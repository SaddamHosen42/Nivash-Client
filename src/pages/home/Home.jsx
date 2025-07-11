import React from 'react';
import AboutBuilding from '../../components/home/AboutBuilding';
import Banner from '../../components/home/Banner';
import LocationMap from '../../components/home/LocationMap';


const Home = () => {
    return (
        <div className="min-h-screen">
            <header>
                <Banner/>
            </header>
            <main>
                <AboutBuilding/>
                <LocationMap/>
            </main>
        </div>
    );
};

export default Home;