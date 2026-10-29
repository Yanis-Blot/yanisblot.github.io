/*
 * ===========================================================================
 *  SITE CONTENT
 * ===========================================================================
 *  Edit, save, then reload the page.
 *
 *  • Projects and publications are sorted by date, newest first.
 *  • The home page shows the 6 most recent projects, projects.html shows them all.
 *  • Each text value goes between double quotes and each block ends with a comma.
 *    If the page stays blank, the browser console (F12) points to the faulty line.
 * ===========================================================================
 */

const SITE = {
  profile: {
    name: "Yanis Blot–El Mazouzi",

    // Square image preferred, it is cropped to a circle.
    photo: "assets/photo.jpg",

    // A few sentences. Basic HTML such as <a href="…">, <em> or <strong> is allowed.
    intro: "Final-year engineering student at IMT Mines Alès, specializing in computer science and artificial intelligence.",

    // Revealed by the email button. Leave empty ("") to hide the button.
    email: "yanisblotelmazouzi@gmail.com",

    // Contact buttons in display order, placed before the email button.
    //   icon   "linkedin" or "github", any other link shows its label as text
    //   label  read by screen readers and shown on hover
    links: [
      { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/yanis-blot-el-mazouzi" },
      { icon: "github", label: "GitHub", url: "https://github.com/Yanis-Blot" },
    ],

    // Name as written in author lists, where it is shown in bold.
    authorName: "Y. Blot–El Mazouzi",
  },

  /*
   * Projects. Copy a { … } block to add one.
   *   title
   *   date         "YYYY-MM" or "YYYY", used for sorting
   *   description  one or two sentences
   *   image        optional, stored in assets/projects/, 16:10 (800 × 500 px)
   *                a short .mp4 or .webm video is much lighter than a GIF
   *   link         page opened on click
   */
  projects: [
    {
      title: "U-Net for Image Segmentation",
      date: "2026-10",
      description: "From-scratch PyTorch implementation of the original U-Net architecture, trained on the Oxford-IIIT Pet dataset to segment cats and dogs from the background.",
      image: "assets/projects/u-net.mp4",
      link: "https://github.com/Yanis-Blot/U-net",
    },
    {
      title: "Agentic AI for Operations Research on Modular Systems",
      date: "2026-07",
      description: "Agentic system translating natural-language requests into optimization models, validated deterministically, solved with CP-SAT and ranked with TOPSIS. Kaggle competition, international team.",
      image: "assets/projects/agentic-ai-kaggle.png",
      link: "https://www.kaggle.com/competitions/vibecoding-agents-capstone-project/writeups/new-writeup-1783179444099",
    },
  ],

  /*
   * Publications.
   *   title
   *   authors  in paper order
   *   venue    conference or journal
   *   date     "YYYY-MM" or "YYYY", used for sorting
   *   link     optional link to the paper (PDF, DOI, arXiv)
   */
  publications: [
    {
      title: "Automatic Recognition of Bee Larvae for Royal Jelly Production on Embedded Systems",
      authors: "Y. Blot–El Mazouzi, U. Gumus, A. Delamarche, A. De Macédo, S. Memolla, B. Magnier",
      venue: "ICPR 2026 Workshop, Lyon",
      date: "2026-08",
      link: "https://icpr2026orgteam.github.io/WSpapers/pdfs/paper_0168.pdf",
    },
    {
      title: "Efficient Real-Time Facial Emotion Recognition via Optimized ResNet18 Feature Extraction",
      authors: "H. Graïn, Y. Hayani, Y. Blot–El Mazouzi, A. Diallo, H. Bayd, I. Sekkiou, B. Magnier",
      venue: "ICFSP 2026, Toulouse",
      date: "2026-06",
      link: "https://doi.org/10.1109/ICFSP70244.2026.11665376",
    },
  ],
};
