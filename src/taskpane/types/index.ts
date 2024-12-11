export type Control = {
  title: string;
  text: string;
  id: number;
  tag: string;
};

export type InvalidControl = Control & {
  error: string;
};
