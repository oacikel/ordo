import { FilterType, IFile } from 'src/types'
import { create } from 'zustand'


type FileStore = {
  files: IFile[]
  filter: FilterType
  setFilter: (filter: FilterType) => void
  addFile: (file: IFile) => void
  updateFile: (id: string, updatedFile: Partial<IFile>) => void
  filteredFiles: () => IFile[]
}

const useFileStore = create<FileStore>((set, get) => ({
  files: [
    { id: '1', name: 'File A', status: 'Open', type: 'X' },
    { id: '2', name: 'File B', status: 'Closed', type: 'Y' },
    { id: '3', name: 'File C', status: 'Open', type: 'X' },
  ],
  filter: 'All',
  setFilter: (filter) => set({ filter }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  updateFile: (id, updatedFile) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, ...updatedFile } : file
      ),
    })),
  filteredFiles: () => {
    const { files, filter } = get()
    return filter === 'All' ? files : files.filter((file) => file.status === filter)
  },
}))

export default useFileStore
