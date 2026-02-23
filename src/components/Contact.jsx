import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';
import { HiOutlineSparkles } from 'react-icons/hi';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [focused, setFocused] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFocus = (field) => setFocused((prev) => ({ ...prev, [field]: true }));
    const handleBlur = (field) => {
        if (!formData[field]) setFocused((prev) => ({ ...prev, [field]: false }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:ramraghavcode@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
        window.open(mailtoLink, '_blank');
    };

    const contactInfo = [
        { icon: <FaEnvelope />, label: 'Email', value: 'ramraghavcode@gmail.com', href: 'mailto:ramraghavcode@gmail.com' },
        { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Samastipur, India', href: null },
    ];

    const socials = [
        { icon: <FaGithub />, href: '#', label: 'GitHub', color: '#fff' },
        { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/ram-raghav/', label: 'LinkedIn', color: '#0077B5' },
        { icon: <SiLeetcode />, href: 'https://leetcode.com/u/ramraghav/', label: 'LeetCode', color: '#FFA116' },
        { icon: <SiHackerrank />, href: '#', label: 'HackerRank', color: '#2EC866' },
    ];

    return (
        <section id="contact" className="section contact">
            <div className="container" ref={ref}>
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">// get in touch</span>
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-subtitle">
                        Have a project in mind or just want to say hi? I'd love to hear from you!
                    </p>
                </motion.div>

                <div className="contact__content">
                    <motion.div
                        className="contact__info"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h3 className="contact__info-title">
                            Let's build something{' '}
                            <span className="gradient-text">amazing</span> together
                        </h3>
                        <p className="contact__info-text">
                            I'm always open to discussing new projects, creative ideas, or opportunities
                            to be part of something great. Whether you need a full-stack developer,
                            want to collaborate on an AI project, or just want to chat about tech —
                            feel free to reach out!
                        </p>

                        <div className="contact__details">
                            {contactInfo.map((item) => (
                                <motion.div
                                    key={item.label}
                                    className="contact__detail-item"
                                    whileHover={{ x: 6 }}
                                >
                                    <div className="contact__detail-icon">{item.icon}</div>
                                    <div>
                                        <span className="contact__detail-label">{item.label}</span>
                                        {item.href ? (
                                            <a href={item.href} className="contact__detail-value">{item.value}</a>
                                        ) : (
                                            <span className="contact__detail-value">{item.value}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="contact__socials">
                            {socials.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact__social-link"
                                    aria-label={s.label}
                                    whileHover={{ y: -4, scale: 1.1, color: s.color }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {s.icon}
                                    <span className="contact__social-label">{s.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact__form glass-card"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <div className="contact__form-glow" />
                        <h4 className="contact__form-title">
                            <HiOutlineSparkles /> Send a Message
                        </h4>

                        {['name', 'email', 'message'].map((field) => (
                            <div
                                key={field}
                                className={`contact__form-group ${focused[field] ? 'contact__form-group--focused' : ''}`}
                            >
                                <label htmlFor={field} className={`contact__label ${focused[field] || formData[field] ? 'contact__label--float' : ''}`}>
                                    {field === 'name' ? 'Your Name' : field === 'email' ? 'Your Email' : 'Your Message'}
                                </label>
                                {field === 'message' ? (
                                    <textarea
                                        id={field}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus(field)}
                                        onBlur={() => handleBlur(field)}
                                        className="contact__input contact__textarea"
                                        rows={5}
                                        required
                                    />
                                ) : (
                                    <input
                                        type={field === 'email' ? 'email' : 'text'}
                                        id={field}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus(field)}
                                        onBlur={() => handleBlur(field)}
                                        className="contact__input"
                                        required
                                    />
                                )}
                            </div>
                        ))}

                        <button type="submit" className="btn btn-primary contact__submit">
                            <FaPaperPlane />
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
