export type FiltersProps = {
  onChange?: (filters: {
    search: string;
    hyperdriveMin: string;
    hyperdriveMax: string;
    crewMin: string;
    crewMax: string;
  }) => void;
  onClear?: () => void;
};


 export const hyperdriveOptions = [
  "Any",
  "0.5",
  "1.0",
  "2.0",
  "4.0",
  "10.0",
];

export const crewOptions = [
  "Any",
  "1",
  "2-4",
  "5-10",
  "11-100",
  "100+",
];