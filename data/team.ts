export type TeamMember = {
  name: string;
  role: string;
  avatar?: string; // optional path in /public, falls back to initials
};

export const team: TeamMember[] = [
  { name: "Muniba Faheem", role: "Lead" },
  { name: "Kavindu Ranasinghe", role: "Co-Lead" },
  { name: "Alvi Choundry", role: "Co-Lead" }
];
