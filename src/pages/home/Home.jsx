import React from 'react';
import AboutBuilding from '../../components/home/AboutBuilding';
import Banner from '../../components/home/Banner';

const Home = () => {
    return (
        <div>
            <header>
                <Banner/>
            </header>
            <main>
                <AboutBuilding/>
            </main>
        </div>
    );
};

export default Home;