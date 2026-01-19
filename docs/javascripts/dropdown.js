console.log("=== Evidences Dropdown (Stable Desktop Version) ===");

(function () {
  function initDropdown() {
    // Remove existing dropdown if re-rendered
    const old = document.querySelector(".custom-dropdown");
    if (old) old.remove();

    const tabs = document.querySelectorAll(".md-tabs__item");
    let evidencesItem = null;
    let evidencesLink = null;

    // Find Evidences tab
    tabs.forEach((tab) => {
      const link = tab.querySelector(".md-tabs__link");
      if (
        link &&
        link.textContent.trim().toLowerCase() === "evidences"
      ) {
        evidencesItem = tab;
        evidencesLink = link;
      }
    });

    if (!evidencesItem || !evidencesLink) {
      console.warn("Evidences tab not found");
      return;
    }

    // Add dropdown arrow (visual only)
    if (!evidencesLink.querySelector(".dd-icon")) {
      const icon = document.createElement("span");
      icon.className = "dd-icon";
      icon.textContent = " ▾";
      evidencesLink.appendChild(icon);
    }

    // Create dropdown
    const dropdown = document.createElement("div");
    dropdown.className = "custom-dropdown";
    dropdown.style.display = "none";

    dropdown.innerHTML = `
      <div class="dd-level-1">
        <div class="dd-item has-sub">
          <span>Amazon</span>
          <div class="dd-level-2">
            <div class="dd-item has-sub">
              <span>FBA Private Label</span>
              <div class="dd-level-3">
                <a href="/evidences/placeholders/pl-us-placeholder/">USA</a>
                <a href="/evidences/placeholders/pl-ca-placeholder/">Canada</a>
              </div>
            </div>
            <div class="dd-item has-sub">
              <span>FBA Wholesale</span>
              <div class="dd-level-3">
                <a href="/evidences/placeholders/ws-us-placeholder/">USA</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Append to BODY (CRITICAL)
    document.body.appendChild(dropdown);

    // Position dropdown relative to viewport
    function positionDropdown() {
      const rect = evidencesItem.getBoundingClientRect();
      dropdown.style.position = "fixed";
      dropdown.style.top = `${rect.bottom}px`;
      dropdown.style.left = `${rect.left}px`;
      dropdown.style.zIndex = "1000000";
    }

    positionDropdown();
    window.addEventListener("resize", positionDropdown);

    let hideTimer;

    // Hover logic (NO gaps, NO flicker)
    evidencesItem.addEventListener("mouseenter", () => {
      clearTimeout(hideTimer);
      positionDropdown();
      dropdown.style.display = "block";
    });

    evidencesItem.addEventListener("mouseleave", () => {
      hideTimer = setTimeout(() => {
        dropdown.style.display = "none";
      }, 150);
    });

    dropdown.addEventListener("mouseenter", () => {
      clearTimeout(hideTimer);
    });

    dropdown.addEventListener("mouseleave", () => {
      dropdown.style.display = "none";
    });

    console.log("Evidences dropdown initialized");
  }

  // Initial load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDropdown);
  } else {
    initDropdown();
  }

  // MkDocs Material re-render hook
  if (typeof document$ !== "undefined") {
    document$.subscribe(() => {
      setTimeout(initDropdown, 150);
    });
  }
})();
