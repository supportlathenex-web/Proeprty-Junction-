export interface WebContent {
  heroUpper: string;
  heroTitle: string;
  heroSub: string;
  aboutUpper: string;
  aboutTitle: string;
  aboutText: string;
  aboutBentoTitle: string;
  aboutBentoText: string;
}

export const defaultContent: WebContent = {
  heroUpper: "THE ARCHITECTURE OF ELITE ESTATE DISCOVERY",
  heroTitle: "Property Junction Hub",
  heroSub: "We assess your needs, budget, and preferences to present tailored property choices. We handle site visits, negotiations, and paperwork. For investors, we facilitate renting or selling to maximize ROI.",
  aboutUpper: "OUR HERITAGE & PROMISE",
  aboutTitle: "A Trusted Partner in Navi Mumbai, Thane & Shilphata",
  aboutText: "Property Junction represents premium real estate consulting with a commitment to integrity, unmatched speed, and consumer convenience. From Shop no. 1 at MM City, Shilphata, we manage your home search journey continuously.",
  aboutBentoTitle: "Redefining the Journey to Your Future Dream Home",
  aboutBentoText: "Whether you are an investor looking to maximize ROI or a family searching for a 1, 2, or 3 BHK layout, we serve as your boots on the ground. We manage 100% of site transit logistics, intense negotiations, and tedious regulatory paperwork, granting you direct transparency and peace of mind.",
};

export const getWebContent = (): WebContent => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('property_junction_content');
    if (saved) {
      try {
        return { ...defaultContent, ...JSON.parse(saved) };
      } catch (e) {
        console.error(e);
      }
    }
  }
  return defaultContent;
};

export const saveWebContent = (content: WebContent) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('property_junction_content', JSON.stringify(content));
  }
};
