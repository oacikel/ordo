import { FilterType, IFile } from 'app/types'
import { create } from 'zustand'


type FileStore = {
  files: IFile[]
  filter: FilterType
  setFilter: (filter: FilterType) => void
  addFile: (file: IFile) => void
  updateFile: (id: string, updatedFile: Partial<IFile>) => void
  filteredFiles: () => IFile[]
}

const mockFiles: IFile[] = [
  {
    id: '1',
    mandatoryInput: 'Input 1',
    status: 'Open',
    type: 'X',
    numericInput1: 10,
    textInput1: 'Text 1',
    textInput2: 'Text 2',
    textInput3: 'Text 3',
    numericInput2: 20,
    dateInput: new Date('2023-01-01')
  },
  {
    id: '2',
    mandatoryInput: 'Input 2',
    status: 'Open',
    type: 'X',
    numericInput1: 15,
    textInput1: 'Text 4',
    textInput2: 'Text 5',
    textInput3: 'Text 6',
    numericInput2: 25,
    dateInput: new Date('2023-02-01')
  },
  {
    id: '3',
    mandatoryInput: 'Input 3',
    status: 'Closed',
    type: 'X',
    numericInput1: 20,
    textInput1: 'Text 7',
    textInput2: 'Text 8',
    textInput3: 'Text 9',
    numericInput2: 30,
    dateInput: new Date('2023-03-01')
  },
  {
    id: '4',
    mandatoryInput: 'Input 4',
    status: 'Closed',
    type: 'Y',
    numericInput1: 25,
    textInput1: 'Text 10',
    textInput2: 'Text 11',
    textInput3: 'Text 12',
    numericInput2: 35,
    dateInput: new Date('2023-04-01')
  },
  {
    id: '5',
    mandatoryInput: 'Input 5',
    status: 'Closed',
    type: 'X',
    numericInput1: 30,
    textInput1: 'Text 13',
    textInput2: 'Text 14',
    textInput3: 'Text 15',
    numericInput2: 40,
    dateInput: new Date('2023-05-01')
  }
]

const loadFilesFromLocalStorage = (): IFile[] => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const files = localStorage.getItem('files')
    return files ? JSON.parse(files) : []
  }
  return mockFiles
}
const saveFilesToLocalStorage = (files: IFile[]) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('files', JSON.stringify(files))
  }
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
