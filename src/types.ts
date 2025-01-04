export type FilterType = 'All' | 'Open' | 'Closed'

export interface IFile {
    id: string
    name: string
    status: FileStatusType
    type: string
}

type FileStatusType = 'Open' | 'Closed'