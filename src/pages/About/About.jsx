import React from 'react';
import { motion } from 'framer-motion'; //eslint-disable-line
import { FaBuilding, FaUsers, FaShieldAlt, FaMobile, FaChartLine, FaHeart } from 'react-icons/fa';
import { MdPayment, MdAnnouncement, MdSecurity } from 'react-icons/md';
import { IoHomeSharp } from 'react-icons/io5';
import { RiCoupon3Fill } from 'react-icons/ri';
import PageTitle from '../../components/shared/PageTitle';
import NivashLogo from '../../components/shared/NivashLogo';

const About = () => {
    const features = [
        {
            icon: <FaUsers className="text-4xl text-blue-600" />,
            title: "User Management",
            description: "Comprehensive user role management with Admin, Member, and User access levels for streamlined operations."
        },
        {
            icon: <MdPayment className="text-4xl text-green-600" />,
            title: "Payment System",
            description: "Integrated Stripe payment processing for rent collection with automated tracking and history."
        },
        {
            icon: <MdAnnouncement className="text-4xl text-purple-600" />,
            title: "Communication Hub",
            description: "Real-time announcements, notifications, and community bulletin board for seamless communication."
        },
        {
            icon: <FaBuilding className="text-4xl text-orange-600" />,
            title: "Property Management",
            description: "Complete apartment management system with assignments, maintenance requests, and analytics."
        },
        {
            icon: <RiCoupon3Fill className="text-4xl text-pink-600" />,
            title: "Coupon Management",
            description: "Flexible discount and coupon system for special offers and member benefits."
        },
        {
            icon: <FaChartLine className="text-4xl text-indigo-600" />,
            title: "Analytics Dashboard",
            description: "Comprehensive reporting and analytics for building operations and financial tracking."
        }
    ];

    const stats = [
        { number: "1000+", label: "Happy Residents", icon: <FaHeart className="text-red-500" /> },
        { number: "50+", label: "Buildings Managed", icon: <FaBuilding className="text-blue-500" /> },
        { number: "99.9%", label: "Uptime", icon: <FaShieldAlt className="text-green-500" /> },
        { number: "24/7", label: "Support", icon: <IoHomeSharp className="text-purple-500" /> }
    ];

    const teamValues = [
        {
            title: "Innovation",
            description: "We leverage cutting-edge technology to revolutionize building management.",
            icon: <FaMobile className="text-3xl text-blue-500" />
        },
        {
            title: "Security",
            description: "Advanced security measures with Firebase authentication and secure payment processing.",
            icon: <MdSecurity className="text-3xl text-green-500" />
        },
        {
            title: "Community",
            description: "Building stronger communities through better communication and management tools.",
            icon: <FaUsers className="text-3xl text-purple-500" />
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
            <PageTitle title="About Us" />
            
            {/* Hero Section */}
            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative bg-gradient-to-br from-slate-800 via-gray-900 to-black py-20 px-4 overflow-hidden"
            >
                {/* Background decorations */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                <div className="container mx-auto text-center relative z-10">
                  
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-5xl md:text-7xl font-bold text-white mt-15 mb-6 leading-tight"
                    >
                        About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Nivash</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed"
                    >
                        Revolutionizing building management through innovative technology, seamless communication, 
                        and community-focused solutions for modern residential and commercial properties.
                    </motion.p>
                </div>
            </motion.section>

            {/* Mission Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 px-4 max-w-[90%] mx-auto"
            >
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                At Nivash, we believe that building management should be effortless, transparent, and community-driven. 
                                Our mission is to transform how residential and commercial buildings operate by providing a comprehensive 
                                digital platform that connects residents, management, and property owners.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We're committed to creating stronger, more connected communities through technology that simplifies 
                                daily operations, enhances communication, and provides transparency in all building-related activities.
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2"
                                >
                                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                                    <p className="text-gray-600 font-medium">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 px-4 bg-white max-w-[90%] mx-auto"
            >
                <div className="container mx-auto">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-6">
                            Why Choose Nivash?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive building management solution designed for modern communities
                        </p>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Values Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 max-w-[90%] mx-auto"
            >
                <div className="container mx-auto">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The principles that drive everything we do at Nivash
                        </p>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {teamValues.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-8 shadow-xl text-center group hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Technology Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 px-4 bg-white max-w-[90%] mx-auto"
            >
                <div className="container mx-auto text-center">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                            Built with Modern Technology
                        </h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
                            Nivash is powered by cutting-edge technologies including React, Firebase, Node.js, and Stripe 
                            to ensure scalability, security, and exceptional user experience.
                        </p>
                        
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-wrap justify-center gap-6 items-center"
                        >
                            {['React', 'Firebase', 'Node.js', 'Stripe', 'TailwindCSS', 'MongoDB'].map((tech, index) => (
                                <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full text-gray-700 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    {tech}
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

         
        </div>
    );
};

export default About;