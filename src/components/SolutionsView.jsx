import SolutionsMap from "./SolutionsMap";
import SolutionsInspector from "./SolutionsInspector";

const SolutionsView = ({
  isInspectActive,
  setIsInspectActive,
  selectedTiffUrl,
  setSelectedTiffUrl,
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
      />
      <SolutionsInspector
        isInspectActive={isInspectActive}
        setIsInspectActive={setIsInspectActive}
        selectedTiffUrl={selectedTiffUrl}
        setSelectedTiffUrl={setSelectedTiffUrl}
      />
    </div>
  );
};

export default SolutionsView;
