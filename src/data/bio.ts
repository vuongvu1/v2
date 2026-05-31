/** Base years; experience is computed live from the current year at build time. */
export const PRO_START_YEAR = 2019;
export const REACT_START_YEAR = 2020;

export const bio = {
  name: "Vuong Vu",
  role: "Frontend Engineer",
  location: "Berlin, Germany",
  origin: "Vietnam",
  stackOverflow: "https://stackoverflow.com/users/10649754/vuongvu",
  /** {pro} and {react} are interpolated with the computed year counts. */
  paragraphs: [
    "My name is Vuong Vu, a Frontend Engineer from Vietnam, currently living in Berlin, Germany. I have more than {pro} years of professional experience, with {react} years of expertise in React.",
    "I love programming and am passionate about building applications that help improve people's lives.",
    "I also enjoy hiking, playing the piano, and finding joy in life's smallest moments.",
  ],
};
