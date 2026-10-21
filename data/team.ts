export type TeamMember = {
  name: string;
  role: string;
  avatar?: string; // optional path in /public, falls back to initials
};

export const team: TeamMember[] = [
  { name: "Muniba Faheem", role: "Lead", avatar: "/team/muniba.webp" },
  { name: "Kavindu Ranasinghe", role: "Co-Lead", avatar: "/team/kavindu.webp" },
  { name: "Alvi Choundry", role: "Co-Lead", avatar: "/team/alvi.webp" }
];
