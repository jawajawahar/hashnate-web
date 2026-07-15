/* ============================================================
   Hashnate — shared behaviour + header/footer injection
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var page = document.body.getAttribute("data-page") || "";

  /* ---------- menu data [anchor/href, tablerIcon, title, subtitle] ---------- */
  var solutions = [
    ["public",       "building-bank",       "Public Sector & NGOs",   "Secure systems for civic & welfare"],
    ["education",    "school",              "Education & Academia",   "Learning platforms & student systems"],
    ["corporate",    "building-skyscraper", "Corporate & Private",    "ERP, CRM & tailored business apps"],
    ["manufacturing","building-factory-2",  "Manufacturing & Industry","Inventory, tracking & reporting"]
  ];
  var services = [
    ["enterprise", "puzzle",  "Enterprise Software", "Custom, full-stack development"],
    ["cloud",      "cloud",   "Cloud & DevOps",      "Cloud-native, secure architecture"],
    ["ai",         "robot",   "AI & Automation",     "Predictive models & automation"],
    ["web",        "devices", "Web & Mobile",        "Web apps & mobile experiences"],
    ["blockchain", "link",    "Blockchain",          "Smart contracts & dApps"]
  ];
  var company = [
    ["about.html",     "info-circle", "About",     "Who we are & how we work"],
    ["team.html",      "users",       "Team",      "The people behind Hashnate"],
    ["learnings.html", "school",      "Learnings", "Training & insights"]
  ];

  function ddAnchor(base, arr) {
    return arr.map(function (i) {
      return '<a class="dd-item" href="' + base + '#' + i[0] + '">' +
        '<span class="dd-ico"><i class="ti ti-' + i[1] + '" aria-hidden="true"></i></span>' +
        '<span class="dd-tx"><b>' + i[2] + '</b><span>' + i[3] + '</span></span></a>';
    }).join("");
  }
  function ddPage(arr) {
    return arr.map(function (i) {
      return '<a class="dd-item" href="' + i[0] + '">' +
        '<span class="dd-ico"><i class="ti ti-' + i[1] + '" aria-hidden="true"></i></span>' +
        '<span class="dd-tx"><b>' + i[2] + '</b><span>' + i[3] + '</span></span></a>';
    }).join("");
  }
  function link(href, label, key) {
    return '<a class="nav__link' + (page === key ? ' active' : '') + '" href="' + href + '">' + label + '</a>';
  }
  function trigger(label, active) {
    return '<button class="nav__link' + (active ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false">' +
      label + ' <span class="caret"></span></button>';
  }

  /* ---------- header ---------- */
  var header =
    '<div class="wrap nav__inner">' +
      '<a href="index.html" class="brand" aria-label="Hashnate home">' +
        '<img src="assets/hashnate-logo.webp" alt="Hashnate" style="height: 40px; object-fit: contain;"></a>' +
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
        '<a class="lang" href="#">EN</a>' +
        '<a class="btn btn--solid" href="contact.html">Book a call <i class="ti ti-arrow-right btn__arrow" aria-hidden="true"></i></a>' +
      '</div>' +
      '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div>' +
    '<div class="m-nav" id="mNav" hidden>' +
      '<a href="index.html">Home</a>' +
      '<div class="m-acc"><button class="m-acc__btn">Solutions <span class="caret"></span></button><div class="m-acc__panel">' +
        solutions.map(function(i){return '<a href="solutions.html#'+i[0]+'">'+i[2]+'</a>';}).join("") + '</div></div>' +
      '<div class="m-acc"><button class="m-acc__btn">Services <span class="caret"></span></button><div class="m-acc__panel">' +
        services.map(function(i){return '<a href="services.html#'+i[0]+'">'+i[2]+'</a>';}).join("") + '</div></div>' +
      '<div class="m-acc"><button class="m-acc__btn">Company <span class="caret"></span></button><div class="m-acc__panel">' +
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
        '<a href="index.html" class="brand"><img src="../../files/Assets/logo_white.png" alt="Hashnate" style="height: 40px; object-fit: contain;"></a>' +
        '<p>Full-stack software engineering, AI, and blockchain — engineered with purpose for businesses, institutions, and communities.</p>' +
        '<div class="foot__social">' +
          '<a href="https://www.linkedin.com/company/hashnate/" aria-label="LinkedIn"><i class="ti ti-brand-linkedin" aria-hidden="true"></i></a>' +
          '<a href="https://www.facebook.com/hashnatesoftware/" aria-label="Facebook"><i class="ti ti-brand-facebook" aria-hidden="true"></i></a>' +
          '<a href="https://api.whatsapp.com/send/?phone=94777140803" aria-label="WhatsApp"><i class="ti ti-brand-whatsapp" aria-hidden="true"></i></a>' +
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
      '<span class="foot__legal"><a href="#">Terms</a><a href="#">Privacy</a></span>' +
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
    setInterval(function () { i = (i + 1) % items; list.style.transform = "translateY(-" + i * 1.08 + "em)"; }, 2200);
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
})();
