import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import './Terminal.css';

/* ─── Matrix Rain Canvas ─── */
const MatrixRain = ({ active }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!active) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
        const fontSize = 12;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(13, 17, 23, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff41';
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 40);
        return () => clearInterval(interval);
    }, [active]);

    if (!active) return null;
    return <canvas ref={canvasRef} className="terminal__matrix-canvas" />;
};

const COMMANDS = {
    help: {
        description: 'List all available commands',
        execute: () => [
            '',
            '  ┌──────────────────────────────────────────────────────────┐',
            '  │  Available Commands                                      │',
            '  ├──────────────────────────────────────────────────────────┤',
            '  │                                                          │',
            '  │  📋 INFO COMMANDS                                        │',
            '  │     about      →  Who am I                               │',
            '  │     skills     →  My technical skills                    │',
            '  │     projects   →  My featured projects                   │',
            '  │     education  →  My academic background                 │',
            '  │     experience →  My coding journey                      │',
            '  │     contact    →  How to reach me                        │',
            '  │     socials    →  My social profiles                     │',
            '  │     resume     →  Download my resume                     │',
            '  │                                                          │',
            '  │  🛠️  UTILITY COMMANDS                                    │',
            '  │     neofetch   →  System info (portfolio edition)        │',
            '  │     whoami     →  Display current user                   │',
            '  │     date       →  Show current date & time               │',
            '  │     echo       →  Echo a message                         │',
            '  │     theme      →  Toggle terminal theme info             │',
            '  │     history    →  Show command history                   │',
            '  │     clear      →  Clear terminal                         │',
            '  │     banner     →  Show the welcome banner                │',
            '  │                                                          │',
            '  │  🎮 FUN COMMANDS                                         │',
            '  │     matrix     →  Enter the Matrix 🟢                    │',
            '  │     sudo       →  Try superuser mode 😉                  │',
            '  │     hack       →  Hack the mainframe 💀                  │',
            '  │     coffee     →  Essential developer fuel ☕             │',
            '  │     fortune    →  Get a random dev fortune 🔮            │',
            '  │                                                          │',
            '  │  💡 TIP: Use ↑↓ arrows for history, Tab for autocomplete │',
            '  └──────────────────────────────────────────────────────────┘',
            '',
        ],
    },
    about: {
        description: 'About me',
        execute: () => [
            '',
            '  ╭──────────────────────────────────────╮',
            '  │  👋 About Me                          │',
            '  ╰──────────────────────────────────────╯',
            '',
            '  Hi, I\'m Ram Raghav!',
            '',
            '  I\'m a Web Developer currently studying',
            '  at NIST University, Berhampur.',
            '',
            '  My journey spans across:',
            '  • 🌐 Web Development (React, JavaScript, TypeScript)',
            '  • 💻 Data Structures & Algorithms',
            '  • 🐍 Python Development (Tkinter, CLI tools)',
            '  • 📱 Responsive UI/UX Design',
            '',
            '  I\'m actively',
            '  solving problems on LeetCode.',
            '',
        ],
    },
    skills: {
        description: 'My skills',
        execute: () => [
            '',
            '  ╭──────────────────────────────────────╮',
            '  │  ⚡ Technical Skills                  │',
            '  ╰──────────────────────────────────────╯',
            '',
            '  🎨 Frontend',
            '     React ████████████████████ 90%',
            '     JavaScript ████████████████████ 92%',
            '     Next.js ████████████████░░░░ 80%',
            '     Tailwind ██████████████████░░ 85%',
            '',
            '  ⚙️  Backend',
            '     Node.js ████████████████░░░░ 82%',
            '     Python ██████████████████░░ 88%',
            '     Flask ████████████████░░░░ 78%',
            '     MySQL ████████████████░░░░ 80%',
            '',
            '  💻 Languages',
            '     JavaScript ████████████████████ 92%',
            '     Python ██████████████████░░ 88%',
            '     Java ████████████████░░░░ 80%',
            '     C++ ███████████████░░░░░ 75%',
            '',
            '  🛠️  Tools: Git, GitHub, Figma, Postman, Docker',
            '',
        ],
    },
    projects: {
        description: 'My projects',
        execute: () => [
            '',
            '  ╭──────────────────────────────────────╮',
            '  │  🚀 Featured Projects                 │',
            '  ╰──────────────────────────────────────╯',
            '',
            '  ⭐ Sehat Nabha — Rural healthcare platform',
            '     ↳ sehat-nabhaa.vercel.app',
            '',
            '  ⭐ IGNIUS — Agency portfolio website',
            '     ↳ ignius-ivory.vercel.app',
            '',
            '  ⭐ Blood Bank — Python donation management system',
            '     ↳ github.com',
            '',
            '  🏗️ Smart Construction — Business website',
            '  🔐 CrypTXT — Text file encryption tool',
            '  🍬 Apna — Sweet shop website',
            '  🛠️ Suvidha — Utility web application',
            '',
            '  → Type "about" for more details on each project.',
            '',
        ],
    },
    education: {
        description: 'My education',
        execute: () => [
            '',
            '  ╭──────────────────────────────────────╮',
            '  │  🎓 Education                         │',
            '  ╰──────────────────────────────────────╯',
            '',
            '  📚 Web Development',
            '  🏫 NIST University, Berhampur',
            '  📍 Samastipur, India',
            '  📅 2024 – Present',
            '',
            '  🏫 Sant Nandlal Smriti Vidya Mandir',
            '  📍 Jamshedpur, Jharkhand, India',
            '  📅 2022 – 2024 (Senior Secondary)',
            '',
            '  🏆 Key Focus Areas:',
            '     • Web Development',
            '     • Data Structures & Algorithms',
            '     • Competitive Programming',
            '     • Software Engineering',
            '',
        ],
    },
    contact: {
        description: 'Contact information',
        execute: () => [
            '',
            '  ╭──────────────────────────────────────╮',
            '  │  📬 Contact Me                        │',
            '  ╰──────────────────────────────────────╯',
            '',
            '  📧 Email:    ramraghavcode@gmail.com',
            '  📍 Location: Samastipur, India',
            '',
            '  💡 Tip: Type "socials" to see all my profiles!',
            '',
        ],
    },
    socials: {
        description: 'Social profiles',
        execute: () => [
            '',
            '  ╭──────────────────────────────────────╮',
            '  │  🌐 Social Profiles                   │',
            '  ╰──────────────────────────────────────╯',
            '',
            '  GitHub     → github.com',
            '  LinkedIn   → linkedin.com/in/ram-raghav',
            '  LeetCode   → leetcode.com/u/ramraghav',
            '  Instagram  → instagram.com',
            '',
        ],
    },
    experience: {
        description: 'My experience',
        execute: () => [
            '',
            '  ╭──────────────────────────────────────╮',
            '  │  💼 Coding Journey                    │',
            '  ╰──────────────────────────────────────╯',
            '',
            '  📅 2+ years of coding experience',
            '  📦 7+ projects built and deployed',
            '  🔧 10+ technologies mastered',
            '',
            '  🏗️  Production Websites:',
            '     • Sehat Nabha — Rural Healthcare Platform',
            '     • IGNIUS — Agency Portfolio Website',
            '     • Smart Construction — Business Website',
            '',
            '  🐍 Python Projects:',
            '     • Blood Bank Management System (Tkinter)',
            '     • CrypTXT — Text File Encryption',
            '',
            '  🎓 Community:',
            '     • Active LeetCode problem solver',
            '',
        ],
    },
    neofetch: {
        description: 'System info',
        execute: () => [
            '',
            '         ╭─────────╮',
            '         │  ⟨R/⟩   │   Ram Raghav',
            '         ╰─────────╯   ─────────────────',
            '     ╭───────────────╮ OS:      Web Developer v2.0',
            '     │ ⬛⬛⬛⬛⬛⬛⬛│ Host:    NIST University, Berhampur',
            '     │ ⬛🟦🟦🟦🟦⬛│ Kernel:  React + JavaScript',
            '     │ ⬛🟦⬜🟦🟦⬛│ Shell:   /bin/webdev',
            '     │ ⬛🟦🟦🟦🟦⬛│ DE:      VSCode',
            '     │ ⬛⬛⬛⬛⬛⬛⬛│ Theme:   Dark Mode (always)',
            '     ╰───────────────╯ Terminal: Portfolio Terminal v2.0',
            '                       CPU:     Brain™ i9-Caffeine',
            '  Languages:           GPU:     Imagination RTX 5090',
            '  █ JS  █ PY  █ C++   Memory:  ∞ ideas / 24h uptime',
            '  █ TS  █ HTML █ CSS',
            '',
        ],
    },
    whoami: {
        description: 'Current user',
        execute: () => ['', '  visitor@ramraghav-portfolio ~ You are a curious explorer! 🕵️', ''],
    },
    date: {
        description: 'Current date',
        execute: () => {
            const now = new Date();
            return [
                '',
                `  📅 ${now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
                `  ⏰ ${now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`,
                `  🌍 Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
                '',
            ];
        },
    },
    sudo: {
        description: 'Superuser',
        execute: () => [
            '',
            '  ⚠️  [sudo] password for visitor: ********',
            '  ❌ Authentication failed. Nice try! 😄',
            '',
            '  💡 Tip: You don\'t need sudo here, but you can "hire" me!',
            '  📧 ramraghavcode@gmail.com',
            '',
        ],
    },
    resume: {
        description: 'Download resume',
        execute: () => [
            '',
            '  ╭──────────────────────────────────────╮',
            '  │  📄 Resume                            │',
            '  ╰──────────────────────────────────────╯',
            '',
            '  📧 Request at: ramraghavcode@gmail.com',
            '  🔗 LinkedIn: linkedin.com/in/ram-raghav',
            '',
        ],
    },
    theme: {
        description: 'Terminal theme',
        execute: () => [
            '',
            '  🎨 TERMINAL THEME INFO',
            '  ──────────────────────',
            '  Name:   "Deep Space"',
            '  BG:     #0d1117',
            '  FG:     #e0e0e8',
            '  Accent: #00d4ff (Cyan)',
            '  Prompt: green@cyan:purple$',
            '  Font:   Fira Code',
            '',
        ],
    },
    hack: {
        description: 'Hack the mainframe',
        execute: () => {
            const lines = [
                '',
                '  💀 INITIATING HACK SEQUENCE...',
                '  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%',
                '',
                '  ⚡ Bypassing firewall... done',
                '  🔓 Cracking encryption... done',
                '  📡 Accessing mainframe... done',
                '  📂 Downloading files...',
                '',
                '  📄 secret_recipe.txt',
                '  📄 meaning_of_life.txt → 42',
                '  📄 how_to_center_a_div.css',
                '',
                '  ✅ Hack complete! (Just kidding, this is a portfolio 😄)',
                '',
            ];
            return lines;
        },
    },
    coffee: {
        description: 'Developer fuel',
        execute: () => [
            '',
            '  ☕ Brewing coffee...',
            '',
            '     ( (',
            '      ) )',
            '    .______.',
            '    |      |]',
            '    \\      /',
            '     `----\'',
            '',
            '  ✅ Coffee ready! Productivity +100% ☕',
            '',
        ],
    },
    fortune: {
        description: 'Dev fortune',
        execute: () => {
            const fortunes = [
                '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
                '"First, solve the problem. Then, write the code." - John Johnson',
                '"The best error message is the one that never shows up." - Thomas Fuchs',
                '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
                '"Simplicity is the soul of efficiency." - Austin Freeman',
                '"Talk is cheap. Show me the code." - Linus Torvalds',
                '"Programs must be written for people to read." - Harold Abelson',
                '"Fix the cause, not the symptom." - Steve Maguire',
            ];
            const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            return ['', '  🔮 Your Dev Fortune:', '', `  ${fortune}`, ''];
        },
    },
};

const BANNER = [
    '',
    '  ╔═══════════════════════════════════════════════════════════╗',
    '  ║                                                           ║',
    '  ║   ███╗   ███╗██████╗      █████╗ ███╗   ███╗ █████╗ ███╗ ║',
    '  ║   ████╗ ████║██╔══██╗    ██╔══██╗████╗ ████║██╔══██╗████║║',
    '  ║   ██╔████╔██║██║  ██║    ███████║██╔████╔██║███████║██╔█║║',
    '  ║   ██║╚██╔╝██║██║  ██║    ██╔══██║██║╚██╔╝██║██╔══██║██║ ║',
    '  ║   ██║ ╚═╝ ██║██████╔╝    ██║  ██║██║ ╚═╝ ██║██║  ██║██║ ║',
    '  ║   ╚═╝     ╚═╝╚═════╝     ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝ ║',
    '  ║                                                           ║',
    '  ║          Web Developer · Student                       ║',
    '  ║          NIST University · Samastipur, India           ║',
    '  ║                                                           ║',
    '  ╚═══════════════════════════════════════════════════════════╝',
    '',
    '  Welcome to my interactive terminal! 🚀',
    '  Type "help" to see all available commands.',
    '  Use ↑↓ arrows for history, Tab for autocomplete.',
    '',
];

const Terminal = () => {
    const [history, setHistory] = useState([...BANNER]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [matrixMode, setMatrixMode] = useState(false);
    const [suggestion, setSuggestion] = useState('');
    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    // Autocomplete suggestion
    useEffect(() => {
        const trimmed = input.trim().toLowerCase();
        if (trimmed.length > 0) {
            const allCommands = [...Object.keys(COMMANDS), 'clear', 'banner', 'matrix'];
            const match = allCommands.find((c) => c.startsWith(trimmed) && c !== trimmed);
            setSuggestion(match || '');
        } else {
            setSuggestion('');
        }
    }, [input]);

    const handleCommand = useCallback((cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        const parts = trimmed.split(' ');
        const command = parts[0];
        const args = parts.slice(1).join(' ');

        const inputLine = `visitor@ram:~$ ${cmd}`;

        if (command === 'clear') {
            setHistory([]);
            setMatrixMode(false);
            return;
        }

        if (command === 'banner') {
            setHistory((prev) => [...prev, inputLine, ...BANNER]);
            return;
        }

        if (command === 'matrix') {
            setMatrixMode((prev) => !prev);
            setHistory((prev) => [
                ...prev, inputLine, '',
                matrixMode ? '  🔴 Matrix mode DEACTIVATED. Welcome back to reality.' : '  🟢 Matrix mode ACTIVATED. Wake up, Neo...',
                '',
            ]);
            return;
        }

        if (command === 'echo') {
            setHistory((prev) => [...prev, inputLine, '', `  ${args || ''}`, '']);
            return;
        }

        if (command === 'history') {
            const histLines = commandHistory.slice(0, 15).map((c, i) => `  ${i + 1}  ${c}`);
            setHistory((prev) => [...prev, inputLine, '', '  📜 Command History:', ...histLines, '']);
            return;
        }

        if (command === '') {
            setHistory((prev) => [...prev, inputLine]);
            return;
        }

        if (COMMANDS[command]) {
            const output = COMMANDS[command].execute();
            setHistory((prev) => [...prev, inputLine, ...output]);
        } else {
            setHistory((prev) => [
                ...prev, inputLine, '',
                `  ❌ Command not found: "${command}"`,
                '  💡 Type "help" to see available commands.',
                '',
            ]);
        }
    }, [commandHistory, matrixMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCommand(input);
        setCommandHistory((prev) => [input, ...prev]);
        setHistoryIndex(-1);
        setInput('');
        setSuggestion('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (suggestion) {
                setInput(suggestion);
                setSuggestion('');
            }
        }
    };

    const focusInput = () => inputRef.current?.focus();

    return (
        <section id="terminal" className="section terminal-section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">// interactive</span>
                    <h2 className="section-title">Terminal</h2>
                    <p className="section-subtitle">
                        Explore my portfolio through commands — type <code>help</code> to start
                    </p>
                </motion.div>

                <motion.div
                    className={`terminal ${matrixMode ? 'terminal--matrix' : ''}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    onClick={focusInput}
                >
                    <MatrixRain active={matrixMode} />

                    <div className="terminal__titlebar">
                        <div className="terminal__dots">
                            <span className="terminal__dot terminal__dot--red" />
                            <span className="terminal__dot terminal__dot--yellow" />
                            <span className="terminal__dot terminal__dot--green" />
                        </div>
                        <span className="terminal__title">
                            {matrixMode ? '🟢 THE MATRIX' : 'visitor@ramraghav-portfolio ~ bash'}
                        </span>
                        <div className="terminal__titlebar-actions">
                            <span className="terminal__action" onClick={(e) => { e.stopPropagation(); setHistory([]); }}>⌧</span>
                        </div>
                    </div>

                    <div className="terminal__body" ref={terminalRef}>
                        {history.map((line, i) => (
                            <div key={i} className="terminal__line">
                                {line.startsWith('visitor@') ? (
                                    <>
                                        <span className="terminal__prompt-user">visitor</span>
                                        <span className="terminal__prompt-at">@</span>
                                        <span className="terminal__prompt-host">ram</span>
                                        <span className="terminal__prompt-colon">:</span>
                                        <span className="terminal__prompt-path">~</span>
                                        <span className="terminal__prompt-dollar">$ </span>
                                        <span className="terminal__cmd">
                                            {line.replace('visitor@ram:~$ ', '')}
                                        </span>
                                    </>
                                ) : (
                                    <span className="terminal__output">{line}</span>
                                )}
                            </div>
                        ))}

                        <form onSubmit={handleSubmit} className="terminal__input-line">
                            <span className="terminal__prompt-user">visitor</span>
                            <span className="terminal__prompt-at">@</span>
                            <span className="terminal__prompt-host">ram</span>
                            <span className="terminal__prompt-colon">:</span>
                            <span className="terminal__prompt-path">~</span>
                            <span className="terminal__prompt-dollar">$ </span>
                            <div className="terminal__input-wrapper">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="terminal__input"
                                    spellCheck={false}
                                    autoComplete="off"
                                    aria-label="Terminal input"
                                />
                                {suggestion && (
                                    <span className="terminal__suggestion">
                                        {suggestion.slice(input.length)}
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Terminal;
