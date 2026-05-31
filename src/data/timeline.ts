export interface TimelineEntry {
  date: string;
  lead: string;
  org: string;
  orgUrl: string;
  tail: string;
}

/** Newest first (preserves v1 ordering). */
export const timeline: TimelineEntry[] = [
  {
    date: "Dec 2021",
    lead: "Joined ",
    org: "Delivery Hero",
    orgUrl: "https://www.deliveryhero.com/",
    tail: " as a Frontend Engineer and moved to Berlin, Germany.",
  },
  {
    date: "Mar 2020",
    lead: "Joined ",
    org: "2359 Media",
    orgUrl: "https://www.2359.co/",
    tail: " as a Frontend Engineer and moved to Singapore.",
  },
  {
    date: "Jul 2018",
    lead: "Joined ",
    org: "CodeLink",
    orgUrl: "https://www.codelink.io/",
    tail: " as a Frontend Engineer.",
  },
  {
    date: "Mar 2017",
    lead: "Joined ",
    org: "KMS Technology",
    orgUrl: "https://www.kms-technology.com/",
    tail: " as a Fresher Software Engineer and completed the KMS Next training program.",
  },
  {
    date: "Apr 2017",
    lead: "Graduated from ",
    org: "HCM University of Technology",
    orgUrl: "https://hcmut.edu.vn/en",
    tail: " with an Honor Bachelor's Degree, majoring in Computer Engineering.",
  },
];
