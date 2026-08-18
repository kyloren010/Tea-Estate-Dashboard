import SolutionsMap from "./SolutionsMap";
import SolutionsInspector from "./SolutionsInspector";

const SolutionsView = ({
  isInspectActive,
  setIsInspectActive,
  selectedTiffUrl,
  setSelectedTiffUrl,
  selectedGardenData,
  setSelectedGardenData,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: "16px",
        height: "calc(100vh - 110px)",
        width: "100%",
        position: "relative",
      }}
    >
      <SolutionsMap
        activeTiffUrl={selectedTiffUrl}
        isInspectActive={isInspectActive}
        selectedGardenData={selectedGardenData}
      />
      <SolutionsInspector
        isInspectActive={isInspectActive}
        setIsInspectActive={setIsInspectActive}
        selectedTiffUrl={selectedTiffUrl}
        setSelectedTiffUrl={setSelectedTiffUrl}
        selectedGardenData={selectedGardenData}
        setSelectedGardenData={setSelectedGardenData}
      />
    </div>
  );
};

export default SolutionsView;
