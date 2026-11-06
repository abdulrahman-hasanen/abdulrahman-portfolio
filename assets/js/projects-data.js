/**
 * Centralized Project Data Source
 * 
 * Manage your portfolio projects here.
 * To add a new project, simply add an object to the `PROJECTS_DATA` array.
 * 
 * Field Definitions:
 * - title:        (String, required) Project name
 * - subtitle:     (String, optional) Short one-line summary
 * - role:         (String, optional) Your role e.g. "Front-End Developer", "Full-Stack Developer"
 * - tech_stack:   (String, optional) Comma-separated or slash-separated technologies
 * - status:       (String, required) "Done" | "Active" | "Ongoing"
 * - github_url:   (String, optional) URL to source repository (or null / "")
 * - live_url:     (String, optional) URL to live deployment (or null / "")
 * - description:  (String, optional) Detailed project description
 * - image:        (String, optional) Relative path to image e.g. "./assets/images/projects/my-project.webp"
 * - is_published: (Boolean) Set to true to show on website, false to draft/hide
 * - order:        (Number) Sorting priority (lower numbers appear first)
 * - created_at:   (String) ISO date/timestamp used for secondary sorting
 */

const PROJECTS_DATA = [
  {
    id: 11,
    title: "Al-Husseiny Contracting Website",
    subtitle: "Corporate Website & Project Showcase",
    role: "Front-End Developer",
    tech_stack: "HTML5, CSS3, JavaScript",
    status: "Done",
    github_url: "https://github.com/abdulrahman-hasanen/alhusseinycont",
    live_url: "https://abdulrahman-hasanen.github.io/alhusseinycont/",
    description: "A modern, responsive Arabic corporate website for Al-Husseiny Contracting. Designed to showcase the company's profile, contracting services, projects, and business information through a professional right-to-left interface. The website features clear navigation, a project gallery, and responsive layouts to provide a smooth browsing experience across desktop and tablet devices.",
    image: "./assets/images/projects/Al-HusseinyContracting.webp",
    is_published: true,
    order: 0,
    created_at: "2026-11-05T17:06:18Z"
  },
  {
    id: 10,
    title: "Fanni Ceramic Website",
    subtitle: "Ceramic Installation & Maintenance Website",
    role: "Front-End Developer",
    tech_stack: "HTML5, CSS3, JavaScript",
    status: "Done",
    github_url: "https://github.com/abdulrahman-hasanen/fanniceramic",
    live_url: "https://abdulrahman-hasanen.github.io/fanniceramic/",
    description: "A responsive website for a ceramic installation and maintenance service in Kuwait. Designed to showcase the company's services and previous work through a visual project gallery, with accessible contact options that help potential customers explore the services and get in touch easily.",
    image: "./assets/images/projects/FanniCeramic.webp",
    is_published: true,
    order: 0,
    created_at: "2026-11-05T17:03:13Z"
  }
];

// Helper functions for accessing project data
function getPublishedProjects(limit = null) {
  const published = PROJECTS_DATA
    .filter(project => project.is_published !== false)
    .sort((a, b) => {
      const orderA = typeof a.order === "number" ? a.order : 0;
      const orderB = typeof b.order === "number" ? b.order : 0;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });

  return limit ? published.slice(0, limit) : published;
}

