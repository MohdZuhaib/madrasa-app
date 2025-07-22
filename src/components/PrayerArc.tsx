const ArcProgress = ({
    size = 200,
}) => {



    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size / 2 }}>
                <svg viewBox="0 0 300 100" className="bg-transparent w-full"><g><path d="
      M 36.71152662041874 97.17271728241259
      A 125 125 0 0 1 61.920723754550636 61.30365793293491
    " stroke="white" stroke-opacity="0.5" stroke-width="11.875" fill="none" stroke-linecap="round"></path></g><g><path d="
      M 73.81830893528983 50.89727578658062
      A 125 125 0 0 1 112.72400666048773 30.687384067934218
    " stroke="white" stroke-opacity="0.5" stroke-width="11.875" fill="none" stroke-linecap="round"></path></g><g><path d="
      M 128.07915923850152 26.937102503195433
      A 125 125 0 0 1 171.92084076149843 26.93710250319542
    " stroke="white" stroke-opacity="0.5" stroke-width="11.875" fill="none" stroke-linecap="round"></path></g><g><path d="
      M 187.27599333951233 30.687384067934246
      A 125 125 0 0 1 226.18169106471012 50.89727578658059
    " stroke="white" stroke-opacity="0.5" stroke-width="11.875" fill="none" stroke-linecap="round"></path></g><g><path d="
      M 238.07927624544934 61.30365793293488
      A 125 125 0 0 1 263.28847337958126 97.1727172824126
    " stroke="white" stroke-opacity="0.5" stroke-width="11.875" fill="none" stroke-linecap="round"></path></g></svg>


            </div>


        </div>
    );
};

export default ArcProgress;