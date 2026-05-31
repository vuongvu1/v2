export interface Contact {
  name: string;
  address: string;
  glyph: string;
}

export const contacts: Contact[] = [
  { name: "Email", address: "mailto:hoangvuong.v99@gmail.com", glyph: "✉" },
  { name: "LinkedIn", address: "https://www.linkedin.com/in/vuongvu1/", glyph: "\u{1F4BC}" },
  { name: "GitHub", address: "https://github.com/vuongvu1", glyph: "\u{1F431}" },
  { name: "StackOverflow", address: "https://stackoverflow.com/users/10649754/vuongvu", glyph: "\u{1F4DA}" },
  {
    name: "Résumé / CV",
    address: "https://docs.google.com/document/d/109tsrH1jxUoQuvOzqbxtb7VrALkgYxdHRbAXVgXLzjs/edit",
    glyph: "\u{1F4DC}",
  },
];
