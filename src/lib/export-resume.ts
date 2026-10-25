export async function exportResume(element: HTMLElement, filename: string) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);
  await document.fonts.ready;
  const canvas = await html2canvas(element, {
    scale: 1.5,
    backgroundColor: "#f6f5ef",
    logging: false,
  });
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const sourceHeight = Math.floor((277 / 190) * canvas.width);
  const bounds = element.getBoundingClientRect();
  const scale = canvas.width / bounds.width;
  const breaks = Array.from(element.querySelectorAll("section")).map(
    (section) =>
      Math.floor((section.getBoundingClientRect().top - bounds.top) * scale),
  );
  let top = 0;
  for (let page = 0; top < canvas.height; page++) {
    if (page > 0) pdf.addPage();
    const naturalEnd = Math.min(top + sourceHeight, canvas.height);
    const candidates = breaks.filter(
      (position) =>
        position > top + sourceHeight * 0.3 && position <= naturalEnd,
    );
    const end =
      naturalEnd < canvas.height && candidates.length
        ? candidates[candidates.length - 1]
        : naturalEnd;
    const slice = document.createElement("canvas");
    slice.width = canvas.width;
    slice.height = end - top;
    const ctx = slice.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.drawImage(
      canvas,
      0,
      top,
      canvas.width,
      slice.height,
      0,
      0,
      canvas.width,
      slice.height,
    );
    pdf.addImage(
      slice.toDataURL("image/jpeg", 0.92),
      "JPEG",
      10,
      10,
      190,
      (slice.height * 190) / canvas.width,
    );
    top = end;
  }
  pdf.save(filename);
}
