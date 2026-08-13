import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function getHighResImageData(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const scale = 3;
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve({
        dataUrl: canvas.toDataURL("image/png"),
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

export async function exportToPdf(selectedEstate, comparedEstates = []) {
  if (!selectedEstate) {
    alert("Please select an estate first.");
    return;
  }

  // Yield thread briefly so the UI doesn't freeze on button click
  await new Promise((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 50)),
  );

  try {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 14;
    const printableWidth = pageWidth - margin * 2;
    let yPos = margin;

    // 1. TITLE
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(15, 23, 42);
    pdf.text("Tea Estate Analytics Report", margin, yPos);
    yPos += 6;

    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.4);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    // 2. BANNER IMAGE
    if (selectedEstate.image) {
      const imgDetails = await getHighResImageData(selectedEstate.image);
      if (imgDetails) {
        const aspectRatio = imgDetails.height / imgDetails.width;
        let bannerHeight = printableWidth * aspectRatio;
        if (bannerHeight > 45) bannerHeight = 45;

        pdf.addImage(
          imgDetails.dataUrl,
          "PNG",
          margin,
          yPos,
          printableWidth,
          bannerHeight,
          undefined,
          "FAST",
        );
        yPos += bannerHeight + 8;
      }
    }

    // 3. ESTATE DETAILS
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(15);
    pdf.setTextColor(15, 23, 42);
    pdf.text(selectedEstate.name, margin, yPos);
    yPos += 5;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    const locationText = `Location: ${
      selectedEstate.location || `${selectedEstate.region}, India`
    } | Region: ${selectedEstate.region}`;
    pdf.text(locationText, margin, yPos);
    yPos += 8;

    // 4. FLUSH BREAKDOWN
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(30, 41, 59);
    pdf.text("Harvest Flush Breakdown:", margin, yPos);
    yPos += 5;

    const monthly = selectedEstate.monthlyYield || [];
    const firstFlush = (monthly[2] || 0) + (monthly[3] || 0);
    const secondFlush =
      (monthly[4] || 0) + (monthly[5] || 0) + (monthly[6] || 0);

    const cardWidth = (printableWidth - 6) / 2;
    pdf.setFillColor(248, 250, 252);
    pdf.setDrawColor(226, 232, 240);
    pdf.roundedRect(margin, yPos, cardWidth, 16, 2, 2, "FD");
    pdf.roundedRect(margin + cardWidth + 6, yPos, cardWidth, 16, 2, 2, "FD");

    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.text("1ST FLUSH (SPRING)", margin + 4, yPos + 5);
    pdf.text("2ND FLUSH (MUSCATEL/MALT)", margin + cardWidth + 10, yPos + 5);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(22, 163, 74);
    pdf.text(`${firstFlush.toLocaleString()} kg`, margin + 4, yPos + 12);

    pdf.setTextColor(217, 119, 6);
    pdf.text(
      `${secondFlush.toLocaleString()} kg`,
      margin + cardWidth + 10,
      yPos + 12,
    );

    yPos += 22;

    // 5. CHART CAPTURE (Scale 3.5)
    const chartWrapper = document.getElementById("yield-chart-wrapper");
    if (chartWrapper) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(30, 41, 59);
      pdf.text("2025 Harvest Yield Profile", margin, yPos);
      yPos += 5;

      const canvas = await html2canvas(chartWrapper, {
        backgroundColor: "#121614",
        scale: 3, // Crisp high-res setting
        logging: false,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY,
      });

      const chartDataUrl = canvas.toDataURL("image/png");
      const chartAspectRatio = canvas.height / canvas.width;
      const chartRenderHeight = printableWidth * chartAspectRatio;

      pdf.addImage(
        chartDataUrl,
        "PNG",
        margin,
        yPos,
        printableWidth,
        chartRenderHeight,
        undefined,
        "FAST",
      );
      yPos += chartRenderHeight + 8;
    }

    // 6. COMPARISON DATASHEET
    const activeCompared = Array.isArray(comparedEstates)
      ? comparedEstates
      : [];
    if (activeCompared.length > 0) {
      if (yPos > pageHeight - 35) {
        pdf.addPage();
        yPos = margin;
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(30, 41, 59);
      pdf.text("Comparison Summary Datasheet:", margin, yPos);
      yPos += 6;

      activeCompared.forEach((comp, idx) => {
        if (yPos > pageHeight - 15) {
          pdf.addPage();
          yPos = margin;
        }

        const compMonthly = comp.monthlyYield || [];
        const comp1st = (compMonthly[2] || 0) + (compMonthly[3] || 0);
        const comp2nd =
          (compMonthly[4] || 0) + (compMonthly[5] || 0) + (compMonthly[6] || 0);
        const total = compMonthly.reduce((a, b) => a + b, 0);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(51, 65, 85);

        const line = `${idx + 1}. ${comp.name} (${
          comp.region
        }) — Total: ${total.toLocaleString()} kg | 1st Flush: ${comp1st.toLocaleString()} kg | 2nd Flush: ${comp2nd.toLocaleString()} kg`;
        pdf.text(line, margin + 2, yPos);
        yPos += 5;
      });
    }

    const cleanFilename = selectedEstate.name.replace(/[^a-zA-Z0-9]/g, "_");
    pdf.save(`${cleanFilename}_Yield_Report.pdf`);
  } catch (error) {
    console.error("PDF Export failed:", error);
    alert(`Export Error: ${error.message || "Failed to generate PDF"}`);
  }
}
