import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, Sparkles, ExternalLink, Download,
  ChevronDown, ChevronRight, Code2, Cpu, Figma, Server, Rocket,
  Monitor,
  Database,
  LayoutDashboardIcon,
  Wrench,
  Webhook,
  ChartColumnStacked
} from "lucide-react";
import "./index.css";

/* ---------- ANIMATIONS ---------- */
const fadeUp = {
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } },
};
const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

/* ---------- UTIL ---------- */
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`section ${className}`}>{children}</section>
);

/* ---------- NAVBAR (fixed) ---------- */
const Navbar = () => {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <div className="nav-fixed">
      <div className="nav-wrap">
        <div className="nav-inner glass">
          <motion.a
            href="#home"
            className="font-semibold tracking-tight text-white/90 text-glow text-lg"
            animate={{
              textShadow: [
                "0 0 12px rgba(140,160,255,.35)",
                "0 0 20px rgba(140,160,255,.8)",
                "0 0 12px rgba(140,160,255,.35)"
              ]
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            Himanshu Singh
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-white/80">
            {links.map(l => (
              <a key={l.href} href={l.href} className="link">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="btn px-3 py-1.5 bg-slate-700 text-white hover:bg-slate-600 hidden sm:inline-flex">
              <Mail size={16} />Contact
            </a>
            <a href="/Devanshu Singh.docx" className="btn px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white">
              <Download size={16} />Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- HERO ---------- */
const Hero = () => {

  const container = { animate: { transition: { staggerChildren: 0.12 } } };
  const word = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const headline = "Fueling digital transformation by blending Microsoft 365 depth with AI-driven automation.".split(" ");

  return (
    <Section id="home" className="hero-section">
      <div className="relative overflow-hidden card p-10 md:p-14">
        <div className="hero-blur-left" />
        <div className="hero-blur-right" />
        <div className="grid-2">
          <div>
            <span className="chip">
              <Sparkles size={14} /> Open for opportunities
            </span>
            <motion.h1
              className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-white text-glow"
              variants={container} initial="initial" animate="animate"
            >
              {headline.map((w, i) => (
                <motion.span key={i} variants={word} className="inline-block mr-2">{w}</motion.span>
              ))}
            </motion.h1>
            <p className="mt-4 text-muted">
              Passionate about harnessing the full Microsoft 365 and Azure ecosystem — from Copilot and AI Agents to Power Platform, SPFx, and Dataverse — to engineer intelligent, automated, and scalable enterprise solutions. Driven by innovation and precision, focused on transforming data, workflows, and user experiences into seamless digital ecosystems that empower smarter decision-making and real business impact.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary"><Rocket size={16} /> See Projects</a>
              <a href="https://www.linkedin.com/in/himanshu-singh-infy/" target="_blank" rel="noreferrer" className="btn btn-outline">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href="https://github.com/ScriptStrider/" target="_blank" rel="noreferrer" className="btn btn-outline">
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: .8 }} viewport={{ once: true }}
            className="relative aspect-square img-frame"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-sky-500/20 to-emerald-500/30" />
            <div className="absolute inset-0 grid place-items-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(140,160,255,0.3)",
                    "0 0 40px rgba(140,160,255,0.8)",
                    "0 0 20px rgba(140,160,255,0.3)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="hero-gif rounded-full glass overflow-hidden"
              >
                <img src="/Himanshu.jpeg" alt="Animated logo" className="w-full h-full object-cover scale-125" style={{ transform: 'rotate(0deg)' }} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex items-center gap-2 text-white/70"><ChevronDown size={18} /> Scroll to explore</div>
      </div>

    </Section>
  );
};

/* ---------- ABOUT ---------- */
const About = () => {
  const stats = [
    { k: "8+", v: "Years building custom applications in O365 suite." },
    { k: "30%", v: "Avg. KPI lift via Gen AI for complex power platform and spfx solutions." },
    { k: "40%", v: "Increase in productivity using Plans Designer in Powerapps Projects for architecting the backend database and relations." },
  ];
  return (
    <Section id="about" className="py-6">
      <div className="about-grid md:grid-cols-2 gap-10 items-start">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-4xl font-bold text-white">About me</h2>
          <p className="mt-3 text-muted">
            Fueling enterprise innovation through the power of Microsoft 365, AI, and automation — I bring 8+ years of hands-on expertise in building intelligent, scalable, and high-performance business solutions.
          </p>
          <p className="mt-3 text-muted">
            From crafting Copilot Agents and AI-driven workflows to engineering end-to-end Power Platform ecosystems, I specialize in transforming business challenges into seamless digital experiences. My core strengths span SharePoint Online & On-Prem (2013, 2019, SPO), Model-Driven & Canvas Power Apps, Power Automate, Dataverse, and Azure Logic Apps for deep, adaptive integrations.
          </p>
          <p className="mt-3 text-muted">
            On the engineering side, I build modern enterprise interfaces using SPFx, React, Redux, Hooks, AG Grid, Fluent UI, Tailwind CSS, and Framer Motion, delivering experiences that are as functional as they are fluid. I also design CI/CD pipelines in Azure DevOps and GitHub Enterprise, ensuring rapid, reliable deployments — and leverage Office Scripts with Power Automate to turn data into dynamic, automated insights.
          </p>
          <p className="mt-3 text-muted">
            Driven by a passion for automation, precision, and innovation, I’m on a mission to redefine how enterprises connect, operate, and evolve — blending Microsoft 365 precision with AI intelligence to build systems that truly think, adapt, and deliver.
          </p>
          <div className="mt-6 stats-grid md:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.k} className="p-4 card">
                <div className="text-2xl font-bold text-white">{s.k}</div>
                <div className="text-white/70 text-sm">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="grid gap-4" initial="rest" whileHover="hover">
          {[{ icon: ChartColumnStacked, title: "SharePoint Development", desc: "SharePoint Online, SharePoint 2013 & 2019 (On-Prem), Site Collections, Lists, Libraries, content-types, permissions, SPFx Development (React), Modern Pages customizations, REST API, PnPJs, CMAL Queries, Managed Metadata, SharePoint Webhooks" },
          { icon: Webhook, title: "Power Platform, Data, Analytics & Reporting", desc: "PowerApps (Canvas & Model Driven), PowerFx Formulas, Logic Building, Power Automate, Dataverse, Office Scripts for report generation, CoPilot Agent Development, Power BI, Power Automate + Office Scripts + PowerShell Scripting for Reporting, DAX, Power Query" },
          { icon: Monitor, title: "Cloud and Integration", desc: "Azure DevOps, CI/CD Automation, Azure logic Apps for 3rd Party Integration, Azure Functions, Azure Active Directory, Azure Key Vault, Azure Service Bus, Azure CLI Basics" },
          { icon: Database, title: "Front End Engineering, Backend & API", desc: "React, Redux and Hooks, AG Grid, Fluent UI, Tailwind CSS, Framer Motion, Typescript, Power Automate, Azure Logic Apps, Azure Functions Basics, Odata Queries, Graph API, SharePoint Rest API, PnPJs, SharePoint Webhooks" },
          { icon: Wrench, title: "DevOps, Version Control & Deployment", desc: "Azure DevOps for Build and Release Pipelines, Github Enterprise, CI/CD for SPFx Deployment Automation" },
          { icon: Wrench, title: "AI, Copilot & Modern Innovation Stack", desc: "Copilot Custom Agent development basics, Prompt Engineering, Amazon Q, Github Copilot" }].map((c, i) => (
            <motion.div key={i} variants={hoverLift} className="p-5 card flex items-center gap-4">
              <c.icon size={20} className="text-white" />
              <div>
                <div className="text-white font-semibold">{c.title}</div>
                <div className="text-white/70 text-sm">{c.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

/* ---------- SKILLS ---------- */
const Skills = () => {
  const skills = ["SharePoint Online", "SharePoint 2013 & 2019 (On-Prem)", "Site Collections", "Lists", "Libraries", "content-types", "permissions", "SPFx Development (React)", "Modern Pages customizations", "REST API", "PnPJs", "CMAL Queries", "Managed Metadata", "SharePoint Webhooks", "PowerApps (Canvas & Model Driven)", "PowerFx Formulas", "Logic Building", "Power Automate", "Dataverse", "Office Scripts for report generation", "CoPilot Agent Development", "Power BI", "Power Automate + Office Scripts + PowerShell Scripting for Reporting", "DAX", "Power Query", "Azure DevOps", "CI/CD Automation", "Azure logic Apps for 3rd Party Integration", "Azure Functions", "Azure Active Directory", "Azure Key Vault", "Azure Service Bus", "Azure CLI Basics", "React", "Redux and Hooks", "AG Grid", "Fluent UI", "Tailwind CSS", "Framer Motion", "Typescript", "Power Automate", "Azure Logic Apps", "Azure Functions Basics", "Odata Queries", "Graph API", "SharePoint Rest API", "PnPJs", "SharePoint Webhooks", "Azure DevOps for Build and Release Pipelines", "Github Enterprise", "CI/CD for SPFx Deployment Automation", "Copilot Agent development basics", "Prompt Engineering", "Amazon Q", "Github Copilot"];
  return (
    <Section id="skills" className="py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Skills</h2>
      <div className="marquee card">
        <motion.div
          className="marquee-track"
          animate={{ x: [0, -900] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          {[...skills, ...skills].map((s, i) => (
            <span key={i} className="tag px-4 py-2 text-sm">{s}</span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

/* ---------- PROJECTS ---------- */
const projects = [
  {
    title: "Citi-UpStart Programme - New Market",
    desc: "Developed an AI-driven dynamic pricing and waste optimization model using Python, SQL, and Prophet to forecast demand and identify near-expiry stock. Built Power BI and Tableau dashboards for perishable trends and performance insights, reducing food waste by 40% and boosting profit margins by 25%, supporting UN SDG 12.3 on sustainable consumption.",
    tags: ["Python", "Prophet", "Power BI", "SQL", "ML"],
    link: "https://newmarketprice.netlify.app/",
  },
  {
    title: "National College of Ireland - Exchequer Wine Bar, Dublin",
    desc: "Designed and implemented Salesforce CRM solutions using Apex, LWC, and Flow automation to streamline customer engagement, automate marketing workflows, and integrate real-time analytics for improved operational efficiency. Developed Salesforce - Power BI dashboards and executed SQL-based and Python-driven purchase trend and performance analysis, enabling 20% higher profitability through data-backed decision-making. Leveraged predictive analytics and Salesforce data modeling (Prophet, Tableau, PostgreSQL, MongoDB) for demand forecasting and customer segmentation, improving retention by 25% and reducing inventory waste by 30%.",
    tags: ["Salesforce", "Apex", "LWC", "REST"]
  },
  {
    title: "Himanshu Singh - Portfolio",
    desc: "This is my self made portfolio, developed on react using the recaptcha for contact security, Twilio and Send Grid for custom email api for a working contact us section. Also used Tailwind and framer motion for enhanced animations and smooth scrolling as a part for my full stack up skill in web development, This portfolio is currently a single page application which im working to make it multipage using routing. Feedback is highly appreciated.",
    tags: ["React", "Node", "PostgreSQL", "Framer Motion"]
  },
];

const Projects = () => {
  return (
    <Section id="projects" className="py-8">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Projects</h2>
        <a href="#contact" className="text-white/80 hover:text-white flex items-center gap-1">
          Work with me <ChevronRight size={16} />
        </a>
      </div>
      <div className="projects-grid md:grid-cols-3 gap-6">
        {projects.map((p, idx) => (
          <motion.a
            key={idx} href={p.link} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .6, delay: idx * .1 }}
            className="group card p-5 block"
          >
            <div className="h-36 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-800 grid place-items-center">
              <ExternalLink className="text-white/70" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white group-hover:underline underline-offset-4">{p.title}</h3>
            <p className="text-white/70 text-sm mt-1">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (<span key={t} className="tag">{t}</span>))}
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
};

/* ---------- EXPERIENCE ---------- */
const Experience = () => { 
  const items = [
    {
      role: "Manager", company: "VOIS", time: "Dec 2022 2025 – Present", duration: "3+ years",
      logo: "/Vodafone.png",
      points: [
        "As a SharePoint Lead Developer, I specialize in creating advanced enterprise solutions using PowerApps within the Power Platform. Leveraging Power Automate and SPFx with React.js, I integrate third-party grids like AG Grid and UI/UX frameworks such as Material UI and Office Fabric UI. My role involves developing optimized PowerApps solutions under O365 and maintaining CI/CD pipelines in Azure DevOps for automated deployments.",
        "Designed and deployed 6 large-scale PowerApps solutions, managing 140,000+ records in 50 days, ensuring performance and scalability.",
        "Led a team of 3 developers, enforcing best practices and delivering high-quality solutions in the Power Platform.",
        "Implemented advanced features like RBAC, Delegation, Batch CRUD, REST API integration, throttle handling, concurrency control, and error management in PowerApps and Power Automate.",
        "Developed an automated email crawler in Power Automate for workflow automation based on incoming emails.",
        "Created the EPIC Innovation Box app for idea management, integrating a notification system and approval workflows using Power Automate.",
        "Built a Service Readiness app for change request management with RBAC, detailed checklists, and real-time notifications for updates.",
        "Designed the Group Allocator app in PowerApps for managing ownerless groups, featuring self-nomination and approval workflows.",
        "Engineered a high-performance workflow for rapid creation and update of 4,000+ records, with robust reporting capabilities.",
        "Developed reusable SPFx solutions for Vodafones Global Portal, including apps like Bullet Notes, Navigation Journey, Greet, Ask, and Carousel using React.js, REST API, Material UI, and Fluent UI, enhancing user experience and content management."
      ]
    },
    {
      role: "Consultant", company: "Capgemini", duration: "9 Months", time: "Apr 2022 – Dec 2022",
      logo: "/Capgemini.png",
      points: [
        "Experienced in crafting enterprise solutions using SPFx with the React framework, integrating third-party frameworks such as AG Grid, Material UI, and also Office Fabric UI. My key responsibilities included developing highly optimized enterprise solutions within the PowerApps and Power Automate environments under the O365 umbrella. Additionally, I designed and maintained CI/CD pipelines in Azure DevOps to ensure seamless automated solution deployments.",
        "Gained experience in working as a SharePoint Developer with the designation of SharePoint Consultant working with SharePoint Online, SPFx (React, MaterialUi and Ag-Grid).",
        "Developed and deployed 1 Power Automate Workflow and 2 optimized SPFx Enterprise solutions within the span of just 50 days for the same department.",
        "Implemented advance concepts of Power Automate like concurrency, using rest api in power automate and handling throttling in power automate to develop heavy but optimized and efficient business workflows with proper Error handling.",
        "Worked on a enterprise level PowerApps solution to maintain internal leaves of team members to track leave requests.",
        "Developed multiple business workflows to maintain onboarding and offboarding of new candidates in HR Department using Power Automate.",
        "Developed SPFx solutions in SharePoint online for Freshers Manager feedback to record the feedback of managers for freshers using react material ui, fluent ui, PnPJs and ag grid.",
      ]
    },
    {
      role: "Technology Analyst", company: "Infosys", duration: "1 Years 1 Months", time: "Apr 2021 – Apr 2022",
      logo: "/Infosys.png",
      points: [
        "Added experience in working as a Senior Analyst in SHAREPOINT 2019 On Prem and SharePoint Online, AZURE DevOps, ONEDRIVE for BUSINESS, POWER AUTOMATE, POWERAPPS and SPFx.",
        "Extensively worked on Power Automate to automate many business process for onboarding the Infosys and non Infosys partners for the TAF Program.",
        "Automated the Incident tracking process to reduce manual effort by creating a SharePoint list Integrated SPFx form to submit the ticket details on a daily basis which in turns gets stored in the list.",
        "Used Power Automate to generate the report basis on the daily incident submission in the SPFx form and send it to the managers.",
        "Experience in using GitHub enterprise as version control for hosting source code and as a repository for the same.",
        "Leveraged Azure DevOps in integration with GitHub Enterprise repository for setting up CI/CD pipelines for automated deployment of the SPFx Solutions to SharePoint App Catalog.",
        "Experience in using custom Yeoman generator for generating Yml files for pipeline creation and deployment automation.",
        "Experience in using GitHub enterprise as version control for hosting source code and as a repository for the same.",
        "Leveraged Azure DevOps in integration with GitHub Enterprise repository for setting up CI/CD pipelines for automated deployment of the SPFx Solutions to SharePoint App Catalog.",
        "Experience in following the Agile methodology for developing solutions by planning Sprints, Features, PBIs and tasks for continuous improvement in the Development and release lifecycle.",
      ]
    },
    {
      role: "Associate SharePoint Consultant", company: "T Systems ICT India Pvt Ltd", duration: "3 Years 8 Months", time: "Aug 2017 – Mar 2021",
      logo: "/TSystems.png",
      points: [
        "Experienced in working as a consultant in SHAREPOINT, AZURE, ONEDRIVE for BUSINESS, POWERPLATFORM and Other Business Applications in Development and operations.",
        "Developed Live Dashboards for Clients using the POWERBI as per client requirements for displaying their data replacing the monotonous usage of excel for reporting and better analytics.",
        "Worked on creating MCAR [Microsoft Custom Application Registry] as canvas apps leveraging PowerApps and Power Automate for automating business process related to it.",
        "Extensive Knowledge on Power Automate and kinds of Power Automate Flows including Scheduled, Instant, Instant Flows.",
        "Developed solutions for reporting(Automation) and modification using POWERSHELL Scripting on a tenant level and Multiple Site Collections as well, gained intermediate Knowledge of PowerApps, PowerBI.",
        "Created Site pages for SharePoint site on both Classic and MUI(using SPFX).",
        "Hands on experience in GraphAPI, REST APIs to create dynamic webparts."
      ]
    }
  ];
return (
  <Section id="experience" className="py-8">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Experience</h2>
    <div className="timeline">
      <div className="timeline-line" />
      <div className="grid gap-8">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ x: -24, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: .6 }}
            className="timeline-item"
          >
            <div className="timeline-dot" />
            <div className="flex items-start gap-4">
              <img src={it.logo} alt={`${it.company} logo`} className="w-12 h-12 rounded-lg object-contain bg-white/10 p-2" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white font-semibold">{it.role}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/80">{it.company}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/80">{it.duration}</span>
                  <span className="ml-auto text-white/60 text-sm">{it.time}</span>
                </div>
                <ul className="mt-3 list-disc pl-5 text-white/80 text-sm">
                  {it.points.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);
};

/* ---------- CONTACT ---------- */
const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    // Ensure reCAPTCHA renders after component mounts
    if (window.grecaptcha && SITE_KEY) {
      setTimeout(() => {
        try {
          window.grecaptcha.render('recaptcha-container', {
            sitekey: SITE_KEY
          });
        } catch (e) {
          console.log('reCAPTCHA already rendered or error:', e);
        }
      }, 1000);
    }
  }, [SITE_KEY]);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const token = window.grecaptcha?.getResponse();
    if (!token) {
      alert("Please complete the reCAPTCHA.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    payload.token = token;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");

      setSent(true);
      e.target.reset();
      window.grecaptcha.reset();
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Section id="contact" className="py-8">
      <div className="p-8 card">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Let’s build something</h2>
        <p className="text-muted mt-2">I’m open to roles, freelance work, and collaborations.</p>
        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4 mt-6">
          {/* required fields for backend */}
          <input
            name="from_name"
            required
            placeholder="Your name"
            className="px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-white/50 border border-slate-700 focus:outline-none"
          />
          <input
            name="reply_to"
            required
            type="email"
            placeholder="Your email"
            className="px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-white/50 border border-slate-700 focus:outline-none"
          />

          {/* map to 'subject' on the server */}
          <input
            name="subject"
            placeholder="Company / Project (subject)"
            className="md:col-span-2 px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-white/50 border border-slate-700 focus:outline-none"
          />

          <textarea
            name="message"
            required
            placeholder="Message"
            rows={4}
            className="md:col-span-2 px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-white/50 border border-slate-700 focus:outline-none"
          />

          <div className="md:col-span-2">
            <div id="recaptcha-container" className="g-recaptcha" data-sitekey={SITE_KEY}></div>
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 btn px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Mail size={16} />
            {loading ? "Sending..." : "Send Message"}
          </button>

          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="md:col-span-2 text-sm text-emerald-300"
              >
                ✅ Thanks! Your message has been sent successfully.
              </motion.div>
            )}
          </AnimatePresence>
        </form>

      </div>
    </Section>
  );
};

/* ---------- FOOTER ---------- */
const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-row">
        <div>© {new Date().getFullYear()} Himanshu Singh. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="mailto:himanshusingh0657z@gmail.com" className="link">Email</a>
          <a href="https://www.linkedin.com/in/himanshu-singh-infy/" className="link">LinkedIn</a>
          <a href="https://github.com/ScriptStrider/" className="link">GitHub</a>
        </div>
      </div>
    </div>
  </footer>
);

/* ---------- ROOT ---------- */
export default function DynamicPortfolio() {
  return (
    <div className="app app-gradient">
      {/* masked radial texture */}
      <div className="mask-overlay">
        <div className="absolute inset-0 bg-radials" />
      </div>

      <Navbar />

      {/* spacer removed as requested */}

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
