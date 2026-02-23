import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    SiReact, SiVite, SiGreensock, SiJavascript, SiHtml5, SiCss3,
    SiTailwindcss,
    SiNodedotjs, SiPython, SiSqlite,
    SiGit, SiGithub, SiCplusplus, SiTypescript,
    SiVercel,
} from 'react-icons/si';
import { FaTerminal } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import './Skills.css';

const skillCategories = [
    {
        title: 'Frontend',
        icon: '🎨',
        color: '#00d4ff',
        skills: [
            { name: 'React', icon: <SiReact />, color: '#61DAFB', level: 80 },
            { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E', level: 85 },
            { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', level: 65 },
            { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26', level: 90 },
            { name: 'CSS3', icon: <SiCss3 />, color: '#1572B6', level: 85 },
            { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4', level: 70 },
            { name: 'Vite', icon: <SiVite />, color: '#646CFF', level: 75 },
            { name: 'GSAP', icon: <SiGreensock />, color: '#88CE02', level: 70 },
        ],
    },
    {
        title: 'Backend & Desktop',
        icon: '⚙️',
        color: '#8b5cf6',
        skills: [
            { name: 'Python', icon: <SiPython />, color: '#3776AB', level: 80 },
            { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', level: 60 },
            { name: 'Tkinter', icon: <FaTerminal />, color: '#3776AB', level: 75 },
            { name: 'SQLite', icon: <SiSqlite />, color: '#003B57', level: 65 },
        ],
    },
    {
        title: 'Languages',
        icon: '💻',
        color: '#ec4899',
        skills: [
            { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E', level: 85 },
            { name: 'Python', icon: <SiPython />, color: '#3776AB', level: 80 },
            { name: 'C++', icon: <SiCplusplus />, color: '#00599C', level: 75 },
            { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', level: 65 },
        ],
    },
    {
        title: 'Tools',
        icon: '🛠️',
        color: '#10b981',
        skills: [
            { name: 'Git', icon: <SiGit />, color: '#F05032', level: 80 },
            { name: 'GitHub', icon: <SiGithub />, color: '#ffffff', level: 85 },
            { name: 'VS Code', icon: <VscVscode />, color: '#007ACC', level: 90 },
            { name: 'Vercel', icon: <SiVercel />, color: '#ffffff', level: 75 },
        ],
    },
];

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [hoveredSkill, setHoveredSkill] = useState(null);

    return (
        <section id="skills" className="section skills">
            <div className="container" ref={ref}>
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">// my skills</span>
                    <h2 className="section-title">Technical Arsenal</h2>
                    <p className="section-subtitle">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </motion.div>

                <div className="skills__grid">
                    {skillCategories.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            className="skills__category glass-card"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: catIdx * 0.15, duration: 0.5 }}
                        >
                            {/* Category glow */}
                            <div className="skills__category-glow" style={{ background: category.color }} />

                            <div className="skills__category-header">
                                <span className="skills__category-icon">{category.icon}</span>
                                <h3 className="skills__category-title">{category.title}</h3>
                                <span className="skills__category-count">{category.skills.length} skills</span>
                            </div>

                            <div className="skills__list">
                                {category.skills.map((skill, i) => (
                                    <motion.div
                                        key={skill.name}
                                        className="skills__item"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: catIdx * 0.15 + i * 0.06 + 0.3 }}
                                        onMouseEnter={() => setHoveredSkill(`${category.title}-${skill.name}`)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                    >
                                        <div className="skills__item-info">
                                            <div
                                                className="skills__icon"
                                                style={{ color: skill.color }}
                                            >
                                                {skill.icon}
                                            </div>
                                            <span className="skills__name">{skill.name}</span>
                                            <span className="skills__level-text">{skill.level}%</span>
                                        </div>
                                        <div className="skills__progress-bar">
                                            <motion.div
                                                className="skills__progress-fill"
                                                style={{
                                                    background: `linear-gradient(90deg, ${skill.color}, ${category.color})`,
                                                }}
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                                transition={{
                                                    delay: catIdx * 0.15 + i * 0.06 + 0.5,
                                                    duration: 1,
                                                    ease: 'easeOut',
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
