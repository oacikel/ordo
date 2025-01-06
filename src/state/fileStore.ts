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

const loadFilesFromLocalStorage = (): IFile[] => {
  const files = localStorage.getItem('files')
  return files ? JSON.parse(files) : []
}

const saveFilesToLocalStorage = (files: IFile[]) => {
  localStorage.setItem('files', JSON.stringify(files))
}

const useFileStore = create<FileStore>((set, get) => ({
  files: loadFilesFromLocalStorage(),
  filter: 'All',
  setFilter: (filter) => set({ filter }),
  addFile: (file) => set((state) => {
    const updatedFiles = [...state.files, file]
    saveFilesToLocalStorage(updatedFiles)
    return { files: updatedFiles }
  }),
  updateFile: (id, updatedFile) => set((state) => {
    const updatedFiles = state.files.map((file) =>
      file.id === id ? { ...file, ...updatedFile } : file
    )
    saveFilesToLocalStorage(updatedFiles)
    return { files: updatedFiles }
  }),
  filteredFiles: () => {
    const { files, filter } = get()
    return filter === 'All' ? files : files.filter((file) => file.status === filter)
  },
}))

export default useFileStore
