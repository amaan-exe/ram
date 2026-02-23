import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaFilter } from 'react-icons/fa';
import './Projects.css';

const projects = [
    {
        title: 'Sehat Nabha',
        description: 'Rural healthcare platform connecting patients, healthcare providers, and pharmacies through a multilingual ecosystem for Punjab, India.',
        tech: ['TypeScript', 'React', 'Vercel', 'Responsive'],
        github: '#',
        live: 'https://sehat-nabhaa.vercel.app/',
        gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
        emoji: '🏥',
        category: 'web',
        featured: true,
    },
    {
        title: 'IGNIUS',
        description: 'Stunning portfolio website for a web design agency — built with React, Vite, and GSAP animations with smooth scroll effects.',
        tech: ['React', 'Vite', 'GSAP', 'CSS3'],
        github: '#',
        live: 'https://ignius-ivory.vercel.app',
        gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
        emoji: '🎨',
        category: 'web',
        featured: true,
    },
    {
        title: 'Smart Construction',
        description: 'Professional business website for a construction company with WhatsApp integration, SEO optimization, and responsive design.',
        tech: ['JavaScript', 'HTML', 'CSS', 'Responsive'],
        github: '#',
        live: null,
        gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        emoji: '🏗️',
        category: 'web',
    },
    {
        title: 'Blood Bank Management',
        description: 'Python-based app with Tkinter GUI for managing blood donations — tracks donors, blood stock levels, donation history, and generates reports.',
        tech: ['Python', 'Tkinter', 'SQLite', 'GUI'],
        github: '#',
        live: null,
        gradient: 'linear-gradient(135deg, #f5576c, #ff6b6b)',
        emoji: '🩸',
        category: 'desktop',
        featured: true,
    },
    {
        title: 'CrypTXT',
        description: 'Encrypt your .TXT files easily — a Python-based text file encryption tool for secure file handling.',
        tech: ['Python', 'Encryption', 'CLI'],
        github: '#',
        live: null,
        gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
        emoji: '🔐',
        category: 'desktop',
    },
    {
        title: 'Apna Sweet Shop',
        description: 'A sweet shop website showcasing products and services with a modern, user-friendly design.',
        tech: ['JavaScript', 'HTML', 'CSS', 'Responsive'],
        github: '#',
        live: null,
        gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
        emoji: '🍬',
        category: 'web',
    },
    {
        title: 'Suvidha',
        description: 'A web-based utility application built with JavaScript for streamlined service delivery.',
        tech: ['JavaScript', 'HTML', 'CSS'],
        github: '#',
        live: null,
        gradient: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
        emoji: '🛠️',
        category: 'web',
    },
];

const filters = [
    { key: 'all', label: 'All Projects', icon: '🚀' },
    { key: 'web', label: 'Web', icon: '🌐' },
    { key: 'desktop', label: 'Desktop / CLI', icon: '💻' },
];

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [activeFilter, setActiveFilter] = useState('all');
    const [tiltStyle, setTiltStyle] = useState({});

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    const handleMouseMove = (e, id) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        setTiltStyle((prev) => ({
            ...prev,
            [id]: {
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            },
        }));
    };

    const handleMouseLeave = (id) => {
        setTiltStyle((prev) => ({
            ...prev,
            [id]: { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' },
        }));
    };

    return (
        <section id="projects" className="section projects">
            <div className="container" ref={ref}>
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">// my work</span>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">
                        A collection of projects that showcase my skills and passion for building
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    className="projects__filters"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            className={`projects__filter ${activeFilter === f.key ? 'projects__filter--active' : ''}`}
                            onClick={() => setActiveFilter(f.key)}
                        >
                            <span>{f.icon}</span>
                            {f.label}
                        </button>
                    ))}
                </motion.div>

                <motion.div className="projects__grid" layout>
                    {filteredProjects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            className={`projects__card glass-card ${project.featured ? 'projects__card--featured' : ''}`}
                            layout
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: i * 0.08, duration: 0.4, layout: { duration: 0.3 } }}
                            style={tiltStyle[project.title] || {}}
                            onMouseMove={(e) => handleMouseMove(e, project.title)}
                            onMouseLeave={() => handleMouseLeave(project.title)}
                        >
                            {project.featured && (
                                <div className="projects__featured-badge">⭐ Featured</div>
                            )}

                            <div
                                className="projects__card-header"
                                style={{ background: project.gradient }}
                            >
                                <span className="projects__emoji">{project.emoji}</span>
                                <div className="projects__header-overlay" />
                            </div>

                            <div className="projects__card-body">
                                <h3 className="projects__title">{project.title}</h3>
                                <p className="projects__description">{project.description}</p>

                                <div className="projects__tech">
                                    {project.tech.map((t) => (
                                        <span key={t} className="projects__tech-tag">{t}</span>
                                    ))}
                                </div>

                                <div className="projects__links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="projects__link">
                                            <FaGithub /> Code
                                        </a>
                                    )}
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="projects__link projects__link--live">
                                            <FaExternalLinkAlt /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
