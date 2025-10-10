// Type declarations for SCSS modules
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module './globals.scss';
