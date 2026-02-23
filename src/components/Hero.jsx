import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedinIn, FaDownload } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';
import { HiArrowDown, HiOutlineSparkles } from 'react-icons/hi';
import './Hero.css';

const roles = [
    'Web Developer',
    'React Enthusiast',
    'Problem Solver',
    'DSA Enthusiast',
    'CS Student',
    'Open Source Contributor',
];

/* ─── Particle System ─── */
const Particles = () => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.1,
    }));

    return (
        <div className="hero__particles">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="hero__particle"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [p.opacity, p.opacity * 1.5, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

/* ─── Floating Shapes ─── */
const FloatingShapes = () => (
    <div className="hero__shapes">
        <motion.div
            className="hero__shape hero__shape--triangle"
            animate={{ rotate: 360, y: [-10, 10, -10] }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, y: { duration: 4, repeat: Infinity } }}
        />
        <motion.div
            className="hero__shape hero__shape--circle"
            animate={{ rotate: -360, x: [-15, 15, -15] }}
            transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, x: { duration: 5, repeat: Infinity } }}
        />
        <motion.div
            className="hero__shape hero__shape--square"
            animate={{ rotate: 180, y: [10, -10, 10] }}
            transition={{ rotate: { duration: 15, repeat: Infinity, ease: 'linear' }, y: { duration: 6, repeat: Infinity } }}
        />
        <motion.div
            className="hero__shape hero__shape--donut"
            animate={{ rotate: -180, x: [10, -10, 10] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, x: { duration: 7, repeat: Infinity } }}
        />
    </div>
);

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const typeWriter = useCallback(() => {
        const current = roles[roleIndex];
        if (!isDeleting && displayText === current) {
            setTimeout(() => setIsDeleting(true), 2200);
            return;
        }
        if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
            return;
        }
        const timeout = isDeleting ? 35 : 70;
        setTimeout(() => {
            setDisplayText(
                isDeleting
                    ? current.substring(0, displayText.length - 1)
                    : current.substring(0, displayText.length + 1)
            );
        }, timeout);
    }, [displayText, isDeleting, roleIndex]);

    useEffect(() => {
        typeWriter();
    }, [typeWriter]);

    const socialLinks = [
        { icon: <FaGithub />, href: '#', label: 'GitHub' },
        { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/ram-raghav/', label: 'LinkedIn' },
        { icon: <SiLeetcode />, href: 'https://leetcode.com/u/ramraghav/', label: 'LeetCode' },
        { icon: <SiHackerrank />, href: '#', label: 'HackerRank' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section id="hero" className="hero">
            <Particles />
            <FloatingShapes />

            <div className="hero__bg">
                <div className="hero__orb hero__orb--1" />
                <div className="hero__orb hero__orb--2" />
                <div className="hero__orb hero__orb--3" />
                <div className="hero__mesh" />
            </div>

            <div className="hero__container container">
                <motion.div
                    className="hero__content"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div className="hero__status-badge" variants={item}>
                        <span className="hero__status-dot" />
                        <span>Open to opportunities</span>
                    </motion.div>

                    <motion.div className="hero__greeting" variants={item}>
                        <span className="hero__wave">👋</span>
                        <span className="hero__greeting-text">Hey there, I'm</span>
                    </motion.div>

                    <motion.h1 className="hero__name" variants={item}>
                        Ram <span className="gradient-text">Raghav</span>
                    </motion.h1>

                    <motion.div className="hero__role-wrapper" variants={item}>
                        <div className="hero__role-terminal">
                            <span className="hero__role-file">~/portfolio</span>
                            <div className="hero__role">
                                <span className="hero__role-prefix">$</span>
                                <span className="hero__role-text">{displayText}</span>
                                <span className="hero__cursor">█</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p className="hero__description" variants={item}>
                        I craft <strong>modern web applications</strong> and love <strong>solving problems with code</strong>.
                        Passionate about web development, DSA, and building
                        user-friendly digital experiences with modern tech stacks.
                    </motion.p>

                    <motion.div className="hero__actions" variants={item}>
                        <Link to="projects" smooth offset={-80} duration={500}>
                            <button className="btn btn-primary">
                                <HiOutlineSparkles />
                                View Projects
                            </button>
                        </Link>
                        <Link to="contact" smooth offset={-80} duration={500}>
                            <button className="btn btn-outline">
                                Contact Me
                            </button>
                        </Link>
                    </motion.div>

                    <motion.div className="hero__socials" variants={item}>
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero__social-link"
                                aria-label={link.label}
                                whileHover={{ y: -4, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero__visual"
                    initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                >
                    <div className="hero__avatar-wrapper">
                        <div className="hero__avatar-glow" />
                        <div className="hero__avatar-ring" />
                        <div className="hero__avatar-ring hero__avatar-ring--2" />
                        <div className="hero__avatar-ring hero__avatar-ring--3" />
                        <img
                            src="/profile-avatar.png"
                            alt="Ram Raghav"
                            className="hero__avatar"
                        />
                    </div>

                    <motion.div
                        className="hero__badge hero__badge--1"
                        animate={{ y: [-8, 8, -8], rotate: [0, 3, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    >
                        <span className="hero__badge-icon">⚛️</span>
                        <span>React</span>
                    </motion.div>
                    <motion.div
                        className="hero__badge hero__badge--2"
                        animate={{ y: [8, -8, 8], rotate: [0, -3, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                    >
                        <span className="hero__badge-icon">🐍</span>
                        <span>Python</span>
                    </motion.div>
                    <motion.div
                        className="hero__badge hero__badge--3"
                        animate={{ y: [-5, 10, -5], rotate: [0, 2, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                    >
                        <span className="hero__badge-icon">🧠</span>
                        <span>ML / AI</span>
                    </motion.div>
                    <motion.div
                        className="hero__badge hero__badge--4"
                        animate={{ y: [6, -6, 6] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                    >
                        <span className="hero__badge-icon">💻</span>
                        <span>Node.js</span>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="hero__scroll-indicator"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <Link to="about" smooth offset={-80} duration={500}>
                    <div className="hero__scroll-mouse">
                        <div className="hero__scroll-wheel" />
                    </div>
                    <span className="hero__scroll-text">Scroll Down</span>
                </Link>
            </motion.div>
        </section>
    );
};

export default Hero;
