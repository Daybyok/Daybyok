import { useState, useEffect, useCallback } from 'react'
import './App.css'
import profile from './assets/profile.jpg'

const PROJECTS = [
  {
    title: 'Conversion_AVI-MP4',
    desc: 'A simple tool for converting AVI files to MP4 format.',
  },
  {
    title: 'app_dev',
    desc: 'A mobile application development project for ordering foods at the school campus.',
  },
  {
    title: 'Website',
    desc: 'My first Web Development Website in my 1st year of study.',
  },
]

const SKILLS = [
  { name: 'HTML / CSS', width: 80 },
  { name: 'JavaScript', width: 60 },
  { name: 'Git & GitHub', width: 70 },
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Daybyok' },
  { label: 'Facebook', href: 'https://www.facebook.com/nobdyknows0/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@darkzboltz333' },
]

const DROPDOWN_ITEMS = [
  { label: 'All Projects', href: '#projects' },
  { label: 'Web Development', href: 'https://daybyok.github.io/Conversion_AVI-MP4/', external: true },
  { label: 'Mobile Development', href: 'https://daybyok.github.io/app_dev/', external: true },
  { label: 'Graphic Design', href: 'https://daybyok.github.io/Website/', external: true },
]

const SECTION_IDS = ['home', 'about', 'projects', 'skills', 'experience', 'contact']

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')

  const updateActiveLink = useCallback(() => {
    const scrollPos = window.scrollY + 80
    let current = SECTION_IDS[0]
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el && scrollPos >= el.offsetTop) {
        current = id
      }
    })
    setActiveId(current)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateActiveLink)
    window.addEventListener('load', updateActiveLink)
    updateActiveLink()
    return () => {
      window.removeEventListener('scroll', updateActiveLink)
      window.removeEventListener('load', updateActiveLink)
    }
  }, [updateActiveLink])

  const toggleDropdown = () => setIsOpen((prev) => !prev)
  const closeDropdown = () => setIsOpen(false)

  const handleDropdownItemClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (href.startsWith('#')) {
      scrollTo(href)
    } else {
      window.open(href, '_blank')
    }
    closeDropdown()
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      const btn = document.getElementById('dropdownBtn')
      const menu = document.getElementById('dropdownMenu')
      if (btn && !btn.contains(target) && menu && !menu.contains(target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Me', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  const isActive = (href: string) => activeId === href.replace('#', '')

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#home" className="brand">My Portfolio</a>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-links${isActive(link.href) ? ' active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(link.href)
                setActiveId(link.href.replace('#', ''))
                closeDropdown()
              }}
            >
              {link.label}
            </a>
          ))}
          <li className="dropdown">
            <button id="dropdownBtn" type="button" onClick={toggleDropdown}>
              Projects <span className={`dropdown-arrow${isOpen ? ' open' : ''}`}>▼</span>
            </button>
            <ul id="dropdownMenu" className={`dropdown-menu${isOpen ? ' show' : ''}`}>
              {DROPDOWN_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`external ${item.external ? 'external' : ''}`}
                    onClick={(e) => handleDropdownItemClick(item.href, e)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </nav>
      </div>
    </header>
  )
}

function Home() {
  return (
    <section id="home" className="section">
      <div className="container center">
        <img className="avatar" src={profile} alt="Stephen Luna" />
        <h1 className="name">Stephen Luna</h1>
        <p className="tagline">Web Developer</p>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Daybyok Web Developer & Designer</p>
        <p className="bio">
          Creating Web for your business and personal needs. I am a passionate web developer with experience in building responsive and user-friendly websites. I enjoy turning ideas into reality through code and design.
        </p>
        <ul className="facts">
          <li><strong>Location:</strong> Ozamiz City, Philippines</li>
          <li><strong>Focus:</strong> Web Development, Design, &amp; Mobile Development</li>
          <li><strong>Status:</strong> Open to opportunities</li>
        </ul>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">A few things I have built.</p>
        <div className="cards">
          {PROJECTS.map((proj) => (
            <div className="card" key={proj.title}>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Things I work with every day.</p>
        {SKILLS.map((skill) => (
          <div className="skill" key={skill.name}>
            <span>{skill.name}</span>
            <div className="bar">
              <div className="fill" style={{ width: `${skill.width}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">Worked at local Wifi network.</p>
        <article className="job">
          <h3>Job Title</h3>
          <p className="job-meta">SureLink WiFi &bull; June 2020 &ndash; December 2023</p>
          <p>Working as a network technician at SureLink WiFi.</p>
        </article>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">
          For more information, please contact me on my email or phone. &mdash; I would love to hear from you.
        </p>
        <p className="contact-line">Email: p.zhane132@gmail.com</p>
        <p className="contact-line">Phone: +63 995 393 7350</p>
        <div className="socials">
          {SOCIALS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2026 Your Name. All rights reserved.</p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
