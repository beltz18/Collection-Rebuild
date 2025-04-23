import { Input } from "@com/index"
import { Search, Download, FilterIcon, List, IdCard } from "lucide-react"

export default function MenuOptions() {
  const options = [8, 12]

  return (
    <>
      <div className="h-full flex justify-around items-center gap-3">
        <div className="h-[32px] relative flex items-center">
          <Input
            type="text"
            size="sm"
            placeholder="Search..."
            endContent={<Search className="text-default-400" size={18} />}
          />
        </div>

        <div>
          <Download
            className="text-default-400 hover:text-default-600 cursor-pointer"
            size={24}
          />
        </div>

        <FilterIcon
          className="text-default-400 hover:text-default-600 cursor-pointer"
          size={24}
        />

        <List className={`text-default-400 hover:text-default-600 cursor-pointer`} size={24} />

        <IdCard className={`text-default-400 hover:text-default-600 cursor-pointer`} size={24} />

        <label className="flex items-center text-default-400 text-sm">
          Rows:
          <select
            className="bg-transparent outline-none text-default-400 text-sm"
            onChange={(e) => {
              const n = parseInt(e.target.value);
            }}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  )
}
