import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';


export class DynamicSidebarComponent extends BaseComponent {
  constructor() {
    super();
    this.loadCSS('DynamicSidebarComponent');
    this.hub = EventHub.getInstance();
  }

  render() {
    // Check if the sidebar already exists; if so, return it to avoid re-adding
    let sidebar = document.getElementById("sidebar");
    if (sidebar) return sidebar;

    // Create sidebar container
    sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    sidebar.classList.add("closed"); // Start closed
    document.body.appendChild(sidebar);

    // Create toggle button
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggleButton";
    toggleButton.textContent = "☰";
    toggleButton.style.position = "fixed";
    toggleButton.style.left = "10px";
    toggleButton.style.top = "10px";
    toggleButton.style.zIndex = "1000";
    document.body.appendChild(toggleButton);

    // Sidebar content structure
    const sidebarTitle = document.createElement("h2");
    sidebarTitle.textContent = "Explore";
    sidebar.appendChild(sidebarTitle);

    const sidebarContent = document.createElement("p");
    sidebarContent.id = "sidebarContent";
    sidebarContent.textContent = "Click on items below to update this content.";
    sidebar.appendChild(sidebarContent);

    const sidebarItems = document.createElement("ul");
    sidebarItems.id = "sidebarItems";
    sidebar.appendChild(sidebarItems);

    // Define sidebar navigation items
    const items = ["Login", "Home", "Profile", "Friends", "CurrentTrip"];
    items.forEach(item => {
      const button = document.createElement("button");
      button.textContent = item;
      button.onclick = () => {
        this.hub.publish("NavigateToPage", item); // Publish event to navigate
        this.toggleSidebar(false); // Close sidebar after navigation
      };
      sidebarItems.appendChild(button);
    });

    // Toggle sidebar visibility on button click
    toggleButton.addEventListener("click", () => {
      this.toggleSidebar();
    });

    return sidebar;
  }

  // Toggle sidebar open/close and update button text
  toggleSidebar(open = null) {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.getElementById("toggleButton");

    if (!sidebar || !toggleButton) return;

    const isOpen = open !== null ? open : sidebar.classList.contains("closed");
    sidebar.classList.toggle("closed", !isOpen);
    toggleButton.textContent = isOpen ? "✖" : "☰";
  }
}
