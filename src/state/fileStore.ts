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
    {
        id: '1',
        mandatoryInput: 'File A',
        status: 'Open',
        type: 'X',
        numericInput1: 100,
        textInput1: 'This is text input 1',
        textInput2: 'This is text input 2',
        textInput3: 'This is text input 3',
        numericInput2: 200,
        dateInput: new Date('2024-01-01'),
      },
      {
        id: '2',
        mandatoryInput: 'File B',
        status: 'Closed',
        type: 'Y',
        numericInput1: 300,
        textInput1: 'Another text input 1',
        textInput2: 'Another text input 2',
        textInput3: 'Another text input 3',
        numericInput2: 400,
        dateInput: new Date('2024-02-01')
      }
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
