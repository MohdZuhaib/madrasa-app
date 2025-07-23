import SegmentedArcProgress from "./SegmentedArcProgress";

const ArcProgress = ({
  size = 200,
}) => {



  return (
    <div className="overflow-clip -mx-12 -mt-4 -mb-1">

      <SegmentedArcProgress
        segments={[
          { percent: 1 },
          { percent: 0.7 },
          { percent: 0 },
          { percent: 0 },
          { percent: 0 },
        ]}
      />



    </div>
  );
};

export default ArcProgress;