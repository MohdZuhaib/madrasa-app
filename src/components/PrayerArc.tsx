import { getPrayerProgressSegments } from "../helpers";
import { usePrayerStore } from "../store/prayerStore";
import SegmentedArcProgress from "./SegmentedArcProgress";

const ArcProgress = () => {

  const { prayerTimes } = usePrayerStore();
  const segments = getPrayerProgressSegments(prayerTimes);


  return (
    <div className="overflow-clip -mx-12 -mt-4 -mb-1">
      <SegmentedArcProgress
        segments={segments.map(p => ({ percent: p }))}
      />

    </div>
  );
};

export default ArcProgress;