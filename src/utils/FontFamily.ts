export const loadGoogleFont = (fontFamily: string) => {
  const linkId = `google-font-${fontFamily}`;

  if (document.getElementById(linkId)) return;

  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
    /\s+/g,
    "+",
  )}&display=swap`;
  document.head.appendChild(link);
};
