const ModeSelect = (props: {
  modeSelected: string;
  selectMode: (mode: string) => void;
}) => {
  const selectNewMode = (mode: string) => {
    props.selectMode(mode);
  };

  return (
    <div className="flex flex-row gap-10 bg-slate-200 ml-5 mr-5 mt-2 rounded justify-between">
      <div className="flex flex-row gap-10 w-2/3">
        {props.modeSelected == "competitive" && (
          <button
            onClick={() => selectNewMode("competitive")}
            className="bg-blue-500 ml-2 mt-2 mb-2 rounded-lg flex-1 hover:bg-slate-400"
          >
            <h1 className="pt-1 pb-1 text-white text-xs flex-1 0">
              Competitive
            </h1>
          </button>
        )}
        {props.modeSelected != "competitive" && (
          <button
            onClick={() => selectNewMode("competitive")}
            className="bg-slate-300 ml-2 mt-2 mb-2 rounded-lg flex-1"
          >
            <h1 className="pt-1 pb-1 text-black text-xs flex-1 0">
              Competitive
            </h1>
          </button>
        )}

        {props.modeSelected == "unrated" && (
          <button
            onClick={() => selectNewMode("unrated")}
            className="bg-blue-500 ml-2 mt-2 mb-2 rounded-lg flex-1 hover:bg-slate-400"
          >
            <h1 className="pt-1 pb-1 text-white text-xs flex-1 0">Unrated</h1>
          </button>
        )}
        {props.modeSelected != "unrated" && (
          <button
            onClick={() => selectNewMode("unrated")}
            className="bg-slate-300 ml-2 mt-2 mb-2 rounded-lg flex-1 hover:bg-slate-400"
          >
            <h1 className="pt-1 pb-1 text-black text-xs flex-1 0">Unrated</h1>
          </button>
        )}

        {props.modeSelected == "premiere" && (
          <button
            onClick={() => selectNewMode("premiere")}
            className="bg-blue-500 ml-2 mt-2 mb-2 rounded-lg flex-1 hover:bg-slate-400"
          >
            <h1 className="pt-1 pb-1 text-white text-xs flex-1 0">Premier</h1>
          </button>
        )}
        {props.modeSelected != "premiere" && (
          <button
            onClick={() => selectNewMode("premiere")}
            className="bg-slate-300 ml-2 mt-2 mb-2 rounded-lg flex-1 hover:bg-slate-400"
          >
            <h1 className="pt-1 pb-1 text-black text-xs flex-1 0">Premier</h1>
          </button>
        )}
      </div>
      <div className="flex flex-row mr-2">
        <button
          // onClick={selectNewMode}
          className="bg-slate-300 ml-2 mt-2 mb-2 rounded-lg flex-1 hover:bg-slate-400"
        >
          <h1 className="pt-1 pb-1 pl-3 pr-3 text-black text-xs flex-1 0">
            ALL
          </h1>
        </button>
        <button
          // onClick={selectNewMode}
          className="bg-slate-300 ml-2 mt-2 mb-2 rounded-lg flex-1 hover:bg-slate-400"
        >
          <h1 className="pt-1 pb-1 pl-3 pr-3 text-black text-xs flex-1 0">
            E8:A1
          </h1>
        </button>
        <button
          // onClick={selectNewMode}
          className="bg-slate-300 ml-2 mt-2 mb-2 rounded-lg flex-1 hover:bg-slate-400"
        >
          <h1 className="pt-1 pb-1 pl-3 pr-3 text-black text-xs flex-1 0">
            ...
          </h1>
        </button>
      </div>
    </div>
  );
};
export default ModeSelect;
