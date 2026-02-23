import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedinIn, FaHeart, FaArrowUp } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';
import './Footer.css';

const quickLinks = [
    { to: 'hero', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'skills', label: 'Skills' },
    { to: 'projects', label: 'Projects' },
    { to: 'terminal', label: 'Terminal' },
    { to: 'contact', label: 'Contact' },
];

const socials = [
    { icon: <FaGithub />, href: '#', label: 'GitHub' },
    { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/ram-raghav/', label: 'LinkedIn' },
    { icon: <SiLeetcode />, href: 'https://leetcode.com/u/ramraghav/', label: 'LeetCode' },
    { icon: <SiHackerrank />, href: '#', label: 'HackerRank' },
];

const Footer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <footer className="footer" ref={ref}>
            {/* Animated wave separator */}
            <div className="footer__wave">
                <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path
                        d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 70V100H0V40Z"
                        fill="var(--bg-secondary)"
                    />
                </svg>
            </div>

            <div className="footer__content">
                <div className="container">
                    <motion.div
                        className="footer__grid"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Brand Column */}
                        <div className="footer__brand">
                            <div className="footer__logo">
                                <span className="footer__logo-bracket">&lt;</span>
                                <span className="gradient-text">Ram</span>
                                <span className="footer__logo-bracket">/&gt;</span>
                            </div>
                            <p className="footer__tagline">
                                Web Developer crafting elegant digital experiences
                                with modern technologies and a passion for innovation.
                            </p>
                            <div className="footer__socials">
                                {socials.map((s) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer__social-link"
                                        aria-label={s.label}
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {s.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer__section">
                            <h4 className="footer__section-title">Quick Links</h4>
                            <ul className="footer__section-links">
                                {quickLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            smooth
                                            offset={-80}
                                            duration={500}
                                            className="footer__link"
                                        >
                                            <span className="footer__link-arrow">→</span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer__section">
                            <h4 className="footer__section-title">Get In Touch</h4>
                            <div className="footer__contact-info">
                                <p>📧 ramraghavcode@gmail.com</p>
                                <p>📍 Samastipur, India</p>
                                <p>🎓 NIST University, Berhampur</p>
                            </div>
                            <div className="footer__status">
                                <span className="footer__status-dot" />
                                Currently available for opportunities
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Bar */}
                    <div className="footer__bottom">
                        <div className="footer__bottom-line" />
                        <div className="footer__bottom-content">
                            <p className="footer__copyright">
                                © {new Date().getFullYear()} Ram Raghav. Crafted with{' '}
                                <motion.span
                                    className="footer__heart"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <FaHeart />
                                </motion.span>{' '}
                                using React
                            </p>
                            <p className="footer__tech">
                                Built with React · Framer Motion · Vite
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
