import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaCode, FaLaptopCode, FaGraduationCap, FaRocket, FaDownload } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import './About.css';

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        const numTarget = parseInt(target);
        const step = Math.ceil(numTarget / (duration * 60));
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= numTarget) {
                setCount(numTarget);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const stats = [
    { icon: <FaCode />, value: '7', suffix: '+', label: 'Projects Built', color: '#00d4ff' },
    { icon: <FaLaptopCode />, value: '10', suffix: '+', label: 'Technologies', color: '#8b5cf6' },
    { icon: <FaGraduationCap />, value: 'B.Tech', suffix: '', label: 'CSE (2024–28)', color: '#ec4899', isText: true },
    { icon: <FaRocket />, value: '2', suffix: '+', label: 'Years Coding', color: '#10b981' },
];

const highlights = [
    { emoji: '🌐', text: 'Built production websites — agency portfolios, business sites & more' },
    { emoji: '🏥', text: 'Created Sehat Nabha — a rural healthcare platform for Punjab' },
    { emoji: '🩸', text: 'Developed a Blood Bank Management System with Python & Tkinter' },
    { emoji: '🔐', text: 'Built CrypTXT — a Python-based text file encryption tool' },
];

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="about" className="section about">
            <div className="container" ref={ref}>
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">// about me</span>
                    <h2 className="section-title">Who I Am</h2>
                    <p className="section-subtitle">
                        A passionate developer turning ideas into powerful digital experiences
                    </p>
                </motion.div>

                <div className="about__content">
                    <motion.div
                        className="about__text"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="about__text-block">
                            <h3 className="about__heading">
                                Hello! I'm <span className="gradient-text">Ram Raghav</span>
                            </h3>
                            <p>
                                I'm a <strong>Web Developer</strong> pursuing my studies
                                at <strong>NIST University, Berhampur</strong>. I'm passionate about
                                web development, DSA, and building solutions that are both
                                beautiful and functional.
                            </p>
                            <p>
                                From crafting production websites to developing healthcare platforms
                                and management systems, I love taking on challenges that push my skills forward.
                                I'm consistently practicing on LeetCode.
                            </p>
                        </div>

                        {/* Highlights */}
                        <motion.div
                            className="about__highlights"
                            variants={container}
                            initial="hidden"
                            animate={isInView ? 'show' : 'hidden'}
                        >
                            {highlights.map((h, i) => (
                                <motion.div key={i} className="about__highlight" variants={item}>
                                    <span className="about__highlight-emoji">{h.emoji}</span>
                                    <span>{h.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Info Grid */}
                        <div className="about__info-grid">
                            <div className="about__info-item">
                                <span className="about__info-label">📍 Location</span>
                                <span className="about__info-value">Samastipur</span>
                            </div>
                            <div className="about__info-item">
                                <span className="about__info-label">🎓 University/School</span>
                                <span className="about__info-value">NIST University, Berhampur</span>
                            </div>
                            <div className="about__info-item">
                                <span className="about__info-label">📚 Degree</span>
                                <span className="about__info-value">B.Tech CSE (2024–2028)</span>
                            </div>
                            <div className="about__info-item">
                                <span className="about__info-label">🎯 Focus</span>
                                <span className="about__info-value">Web Dev + DSA</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <motion.div
                            className="about__cta"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8 }}
                        >
                            <a
                                href="mailto:ramraghavcode@gmail.com?subject=Resume Request"
                                className="btn btn-primary"
                            >
                                <FaDownload />
                                Request Resume
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="about__stats"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="about__stat-card glass-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 200 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="about__stat-icon" style={{ color: stat.color, background: `${stat.color}12` }}>
                                    {stat.icon}
                                </div>
                                <div className="about__stat-value" style={{
                                    background: `linear-gradient(135deg, ${stat.color}, var(--accent-purple))`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    {stat.isText ? stat.value : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                                </div>
                                <div className="about__stat-label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
