import type { Bin, Rack } from "../../types";;
import EditForm from "./EditForm";
import ViewMode from "./ViewMode";

interface Props {
  bin: Bin | null;
  onSave: (bin: Bin) => void;
  onClose: () => void;
  rack: Rack; // to know other bins for swap
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DetailsPanel({ bin, onSave, onClose, rack, isEdit, setIsEdit }: Props) {
//   const [isEdit, setIsEdit] = useState(false);

  if (!bin) return null;

  return (
    <aside
      className="fixed top-0 right-0 h-full w-96 bg-black/95 text-white shadow-lg z-50 flex flex-col 
                 transform transition-transform duration-300 animate-slide-in"
    >
      <header className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Bin {bin.binId}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        {isEdit ? (
          <EditForm
            bin={bin}
            allBins={rack?.bins}
            onSave={(updated) => {
              onSave(updated);
              setIsEdit(false);
            }}
            onCancel={() => setIsEdit(false)}
          />
        ) : (
          <ViewMode bin={bin} onEdit={() => setIsEdit(true)} />
        )}
      </div>
    </aside>
  );
}

