import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV = ["Home","About","Programmes","Admissions","Faculty","Facilities","Contact"];

const PROGRAMMES = [
  { id:"nursing", name:"Nursing Sciences", short:"UG Nursing", color:"#00c896", dark:"#003d2a", grad:"135deg,#00c896,#00a07a", icon:"nursing", tag:"Undergraduate · Nursing", desc:"SCPM offers B.Sc Nursing and Post Basic B.Sc Nursing approved by the Indian Nursing Council and UP State Medical Faculty.", highlights:["B.Sc Nursing (4 yrs)","Post Basic B.Sc Nursing","ANM (2 yrs)","GNM (3 yrs)"], admission:"UP CNET / Merit", seats:"Multiple Intakes", body:"Indian Nursing Council" },
  { id:"paramedical", name:"Paramedical Sciences", short:"UG Paramedical", color:"#4f9eff", dark:"#0d2a56", grad:"135deg,#4f9eff,#1a6be0", icon:"flask", tag:"Undergraduate · Paramedical", desc:"Our paramedical stream offers BPT (Physiotherapy) and B.Sc Paramedical courses with hands-on clinical training.", highlights:["BPT – Physiotherapy","B.Sc Paramedical Sciences","Clinical Practicum","Diagnostic Training"], admission:"UP CPET (ABVMU)", seats:"Multiple Intakes", body:"UP State Medical Faculty" },
  { id:"pg", name:"PG Nursing & Allied", short:"PG Programmes", color:"#c47bff", dark:"#2d0e4d", grad:"135deg,#c47bff,#8833cc", icon:"grad", tag:"Postgraduate · Advanced", desc:"M.Sc Nursing, M.Sc Paramedical, and MPT designed for healthcare professionals seeking specialisation.", highlights:["M.Sc Nursing","M.Sc Paramedical","MPT – Physiotherapy","Research & Specialisation"], admission:"Merit Based", seats:"Limited Seats", body:"Dr. RML Avadh University" },
];

const STATS = [
  { value:17, suffix:"+", label:"Years of Excellence" },
  { value:5000, suffix:"+", label:"Alumni Nationwide" },
  { value:100, suffix:"+", label:"Expert Faculty" },
  { value:8, suffix:"+", label:"Programmes" },
];

const FACULTY = [
  { name:"Dr. O.N. Pandey", title:"Chairman & Founder", exp:"30+ yrs", initials:"OP", color:"#e8c44a" },
  { name:"Prof. Sunita Verma", title:"Principal – M.Sc Nursing", exp:"18 yrs", initials:"SV", color:"#00c896" },
  { name:"Dr. Rakesh Mishra", title:"HOD – BPT & MPT", exp:"15 yrs", initials:"RM", color:"#4f9eff" },
  { name:"Mrs. Anita Singh", title:"Sr. Lecturer – GNM & ANM", exp:"12 yrs", initials:"AS", color:"#c47bff" },
];

const EVENTS = [
  { date:"10 JUL", year:"2025", title:"UP CNET Admission Counselling – Nursing", tag:"Admissions", color:"#00c896" },
  { date:"20 JUL", year:"2025", title:"UP CPET Merit List – Paramedical Intake", tag:"Admissions", color:"#4f9eff" },
  { date:"05 AUG", year:"2025", title:"Freshers Orientation Day 2025–26", tag:"Event", color:"#e8c44a" },
  { date:"15 SEP", year:"2025", title:"Annual Nursing & Health Sciences Seminar", tag:"Seminar", color:"#c47bff" },
];

const FACILITIES = [
  { emoji:"📚", name:"Library", desc:"Rich nursing & medical references, journals and digital resources", color:"#00c896" },
  { emoji:"🏛", name:"Auditorium", desc:"Modern auditorium for seminars, events and conferences", color:"#4f9eff" },
  { emoji:"🏠", name:"Hostel", desc:"Separate boys & girls hostels with 24/7 security", color:"#e8c44a" },
  { emoji:"⚕️", name:"Clinical Labs", desc:"Anatomy, physiology, microbiology & paramedical labs", color:"#ff7b6b" },
  { emoji:"🖥", name:"Smart Classrooms", desc:"AC rooms with projectors and audio-visual systems", color:"#c47bff" },
  { emoji:"🏃", name:"Sports", desc:"Indoor & outdoor sports courts, gymnasium & recreation", color:"#00c896" },
];

function Icon({ type, size=28, color="#fff" }) {
  const p = { width:size, height:size };
  if (type==="nursing") return <svg {...p} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="14" r="7" stroke={color} strokeWidth="2"/><path d="M10 44c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M20 11h8M24 7v8" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></svg>;
  if (type==="flask") return <svg {...p} viewBox="0 0 48 48" fill="none"><path d="M18 6v17L8 36a5 5 0 004 8h24a5 5 0 004-8L30 23V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 6h18" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><circle cx="18" cy="34" r="2" fill={color} opacity="0.5"/><circle cx="27" cy="37" r="1.5" fill={color} opacity="0.6"/></svg>;
  if (type==="grad") return <svg {...p} viewBox="0 0 48 48" fill="none"><path d="M24 6L4 18l20 12 20-12L24 6z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/><path d="M10 24v9c0 5 6.268 9 14 9s14-4 14-9v-9" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M38 18v11" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><circle cx="38" cy="31" r="2.5" fill={color}/></svg>;
  if (type==="cross") return <svg {...p} viewBox="0 0 48 48" fill="none"><rect x="19" y="4" width="10" height="40" rx="3" fill={color}/><rect x="4" y="19" width="40" height="10" rx="3" fill={color}/></svg>;
  if (type==="heart") return <svg {...p} viewBox="0 0 48 48" fill="none"><path d="M24 42S4 30 4 16a10 10 0 0120-2 10 10 0 0120 2c0 14-20 26-20 26z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/><path d="M10 21h6l3-6 4 11 3-5h12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (type==="shield") return <svg {...p} viewBox="0 0 48 48" fill="none"><path d="M24 4L4 12v14c0 12 8 20 20 22 12-2 20-10 20-22V12L24 4z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/><path d="M15 24l6 6L33 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (type==="star") return <svg {...p} viewBox="0 0 48 48" fill="none"><path d="M24 6l5 10 11 1.6-8 7.8 1.9 11L24 31l-9.9 5.4 1.9-11-8-7.8L19 16 24 6z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/></svg>;
  if (type==="dna") return <svg {...p} viewBox="0 0 48 48" fill="none"><path d="M16 4c0 0 4 6 4 12s-4 10-4 16s4 6 4 12" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M32 4c0 0-4 6-4 12s4 10 4 16s-4 6-4 12" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/><line x1="18" y1="13" x2="30" y2="11" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/><line x1="16" y1="20" x2="32" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/><line x1="18" y1="27" x2="30" y2="29" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/><line x1="16" y1="34" x2="32" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/></svg>;
  return <svg {...p} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2" fill="none"/></svg>;
}

export default function SCPMWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(null);
  const [tab, setTab] = useState("UG");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [counters, setCounters] = useState([0,0,0,0]);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const aboutRef = useRef(null);
  const progRef = useRef(null);
  const facRef = useRef(null);
  const facCardsRef = useRef([]);
  const progCardsRef = useRef([]);
  const statsNumRefs = useRef([]);
  const facilRef = useRef(null);
  const eventsRef = useRef(null);
  const ctaRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroPillsRef = useRef(null);
  const navRef = useRef(null);
  const timelineRef = useRef(null);

  const UGList = [
    { name:"B.Sc Nursing", color:"#00c896", icon:"nursing" },
    { name:"Post Basic B.Sc Nursing", color:"#00c896", icon:"nursing" },
    { name:"ANM (2 Years)", color:"#00a07a", icon:"nursing" },
    { name:"GNM (3 Years)", color:"#00c896", icon:"nursing" },
    { name:"BPT – Physiotherapy", color:"#4f9eff", icon:"flask" },
    { name:"B.Sc Paramedical Sciences", color:"#4f9eff", icon:"flask" },
  ];
  const PGList = [
    { name:"M.Sc Nursing", color:"#c47bff", icon:"nursing" },
    { name:"M.Sc Paramedical", color:"#c47bff", icon:"flask" },
    { name:"MPT – Physiotherapy", color:"#9f55ef", icon:"flask" },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 0.1 });
    if (heroBadgeRef.current) {
      tl.fromTo(heroBadgeRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
    if (heroTitleRef.current) {
      const words = heroTitleRef.current.querySelectorAll(".gsap-word");
      tl.fromTo(words,
        { y: 80, opacity: 0, rotationX: 30 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.06, ease: "power4.out" },
        "-=0.4"
      );
    }
    if (heroPillsRef.current) {
      const pills = heroPillsRef.current.querySelectorAll(".prog-pill");
      tl.fromTo(pills,
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)" },
        "-=0.3"
      );
    }

    // Stats counter + entrance
    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => {
          const items = statsRef.current.querySelectorAll(".stat-item");
          gsap.fromTo(items,
            { y: 60, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }
          );
          // Animate counters
          STATS.forEach((s, i) => {
            const el = statsNumRefs.current[i];
            if (!el) return;
            gsap.to({ val: 0 }, {
              val: s.value, duration: 2, ease: "power2.out",
              onUpdate: function() {
                el.textContent = Math.round(this.targets()[0].val).toLocaleString() + s.suffix;
              }
            });
          });
        }
      });
    }

    // About section
    if (aboutRef.current) {
      const left = aboutRef.current.querySelector(".about-left");
      const right = aboutRef.current.querySelector(".about-right");
      const rows = aboutRef.current.querySelectorAll(".about-row");
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 75%",
        onEnter: () => {
          if (left) gsap.fromTo(left, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" });
          if (right) gsap.fromTo(right, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.15 });
          if (rows.length) gsap.fromTo(rows, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.4 });
        }
      });
    }

    // Programme cards
    if (progRef.current) {
      const header = progRef.current.querySelector(".prog-header");
      const cards = progRef.current.querySelectorAll(".prog-card");
      ScrollTrigger.create({
        trigger: progRef.current,
        start: "top 80%",
        onEnter: () => {
          if (header) gsap.fromTo(header, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
          if (cards.length) gsap.fromTo(cards,
            { y: 80, opacity: 0, rotationY: 15, scale: 0.9 },
            { y: 0, opacity: 1, rotationY: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: "back.out(1)", delay: 0.2 }
          );
        }
      });
    }

    // Faculty diamond cards
    if (facRef.current) {
      const cards = facRef.current.querySelectorAll(".fac-card");
      ScrollTrigger.create({
        trigger: facRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(cards,
            { scale: 0, opacity: 0, rotation: -15 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.1, ease: "elastic.out(1, 0.6)" }
          );
        }
      });
    }

    // Facilities
    if (facilRef.current) {
      const tiles = facilRef.current.querySelectorAll(".facil-tile");
      ScrollTrigger.create({
        trigger: facilRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(tiles,
            { x: (i) => i % 2 === 0 ? -60 : 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
          );
        }
      });
    }

    // Events timeline
    if (eventsRef.current) {
      const line = eventsRef.current.querySelector(".ev-line");
      const items = eventsRef.current.querySelectorAll(".ev-item");
      const left = eventsRef.current.querySelector(".ev-left");
      ScrollTrigger.create({
        trigger: eventsRef.current,
        start: "top 75%",
        onEnter: () => {
          if (left) gsap.fromTo(left, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
          if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 1, ease: "power2.inOut", delay: 0.3, transformOrigin: "top" });
          if (items.length) gsap.fromTo(items,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out", delay: 0.5 }
          );
        }
      });
    }

    // CTA
    if (ctaRef.current) {
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 80%",
        onEnter: () => {
          const els = ctaRef.current.querySelectorAll(".cta-el");
          gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" });
        }
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  // Hover on prog cards
  const onProgHover = (e, enter) => {
    gsap.to(e.currentTarget, {
      y: enter ? -12 : 0,
      scale: enter ? 1.03 : 1,
      duration: 0.4,
      ease: enter ? "power2.out" : "power2.inOut"
    });
  };

  const onFacHover = (e, enter) => {
    gsap.to(e.currentTarget, {
      y: enter ? -8 : 0,
      scale: enter ? 1.04 : 1,
      duration: 0.35,
      ease: "power2.out"
    });
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{overflow-x:hidden}
    .cg{font-family:'Cormorant Garamond',serif!important}
    .dm{font-family:'DM Sans',sans-serif!important}

    .gsap-word{display:inline-block;will-change:transform}

    /* NAV LINK */
    .nl{position:relative;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:11.5px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;transition:color .25s;padding-bottom:4px}
    .nl::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;background:#e8c44a;transition:width .3s}
    .nl:hover::after,.nl.act::after{width:100%}

    /* BUTTONS */
    .btn-gold{cursor:pointer;border:none;font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:.1em;text-transform:uppercase;background:linear-gradient(135deg,#e8c44a,#ffd966);color:#060b1a;transition:all .3s cubic-bezier(.22,1,.36,1)}
    .btn-gold:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 16px 44px rgba(232,196,74,.45)}
    .btn-ghost{cursor:pointer;border:1.5px solid rgba(255,255,255,.28);background:transparent;font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.8);transition:all .3s}
    .btn-ghost:hover{border-color:#e8c44a;color:#e8c44a}

    /* HEX shape for programme pills */
    .hex{clip-path:polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%);cursor:pointer;transition:filter .3s}
    .hex:hover{filter:brightness(1.18)}

    /* DIAMOND shape for faculty */
    .diamond{clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%)}

    /* Diagonal cut card */
    .diag-card{clip-path:polygon(0 0,100% 0,100% 88%,88% 100%,0 100%)}
    .diag-card-r{clip-path:polygon(0 0,100% 0,100% 100%,12% 100%,0 88%)}

    /* Organic blob pseudo */
    .blob-card{border-radius:30% 70% 70% 30%/30% 30% 70% 70%;transition:border-radius .4s ease}
    .blob-card:hover{border-radius:50% 50% 50% 50%}

    /* SHIMMER */
    .shimmer{background:linear-gradient(90deg,transparent,rgba(232,196,74,.22),transparent);background-size:300% 100%;animation:shimmer 3s ease-in-out infinite}
    @keyframes shimmer{0%{background-position:300% 0}100%{background-position:-300% 0}}

    /* KEYFRAMES */
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(232,196,74,.5)}60%{box-shadow:0 0 0 18px rgba(232,196,74,0)}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-16px) rotate(2deg)}}
    @keyframes heartbeat{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideUp{from{opacity:0;transform:translateY(28px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes ecgDraw{0%{stroke-dashoffset:800}100%{stroke-dashoffset:0}}
    @keyframes ambulanceRide{0%{transform:translateX(110vw)}100%{transform:translateX(-400px)}}
    @keyframes blobAnim{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}

    .spin{animation:spin 22s linear infinite}
    .float{animation:float 6s ease-in-out infinite}
    .heartbeat{animation:heartbeat 1.5s ease-in-out infinite}
    .pulse-ring{animation:pulse 2.2s infinite}
    .blob-anim{animation:blobAnim 8s ease-in-out infinite}

    /* MODAL */
    .modal-ov{position:fixed;inset:0;background:rgba(0,0,0,.9);backdrop-filter:blur(20px);z-index:2000;display:flex;align-items:center;justify-content:center;animation:fadeIn .3s}
    .modal-box{animation:slideUp .4s cubic-bezier(.22,1,.36,1)}

    /* PROG PILL HOVER */
    .prog-pill{cursor:pointer;will-change:transform}

    /* SCROLLBAR */
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-thumb{background:#e8c44a;border-radius:2px}

    /* ── RESPONSIVE ─────────────────────── */
    @media(max-width:1100px){
      .desktop-nav{display:none!important}
      .mob-btn{display:flex!important}
      .about-grid{flex-direction:column!important}
      .about-left,.about-right{width:100%!important;max-width:100%!important}
      .prog-3col{grid-template-columns:1fr 1fr!important}
      .fac-4col{grid-template-columns:repeat(2,1fr)!important}
      .facil-3col{grid-template-columns:repeat(2,1fr)!important}
      .ev-2col{grid-template-columns:1fr!important}
      .footer-4col{grid-template-columns:1fr 1fr!important}
      .step-3col{grid-template-columns:1fr!important}
    }
    @media(max-width:768px){
      .hero-btns{flex-direction:column!important;align-items:center!important}
      .hero-btns button{width:100%!important;max-width:280px}
      .prog-pills-grid{grid-template-columns:1fr!important}
      .stats-row{flex-direction:column!important;gap:40px!important}
      .stat-div{display:none!important}
      .fac-4col{grid-template-columns:1fr!important}
      .facil-3col{grid-template-columns:1fr!important}
      .prog-3col{grid-template-columns:1fr!important}
      .footer-4col{grid-template-columns:1fr!important}
      .hex-grid{grid-template-columns:repeat(2,1fr)!important}
      .about-orbit{display:none!important}
    }
    @media(max-width:520px){
      .section-pad{padding-left:20px!important;padding-right:20px!important}
      .modal-box{width:95%!important}
      .step-3col{gap:16px!important}
    }
  `;

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#060b1a", color:"#fff", overflowX:"hidden" }}>
      <style>{css}</style>

      {/* ══ NAVBAR ══════════════════════════════════════════ */}
      <nav ref={navRef} style={{
        position:"fixed", top:0, left:0, right:0, zIndex:900,
        background: scrolled ? "rgba(4,7,18,.96)" : "transparent",
        backdropFilter: scrolled ? "blur(28px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(232,196,74,.1)" : "none",
        padding: scrolled ? "13px 52px" : "22px 52px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        transition:"all .5s cubic-bezier(.22,1,.36,1)"
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:13 }}>
          <div className="heartbeat pulse-ring" style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#b91c1c,#ef4444)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Icon type="cross" size={20} color="#fff" />
          </div>
          <div>
            <div className="cg" style={{ color:"#fff", fontSize:16, fontWeight:700, lineHeight:1.2 }}>SCPM College</div>
            <div className="dm" style={{ color:"#e8c44a", fontSize:8, letterSpacing:".22em", textTransform:"uppercase" }}>Nursing & Paramedical Science</div>
          </div>
        </div>
        <div className="desktop-nav" style={{ display:"flex", gap:28, alignItems:"center" }}>
          {NAV.map(l => (
            <span key={l} className={`nl${activeNav===l?" act":""}`}
              style={{ color: activeNav===l ? "#e8c44a" : "rgba(255,255,255,.6)" }}
              onClick={() => setActiveNav(l)}>{l}</span>
          ))}
        </div>
        <button className="btn-gold desktop-nav" style={{ padding:"10px 24px", fontSize:11, borderRadius:40 }}>Apply Now →</button>
        <div className="mob-btn" style={{ display:"none", cursor:"pointer", zIndex:2 }} onClick={() => setMobileOpen(true)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"><path d="M3 12h18M3 6h12M3 18h15"/></svg>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position:"fixed", inset:0, background:"rgba(4,7,18,.98)", backdropFilter:"blur(20px)", zIndex:1100, padding:"80px 32px 40px", animation:"fadeIn .3s" }}>
          <button onClick={() => setMobileOpen(false)} style={{ position:"absolute", top:20, right:22, background:"rgba(255,255,255,.08)", border:"none", color:"white", fontSize:20, cursor:"pointer", borderRadius:"50%", width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          <div style={{ display:"flex", flexDirection:"column", gap:30, marginTop:16, textAlign:"center" }}>
            {NAV.map(l => (
              <span key={l} className="nl" style={{ color: activeNav===l?"#e8c44a":"rgba(255,255,255,.75)", fontSize:17 }}
                onClick={() => { setActiveNav(l); setMobileOpen(false); }}>{l}</span>
            ))}
            <hr style={{ borderColor:"rgba(232,196,74,.15)", margin:"6px 0" }} />
            <button className="btn-gold" style={{ padding:"14px 32px", fontSize:13, borderRadius:40, maxWidth:240, margin:"0 auto" }} onClick={() => setMobileOpen(false)}>Apply Now</button>
          </div>
        </div>
      )}

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ minHeight:"100vh", position:"relative", overflow:"hidden", background:"#060b1a", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {/* Animated hospital SVG */}
        <svg viewBox="0 0 1400 800" xmlns="http://www.w3.org/2000/svg" style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.16, zIndex:0, pointerEvents:"none" }}>
          <defs>
            <radialGradient id="hglow" cx="50%" cy="35%" r="55%"><stop offset="0%" stopColor="#e8c44a" stopOpacity=".38"/><stop offset="100%" stopColor="transparent"/></radialGradient>
            <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0c1e3f"/><stop offset="100%" stopColor="#060d1e"/></linearGradient>
          </defs>
          <ellipse cx="700" cy="300" rx="640" ry="390" fill="url(#hglow)"><animate attributeName="rx" values="640;660;640" dur="9s" repeatCount="indefinite"/></ellipse>
          {Array.from({length:90},(_,i) => (
            <circle key={i} cx={Math.abs(Math.sin(i*137.5)*700)+50} cy={Math.abs(Math.cos(i*97.3)*350)+50} r={i%6===0?1.8:.9} fill="#fff" opacity={.04+.18*(i%5)}>
              <animate attributeName="opacity" values={`${.04+.08*(i%4)};.6;${.04+.08*(i%4)}`} dur={`${1.8+i%5}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          <rect x="380" y="260" width="640" height="420" fill="url(#bldg)" rx="4"/>
          {Array.from({length:7},(_,r) => Array.from({length:11},(_,c) => (
            <rect key={`w${r}${c}`} x={400+c*55} y={280+r*44} width={30} height={34} rx="3" fill="#e8c44a" opacity={[.55,.06,.58,.06,.5,.06,.56,.06,.52,.06,.54][c%11]}>
              {c%2===0&&<animate attributeName="opacity" values=".12;.7;.12" dur={`${2+c*.4}s`} repeatCount="indefinite"/>}
            </rect>
          )))}
          <rect x="630" y="510" width="140" height="170" fill="#070f1f" rx="3"/>
          <rect x="650" y="550" width="100" height="130" fill="#0a1428" rx="2"/>
          <path d="M650 550 L700 525 L750 550" stroke="#e8c44a" strokeWidth="2" fill="none" opacity=".45"/>
          <rect x="655" y="155" width="90" height="110" fill="#08122a" rx="3"/>
          <rect x="676" y="168" width="12" height="84" rx="4" fill="#e8c44a" opacity=".9"><animate attributeName="opacity" values=".45;1;.45" dur="1.8s" repeatCount="indefinite"/></rect>
          <rect x="660" y="188" width="80" height="12" rx="4" fill="#e8c44a" opacity=".9"><animate attributeName="opacity" values=".45;1;.45" dur="1.8s" repeatCount="indefinite"/></rect>
          <rect x="120" y="360" width="260" height="320" fill="url(#bldg)" rx="3"/>
          {Array.from({length:5},(_,r) => Array.from({length:4},(_,c) => (<rect key={`l${r}${c}`} x={140+c*56} y={385+r*52} width={28} height={30} rx="2" fill="#e8c44a" opacity={c%2===0?.4:.05}><animate attributeName="opacity" values=".04;.5;.04" dur={`${2.5+r}s`} repeatCount="indefinite"/></rect>)))}
          <rect x="1020" y="360" width="260" height="320" fill="url(#bldg)" rx="3"/>
          {Array.from({length:5},(_,r) => Array.from({length:4},(_,c) => (<rect key={`r${r}${c}`} x={1040+c*56} y={385+r*52} width={28} height={30} rx="2" fill="#e8c44a" opacity={c%2===0?.4:.05}><animate attributeName="opacity" values=".04;.5;.04" dur={`${2.5+r}s`} repeatCount="indefinite"/></rect>)))}
          <rect x="0" y="668" width="1400" height="132" fill="#030810"/>
          <path d="M0 700 L100 700 L120 678 L140 722 L160 700 L240 700 L260 682 L280 718 L300 700 L380 700 L400 672 L420 728 L440 700 L550 700" stroke="#e8c44a" strokeWidth="2" fill="none" strokeDasharray="800" strokeDashoffset="800"><animate attributeName="stroke-dashoffset" values="800;0;800" dur="4s" repeatCount="indefinite"/></path>
          <g><animateTransform attributeName="transform" type="translate" values="1500,0;-400,0" dur="22s" repeatCount="indefinite"/>
            <rect x="0" y="638" width="170" height="55" rx="7" fill="#e8e8e8"/>
            <rect x="0" y="638" width="56" height="55" rx="7 0 0 7" fill="#d4d4d4"/>
            <rect x="9" y="645" width="36" height="24" rx="4" fill="#4f9eff" opacity=".85"/>
            <rect x="56" y="641" width="104" height="12" fill="#c0392b"/>
            <text x="72" y="651" fill="#fff" fontSize="9" fontFamily="Arial" fontWeight="bold">AMBULANCE</text>
            <circle cx="42" cy="696" r="11" fill="#222"/><circle cx="42" cy="696" r="5" fill="#555"/>
            <circle cx="128" cy="696" r="11" fill="#222"/><circle cx="128" cy="696" r="5" fill="#555"/>
            <rect x="68" y="630" width="24" height="9" rx="3" fill="#c0392b"><animate attributeName="opacity" values="1;.1;1" dur=".7s" repeatCount="indefinite"/></rect>
          </g>
          {[[90,545],[200,540],[1160,540],[1270,545]].map(([x,y],i) => (
            <g key={i}><rect x={x-4} y={y} width="8" height="48" fill="#040c18"/>
              <ellipse cx={x} cy={y} rx="28" ry="34" fill="#0a2418" opacity=".9"><animate attributeName="ry" values="34;36;34" dur={`${3+i}s`} repeatCount="indefinite"/></ellipse>
            </g>
          ))}
        </svg>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 85% 85% at 50% 50%,rgba(6,11,26,.45) 0%,rgba(4,7,16,.95) 100%)", zIndex:1, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"35%", background:"linear-gradient(to bottom,transparent,#060b1a)", zIndex:2, pointerEvents:"none" }}/>

        {/* Hero content */}
        <div style={{ position:"relative", zIndex:10, textAlign:"center", padding:"130px 24px 80px", maxWidth:1020, width:"100%" }}>
          <div ref={heroBadgeRef} style={{ marginBottom:30, opacity:0 }}>
            <span className="dm" style={{ display:"inline-block", background:"rgba(232,196,74,.1)", border:"1px solid rgba(232,196,74,.28)", borderRadius:40, padding:"9px 26px", fontSize:11, letterSpacing:".18em", textTransform:"uppercase", color:"#e8c44a", backdropFilter:"blur(10px)" }}>
              ✚&nbsp;&nbsp;INC Approved · Est. 2008 · UPSM Approved
            </span>
          </div>

          <h1 ref={heroTitleRef} className="cg" style={{ fontSize:"clamp(44px,7.5vw,96px)", fontWeight:700, lineHeight:1.0, marginBottom:14, perspective:600 }}>
            <div style={{ marginBottom:"0.08em" }}>
              {["Shaping","the"].map((w,i) => (
                <span key={w} style={{ marginRight:"0.25em" }}>
                  <span className="gsap-word" style={{ color:"#fff" }}>{w}</span>
                </span>
              ))}
            </div>
            <div style={{ marginBottom:"0.08em" }}>
              {["Healers","of","Tomorrow"].map((w,i) => (
                <span key={w} style={{ marginRight:"0.25em" }}>
                  <span className="gsap-word" style={{ background:"linear-gradient(90deg,#e8c44a,#ffd966,#f5c518)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{w}</span>
                </span>
              ))}
            </div>
            <div>
              <span className="gsap-word" style={{ color:"rgba(255,255,255,.5)", fontSize:"clamp(22px,4vw,50px)", fontStyle:"italic" }}>Since 2008</span>
            </div>
          </h1>

          {/* ECG line */}
          <div style={{ margin:"24px auto", maxWidth:240, height:3, overflow:"hidden" }}>
            <svg viewBox="0 0 240 4" width="240" height="4">
              <path d="M0 2L40 2L52 0L64 4L76 2L120 2L132 0.5L144 3.5L156 2L200 2L212 0L224 4L236 2L240 2" stroke="#e8c44a" strokeWidth="1.5" fill="none" strokeDasharray="300" strokeDashoffset="300">
                <animate attributeName="stroke-dashoffset" values="300;0" dur="1.8s" fill="freeze" begin="1s"/>
              </path>
            </svg>
          </div>

          <p className="dm" style={{ color:"rgba(255,255,255,.58)", fontSize:16, lineHeight:1.9, maxWidth:620, margin:"18px auto 10px", fontWeight:400 }}>
            SCPM College of Nursing and Paramedical Science, Gonda — delivering exceptional education in Nursing, Physiotherapy and Allied Health Sciences.
          </p>
          <p className="dm" style={{ color:"rgba(255,255,255,.3)", fontSize:11.5, maxWidth:580, margin:"0 auto 44px", letterSpacing:".05em", lineHeight:1.8 }}>
            Affiliated · Dr. RML Avadh University &nbsp;|&nbsp; Indian Nursing Council &nbsp;|&nbsp; UP State Medical Faculty, Govt. of UP
          </p>

          <div className="hero-btns" style={{ display:"flex", gap:16, justifyContent:"center", marginBottom:60, flexWrap:"wrap" }}>
            <button className="btn-gold" style={{ padding:"16px 44px", fontSize:12.5, borderRadius:50 }}>Explore Programmes</button>
            <button className="btn-ghost" style={{ padding:"16px 44px", fontSize:12.5, borderRadius:50 }}>Admissions 2025–26</button>
          </div>

          {/* Programme pills — hexagonal style */}
          <div ref={heroPillsRef} style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, maxWidth:860, margin:"0 auto" }} className="prog-pills-grid">
            {PROGRAMMES.map(p => (
              <div key={p.id} className="prog-pill" onClick={() => setModal(p)}
                style={{ background:`linear-gradient(145deg,${p.dark}f0,rgba(255,255,255,.04))`, border:`1px solid ${p.color}28`, backdropFilter:"blur(16px)", borderRadius:18, padding:"18px 22px", display:"flex", alignItems:"center", gap:14, cursor:"pointer", opacity:0 }}>
                <div style={{ width:50, height:50, borderRadius:14, background:`linear-gradient(${p.grad})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:`0 0 22px ${p.color}38` }}>
                  <Icon type={p.icon} size={24} color="#fff" />
                </div>
                <div style={{ textAlign:"left" }}>
                  <div className="cg" style={{ color:"#fff", fontSize:16, fontWeight:700, lineHeight:1.2 }}>{p.short}</div>
                  <div className="dm" style={{ color:"rgba(255,255,255,.42)", fontSize:9.5, letterSpacing:".1em", textTransform:"uppercase", marginTop:2 }}>{p.tag}</div>
                </div>
                <div style={{ marginLeft:"auto", color:p.color, fontSize:18, opacity:.7 }}>›</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:"absolute", bottom:26, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, zIndex:10 }}>
          <div className="dm" style={{ fontSize:9, letterSpacing:".38em", textTransform:"uppercase", color:"rgba(255,255,255,.3)" }}>Scroll</div>
          <div style={{ width:1.5, height:52, background:"linear-gradient(to bottom,rgba(232,196,74,.75),transparent)" }}/>
        </div>
      </section>

      {/* ══ STATS ═══════════════════════════════════════════ */}
      <section ref={statsRef} style={{ background:"#0b1025", padding:"90px 52px", position:"relative", overflow:"hidden" }} className="section-pad">
        {/* Diagonal top/bottom cuts */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:60 }}>
          <svg viewBox="0 0 1200 60" style={{ width:"100%", height:"100%" }}><path d="M0,0 L1200,0 L1200,60 L0,0 Z" fill="#060b1a"/></svg>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:60 }}>
          <svg viewBox="0 0 1200 60" style={{ width:"100%", height:"100%" }}><path d="M0,60 L1200,0 L1200,60 Z" fill="#0a0f1e"/></svg>
        </div>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", left:"10%", top:"40%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(232,196,74,.04),transparent 70%)" }}/>
          <div style={{ position:"absolute", right:"10%", top:"30%", width:250, height:250, borderRadius:"50%", background:"radial-gradient(circle,rgba(79,158,255,.04),transparent 70%)" }}/>
        </div>

        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div className="shimmer" style={{ height:1, marginBottom:60, borderRadius:1 }}/>
          <div className="stats-row" style={{ display:"flex", justifyContent:"space-around", alignItems:"center", flexWrap:"wrap", gap:32 }}>
            {STATS.map((s,i) => (
              <div key={s.label} className="stat-item" style={{ textAlign:"center", padding:"0 24px", position:"relative", flex:"1 1 160px" }}>
                {i>0 && <div className="stat-div" style={{ position:"absolute", left:0, top:"15%", height:"70%", width:1, background:"rgba(232,196,74,.1)" }}/>}
                {/* Rotated diamond background */}
                <div style={{ position:"absolute", width:80, height:80, background:"rgba(232,196,74,.04)", transform:"rotate(45deg)", top:"50%", left:"50%", marginTop:-40, marginLeft:-40 }}/>
                <div ref={el => statsNumRefs.current[i] = el} className="cg" style={{ fontSize:"clamp(46px,6vw,72px)", fontWeight:700, color:"#e8c44a", lineHeight:1, position:"relative" }}>
                  0{s.suffix}
                </div>
                <div className="dm" style={{ color:"rgba(255,255,255,.38)", fontSize:11, letterSpacing:".2em", textTransform:"uppercase", marginTop:8 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="shimmer" style={{ height:1, marginTop:60, borderRadius:1 }}/>
        </div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════ */}
      <section style={{ background:"#0a0f1e", padding:"100px 52px", position:"relative", overflow:"hidden" }} className="section-pad">
        {/* Large spinning DNA bg */}
        <div style={{ position:"absolute", right:"2%", top:"5%", opacity:.03, pointerEvents:"none" }}>
          <div className="spin"><Icon type="dna" size={320} color="#e8c44a"/></div>
        </div>
        {/* Diagonal color split bg */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(118deg,#060b1a 45%,#0e1c3d 45%)", zIndex:0, pointerEvents:"none" }}/>

        <div ref={aboutRef} style={{ maxWidth:1080, margin:"0 auto", position:"relative", zIndex:1, display:"flex", gap:70, alignItems:"center", flexWrap:"wrap" }} className="about-grid">
          <div className="about-left" style={{ flex:"1 1 420px", minWidth:0 }}>
            <div className="dm" style={{ color:"#e8c44a", fontSize:10.5, letterSpacing:".3em", textTransform:"uppercase", marginBottom:14 }}>Our Story</div>
            <h2 className="cg" style={{ fontSize:"clamp(26px,3.5vw,50px)", fontWeight:700, lineHeight:1.1, marginBottom:22, color:"#fff" }}>
              SCPM College of Nursing & Paramedical Science
            </h2>
            <p className="dm" style={{ color:"rgba(255,255,255,.54)", fontSize:15, lineHeight:2, marginBottom:14 }}>
              Founded in <strong style={{ color:"#fff" }}>2008</strong> by <strong style={{ color:"#e8c44a" }}>Dr. O.N. Pandey</strong>, SCPM is a distinguished institution in <strong style={{ color:"#fff" }}>Gonda, Uttar Pradesh</strong>, building skilled healthcare professionals.
            </p>
            <p className="dm" style={{ color:"rgba(255,255,255,.38)", fontSize:14, lineHeight:2, marginBottom:34 }}>
              Approved by <strong style={{ color:"#00c896" }}>UP State Medical Faculty</strong> &amp; <strong style={{ color:"#00c896" }}>Indian Nursing Council</strong>, affiliated to <strong style={{ color:"#4f9eff" }}>Dr. RML Avadh University</strong>.
            </p>
            {[
              { icon:"shield", label:"Dr. RML Avadh University", sub:"Affiliating University", c:"#4f9eff" },
              { icon:"heart", label:"Indian Nursing Council", sub:"Approved Body", c:"#00c896" },
              { icon:"star", label:"UP State Medical Faculty, Govt. of UP", sub:"Approved Body", c:"#e8c44a" },
            ].map(a => (
              <div key={a.label} className="about-row" style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10, padding:"13px 18px", background:"rgba(255,255,255,.03)", borderLeft:`2.5px solid ${a.c}`, transition:"all .3s", cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.background=`${a.c}10`; e.currentTarget.style.transform="translateX(6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.03)"; e.currentTarget.style.transform="none"; }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:`${a.c}18`, border:`1px solid ${a.c}35`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon type={a.icon} size={20} color={a.c}/>
                </div>
                <div>
                  <div className="dm" style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{a.label}</div>
                  <div className="dm" style={{ fontSize:10, color:"rgba(255,255,255,.3)", letterSpacing:".12em", textTransform:"uppercase" }}>{a.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Orbital visual */}
          <div className="about-right about-orbit" style={{ flex:"0 0 420px", position:"relative", height:460, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {[400,310,220].map((r,i) => (
              <div key={i} style={{ position:"absolute", width:r, height:r, borderRadius:"50%", border:`1px ${i===0?"dashed":"solid"} rgba(232,196,74,${.05+i*.04})`, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>
            ))}
            <div className="float" style={{ width:108, height:108, borderRadius:"50%", background:"linear-gradient(135deg,#e8c44a,#ffd966)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2, boxShadow:"0 0 70px rgba(232,196,74,.32)" }}>
              <Icon type="cross" size={52} color="#060b1a"/>
            </div>
            {[
              { label:"Est. 2008", sub:"Founded", angle:0, c:"#e8c44a" },
              { label:"Gonda, UP", sub:"Location", angle:72, c:"#4f9eff" },
              { label:"UG + PG", sub:"Courses", angle:144, c:"#00c896" },
              { label:"500+ Beds", sub:"Hospital", angle:216, c:"#c47bff" },
              { label:"INC Approved", sub:"Authority", angle:288, c:"#ff7b6b" },
            ].map(({ label, sub, angle, c }) => {
              const rad = (angle - 90) * Math.PI / 180;
              const r = 196;
              return (
                <div key={label} style={{ position:"absolute", left:`calc(50% + ${Math.cos(rad)*r}px)`, top:`calc(50% + ${Math.sin(rad)*r}px)`, transform:"translate(-50%,-50%)", background:"rgba(6,11,26,.95)", border:`1px solid ${c}40`, borderRadius:40, padding:"7px 13px", textAlign:"center", minWidth:86, zIndex:3, backdropFilter:"blur(12px)" }}>
                  <div className="cg" style={{ color:c, fontSize:13, fontWeight:700, lineHeight:1 }}>{label}</div>
                  <div className="dm" style={{ color:"rgba(255,255,255,.28)", fontSize:8.5, letterSpacing:".12em", textTransform:"uppercase" }}>{sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PROGRAMMES ══════════════════════════════════════ */}
      <section ref={progRef} style={{ padding:"96px 52px", background:"#0d1325", position:"relative", overflow:"hidden" }} className="section-pad">
        <div style={{ position:"absolute", top:0, left:0, right:0, height:70, overflow:"hidden" }}>
          <svg viewBox="0 0 1200 70" style={{ width:"100%", height:"100%" }}><path d="M0,48 C200,8 500,70 720,32 C900,5 1100,58 1200,40 L1200,0 L0,0 Z" fill="#0a0f1e"/></svg>
        </div>

        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <div className="prog-header" style={{ textAlign:"center", marginBottom:16 }}>
            <div className="dm" style={{ color:"#e8c44a", fontSize:10.5, letterSpacing:".3em", textTransform:"uppercase", marginBottom:12 }}>Academic Programmes</div>
            <h2 className="cg" style={{ fontSize:"clamp(28px,4vw,52px)", fontWeight:700, color:"#fff" }}>Courses We Offer</h2>
          </div>

          {/* Tab switcher — parallelogram style */}
          <div style={{ display:"flex", justifyContent:"center", gap:14, margin:"28px 0 48px", flexWrap:"wrap" }}>
            {["UG","PG"].map(t => (
              <button key={t} onClick={() => setTab(t)} className="dm"
                style={{ padding:"12px 48px", fontSize:12, fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", background: tab===t ? "linear-gradient(135deg,#e8c44a,#ffd966)" : "rgba(255,255,255,.05)", color: tab===t ? "#060b1a" : "rgba(255,255,255,.45)", border: tab===t ? "none" : "1px solid rgba(255,255,255,.1)", clipPath:"polygon(8% 0%,100% 0%,92% 100%,0% 100%)", cursor:"pointer", transition:"all .35s cubic-bezier(.22,1,.36,1)" }}>
                {t === "UG" ? "Undergraduate" : "Postgraduate"}
              </button>
            ))}
          </div>

          {/* Hexagonal course grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:60, maxWidth:700, margin:"0 auto 60px" }} className="hex-grid">
            {(tab==="UG"?UGList:PGList).map((c,i) => (
              <div key={c.name} style={{ display:"flex", justifyContent:"center" }}>
                <div style={{ width:180, height:180, clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", background:`linear-gradient(145deg,${c.color}18,${c.color}08)`, border:`1.5px solid ${c.color}25`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, textAlign:"center", padding:"20px 30px", cursor:"pointer", transition:"all .35s", boxSizing:"border-box" }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { scale:1.07, duration:.3, ease:"back.out(1.5)" })}
                  onMouseLeave={e => gsap.to(e.currentTarget, { scale:1, duration:.3 })}>
                  <Icon type={c.icon} size={24} color={c.color}/>
                  <div className="cg" style={{ fontSize:13, fontWeight:700, color:"#fff", lineHeight:1.25 }}>{c.name}</div>
                  <div className="dm" style={{ fontSize:8.5, color:"rgba(255,255,255,.28)", letterSpacing:".1em", textTransform:"uppercase" }}>{tab} Programme</div>
                </div>
              </div>
            ))}
          </div>

          {/* Programme feature cards — diagonal cut shape */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }} className="prog-3col">
            {PROGRAMMES.map((p,i) => (
              <div key={p.id} className="prog-card" onClick={() => setModal(p)}
                style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 8px 36px rgba(0,0,0,.45)", cursor:"pointer", transform:"translateY(0)" }}
                onMouseEnter={e => onProgHover(e, true)}
                onMouseLeave={e => onProgHover(e, false)}>
                <div style={{ background:`linear-gradient(${p.grad})`, minHeight:340, padding:"34px 28px", position:"relative", overflow:"hidden" }}>
                  {/* Shine */}
                  <div style={{ position:"absolute", top:"-60%", right:"-25%", width:"60%", height:"200%", background:"rgba(255,255,255,.06)", transform:"rotate(20deg)", pointerEvents:"none" }}/>
                  {/* Large bg icon */}
                  <div style={{ position:"absolute", bottom:-20, right:-14, opacity:.06, pointerEvents:"none" }}>
                    <Icon type={p.icon} size={180} color="#fff"/>
                  </div>
                  {/* DNA decoration */}
                  <div style={{ position:"absolute", top:10, right:12, opacity:.12 }}>
                    <Icon type="dna" size={52} color="#fff"/>
                  </div>
                  <div style={{ position:"relative", zIndex:2 }}>
                    <div style={{ width:58, height:58, borderRadius:14, background:"rgba(255,255,255,.16)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, border:"1px solid rgba(255,255,255,.25)", backdropFilter:"blur(4px)" }}>
                      <Icon type={p.icon} size={30} color="#fff"/>
                    </div>
                    <h3 className="cg" style={{ fontSize:24, fontWeight:700, color:"#fff", marginBottom:8, lineHeight:1.15 }}>{p.name}</h3>
                    <div className="dm" style={{ color:"rgba(255,255,255,.42)", fontSize:10, letterSpacing:".15em", marginBottom:14, textTransform:"uppercase" }}>{p.tag}</div>
                    <p className="dm" style={{ color:"rgba(255,255,255,.7)", fontSize:13.5, lineHeight:1.85, marginBottom:22 }}>{p.desc.substring(0,100)}…</p>
                    <button className="dm" onClick={e => { e.stopPropagation(); setModal(p); }}
                      style={{ background:"rgba(255,255,255,.16)", border:"1px solid rgba(255,255,255,.26)", color:"#fff", padding:"9px 22px", fontSize:11, borderRadius:40, cursor:"pointer", letterSpacing:".08em", textTransform:"uppercase", fontWeight:600, transition:"background .2s" }}
                      onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,.28)"}
                      onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,.16)"}>
                      Know More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ADMISSIONS ══════════════════════════════════════ */}
      <section style={{ padding:"96px 52px", background:"#080f20", position:"relative", overflow:"hidden" }} className="section-pad">
        <div style={{ position:"absolute", top:0, left:0, right:0, height:65 }}>
          <svg viewBox="0 0 1200 65" style={{ width:"100%", height:"100%" }}><path d="M0,0 L1200,0 L1200,65 L0,0 Z" fill="#0d1325"/></svg>
        </div>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div className="dm" style={{ color:"#e8c44a", fontSize:10.5, letterSpacing:".3em", textTransform:"uppercase", marginBottom:12 }}>How to Apply</div>
            <h2 className="cg" style={{ fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:"#fff" }}>Admission Process</h2>
          </div>
          {/* Chevron-linked steps */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }} className="step-3col">
            {[
              { n:"01", icon:"nursing", title:"Nursing Courses", desc:"B.Sc Nursing & PB B.Sc Nursing via UP CNET. M.Sc Nursing via merit.", badge:"UP CNET", c:"#00c896" },
              { n:"02", icon:"flask", title:"Paramedical", desc:"BPT, B.Sc Paramedical and MPT via UP CPET (ABVMU) merit.", badge:"UP CPET", c:"#4f9eff" },
              { n:"03", icon:"shield", title:"ANM & GNM", desc:"Admissions via institute entrance exam conducted by SCPM College.", badge:"Institute Exam", c:"#e8c44a" },
            ].map((step, i) => (
              <div key={step.n}
                style={{ background:"rgba(255,255,255,.03)", border:`1px solid ${step.c}18`, borderRadius:22, padding:"36px 28px", position:"relative", overflow:"hidden", transition:"all .4s cubic-bezier(.22,1,.36,1)" }}
                onMouseEnter={e => { gsap.to(e.currentTarget, { y:-8, duration:.35, ease:"power2.out" }); e.currentTarget.style.borderColor=`${step.c}45`; e.currentTarget.style.boxShadow=`0 24px 64px ${step.c}16`; }}
                onMouseLeave={e => { gsap.to(e.currentTarget, { y:0, duration:.35 }); e.currentTarget.style.borderColor=`${step.c}18`; e.currentTarget.style.boxShadow="none"; }}>
                {/* Big number bg */}
                <div className="cg" style={{ position:"absolute", top:8, right:18, fontSize:76, fontWeight:700, color:`${step.c}07`, lineHeight:1 }}>{step.n}</div>
                {/* Organic blob decoration */}
                <div style={{ position:"absolute", bottom:-30, left:-30, width:130, height:130, background:`${step.c}06`, borderRadius:"60% 40% 30% 70%/60% 30% 70% 40%", pointerEvents:"none" }}/>
                <div style={{ width:56, height:56, borderRadius:"50%", background:`${step.c}18`, border:`2px solid ${step.c}45`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, position:"relative" }}>
                  <Icon type={step.icon} size={28} color={step.c}/>
                </div>
                <h3 className="cg" style={{ fontSize:21, fontWeight:700, color:"#fff", marginBottom:10 }}>{step.title}</h3>
                <p className="dm" style={{ color:"rgba(255,255,255,.45)", fontSize:13.5, lineHeight:1.9, marginBottom:18 }}>{step.desc}</p>
                <span className="dm" style={{ display:"inline-block", background:`${step.c}14`, color:step.c, border:`1px solid ${step.c}30`, borderRadius:40, padding:"5px 16px", fontSize:11, letterSpacing:".1em", textTransform:"uppercase" }}>{step.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FACULTY — Diamond cards ══════════════════════════ */}
      <section ref={facRef} style={{ padding:"100px 52px", background:"#0a0f1e", position:"relative", overflow:"hidden" }} className="section-pad">
        <div style={{ position:"absolute", top:0, left:0, right:0, height:65 }}>
          <svg viewBox="0 0 1200 65" style={{ width:"100%", height:"100%" }}><path d="M0,65 L1200,0 L1200,65 Z" fill="#080f20"/></svg>
        </div>
        <div style={{ position:"absolute", right:"-4%", top:"50%", transform:"translateY(-50%)", width:460, height:460, borderRadius:"50%", background:"radial-gradient(circle,rgba(232,196,74,.022),transparent 70%)", pointerEvents:"none" }}/>

        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <div className="dm" style={{ color:"#e8c44a", fontSize:10.5, letterSpacing:".3em", textTransform:"uppercase", marginBottom:12 }}>Our People</div>
            <h2 className="cg" style={{ fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:"#fff" }}>Leadership & Faculty</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:30 }} className="fac-4col">
            {FACULTY.map((f,i) => (
              <div key={f.name} className="fac-card" style={{ cursor:"default" }}>
                {/* Organic shape card */}
                <div className="blob-anim" style={{ background:`linear-gradient(145deg,${f.color}18,rgba(255,255,255,.03))`, border:`1px solid ${f.color}22`, padding:"36px 22px 28px", textAlign:"center", position:"relative", overflow:"hidden" }}
                  onMouseEnter={e => onFacHover(e, true)}
                  onMouseLeave={e => onFacHover(e, false)}>
                  {/* Bg glow */}
                  <div style={{ position:"absolute", top:-50, left:"50%", transform:"translateX(-50%)", width:130, height:130, borderRadius:"50%", background:`${f.color}07` }}/>
                  {/* Decorative small icon bottom right */}
                  <div style={{ position:"absolute", bottom:-2, right:-2, opacity:.05 }}>
                    <Icon type="stethoscope" size={88} color={f.color}/>
                  </div>
                  <div style={{ width:78, height:78, borderRadius:"50%", background:`linear-gradient(135deg,${f.color}cc,${f.color}55)`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", border:`3px solid ${f.color}`, boxShadow:`0 0 28px ${f.color}42` }}>
                    <span className="cg" style={{ fontSize:26, color:"#fff", fontWeight:700 }}>{f.initials}</span>
                  </div>
                  <div className="cg" style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:6 }}>{f.name}</div>
                  <div className="dm" style={{ fontSize:11.5, color:"rgba(255,255,255,.4)", lineHeight:1.6, marginBottom:14 }}>{f.title}</div>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${f.color}14`, borderRadius:40, padding:"4px 14px" }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:f.color }}/>
                    <span className="dm" style={{ fontSize:11, color:f.color }}>{f.exp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FACILITIES ══════════════════════════════════════ */}
      <section ref={facilRef} style={{ padding:"90px 52px 100px", background:"#0b1025", position:"relative", overflow:"hidden" }} className="section-pad">
        <div style={{ position:"absolute", top:0, left:0, right:0, height:65 }}>
          <svg viewBox="0 0 1200 65" style={{ width:"100%", height:"100%" }}><path d="M0,0 L1200,65 L0,65 Z" fill="#0a0f1e"/></svg>
        </div>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div className="dm" style={{ color:"#e8c44a", fontSize:10.5, letterSpacing:".3em", textTransform:"uppercase", marginBottom:12 }}>Campus Life</div>
            <h2 className="cg" style={{ fontSize:"clamp(28px,4vw,50px)", fontWeight:700, color:"#fff" }}>World-Class Facilities</h2>
          </div>
          {/* Staggered organic tile grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }} className="facil-3col">
            {FACILITIES.map((f,i) => (
              <div key={f.name} className="facil-tile" style={{ marginTop: i%3===1 ? 30 : 0 }}
                onMouseEnter={e => onFacHover(e, true)}
                onMouseLeave={e => onFacHover(e, false)}>
                {/* Organic border-radius card */}
                <div style={{ background:"rgba(255,255,255,.03)", border:`1px solid ${f.color}16`, borderRadius:"24px 8px 24px 8px", overflow:"hidden", position:"relative" }}>
                  {/* Angled header */}
                  <div style={{ background:`linear-gradient(135deg,${f.color}40,${f.color}20)`, height:82, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", right:-20, bottom:-20, width:80, height:80, borderRadius:"50%", background:`${f.color}25` }}/>
                    <span style={{ fontSize:38, position:"relative", zIndex:1 }}>{f.emoji}</span>
                  </div>
                  <div style={{ padding:"22px 26px 28px" }}>
                    <h3 className="cg" style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:8 }}>{f.name}</h3>
                    <p className="dm" style={{ color:"rgba(255,255,255,.42)", fontSize:13.5, lineHeight:1.85 }}>{f.desc}</p>
                  </div>
                  <div style={{ height:3, background:`linear-gradient(to right,${f.color},transparent)` }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EVENTS — Timeline ════════════════════════════════ */}
      <section ref={eventsRef} style={{ padding:"90px 52px", background:"#080f20", position:"relative", overflow:"hidden" }} className="section-pad">
        <div style={{ position:"absolute", top:0, left:0, right:0, height:65 }}>
          <svg viewBox="0 0 1200 65" style={{ width:"100%", height:"100%" }}><path d="M0,65 L1200,0 L1200,65 Z" fill="#0b1025"/></svg>
        </div>
        <div style={{ maxWidth:1080, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:80, alignItems:"start" }} className="ev-2col">
          <div className="ev-left">
            <div className="dm" style={{ color:"#e8c44a", fontSize:10.5, letterSpacing:".3em", textTransform:"uppercase", marginBottom:14 }}>Notice Board</div>
            <h2 className="cg" style={{ fontSize:"clamp(26px,3.5vw,46px)", fontWeight:700, color:"#fff", marginBottom:16, lineHeight:1.1 }}>Upcoming Events & Admission Updates</h2>
            <p className="dm" style={{ color:"rgba(255,255,255,.38)", lineHeight:1.9, marginBottom:32, fontSize:14.5 }}>
              Stay informed about admission counselling dates, academic events and orientation.
            </p>
            <button className="btn-gold" style={{ padding:"14px 34px", fontSize:12, borderRadius:40 }}>View All Notices</button>
          </div>

          {/* Timeline */}
          <div style={{ position:"relative" }}>
            {/* Vertical timeline line */}
            <div className="ev-line" style={{ position:"absolute", left:30, top:0, bottom:0, width:2, background:"linear-gradient(to bottom,#e8c44a,rgba(232,196,74,.1))", transformOrigin:"top" }}/>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {EVENTS.map((ev,i) => (
                <div key={ev.title} className="ev-item" style={{ display:"flex", alignItems:"flex-start", gap:22, padding:"0 0 28px 66px", position:"relative", cursor:"pointer" }}
                  onMouseEnter={e => gsap.to(e.currentTarget, { x:6, duration:.25, ease:"power2.out" })}
                  onMouseLeave={e => gsap.to(e.currentTarget, { x:0, duration:.25 })}>
                  {/* Timeline dot */}
                  <div style={{ position:"absolute", left:22, top:8, width:18, height:18, borderRadius:"50%", background:`${ev.color}`, boxShadow:`0 0 14px ${ev.color}80`, border:`3px solid #080f20` }}/>
                  {/* Date badge — diamond */}
                  <div style={{ flexShrink:0, background:`${ev.color}14`, padding:"10px 14px", borderRadius:"8px 2px 8px 2px", textAlign:"center", minWidth:64 }}>
                    <div className="cg" style={{ color:ev.color, fontSize:22, fontWeight:700, lineHeight:1 }}>{ev.date.split(" ")[0]}</div>
                    <div className="dm" style={{ color:"rgba(255,255,255,.3)", fontSize:8.5, letterSpacing:".1em", textTransform:"uppercase" }}>{ev.date.split(" ")[1]}<br/>{ev.year}</div>
                  </div>
                  <div style={{ flex:1, paddingTop:8 }}>
                    <div className="cg" style={{ color:"#fff", fontSize:16, fontWeight:600, marginBottom:8, lineHeight:1.3 }}>{ev.title}</div>
                    <span className="dm" style={{ background:`${ev.color}14`, color:ev.color, borderRadius:40, padding:"3px 12px", fontSize:10, letterSpacing:".1em", textTransform:"uppercase" }}>{ev.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{ padding:"110px 52px", background:"linear-gradient(145deg,#060e22 0%,#051a0f 100%)", position:"relative", overflow:"hidden", textAlign:"center" }} className="section-pad">
        {/* Ambient glow */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at center,rgba(232,196,74,.07) 0%,transparent 65%)", pointerEvents:"none" }}/>
        {/* Large blob decorations */}
        <div className="blob-anim" style={{ position:"absolute", left:"-5%", top:"50%", transform:"translateY(-50%)", width:300, height:300, background:"rgba(0,200,150,.04)", pointerEvents:"none" }}/>
        <div className="blob-anim" style={{ position:"absolute", right:"-5%", top:"50%", transform:"translateY(-50%)", width:280, height:280, background:"rgba(196,123,255,.04)", animationDelay:"2s", pointerEvents:"none" }}/>
        {/* DNA icons */}
        <div style={{ position:"absolute", left:"6%", top:"50%", transform:"translateY(-50%)", opacity:.035, pointerEvents:"none" }}>
          <Icon type="dna" size={280} color="#e8c44a"/>
        </div>
        <div style={{ position:"absolute", right:"6%", top:"50%", transform:"translateY(-50%) scaleX(-1)", opacity:.035, pointerEvents:"none" }}>
          <Icon type="dna" size={280} color="#e8c44a"/>
        </div>

        <div style={{ position:"relative", zIndex:2 }}>
          <div className="cta-el heartbeat pulse-ring" style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,#b91c1c,#ef4444)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px", boxShadow:"0 0 50px rgba(185,28,28,.42)" }}>
            <Icon type="cross" size={34} color="#fff"/>
          </div>
          <div className="cta-el dm" style={{ color:"#e8c44a", fontSize:11, letterSpacing:".3em", textTransform:"uppercase", marginBottom:20 }}>Admissions 2025–26 Open</div>
          <h2 className="cta-el cg" style={{ fontSize:"clamp(30px,5vw,64px)", fontWeight:700, color:"#fff", marginBottom:20, lineHeight:1.08 }}>
            Begin Your Healthcare<br/>Career at SCPM
          </h2>
          <p className="cta-el dm" style={{ color:"rgba(255,255,255,.45)", fontSize:16, maxWidth:520, margin:"0 auto 48px", lineHeight:2 }}>
            B.Sc Nursing, GNM, ANM, BPT, M.Sc Nursing & MPT — via UP CNET, UP CPET or Institute Merit.
          </p>
          <div className="cta-el" style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-gold" style={{ padding:"18px 52px", fontSize:13, borderRadius:50 }}>Apply for Admission</button>
            <button className="btn-ghost" style={{ padding:"18px 52px", fontSize:13, borderRadius:50 }}>Download Prospectus</button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════ */}
      <footer style={{ background:"#030710", padding:"64px 52px 28px" }} className="section-pad">
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.5fr", gap:48, marginBottom:48 }} className="footer-4col">
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:13, marginBottom:18 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#b91c1c,#ef4444)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon type="cross" size={18} color="#fff"/>
                </div>
                <div className="cg" style={{ color:"#fff", fontSize:15, fontWeight:700, lineHeight:1.2 }}>SCPM College<br/><span style={{ fontSize:11, fontWeight:400, color:"#e8c44a" }}>Nursing & Paramedical Science</span></div>
              </div>
              <p className="dm" style={{ fontSize:13, lineHeight:2, color:"rgba(255,255,255,.35)" }}>Committed to producing skilled healthcare professionals since 2008. Located in Gonda, Uttar Pradesh.</p>
            </div>
            {[
              { title:"Quick Links", items:["Home","About Us","Programmes","Admissions","Faculty","Facilities"] },
              { title:"Programmes", items:["B.Sc Nursing","Post Basic B.Sc","GNM / ANM","BPT","M.Sc Nursing","MPT"] },
            ].map(col => (
              <div key={col.title}>
                <div className="dm" style={{ color:"#e8c44a", fontSize:10, letterSpacing:".22em", textTransform:"uppercase", marginBottom:18 }}>{col.title}</div>
                {col.items.map(item => (
                  <div key={item} className="dm" style={{ fontSize:13, marginBottom:11, cursor:"pointer", color:"rgba(255,255,255,.33)", transition:"color .2s" }}
                    onMouseEnter={e => e.target.style.color="#fff"}
                    onMouseLeave={e => e.target.style.color="rgba(255,255,255,.33)"}>{item}</div>
                ))}
              </div>
            ))}
            <div>
              <div className="dm" style={{ color:"#e8c44a", fontSize:10, letterSpacing:".22em", textTransform:"uppercase", marginBottom:18 }}>Contact Us</div>
              {["📍 SCPM College, Gonda, UP","📞 +91 XXXXX XXXXX","✉ admissions@scpmcollege.ac.in","🌐 www.scpmcollege.ac.in"].map(c => (
                <div key={c} className="dm" style={{ fontSize:13, marginBottom:11, color:"rgba(255,255,255,.33)" }}>{c}</div>
              ))}
              <div style={{ marginTop:18, paddingTop:14, borderTop:"1px solid rgba(255,255,255,.05)" }}>
                <div className="dm" style={{ fontSize:10.5, color:"rgba(255,255,255,.18)", lineHeight:1.8 }}>Affiliated: Dr. RML Avadh University<br/>Approved: INC · UP State Medical Faculty</div>
              </div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.05)", paddingTop:22, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
            <div className="dm" style={{ fontSize:12, color:"rgba(255,255,255,.3)" }}>© 2025 SCPM College of Nursing and Paramedical Science, Gonda.</div>
            <div className="dm" style={{ fontSize:12, color:"rgba(255,255,255,.3)" }}>Founded by Dr. O.N. Pandey · Est. 2008</div>
          </div>
        </div>
      </footer>

      {/* ══ MODAL ════════════════════════════════════════════ */}
      {modal && (
        <div className="modal-ov" onClick={() => setModal(null)}>
          <div className="modal-box" style={{ width:"90%", maxWidth:620, borderRadius:22, overflow:"hidden", background:"#0d1325", boxShadow:"0 40px 100px rgba(0,0,0,.85)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ height:4, background:`linear-gradient(90deg,${modal.color},${modal.dark})` }}/>
            <div style={{ padding:34 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
                <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                  <div style={{ width:56, height:56, borderRadius:14, background:`linear-gradient(${modal.grad})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 24px ${modal.color}40` }}>
                    <Icon type={modal.icon} size={28} color="#fff"/>
                  </div>
                  <div>
                    <div className="dm" style={{ color:modal.color, fontSize:10, letterSpacing:".2em", textTransform:"uppercase", marginBottom:3 }}>{modal.tag}</div>
                    <h2 className="cg" style={{ fontSize:23, fontWeight:700, color:"#fff" }}>{modal.name}</h2>
                  </div>
                </div>
                <button onClick={() => setModal(null)} style={{ background:"rgba(255,255,255,.07)", border:"none", width:34, height:34, borderRadius:"50%", cursor:"pointer", color:"#aaa", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
              </div>
              <p className="dm" style={{ color:"rgba(255,255,255,.52)", lineHeight:1.9, marginBottom:22, fontSize:14 }}>{modal.desc}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:22 }}>
                {[["Admission",modal.admission],["Seats",modal.seats],["Approved By",modal.body]].map(([k,v]) => (
                  <div key={k} style={{ background:"rgba(255,255,255,.05)", borderRadius:12, padding:"12px 14px" }}>
                    <div className="dm" style={{ color:"rgba(255,255,255,.26)", fontSize:9, letterSpacing:".16em", textTransform:"uppercase", marginBottom:3 }}>{k}</div>
                    <div className="cg" style={{ color:"#fff", fontSize:13, fontWeight:700 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:22 }}>
                <div className="dm" style={{ color:"rgba(255,255,255,.28)", fontSize:9.5, letterSpacing:".16em", textTransform:"uppercase", marginBottom:10 }}>Courses / Highlights</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                  {modal.highlights.map(h => (
                    <span key={h} className="dm" style={{ background:`${modal.color}14`, color:modal.color, border:`1px solid ${modal.color}26`, padding:"6px 14px", borderRadius:40, fontSize:12 }}>{h}</span>
                  ))}
                </div>
              </div>
              <button className="dm btn-gold" style={{ padding:"14px 0", fontSize:12.5, width:"100%", borderRadius:50, background:`linear-gradient(${modal.grad})`, boxShadow:`0 12px 36px ${modal.color}35` }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 20px 50px ${modal.color}45`; }}
                onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=`0 12px 36px ${modal.color}35`; }}>
                Apply for {modal.short} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}