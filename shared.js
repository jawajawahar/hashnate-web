/* ============================================================
   Hashnate — shared behaviour + header/footer injection
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var page = document.body.getAttribute("data-page") || "";

  /* ---------- menu data [anchor/href, svgIcon, title, subtitle] ---------- */
  var solutions = [
    ["public",       '<svg class="icon-svg" viewBox="0 0 24 24"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="12 2 20 10 4 10 12 2"></polyline><line x1="6" y1="10" x2="6" y2="21"></line><line x1="10" y1="10" x2="10" y2="21"></line><line x1="14" y1="10" x2="14" y2="21"></line><line x1="18" y1="10" x2="18" y2="21"></line></svg>', "Public Sector & NGOs",   "Secure systems for civic & welfare"],
    ["education",    '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>', "Education & Academia",   "Learning platforms & student systems"],
    ["corporate",    '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M22 21H2M13 22V10M18 22V14M8 22V6M3 22V2M3 2h10l5 5v15"></path></svg>', "Corporate & Private",    "ERP, CRM & tailored business apps"],
    ["manufacturing",'<svg class="icon-svg" viewBox="0 0 24 24"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M17 18h1M12 18h1M7 18h1"></path></svg>', "Manufacturing & Industry","Inventory, tracking & reporting"]
  ];
  var services = [
    ["enterprise", '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M20 14h2v4h-2a2 2 0 0 0-2 2v2h-4v-2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2H2v-4h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H2V4h4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2h4v4h-2a2 2 0 0 0-2 2v4Z"></path></svg>', "Enterprise Software", "Custom, full-stack development"],
    ["cloud",      '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42 0-.83.07-1.23.2A4.5 4.5 0 0 0 6 11.5a6 6 0 0 0-4 5.5A3 3 0 0 0 5 20h12.5Z"></path></svg>', "Cloud & DevOps",      "Cloud-native, secure architecture"],
    ["ai",         '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 8V4H8M2 14v2a6 6 0 0 0 12 0v-2M12 18H2M18 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2"></path><rect x="6" y="8" width="12" height="8" rx="2"></rect><line x1="9" y1="12" x2="9.01" y2="12"></line><line x1="15" y1="12" x2="15.01" y2="12"></line></svg>', "AI & Automation",     "Predictive models & automation"],
    ["web",        '<svg class="icon-svg" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line><line x1="12" y1="17" x2="12" y2="20"></line></svg>', "Web & Mobile",        "Web apps & mobile experiences"],
    ["blockchain", '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>', "Blockchain",          "Smart contracts & dApps"]
  ];
  var company = [
    ["about.html",     '<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>', "About",     "Who we are & how we work"],
    ["team.html",      '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>', "Team",      "The people behind Hashnate"],
    ["learnings.html", '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>', "Learnings", "Training & insights"]
  ];

  function ddAnchor(base, arr) {
    return arr.map(function (i) {
      return '<a class="dd-item" href="' + base + '#' + i[0] + '">' +
        '<span class="dd-ico">' + i[1] + '</span>' +
        '<span class="dd-tx"><b>' + i[2] + '</b><span>' + i[3] + '</span></span></a>';
    }).join("");
  }
  function ddPage(arr) {
    return arr.map(function (i) {
      return '<a class="dd-item" href="' + i[0] + '">' +
        '<span class="dd-ico">' + i[1] + '</span>' +
        '<span class="dd-tx"><b>' + i[2] + '</b><span>' + i[3] + '</span></span></a>';
    }).join("");
  }
  function link(href, label, key) {
    return '<a class="nav__link' + (page === key ? ' active' : '') + '" href="' + href + '">' + label + '</a>';
  }
  function trigger(label, active) {
    return '<button class="nav__link' + (active ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false">' +
      label + ' <svg class="icon-svg caret-svg" viewBox="0 0 24 24" style="width:10px; height:10px; margin-left: 4px; transition: transform 0.2s;"><polyline points="6 9 12 15 18 9"></polyline></svg></button>';
  }

  /* ---------- header ---------- */
  var header =
    '<div class="wrap nav__inner">' +
      '<a href="index.html" class="brand" aria-label="Hashnate home">' +
        '<img src="assets/hashnate-logo.webp" alt="Hashnate" style="height: 38px; object-fit: contain;"></a>' +
      '<nav class="nav__links" aria-label="Primary">' +
        link("index.html", "Home", "home") +
        '<div class="nav__item">' + trigger("Solutions", page === "solutions") +
          '<div class="dropdown" role="menu">' + ddAnchor("solutions.html", solutions) + '</div></div>' +
        '<div class="nav__item">' + trigger("Services", page === "services") +
          '<div class="dropdown" role="menu">' + ddAnchor("services.html", services) + '</div></div>' +
        '<div class="nav__item">' + trigger("Company", page === "about" || page === "team" || page === "learnings") +
          '<div class="dropdown" role="menu">' + ddPage(company) + '</div></div>' +
        link("contact.html", "Contact", "contact") +
      '</nav>' +
      '<div class="nav__cta">' +
        '<a class="lang" href="#"><svg class="icon-svg" viewBox="0 0 24 24" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 5px;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>EN</a>' +
        '<a class="btn btn--solid" href="contact.html">Book a call <svg class="icon-svg btn__arrow" viewBox="0 0 24 24" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-left: 2px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>' +
      '</div>' +
      '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div>' +
    '<div class="m-nav" id="mNav" hidden>' +
      '<a href="index.html">Home</a>' +
      '<div class="m-acc"><button class="m-acc__btn">Solutions <svg class="icon-svg caret-svg" viewBox="0 0 24 24" style="width:10px; height:10px; margin-left: 4px;"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="m-acc__panel">' +
        solutions.map(function(i){return '<a href="solutions.html#'+i[0]+'">'+i[2]+'</a>';}).join("") + '</div></div>' +
      '<div class="m-acc"><button class="m-acc__btn">Services <svg class="icon-svg caret-svg" viewBox="0 0 24 24" style="width:10px; height:10px; margin-left: 4px;"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="m-acc__panel">' +
        services.map(function(i){return '<a href="services.html#'+i[0]+'">'+i[2]+'</a>';}).join("") + '</div></div>' +
      '<div class="m-acc"><button class="m-acc__btn">Company <svg class="icon-svg caret-svg" viewBox="0 0 24 24" style="width:10px; height:10px; margin-left: 4px;"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="m-acc__panel">' +
        company.map(function(i){return '<a href="'+i[0]+'">'+i[2]+'</a>';}).join("") + '</div></div>' +
      '<a href="contact.html">Contact</a>' +
      '<a class="btn btn--solid btn--full" href="contact.html">Book a call</a>' +
    '</div>';

  var hEl = document.getElementById("site-header");
  if (hEl) { hEl.className = "site-header"; hEl.innerHTML = header; }

  /* ---------- footer ---------- */
  var footer =
    '<div class="wrap foot__grid">' +
      '<div class="foot__brand">' +
        '<a href="index.html" class="brand"><img src="assets/Screenshot_2026-07-13_135411-removebg-preview.png" alt="Hashnate" style="height: 38px; object-fit: contain;"></a>' +
        '<p>Full-stack software engineering, AI, and blockchain — engineered with purpose for businesses, institutions, and communities.</p>' +
        '<div class="foot__social">' +
          '<a href="https://www.linkedin.com/company/hashnate/" aria-label="LinkedIn"><svg class="icon-svg" viewBox="0 0 24 24" style="width:16px; height:16px;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>' +
          '<a href="https://www.facebook.com/hashnatesoftware/" aria-label="Facebook"><svg class="icon-svg" viewBox="0 0 24 24" style="width:16px; height:16px;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>' +
          '<a href="https://api.whatsapp.com/send/?phone=94777140803" aria-label="WhatsApp"><svg class="icon-svg" viewBox="0 0 24 24" style="width:16px; height:16px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></a>' +
        '</div></div>' +
      '<div class="foot__col"><h4>Services</h4>' +
        '<a href="services.html#enterprise">Enterprise software</a>' +
        '<a href="services.html#cloud">Cloud & DevOps</a>' +
        '<a href="services.html#ai">AI & automation</a>' +
        '<a href="services.html#web">Web & mobile</a>' +
        '<a href="services.html#blockchain">Blockchain</a></div>' +
      '<div class="foot__col"><h4>Company</h4>' +
        '<a href="about.html">About us</a>' +
        '<a href="team.html">Team</a>' +
        '<a href="solutions.html">Solutions</a>' +
        '<a href="learnings.html">Learnings</a>' +
        '<a href="contact.html">Contact</a></div>' +
      '<div class="foot__col"><h4>Contact</h4>' +
        '<a href="mailto:hello@hashnate.com">hello@hashnate.com</a>' +
        '<a href="tel:+94777140803">0777 140 803</a>' +
        '<span>Kinniya, Trincomalee,<br>Sri Lanka</span></div>' +
    '</div>' +
    '<div class="wrap foot__base">' +
      '<span>© <span id="year"></span> Hashnate Software Engineering (Pvt) Ltd.</span>' +
      '<span class="foot__legal"><a href="terms.html">Terms</a><a href="privacy.html">Privacy</a></span>' +
    '</div>';

  var fEl = document.getElementById("site-footer");
  if (fEl) { fEl.className = "site-footer"; fEl.innerHTML = footer; }

  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- sticky shadow ---------- */
  function onScroll() { if (hEl) hEl.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- dropdown click/keyboard ---------- */
  document.querySelectorAll(".nav__item > .nav__link").forEach(function (btn) {
    var dd = btn.nextElementSibling;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var open = dd.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    btn.addEventListener("blur", function () {
      setTimeout(function () { dd.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }, 150);
    });
  });

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("burger");
  var mNav = document.getElementById("mNav");
  if (burger && mNav) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mNav.hidden = open; mNav.style.display = open ? "none" : "flex";
    });
    mNav.querySelectorAll(".m-acc__btn").forEach(function (b) {
      b.addEventListener("click", function () { b.parentElement.classList.toggle("open"); });
    });
  }

  /* ---------- rotating headline ---------- */
  var list = document.getElementById("rotator");
  if (list && !reduce) {
    var items = list.children.length, i = 0;
    setInterval(function () { i = (i + 1) % items; list.style.transform = "translateY(-" + i * 1.2 + "em)"; }, 2200);
  }

  /* ---------- reveal on scroll ---------- */
  (function () {
    var els = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
      els.forEach(function (el, idx) { el.style.transitionDelay = ((idx % 4) * 0.06) + "s"; io.observe(el); });
    } else { els.forEach(function (el) { el.classList.add("in"); }); }
  })();

  /* ---------- animate bar chart(s) ---------- */
  document.querySelectorAll(".viz__chart[data-heights]").forEach(function (chart) {
    var heights = chart.getAttribute("data-heights").split(",");
    heights.forEach(function () { var c = document.createElement("div"); c.className = "col"; c.style.height = "6px"; chart.appendChild(c); });
    if ("IntersectionObserver" in window && !reduce) {
      new IntersectionObserver(function (e, ob) {
        if (e[0].isIntersecting) { chart.querySelectorAll(".col").forEach(function (c, k) { c.style.height = heights[k] + "%"; }); ob.disconnect(); }
      }, { threshold: 0.3 }).observe(chart);
    } else { chart.querySelectorAll(".col").forEach(function (c, k) { c.style.height = heights[k] + "%"; }); }
  });

  /* ---------- hero area line reveal ---------- */
  var path = document.getElementById("areaLine");
  if (path && !reduce) {
    var len = path.getTotalLength();
    path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
    requestAnimationFrame(function () { path.style.transition = "stroke-dashoffset 1.6s ease"; path.style.strokeDashoffset = 0; });
  }

  /* ---------- count-ups ---------- */
  function runCounts(scope) {
    scope.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = (String(target).split(".")[1] || "").length;
      if (reduce) { el.textContent = target.toFixed(decimals) + suffix; return; }
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1100, 1);
        el.textContent = (target * (0.5 - Math.cos(Math.PI * p) / 2)).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step); else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    });
  }
  document.querySelectorAll("[data-countzone]").forEach(function (zone) {
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e, ob) { if (e[0].isIntersecting) { runCounts(zone); ob.disconnect(); } }, { threshold: 0.3 }).observe(zone);
    } else { runCounts(zone); }
  });

  /* ---------- FAQ ---------- */
  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () { q.parentElement.classList.toggle("open"); });
  });

  /* ---------- lead form ---------- */
  document.querySelectorAll("form[data-lead]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var note = form.querySelector(".form-note");
      var name = (form.name && form.name.value || "").trim();
      var email = (form.email && form.email.value || "").trim();
      var msg = (form.message && form.message.value || "").trim();
      if (!name || !email || !msg) { note.style.color = "#ff7a7a"; note.textContent = "Please fill in every field so we can reach you."; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.style.color = "#ff7a7a"; note.textContent = "That email doesn't look right — mind checking it?"; return; }
      note.style.color = "";
      note.textContent = "Thanks, " + name.split(" ")[0] + " — your message is ready to send. We'll reply within one business day.";
      form.reset();
    });
  });

  /* ---------- close menus on outside click ---------- */
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav__item")) {
      document.querySelectorAll(".dropdown.open").forEach(function (d) { d.classList.remove("open"); });
    }
  });

  /* ---------- leadership tabs ---------- */
  document.querySelectorAll(".lead-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var container = tab.closest(".lead-tabs-container");
      var targetId = tab.getAttribute("data-target");
      if (!container || !targetId) return;

      container.querySelectorAll(".lead-tab").forEach(function (t) { t.classList.remove("active"); });
      container.querySelectorAll(".lead-panel").forEach(function (p) { p.classList.remove("active"); });

      tab.classList.add("active");
      var targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  /* ---------- premium back to top button ---------- */
  (function () {
    var btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.id = "back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.setAttribute("hidden", "");
    btn.innerHTML =
      '<svg class="back-to-top__progress" width="48" height="48" viewBox="0 0 48 48">' +
        '<circle class="back-to-top__circle-bg" cx="24" cy="24" r="18" fill="none" stroke-width="2.5"></circle>' +
        '<circle class="back-to-top__circle-progress" cx="24" cy="24" r="18" fill="none" stroke-width="2.5" stroke-dasharray="113.1" stroke-dashoffset="113.1" transform="rotate(-90 24 24)"></circle>' +
      '</svg>' +
      '<svg class="icon-svg back-to-top__icon" viewBox="0 0 24 24" aria-hidden="true" style="width: 18px; height: 18px;"><polyline points="18 15 12 9 6 15"></polyline></svg>';

    document.body.appendChild(btn);

    var circle = btn.querySelector(".back-to-top__circle-progress");
    var limit = 200;
    var isVisible = false;

    function updateProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Handle visibility
      if (scrollTop > limit) {
        if (!isVisible) {
          btn.removeAttribute("hidden");
          requestAnimationFrame(function () { btn.classList.add("visible"); });
          isVisible = true;
        }
      } else {
        if (isVisible) {
          btn.classList.remove("visible");
          setTimeout(function () {
            if (!btn.classList.contains("visible")) btn.setAttribute("hidden", "");
          }, 300);
          isVisible = false;
        }
      }

      // Calculate progress ring dash offset
      if (docHeight > 0) {
        var pct = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        circle.style.strokeDashoffset = String(113.1 - (pct * 113.1));
      }
    }

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  })();

  /* ---------- initialize lucide ---------- */
  if (typeof window.lucide === "undefined") {
    var scr = document.createElement("script");
    scr.src = "https://unpkg.com/lucide@latest";
    scr.async = true;
    scr.onload = function () {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    };
    document.head.appendChild(scr);
  } else {
    window.lucide.createIcons();
  }
})();

